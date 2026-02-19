import type { DayLesson } from '../schema'

export const trackADay01: DayLesson = {
  id: 'track-a-day-01',
  trackId: 'a',
  day: 1,
  title: '感受共鸣腔',
  subtitle: '找到胸腔共鸣，让声音有重量',
  exercises: [
    {
      id: 'track-a-day-01-ex-01',
      type: 'resonance',
      title: '胸腔"嗯"振动唤醒',
      instruction: '闭嘴，轻轻发"嗯——"的长音，持续约 5 秒。同时把手放在胸口，感受胸骨下方有没有轻微振动。如果感受到振动，说明胸腔共鸣已经激活。重复 3 次，每次之间自然呼吸一口气。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 145,
        stability_min: 0.72,
      },
      scoringWeights: { depth: 0.6, stability: 0.3, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '手放胸口不是摆姿势，是真实触碰感受振动，没有振动就把音调再压低一点。',
        '不要用力喊，声音越放松，胸腔共鸣越容易出现。',
      ],
      safetyNote: '若喉咙发紧或轻微刺痛，请立即停止并休息 30 秒，不要强撑。',
    },
    {
      id: 'track-a-day-01-ex-02',
      type: 'stability',
      title: '长音稳定保持',
      instruction: '深吸一口气，然后用"啊——"或"嗯——"发一个长音，目标维持 8 秒不断气、不抖动。发音时嘴巴微张，下巴放松，不要咬紧，感受声音像一条平稳的线拉出去。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 90,
        f0_max: 140,
        stability_min: 0.75,
        loudness_target: -18,
      },
      scoringWeights: { depth: 0.4, stability: 0.5, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '气不够用时不要憋气硬撑，自然收尾即可，重点是发音过程中没有明显颤抖。',
        '对着镜子练习能帮你观察到下巴是否在紧绷。',
      ],
    },
    {
      id: 'track-a-day-01-ex-03',
      type: 'scene-reading',
      title: '场景跟读：自我介绍',
      instruction: '用你刚才练出的胸腔共鸣音色来朗读下面这句话。语速放慢到平时的八成，每个词都发实，不要含混。结尾"你好"两字略微拉长，传递出从容感。',
      prompt: '我叫李明，很高兴认识你。',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 90,
        f0_max: 150,
        stability_min: 0.68,
        pace_score_min: 0.55,
        pause_ratio_min: 0.12,
      },
      scoringWeights: { depth: 0.45, stability: 0.3, pace: 0.25 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '说名字时略微放慢，让对方有时间记住，这是一种自信的表现。',
        '"很高兴认识你"不要说得太急，结尾可以自然停顿 0.5 秒再收声。',
      ],
    },
  ],
  totalXP: 65,
}
