/**
 * VocalMax 音频引擎（MVP：录完分析模式）
 *
 * 流程：用户点击录音 → getUserMedia → 积累 Float32Array buffer
 *       → 录音结束 → 离线分析（pitch / rms / pace） → 返回 AudioMetrics
 *
 * iOS Safari 要点：AudioContext 必须在用户手势（click/touchstart）内创建
 */

import type { AudioMetrics, AudioError } from "./types";
import { analyzePitchBuffer, calcPitchStats } from "./pitch-yin";
import { calcLoudness, calcRMS } from "./rms-analyzer";
import { calcStability } from "./stability-tracker";
import { analyzePace, extractRMSFrames } from "./pace-detector";

const FRAME_SIZE = 2048;

export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;

  // 录音缓冲区（逐帧积累）
  private recordedSamples: Float32Array[] = [];
  private isRecording = false;
  private sampleRate = 48000;

  /**
   * 初始化音频上下文（必须在用户手势内调用）
   */
  async init(): Promise<void> {
    if (this.audioContext && this.audioContext.state !== "closed") return;

    // iOS Safari 兼容：部分设备强制 44100
    this.audioContext = new AudioContext();
    this.sampleRate = this.audioContext.sampleRate;

    // iOS Safari 需要手动 resume
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }

  /**
   * 请求麦克风权限并开始录音
   * 返回一个 Promise，在录音开始后 resolve
   */
  async startRecording(): Promise<void> {
    await this.init();

    if (!this.audioContext) {
      throw this.makeError("not_supported", "AudioContext 初始化失败");
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: { ideal: 48000 },
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
      });
    } catch (err) {
      const e = err as DOMException;
      if (
        e.name === "NotAllowedError" ||
        e.name === "PermissionDeniedError"
      ) {
        throw this.makeError("permission_denied", "麦克风权限被拒绝");
      }
      throw this.makeError("not_supported", `无法获取麦克风: ${e.message}`);
    }

    this.recordedSamples = [];
    this.isRecording = true;

    this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);

    // ScriptProcessorNode：兼容性最好（iOS Safari 不支持 AudioWorklet 的部分版本）
    // bufferSize 4096 在移动端性能更稳定
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this.scriptProcessor = this.audioContext.createScriptProcessor(
      FRAME_SIZE,
      1, // 输入声道
      1  // 输出声道
    );

    this.scriptProcessor.onaudioprocess = (e) => {
      if (!this.isRecording) return;
      const inputData = e.inputBuffer.getChannelData(0);
      // 复制一份，避免 buffer 被重用
      this.recordedSamples.push(new Float32Array(inputData));
    };

    // ScriptProcessorNode 必须连接到 destination 才能工作（但不输出声音）
    this.sourceNode.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.audioContext.destination);
  }

  /**
   * 停止录音并返回分析结果
   * 录音时长太短（< 3 秒）会抛出错误
   */
  async stopAndAnalyze(): Promise<AudioMetrics> {
    this.isRecording = false;

    // 停止所有轨道
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }

    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }

    const samples = this.recordedSamples;
    this.recordedSamples = [];

    if (samples.length === 0) {
      throw this.makeError("too_short", "没有录到音频");
    }

    // 合并所有帧为一个完整 buffer
    const totalLength = samples.reduce((sum, s) => sum + s.length, 0);
    const duration_ms = Math.round((totalLength / this.sampleRate) * 1000);

    if (duration_ms < 2000) {
      throw this.makeError("too_short", "录音时间太短，请录制至少 3 秒");
    }

    const fullBuffer = new Float32Array(totalLength);
    let offset = 0;
    for (const frame of samples) {
      fullBuffer.set(frame, offset);
      offset += frame.length;
    }

    // 离线分析（约 200-500ms）
    return this.analyzeBuffer(fullBuffer, duration_ms);
  }

  /**
   * 核心分析函数（离线，可在主线程运行，耗时 <500ms）
   */
  private async analyzeBuffer(
    buffer: Float32Array,
    duration_ms: number
  ): Promise<AudioMetrics> {
    const sampleRate = this.sampleRate;

    // 并行分析（pitch 分析是异步的，其他是同步的）
    const [pitchResult, rmsFrames] = await Promise.all([
      analyzePitchBuffer(buffer, sampleRate),
      Promise.resolve(extractRMSFrames(buffer, FRAME_SIZE)),
    ]);

    const { pitchValues, totalFrames } = pitchResult;

    // Pitch 统计
    const { f0_median, f0_range } = calcPitchStats(pitchValues);

    // 稳定性
    const stability = calcStability(pitchValues);

    // 音量
    const loudness = calcLoudness(rmsFrames);

    // 语速 / 停顿
    const { pause_ratio, pace_score } = analyzePace(rmsFrames);

    // 置信度 = 有效 pitch 帧 / 总帧数
    const confidence =
      totalFrames > 0
        ? Math.round((pitchValues.length / totalFrames) * 100) / 100
        : 0;

    return {
      f0_median,
      f0_range,
      stability,
      loudness: Math.round(loudness * 1000) / 1000,
      pace_score,
      pause_ratio,
      duration_ms,
      confidence,
    };
  }

  /** 释放所有资源 */
  dispose(): void {
    this.isRecording = false;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
    }
    if (this.scriptProcessor) this.scriptProcessor.disconnect();
    if (this.sourceNode) this.sourceNode.disconnect();
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
    }
    this.recordedSamples = [];
  }

  private makeError(type: AudioError["type"], message: string): AudioError {
    return { type, message };
  }

  get isReady(): boolean {
    return (
      this.audioContext !== null && this.audioContext.state !== "closed"
    );
  }
}
