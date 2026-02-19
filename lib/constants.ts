// 男声音高目标范围（Hz）
export const PITCH_TARGET_MIN = 90;
export const PITCH_TARGET_MAX = 140;
export const PITCH_DEEP_TARGET = 110; // 低沉目标

// 停顿比例目标
export const PAUSE_RATIO_MIN = 0.15;
export const PAUSE_RATIO_MAX = 0.35;

// 稳定性目标
export const STABILITY_TARGET = 0.65;

// 音量目标（RMS 0-1）
export const LOUDNESS_TARGET_MIN = 0.25;
export const LOUDNESS_TARGET_MAX = 0.7;

// XP 规则
export const XP_BONUS_DAY_COMPLETE = 10; // 完成一天所有关卡
export const XP_BONUS_STREAK_3 = 20;     // 连胜 3 天
export const XP_BONUS_STREAK_7 = 50;     // 连胜 7 天
export const XP_BONUS_TRACK_DONE = 100;  // 完成整条赛道

// 录音参数
export const RECORD_DURATION_DEFAULT = 8; // 秒
export const RECORD_DURATION_MIN = 5;
export const RECORD_DURATION_MAX = 10;

// 及格分
export const PASS_SCORE_DEFAULT = 60;

// VAD 参数
export const VAD_RMS_THRESHOLD = 0.01;
export const VAD_HOLD_FRAMES = 8; // 帧数，约 170ms @48kHz/2048 帧
