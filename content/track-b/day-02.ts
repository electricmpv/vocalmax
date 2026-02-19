import type { DayLesson } from '../schema'

export const trackBDay02: DayLesson = {
  id: 'track-b-day-02',
  trackId: 'b',
  day: 2,
  title: '会议发言节奏',
  subtitle: '慢而有力，让每个字都落地有声',
  exercises: [
    {
      id: 'track-b-day-02-ex-01',
      type: 'stability',
      title: '慢速稳声基础',
      instruction: '用你平时说话速度的 70% 朗读数字"一、二、三……十"，每个数字之间停顿约 0.8 秒。保持音量均匀，不要让声音在数字末尾消失或减弱。重点感受每个数字都像一块砖头，稳稳地放下去。',
      durationSeconds: 10,
      targetMetrics: {
        stability_min: 0.78,
        pace_score_min: 0.55,
        pause_ratio_min: 0.20,
      },
      scoringWeights: { depth: 0.20, stability: 0.50, pace: 0.30 },
      passScore: 60,
      xpReward: 18,
      tips: [
        '慢不是拖沓，而是每个停顿都有意义——给自己思考，给对方消化',
        '每次发声前先吸半口气，保证声音从一开始就有支撑',
      ],
    },
    {
      id: 'track-b-day-02-ex-02',
      type: 'pace',
      title: '关键词重读节奏',
      instruction: '练习"强调—停顿—继续"的发言节奏：说出一句话，在最重要的关键词上加重音量并略微拉长，随后停顿约 0.5 秒，再继续后面的内容。例如："这个数据——（停）——说明我们的方向是对的。"重复练习这种节奏模式。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.65,
        pause_ratio_min: 0.22,
        loudness_target: -14,
      },
      scoringWeights: { depth: 0.15, stability: 0.30, pace: 0.55 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '关键词重读时音量提升 10-15%，而非突然大喊',
        '停顿是句子的力量所在，不要急着填满每一秒钟',
      ],
    },
    {
      id: 'track-b-day-02-ex-03',
      type: 'scene-reading',
      title: '会议观点陈述跟读',
      instruction: '朗读下方句子，在斜线（/）处停顿约 0.8 秒，在双斜线（//）处停顿约 1.2 秒。保持语速慢而稳，"核心问题"四个字加重并略微拉长，结尾语调向下收，表达确定性而非疑问。',
      prompt: '我想提出一个观点。// 我们目前面临的，/ 核心问题，/ 不是资源不足，// 而是优先级不清晰。/ 我建议，/ 我们先对齐目标，/ 再分配资源。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 160,
        stability_min: 0.72,
        pace_score_min: 0.62,
        pause_ratio_min: 0.22,
      },
      scoringWeights: { depth: 0.25, stability: 0.35, pace: 0.40 },
      passScore: 60,
      xpReward: 22,
      tips: [
        '"核心问题"前的停顿会让听众下意识集中注意力',
        '最后一句"再分配资源"要降调结束，避免听起来像提问',
      ],
    },
  ],
  totalXP: 60,
}
