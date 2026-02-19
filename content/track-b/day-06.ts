import type { DayLesson } from '../schema'

export const trackBDay06: DayLesson = {
  id: 'track-b-day-06',
  trackId: 'b',
  day: 6,
  title: '优势陈述 STAR',
  subtitle: '结构化表达，让经历变成无法忽视的证明',
  exercises: [
    {
      id: 'track-b-day-06-ex-01',
      type: 'resonance',
      title: '陈述感共鸣基础',
      instruction: '用胸声区朗读以下 3 个短句，每句都要用"陈述事实"的语气，而非讲故事的语气。重点是音量稳定、音调平而略低，每句结尾都要降调。句子：1) 这件事，我负责了全程。2) 结果比预期提前了两周。3) 团队因此获得了年度奖项。说完每句停顿 1 秒，感受陈述感的分量。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 150,
        stability_min: 0.78,
      },
      scoringWeights: { depth: 0.55, stability: 0.35, pace: 0.10 },
      passScore: 60,
      xpReward: 18,
      tips: [
        '陈述自己的成就时，许多人会不自觉地提高音调——这会让听众感到你在吹嘘',
        '低沉、平稳的音调传达"这是事实"，而非"请相信我"',
      ],
    },
    {
      id: 'track-b-day-06-ex-02',
      type: 'pace',
      title: 'STAR 四段节奏练习',
      instruction: '练习 STAR 结构的发言节奏：S（背景）说完停顿 0.8 秒，T（任务）说完停顿 0.8 秒，A（行动）说完停顿 1 秒，R（结果）最后降调收尾。每个部分开头用一个信号词："当时的情况是——""我承担的任务是——""我采取的行动是——""最终的结果是——"。练习用信号词标记段落转换，停顿在转换处，而不是句子中间。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.63,
        pause_ratio_min: 0.22,
        stability_min: 0.75,
      },
      scoringWeights: { depth: 0.15, stability: 0.30, pace: 0.55 },
      passScore: 60,
      xpReward: 20,
      tips: [
        'STAR 结构最常见的错误是"A"部分说太长、"R"部分说太短——结果才是面试官想听的',
        '在"R"部分开口前多停顿 0.5 秒，用沉默制造期待感',
      ],
    },
    {
      id: 'track-b-day-06-ex-03',
      type: 'scene-reading',
      title: 'STAR 陈述开头跟读',
      instruction: '朗读下方 STAR 结构的陈述开头，注意每个信号词（"当时""我的职责""我做了""最终"）后面都要停顿约 0.8 秒。"降低了 40%"这个数字要最慢、最稳、最低沉地说出，之后停顿约 1 秒，让数字沉淀下来。全段结尾降调，语气确定。',
      prompt: '当时公司面临客户流失加速的危机，季度流失率达到了 18%。我的职责，是在 3 个月内找到根本原因并提出解决方案。我做了系统性的用户访谈，覆盖了 60 位流失客户，并重新设计了关键的 onboarding 流程。最终，我们在下一个季度将流失率降低了 40%。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 158,
        stability_min: 0.75,
        pace_score_min: 0.63,
        pause_ratio_min: 0.22,
      },
      scoringWeights: { depth: 0.30, stability: 0.35, pace: 0.35 },
      passScore: 60,
      xpReward: 22,
      tips: [
        '"18%"和"40%"都是关键数字，两者的停顿节奏要对称，体现你对数据的重视',
        '陈述危机背景时不要带情绪，越平静地描述危机，越显得你当时从容应对',
      ],
    },
  ],
  totalXP: 60,
}
