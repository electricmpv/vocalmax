import type { TrackId } from "../store/progress";

export type LessonType = "resonance" | "stability" | "pace" | "scene-reading";

export interface TargetMetrics {
  f0_min?: number;
  f0_max?: number;
  stability_min?: number;
  loudness_target?: number;
  pace_score_min?: number;
  pause_ratio_min?: number;
}

export interface ScoringWeights {
  depth: number;      // 0-1，三者之和 = 1
  stability: number;
  pace: number;
}

export interface LessonExercise {
  id: string;
  type: LessonType;
  title: string;
  instruction: string;      // 练习指令（用单引号或模板字符串，避免中文引号冲突）
  prompt?: string;          // 场景跟读台词（仅 scene-reading 类型）
  durationSeconds: number;
  targetMetrics: TargetMetrics;
  scoringWeights: ScoringWeights;
  passScore: number;
  xpReward: number;
  tips: string[];
  safetyNote?: string;
}

export interface DayLesson {
  id: string;               // e.g. "track-a-day-01"
  trackId: TrackId;
  day: number;
  title: string;
  subtitle: string;
  exercises: [LessonExercise, LessonExercise, LessonExercise];
  totalXP: number;
}
