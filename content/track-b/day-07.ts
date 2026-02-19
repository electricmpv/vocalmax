import type { DayLesson } from '../schema'

export const trackBDay07: DayLesson = {
  id: 'track-b-day-07',
  trackId: 'b',
  day: 7,
  title: '综合测验',
  subtitle: '全维度评估，检验一周训练成果',
  exercises: [
    {
      id: 'track-b-day-07-ex-01',
      type: 'resonance',
      title: '综合共鸣稳定测验',
      instruction: '不做任何热身，直接开口发声——这是测验真实声音状态。用胸声区发一个持续的"啊——"，目标是同时达到：音调处于 85-150Hz 区间、音调波动极小、音量充足不虚弱。发声结束后，用同样的状态说出"我的声音，稳定而有力"，体会这句话和你一周前的发声是否有明显不同。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 150,
        stability_min: 0.82,
        loudness_target: -14,
      },
      scoringWeights: { depth: 0.45, stability: 0.45, pace: 0.10 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '这是测验，不是练习——放下追求完美的心态，展示真实水平',
        '如果第一次没通过，分析是深度不够还是稳定性不足，针对性复习对应的天数',
      ],
    },
    {
      id: 'track-b-day-07-ex-02',
      type: 'pace',
      title: '综合节奏控制测验',
      instruction: '用一段即兴发言测试节奏控制：说出你对"职场中如何建立个人影响力"的看法，要求：1) 语速不超过每分钟 160 字；2) 句与句之间有明显停顿，不用"嗯、啊"填充；3) 最重要的观点要用重读和停顿强调。发言约 30-40 秒即可，用质量代替数量。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.68,
        pause_ratio_min: 0.20,
        stability_min: 0.76,
      },
      scoringWeights: { depth: 0.15, stability: 0.30, pace: 0.55 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '即兴发言最考验真实节奏感，有意识地在每个完整想法后停顿，而不是在换气时停',
        '停顿期间保持眼神和姿态稳定，让停顿成为你的节奏，而非尴尬的空白',
      ],
    },
    {
      id: 'track-b-day-07-ex-03',
      type: 'scene-reading',
      title: '会议总结行动项跟读',
      instruction: '这是本周最后一关。朗读下方会议总结，语速保持在平时的 80%，每个行动项编号（"第一""第二""第三"）后停顿约 0.8 秒。"由我来负责"四个字要最稳、最低沉地说出，体现担当感。最后一句"散会"两字要短促有力、降调，表达会议的明确收尾。',
      prompt: '好，我来总结一下今天会议的行动项。第一，产品侧在本周五前完成需求文档，由小王负责。第二，技术侧在下周一前评估排期，由小张负责。第三，整体方案的对外沟通，由我来负责，周三前完成。如果有任何阻碍，直接找我。散会。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 158,
        stability_min: 0.78,
        pace_score_min: 0.66,
        pause_ratio_min: 0.22,
      },
      scoringWeights: { depth: 0.28, stability: 0.37, pace: 0.35 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '总结行动项时的语气要比讨论时更确定、更有收束感，让所有人知道会议已经结束决策阶段',
        '"如果有任何阻碍，直接找我"是权威感的关键句，要低沉、慢速、降调，说完后停顿 1 秒',
      ],
    },
  ],
  totalXP: 65,
}
