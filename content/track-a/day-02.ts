import type { DayLesson } from '../schema'

export const trackADay02: DayLesson = {
  id: 'track-a-day-02',
  trackId: 'a',
  day: 2,
  title: '放松下巴与喉部',
  subtitle: '消除紧张习惯，让声音自然流出',
  exercises: [
    {
      id: 'track-a-day-02-ex-01',
      type: 'resonance',
      title: '下巴松弛热身',
      instruction: '用两根手指轻轻按住下巴两侧咬肌（嚼东西时会鼓起的肌肉），然后发"妈——妈——妈——"的音，每次发音时感受下巴是否向下自然落下而不是用力张开。连续发 8 次，节奏均匀，每次间隔约 1 秒。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 145,
        stability_min: 0.70,
      },
      scoringWeights: { depth: 0.5, stability: 0.4, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '下巴越放松，声音越圆润，紧绷的下巴会把声音压扁。',
        '如果感觉咬肌在用力，停下来做一个大哈欠，能有效放松整个下颌区域。',
      ],
      safetyNote: '颞颌关节有不适的用户请跳过手指按压，仅做发音练习即可。',
    },
    {
      id: 'track-a-day-02-ex-02',
      type: 'stability',
      title: '低喉位稳音练习',
      instruction: '吞咽一口口水，感受喉结下沉的位置，然后保持这个低喉位状态发"嗯——哦——啊"三个连续音。每个音保持约 2 秒，之间不要换气，整组音像一条向下倾斜的滑道。共发 3 组。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 80,
        f0_max: 135,
        stability_min: 0.73,
        loudness_target: -20,
      },
      scoringWeights: { depth: 0.45, stability: 0.45, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '喉结高低直接影响音色：喉位越低声音越厚实，越高则越尖细。',
        '不要刻意压喉，用"刚吞完东西"的放松状态保持即可。',
      ],
    },
    {
      id: 'track-a-day-02-ex-03',
      type: 'scene-reading',
      title: '场景跟读：问好搭话',
      instruction: '用放松的下巴和低喉位状态朗读下面这句话。"嘿"字发音时嘴角微扬但不要扯得太开，"怎么"两字连读稍快，"在这"落尾时音量自然收小，传递出随意轻松的感觉。',
      prompt: '嘿，你也在这儿啊，真巧。',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 85,
        f0_max: 155,
        stability_min: 0.65,
        pace_score_min: 0.55,
        pause_ratio_min: 0.10,
      },
      scoringWeights: { depth: 0.4, stability: 0.3, pace: 0.3 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '"真巧"两字是情感落点，可以略微拉长或在前面停顿半拍，增加真实感。',
        '整句话的语气是惊喜但不惊慌，想象真的偶遇了一个想认识的人。',
      ],
    },
  ],
  totalXP: 65,
}
