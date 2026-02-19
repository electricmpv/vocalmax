import type { DayLesson } from '../schema'

export const trackBDay05: DayLesson = {
  id: 'track-b-day-05',
  trackId: 'b',
  day: 5,
  title: '面试自我介绍',
  subtitle: '45 秒精炼，让第一印象留下权威感',
  exercises: [
    {
      id: 'track-b-day-05-ex-01',
      type: 'resonance',
      title: '开口前胸腔激活',
      instruction: '用 3 个慢节奏的"嗯哼——"热身胸腔共鸣，每次发声前深吸一口气，每次发声结束后停顿 2 秒。完成热身后，用胸声区说出"你好，我叫——"，感受声音从胸腔发出的厚实感，而不是只从喉咙挤出的单薄感。这是面试开口前 30 秒内做的最重要的准备。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 150,
        stability_min: 0.76,
      },
      scoringWeights: { depth: 0.60, stability: 0.30, pace: 0.10 },
      passScore: 60,
      xpReward: 18,
      tips: [
        '面试前在洗手间小声做胸腔共鸣热身，进场后声音会明显更稳、更低沉',
        '开场"你好"两个字决定面试官的第一听觉印象，值得单独练习 10 次',
      ],
    },
    {
      id: 'track-b-day-05-ex-02',
      type: 'pace',
      title: '45 秒节奏感知',
      instruction: '练习在 45 秒内完成一段约 120 字的自我介绍，不超时也不过快。方法：把介绍分为 3 段，每段说完后停顿 1 秒。第 1 段：姓名与背景（约 10 秒）。第 2 段：核心经历与成果（约 25 秒）。第 3 段：为什么适合这个岗位（约 10 秒）。练习时默数每段结束时间，培养内在节拍感。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.65,
        pause_ratio_min: 0.18,
        stability_min: 0.72,
      },
      scoringWeights: { depth: 0.15, stability: 0.30, pace: 0.55 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '语速过快是紧张的外在表现，面试官会将其解读为缺乏自信',
        '三段式结构让你的自我介绍有层次感，听众能跟上你的逻辑',
      ],
    },
    {
      id: 'track-b-day-05-ex-03',
      type: 'scene-reading',
      title: '面试自我介绍跟读',
      instruction: '朗读下方自我介绍，保持语速适中（每分钟 160 字左右），每个段落结束后停顿约 1 秒。人名、公司名、数字等关键信息要略微放慢并加重，让面试官能清楚记住。最后一句要降调收尾，体现自信而非询问。',
      prompt: '您好，我叫李华，有 5 年的产品管理经验，专注于 B 端 SaaS 产品。在上一家公司，我主导了核心功能的重构，将用户留存率提升了 32%，并带领 8 人团队按时完成了 3 个季度的版本交付。我加入贵公司的原因，是认可这里对产品深度的追求，也相信我的经验能在这个阶段帮助团队提速。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 160,
        stability_min: 0.74,
        pace_score_min: 0.64,
        pause_ratio_min: 0.17,
      },
      scoringWeights: { depth: 0.25, stability: 0.35, pace: 0.40 },
      passScore: 60,
      xpReward: 22,
      tips: [
        '"32%"这类数字是权威感的锚点，说之前停顿 0.3 秒，说之后再停顿 0.3 秒',
        '最后"帮助团队提速"要自信降调，而不是上扬——上扬听起来像在请求认可',
      ],
    },
  ],
  totalXP: 60,
}
