/** 一次录音的原始音频分析结果 */
export interface AudioMetrics {
  /** 基频中位数（Hz），null 表示无法检测（静音/噪音） */
  f0_median: number | null;
  /** 基频 P10-P90 范围（Hz），反映音调变化丰富度 */
  f0_range: number;
  /** F0 稳定性 0-1（1=极稳定），基于标准差归一化 */
  stability: number;
  /** RMS 均值 0-1（目标区间 0.25-0.7） */
  loudness: number;
  /** 语速综合评分 0-100 */
  pace_score: number;
  /** 停顿占比 0-1（目标区间 0.15-0.35） */
  pause_ratio: number;
  /** 录音时长（ms） */
  duration_ms: number;
  /** 检测置信度 0-1（有效帧占比，低于 0.3 提示噪音） */
  confidence: number;
}

/** 各维度评分（0-100） */
export interface VoiceScores {
  depth: number;      // 共鸣/深沉感
  stability: number;  // 稳定性
  pace: number;       // 节奏控制
  overall: number;    // 综合
}

/** 完整分析结果（metrics + 评分 + 文字反馈） */
export interface AnalysisResult {
  metrics: AudioMetrics;
  scores: VoiceScores;
  /** 即时文字反馈，1-3 条 */
  feedback: string[];
  /** 今日最大提升点描述（用于分享卡） */
  improvement: string;
}

/** 录音状态 */
export type RecordState = "idle" | "requesting" | "recording" | "analyzing" | "done" | "error";

/** 音频引擎错误类型 */
export type AudioErrorType =
  | "permission_denied"
  | "not_supported"
  | "low_confidence"
  | "too_short"
  | "unknown";

export interface AudioError {
  type: AudioErrorType;
  message: string;
}
