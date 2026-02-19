import type { DayLesson } from '../schema'

export const trackADay06: DayLesson = {
  id: 'track-a-day-06',
  trackId: 'a',
  day: 6,
  title: '讲故事',
  subtitle: '用声音节奏讲出有吸引力的故事',
  exercises: [
    {
      id: 'track-a-day-06-ex-01',
      type: 'resonance',
      title: '叙事共鸣音色建立',
      instruction: '用"讲故事"的状态发一组音："话说——那天——我——"。每个词组之间停顿 1 秒，感受"话说"时声音带着回忆感的低沉，"我"字发出时声音落在胸腔。整组重复 3 次，想象你在向一个朋友开始讲一件有趣的事。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 145,
        stability_min: 0.72,
      },
      scoringWeights: { depth: 0.55, stability: 0.35, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '讲故事的开头音色决定了对方愿不愿意继续听，低沉而有共鸣的开头最抓人。',
        '想象你在复述一件真实发生的事，而不是背台词，声音自然会带出叙述感。',
      ],
    },
    {
      id: 'track-a-day-06-ex-02',
      type: 'pace',
      title: '故事起伏节奏练习',
      instruction: '朗读这段有起伏的叙述，按照括号内提示调整语速："（正常速）本来只是普通的一天，（加快20%）然后突然，（停顿1秒）——，（慢下来）我发现了一件很奇怪的事。" 重复 3 遍，练习自如地控制语速起伏。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.65,
        pause_ratio_min: 0.20,
        stability_min: 0.65,
      },
      scoringWeights: { depth: 0.2, stability: 0.25, pace: 0.55 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '语速变化是制造悬念的工具：加速创造紧迫感，减速和停顿制造期待。',
        '关键信息之前的那个停顿是黄金时刻，停得越沉稳，对方越想听下去。',
      ],
    },
    {
      id: 'track-a-day-06-ex-03',
      type: 'scene-reading',
      title: '场景跟读：有意思的事的开头',
      instruction: '朗读下面这句故事开头，"上周"两字语速正常，"有件事"之后停顿 0.8 秒制造悬念，"特别好笑"四字稍微加速并带上一点笑意，但不要真的笑出来打断节奏。整句话要让听者产生"然后呢"的迫切感。',
      prompt: '上周发生了一件事，我现在想起来还是觉得特别好笑。',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 90,
        f0_max: 165,
        stability_min: 0.64,
        pace_score_min: 0.60,
        pause_ratio_min: 0.16,
      },
      scoringWeights: { depth: 0.35, stability: 0.28, pace: 0.37 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '一个好的故事开头会让对方主动问"什么事"，你的声音里要带着真实的回忆感。',
        '"好笑"不要用假笑的声音，而是用一种"忍住笑"的克制感，反而更有感染力。',
      ],
    },
  ],
  totalXP: 65,
}
