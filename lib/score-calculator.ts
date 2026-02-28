import type { AudioMetrics, VoiceScores, AnalysisResult } from "../core/types";
import {
  PITCH_TARGET_MIN,
  PITCH_TARGET_MAX,
  PITCH_DEEP_TARGET,
  STABILITY_TARGET,
  LOUDNESS_TARGET_MIN,
  LOUDNESS_TARGET_MAX,
} from "./constants";

/** 从 AudioMetrics 计算各维度 0-100 分 */
export function calcScores(metrics: AudioMetrics): VoiceScores {
  // 深沉感分数（基于 f0_median，越低越好，但不超过 85Hz）
  let depth = 50;
  if (metrics.f0_median !== null) {
    if (metrics.f0_median <= PITCH_DEEP_TARGET) {
      depth = 100;
    } else if (metrics.f0_median <= PITCH_TARGET_MAX) {
      depth = Math.round(
        100 - 50 * ((metrics.f0_median - PITCH_DEEP_TARGET) / (PITCH_TARGET_MAX - PITCH_DEEP_TARGET))
      );
    } else {
      depth = Math.max(10, Math.round(50 - 40 * ((metrics.f0_median - PITCH_TARGET_MAX) / 100)));
    }
  }

  // 稳定性分数（直接映射）
  const stability = Math.round(metrics.stability * 100);

  // 节奏分数（来自 pace_detector）
  const pace = metrics.pace_score;

  // 音量惩罚：超出目标区间扣分
  let loudnessPenalty = 0;
  if (metrics.loudness < LOUDNESS_TARGET_MIN) {
    loudnessPenalty = Math.round(20 * (1 - metrics.loudness / LOUDNESS_TARGET_MIN));
  } else if (metrics.loudness > LOUDNESS_TARGET_MAX) {
    loudnessPenalty = Math.round(10 * ((metrics.loudness - LOUDNESS_TARGET_MAX) / (1 - LOUDNESS_TARGET_MAX)));
  }

  // 综合分（加权平均后扣音量惩罚）
  const overall = Math.max(
    0,
    Math.round(depth * 0.4 + stability * 0.35 + pace * 0.25) - loudnessPenalty
  );

  return {
    depth: Math.min(100, Math.max(0, depth)),
    stability: Math.min(100, Math.max(0, stability)),
    pace: Math.min(100, Math.max(0, pace)),
    overall: Math.min(100, Math.max(0, overall)),
  };
}

/** 生成即时文字反馈（1-3 条） */
export function generateFeedback(metrics: AudioMetrics, scores: VoiceScores): string[] {
  const tips: string[] = [];

  // Pitch 反馈
  if (metrics.f0_median !== null) {
    if (metrics.f0_median > 160) {
      tips.push("声音偏高，试着放松喉咙，让气息从胸腔发出");
    } else if (metrics.f0_median > 140) {
      tips.push("可以再往下沉一点，想象声音从胸口发出");
    } else if (metrics.f0_median <= 110) {
      tips.push("深沉感很好！保持这个共鸣位置");
    }
  } else if (metrics.confidence < 0.3) {
    tips.push("环境噪音较大，建议到安静处重试");
  }

  // 稳定性反馈
  if (scores.stability < 50) {
    tips.push("声音有些飘，试着深呼一口气再开口");
  } else if (scores.stability >= 80) {
    tips.push("稳定性很好，声音沉稳有力");
  }

  // 节奏反馈
  if (metrics.pause_ratio < 0.10) {
    tips.push("语速偏快，试着在句子中间多加停顿");
  } else if (metrics.pause_ratio > 0.45) {
    tips.push("停顿稍多，可以让表达更连贯一些");
  } else if (metrics.pause_ratio >= 0.15 && metrics.pause_ratio <= 0.35) {
    tips.push("节奏控制得当，停顿自然");
  }

  // 音量反馈
  if (metrics.loudness < 0.2) {
    tips.push("声音太轻，试着用更多气息支撑");
  }

  return tips.slice(0, 3); // 最多 3 条
}

/** 生成今日最大提升点描述 */
export function generateImprovement(metrics: AudioMetrics, scores: VoiceScores): string {
  if (scores.overall >= 80) return "综合表现出色，保持下去！";
  if (scores.depth < 50) return "今日重点：找到胸腔共鸣，让声音更有重量";
  if (scores.stability < 50) return "今日重点：稳定声音，减少颤动";
  if (scores.pace < 50) return "今日重点：控制语速，多加停顿";
  return "稳步提升中，继续坚持！";
}

export interface ForcedVoiceResult {
  isForced: boolean;
  signals: string[];
}

/** 检测刻意压低声音（反作弊）：≥3 个信号则判定为 forced */
export function detectForcedVoice(metrics: AudioMetrics): ForcedVoiceResult {
  const signals: string[] = [];
  if (metrics.f0_median !== null && metrics.f0_median > 0 && metrics.f0_median < 85) {
    signals.push("f0_too_low");
  }
  if (metrics.stability < 0.40) signals.push("stability_low");
  if (metrics.confidence < 0.35) signals.push("confidence_low");
  if (metrics.f0_range < 10 && metrics.confidence > 0.3) signals.push("f0_range_narrow");
  return { isForced: signals.length >= 3, signals };
}

/** 完整分析流程 */
export function buildAnalysisResult(metrics: AudioMetrics): AnalysisResult {
  const scores = calcScores(metrics);
  const feedback = generateFeedback(metrics, scores);
  const improvement = generateImprovement(metrics, scores);
  return { metrics, scores, feedback, improvement };
}
