/**
 * 语速 / 停顿检测（纯能量阈值 VAD，无 ML 依赖）
 */

import { VAD_RMS_THRESHOLD, VAD_HOLD_FRAMES } from "../lib/constants";
import { calcRMS } from "./rms-analyzer";

export interface PaceMetrics {
  pause_ratio: number;   // 停顿占比 0-1
  pace_score: number;    // 语速评分 0-100
  voiced_ratio: number;  // 有声帧占比
}

/**
 * 对完整录音的 RMS 帧序列执行 VAD 分析
 * @param rmsFrames 每帧的 RMS 值数组（2048 帧/项）
 */
export function analyzePace(rmsFrames: number[]): PaceMetrics {
  if (rmsFrames.length === 0) {
    return { pause_ratio: 0, pace_score: 50, voiced_ratio: 0 };
  }

  // VAD：滞后平滑，避免单帧噪声触发
  let isSpeaking = false;
  let holdCounter = 0;
  let voicedFrames = 0;
  let pauseSegments = 0;
  let speechSegments = 0;
  let inPause = false;

  for (let i = 0; i < rmsFrames.length; i++) {
    const aboveThreshold = rmsFrames[i] > VAD_RMS_THRESHOLD;

    if (aboveThreshold) {
      holdCounter = 0;
      if (!isSpeaking) {
        isSpeaking = true;
        speechSegments++;
        if (inPause) {
          pauseSegments++;
          inPause = false;
        }
      }
      voicedFrames++;
    } else {
      holdCounter++;
      if (holdCounter >= VAD_HOLD_FRAMES && isSpeaking) {
        isSpeaking = false;
        inPause = true;
      }
    }
  }

  const voiced_ratio = voicedFrames / rmsFrames.length;
  const pause_ratio = Math.max(0, Math.min(1, 1 - voiced_ratio));

  // 语速评分：停顿比例 0.15-0.35 为最优（100分），偏高偏低都减分
  // 停顿太少（<0.10）= 语速过快 = 低分
  // 停顿太多（>0.50）= 表达不连贯 = 低分
  let pace_score: number;
  if (pause_ratio >= 0.15 && pause_ratio <= 0.35) {
    pace_score = 100;
  } else if (pause_ratio < 0.10) {
    pace_score = Math.round(60 * (pause_ratio / 0.10));
  } else if (pause_ratio < 0.15) {
    pace_score = Math.round(60 + 40 * ((pause_ratio - 0.10) / 0.05));
  } else if (pause_ratio <= 0.50) {
    pace_score = Math.round(100 - 40 * ((pause_ratio - 0.35) / 0.15));
  } else {
    pace_score = Math.max(0, Math.round(60 - 60 * ((pause_ratio - 0.50) / 0.50)));
  }

  return {
    pause_ratio: Math.round(pause_ratio * 1000) / 1000,
    pace_score: Math.round(pace_score),
    voiced_ratio: Math.round(voiced_ratio * 1000) / 1000,
  };
}

/**
 * 从 Float32Array 原始录音中提取 RMS 帧序列
 */
export function extractRMSFrames(
  buffer: Float32Array,
  frameSize = 2048
): number[] {
  const frames: number[] = [];
  for (let offset = 0; offset + frameSize <= buffer.length; offset += frameSize) {
    const frame = buffer.slice(offset, offset + frameSize);
    frames.push(calcRMS(frame));
  }
  return frames;
}
