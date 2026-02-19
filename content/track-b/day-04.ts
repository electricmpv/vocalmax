import type { DayLesson } from '../schema'

export const trackBDay04: DayLesson = {
  id: 'track-b-day-04',
  trackId: 'b',
  day: 4,
  title: '压力下的稳定',
  subtitle: '不颤抖不急促，紧张时也能落地有声',
  exercises: [
    {
      id: 'track-b-day-04-ex-01',
      type: 'stability',
      title: '腹式呼吸锚定',
      instruction: '在开口说话前，先做 1 次"4-6 呼吸"：用 4 秒吸气，用 6 秒缓慢呼气。呼气时让腹部慢慢内收，不要靠胸部。完成呼吸后，用平稳的音量说出"我准备好了"，注意声音不要颤抖，音调保持水平。重复整个循环 3 次，感受每次开口前气息更稳。',
      durationSeconds: 10,
      targetMetrics: {
        stability_min: 0.82,
        f0_min: 85,
        f0_max: 150,
      },
      scoringWeights: { depth: 0.25, stability: 0.65, pace: 0.10 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '压力感来自交感神经激活，缓慢呼气能快速激活副交感神经，让声音平稳',
        '如果感到紧张，先悄悄做一次腹式呼吸，再开口——听众不会察觉这个停顿',
      ],
    },
    {
      id: 'track-b-day-04-ex-02',
      type: 'pace',
      title: '受压慢速表达',
      instruction: '想象现在有人在催你"快说、快说"，但你要刻意抵抗这种冲动。用比平时更慢 20% 的速度说出：1) 请给我一点时间，我需要把这件事说清楚。2) 这个问题，我来一步一步解释。说的时候注意：音量稳定，不加速，句末降调。停顿之间不要用"嗯、啊"填充。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.60,
        pause_ratio_min: 0.20,
        stability_min: 0.75,
      },
      scoringWeights: { depth: 0.15, stability: 0.40, pace: 0.45 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '在压力下慢下来，本身就是一种权威的展示——快速回应反而显得慌乱',
        '句间停顿用来思考，而不是填充"嗯/啊"；沉默 1 秒完全正常',
      ],
    },
    {
      id: 'track-b-day-04-ex-03',
      type: 'scene-reading',
      title: '压力场景立场表达跟读',
      instruction: '朗读下方句子，模拟在被人追问或质疑时保持冷静的场景。语速控制在平时的 75-80%，每个逗号停顿约 0.8 秒。"我的立场没有变"这几个字要音量稳定、语调降低，体现确定性。全程保持音调平稳，不因模拟紧张而出现颤音或音量忽大忽小。',
      prompt: '我听到了你的担忧，也明白时间紧迫。但即便如此，我的立场没有变：这个方案需要再评估一次，才能执行。我愿意承担这个决定的责任，也请给我们 48 小时的时间。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 155,
        stability_min: 0.78,
        pace_score_min: 0.62,
        pause_ratio_min: 0.20,
      },
      scoringWeights: { depth: 0.25, stability: 0.40, pace: 0.35 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '"我愿意承担责任"是权威感的核心——说这句话时要最慢、最稳',
        '练习时可以刻意想象被人催促的场景，训练在情绪激活状态下保持声音稳定',
      ],
    },
  ],
  totalXP: 65,
}
