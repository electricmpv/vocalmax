/**
 * RMS 能量分析
 * 计算一段音频 buffer 的 RMS（均方根），表示音量/能量水平
 */

/** 计算单个 buffer 的 RMS，返回 0-1 */
export function calcRMS(buffer: Float32Array): number {
  if (buffer.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i];
  }
  return Math.sqrt(sum / buffer.length);
}

/**
 * 计算整段录音（多个帧）的 RMS 统计
 * @param frames 每帧的 RMS 值数组
 * @returns 平均 RMS（loudness）
 */
export function calcLoudness(frames: number[]): number {
  if (frames.length === 0) return 0;
  const sum = frames.reduce((a, b) => a + b, 0);
  return Math.min(sum / frames.length, 1); // clamp 到 1
}
