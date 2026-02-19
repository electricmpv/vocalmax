import type { DayLesson } from '../schema'

export const trackBDay03: DayLesson = {
  id: 'track-b-day-03',
  trackId: 'b',
  day: 3,
  title: '提问与陈述语调',
  subtitle: '下行语调，让陈述听起来有分量',
  exercises: [
    {
      id: 'track-b-day-03-ex-01',
      type: 'resonance',
      title: '下行语调控制',
      instruction: '练习让音调在句尾自然降低。用"嗯——哼"做热身：先发高一些的"嗯"，然后平滑降到低一些的"哼"，感受音调从高到低的滑动。接着用同样的下行感说出"这件事我已经决定了"，确保最后一个字"了"的音调明显低于开头。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 80,
        f0_max: 150,
        stability_min: 0.70,
      },
      scoringWeights: { depth: 0.55, stability: 0.35, pace: 0.10 },
      passScore: 60,
      xpReward: 18,
      tips: [
        '下行语调传达确定性，上行语调传达疑问——陈述事实时务必降调结尾',
        '练习时可以用手势从高往低划一条线，帮助大脑建立音调下行的肌肉记忆',
      ],
    },
    {
      id: 'track-b-day-03-ex-02',
      type: 'stability',
      title: '陈述句平稳推进',
      instruction: '朗读以下短句，每句用平稳的语调说出，不要在句中出现不必要的音调起伏。重点：句子中间段保持音调水平，最后 2 个字执行下行落地。说完每句话后暂停 1 秒，再说下一句。练习句：1) 这是我们的核心策略。2) 数据支持这个判断。3) 团队已经准备好了。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 155,
        stability_min: 0.80,
        pace_score_min: 0.58,
      },
      scoringWeights: { depth: 0.30, stability: 0.55, pace: 0.15 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '句子中途如果音调忽高忽低，听起来会缺乏自信',
        '每句话说完之后的 1 秒停顿，让听众感受到你"说完了，等你反应"的掌控感',
      ],
    },
    {
      id: 'track-b-day-03-ex-03',
      type: 'scene-reading',
      title: '礼貌坚定表异议跟读',
      instruction: '朗读下方句子，整体语速放慢至平时的 80%。"我理解你的出发点"用平和语调，表示尊重；"但我的判断是"之后的内容要音量微增、音调稍降，传达坚定而不对抗的态度。句尾"这个方向"要降调收尾，不要变成疑问。',
      prompt: '我理解你的出发点，也认可你对效率的关注。但我的判断是，在没有验证数据之前，贸然扩大规模，风险是不可控的。我建议我们先做一个小规模测试，再讨论这个方向。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 160,
        stability_min: 0.73,
        pace_score_min: 0.60,
        pause_ratio_min: 0.18,
      },
      scoringWeights: { depth: 0.30, stability: 0.35, pace: 0.35 },
      passScore: 60,
      xpReward: 22,
      tips: [
        '表达异议时，先认可对方，再说"但"，这个顺序能大幅降低对抗感',
        '"风险是不可控的"这七个字是核心，说慢一点、降调，让它被记住',
      ],
    },
  ],
  totalXP: 60,
}
