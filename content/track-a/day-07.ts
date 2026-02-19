import type { DayLesson } from '../schema'

export const trackADay07: DayLesson = {
  id: 'track-a-day-07',
  trackId: 'a',
  day: 7,
  title: '综合测验',
  subtitle: '全维度评估：共鸣、稳定、节奏一次检验',
  exercises: [
    {
      id: 'track-a-day-07-ex-01',
      type: 'resonance',
      title: '全频段共鸣综合热身',
      instruction: '依次发出三个音区的共鸣：先用胸腔发低沉的"嗯——"3 秒，再用中音区发"啊——"3 秒，最后用略高的音区发"诶——"2 秒。三个音之间无缝衔接，感受共鸣从胸腔到头腔的转移过程。整组重复 2 次，检验你这 7 天的共鸣控制能力。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 160,
        stability_min: 0.76,
      },
      scoringWeights: { depth: 0.55, stability: 0.35, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '如果三段音都能保持稳定且有共鸣，说明你的声道控制已经有了明显进步。',
        '切换音区时不要有明显的"跳动"感，要像调音量旋钮一样平滑过渡。',
      ],
    },
    {
      id: 'track-a-day-07-ex-02',
      type: 'stability',
      title: '综合稳定性测试',
      instruction: '发一个持续 8 秒的"啊——"音，要求：全程音调波动不超过半音，音量保持一致，第 4 秒时有意识地检查自己的下巴是否还是放松的。这是对这 7 天练习成果的直接测试，尽力保持到最后一刻。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 88,
        f0_max: 145,
        stability_min: 0.80,
        loudness_target: -18,
      },
      scoringWeights: { depth: 0.4, stability: 0.5, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '8 秒稳定长音能直接反映你的气息支撑能力，是声音训练的核心指标。',
        '如果中途气不足，下次练习可以从腹式呼吸开始加强，不要用喉咙硬撑。',
      ],
    },
    {
      id: 'track-a-day-07-ex-03',
      type: 'scene-reading',
      title: '场景跟读：自然结束一段对话',
      instruction: '朗读下面这句话，综合运用这 7 天学到的所有技巧：胸腔共鸣保持音色厚度，"今天"之后停顿 0.5 秒，语速整体舒缓，尾音"再联系"三字用下行音调收尾，让对方感受到你的从容和期待感并存，而不是匆忙道别。',
      prompt: '今天很开心，下次有机会再约，保持联系。',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 88,
        f0_max: 155,
        stability_min: 0.70,
        pace_score_min: 0.62,
        pause_ratio_min: 0.15,
      },
      scoringWeights: { depth: 0.38, stability: 0.32, pace: 0.3 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '结束一段对话时声音的状态决定了对方对整次见面的最终印象。',
        '"保持联系"四字要说得真实而有分量，不是客套话，是真正的期待信号。',
      ],
    },
  ],
  totalXP: 65,
}
