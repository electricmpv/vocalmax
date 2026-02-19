import type { DayLesson } from '../schema'

export const trackADay05: DayLesson = {
  id: 'track-a-day-05',
  trackId: 'a',
  day: 5,
  title: '搭话场景',
  subtitle: '约会开场白的声音表达',
  exercises: [
    {
      id: 'track-a-day-05-ex-01',
      type: 'resonance',
      title: '微笑共鸣热身',
      instruction: '嘴角微微上扬（真实的微笑，不是表演），在这个状态下发"嗯——嘿——哈"三个音，感受嘴角上扬对声音音色的影响——声音会略微变亮但不失厚度。每组三音重复 4 次，保持表情自然放松。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 90,
        f0_max: 155,
        stability_min: 0.70,
      },
      scoringWeights: { depth: 0.45, stability: 0.4, pace: 0.15 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '微笑状态下的声音自带亲和力，对方即使只是听声音也能感受到你的表情。',
        '不要强迫自己"听起来开心"，真实的微笑状态会自然改变音色。',
      ],
    },
    {
      id: 'track-a-day-05-ex-02',
      type: 'stability',
      title: '开场白语气稳定训练',
      instruction: '练习发出"打招呼"语气的几个常用词："嘿"、"诶"、"哦"。每个词发音时音量适中，不过高也不过低，尾音干净收尾不拖沓。之后练习"哦，是吗"这个四字回应，保持音调平稳，显示出真实的兴趣而非表演。重复 4 次。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 90,
        f0_max: 150,
        stability_min: 0.72,
        loudness_target: -17,
      },
      scoringWeights: { depth: 0.35, stability: 0.5, pace: 0.15 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '打招呼词的音量很关键：太小显得不自信，太大显得突兀，目标是"刚好被听到"。',
        '"哦，是吗"的语气要真实，不是敷衍的"嗯嗯"，也不是夸张的"哇真的吗"。',
      ],
    },
    {
      id: 'track-a-day-05-ex-03',
      type: 'scene-reading',
      title: '场景跟读：约会开场白',
      instruction: '朗读下面这句约会开场白，"等了很久"之前自然停顿 0.5 秒，语调整体平稳但在"见到你"三字处有一个轻微的上扬，然后迅速落回平稳。整句话的节奏要给人"不急于证明什么"的感觉。',
      prompt: '今天出门前还有点紧张，不过见到你，感觉好多了。',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 90,
        f0_max: 160,
        stability_min: 0.66,
        pace_score_min: 0.58,
        pause_ratio_min: 0.14,
      },
      scoringWeights: { depth: 0.4, stability: 0.3, pace: 0.3 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '承认紧张是一种真实感，不是弱点，对方会因为你的真实而感到被重视。',
        '"好多了"结尾时嘴角可以带着微笑，声音里的温度会随之传递出去。',
      ],
    },
  ],
  totalXP: 65,
}
