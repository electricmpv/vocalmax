/**
 * 声音稳定性分析
 * 基于 pitch 值的标准差计算稳定性分数（0-1）
 */

/**
 * 计算稳定性分数
 * stdDev < 3Hz → ~1.0（极稳定）
 * stdDev > 30Hz → ~0.0（极不稳定）
 */
export function calcStability(pitchValues: number[]): number {
  if (pitchValues.length < 3) return 0;

  const mean = pitchValues.reduce((a, b) => a + b, 0) / pitchValues.length;
  const variance =
    pitchValues.reduce((sum, v) => sum + (v - mean) ** 2, 0) /
    pitchValues.length;
  const stdDev = Math.sqrt(variance);

  // 归一化：stdDev 0-30Hz 映射到 stability 1-0
  const stability = Math.max(0, Math.min(1, 1 - stdDev / 30));
  return Math.round(stability * 100) / 100; // 保留 2 位小数
}
