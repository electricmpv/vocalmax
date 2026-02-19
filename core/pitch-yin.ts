/**
 * YIN Pitch Detection 封装
 * 使用 pitchfinder 库，男声范围 85-200Hz
 */

import type { AudioMetrics } from "./types";

// pitchfinder 是 CommonJS 模块，需要动态导入
// 在浏览器中运行时懒加载
let _pitchDetector: ((buf: Float32Array) => number | null) | null = null;

async function getPitchDetector(sampleRate: number) {
  if (_pitchDetector) return _pitchDetector;
  // 动态导入，避免 SSR 问题
  const { YIN } = await import("pitchfinder");
  _pitchDetector = YIN({ sampleRate, threshold: 0.1 });
  return _pitchDetector;
}

const MALE_VOICE_MIN = 70;   // Hz
const MALE_VOICE_MAX = 350;  // Hz（保留宽一点）

/**
 * 对一段完整录音（Float32Array）分析 pitch
 * 将录音切成 2048 帧窗口，逐帧检测，返回所有有效帧的 pitch 值
 */
export async function analyzePitchBuffer(
  buffer: Float32Array,
  sampleRate: number
): Promise<{
  pitchValues: number[]; // 有效帧的 pitch 值（Hz）
  totalFrames: number;
}> {
  const detector = await getPitchDetector(sampleRate);
  const frameSize = 2048;
  const pitchValues: number[] = [];
  let totalFrames = 0;

  for (let offset = 0; offset + frameSize <= buffer.length; offset += frameSize) {
    totalFrames++;
    const frame = buffer.slice(offset, offset + frameSize);
    const pitch = detector(frame);

    if (
      pitch !== null &&
      pitch >= MALE_VOICE_MIN &&
      pitch <= MALE_VOICE_MAX
    ) {
      pitchValues.push(pitch);
    }
  }

  return { pitchValues, totalFrames };
}

/**
 * 从 pitch 值数组计算统计指标
 */
export function calcPitchStats(pitchValues: number[]): {
  f0_median: number | null;
  f0_range: number;
} {
  if (pitchValues.length === 0) {
    return { f0_median: null, f0_range: 0 };
  }

  const sorted = [...pitchValues].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const f0_median =
    sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];

  // P10-P90 范围
  const p10 = sorted[Math.floor(sorted.length * 0.1)];
  const p90 = sorted[Math.floor(sorted.length * 0.9)];
  const f0_range = Math.max(0, p90 - p10);

  return { f0_median: Math.round(f0_median), f0_range: Math.round(f0_range) };
}
