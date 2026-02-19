import type { DayLesson } from '../schema'

export const trackADay03: DayLesson = {
  id: 'track-a-day-03',
  trackId: 'a',
  day: 3,
  title: '换气与停顿',
  subtitle: '自然呼吸节奏，让话语有空间感',
  exercises: [
    {
      id: 'track-a-day-03-ex-01',
      type: 'resonance',
      title: '腹式呼吸激活',
      instruction: '把一只手放在腹部肚脐上方，另一只手放在胸口。深吸气时感受腹部手向外鼓出，而胸口手几乎不动。吸气 4 秒，屏气 2 秒，呼气时发"嘶——"的摩擦音，维持 6 秒。共做 3 轮，每轮之间自然休息。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 80,
        f0_max: 130,
        stability_min: 0.78,
      },
      scoringWeights: { depth: 0.5, stability: 0.4, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '腹式呼吸是声音持久有力的基础，胸式呼吸会让声音发紧且气不够用。',
        '呼气时"嘶"声越均匀，说明气息控制越稳，这正是说话时气息的理想状态。',
      ],
    },
    {
      id: 'track-a-day-03-ex-02',
      type: 'pace',
      title: '停顿节奏感训练',
      instruction: '朗读下面这串词组，每个斜线处停顿 1 秒，感受停顿带来的节奏感："我想说的是 / 其实很简单 / 就是 / 你让我印象很深"。停顿时不要发任何声音，也不要急着补气，让停顿成为表达的一部分。重复 2 遍。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.60,
        pause_ratio_min: 0.20,
        stability_min: 0.65,
      },
      scoringWeights: { depth: 0.2, stability: 0.3, pace: 0.5 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '停顿不是尴尬，是给对方处理信息的时间，也是你从容自信的信号。',
        '每次停顿时，眼神可以轻松地看向对方，不要低头或左顾右盼。',
      ],
    },
    {
      id: 'track-a-day-03-ex-03',
      type: 'scene-reading',
      title: '场景跟读：展示松弛感',
      instruction: '朗读下面这句话，在逗号处停顿足足 1 秒，句末"嗯"字用鼻腔轻轻收尾，整句话的语速比平时慢约 20%。目标是让听者感受到你完全不着急。',
      prompt: '没事，慢慢来，我不赶时间。',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 85,
        f0_max: 145,
        stability_min: 0.68,
        pace_score_min: 0.58,
        pause_ratio_min: 0.18,
      },
      scoringWeights: { depth: 0.35, stability: 0.3, pace: 0.35 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '松弛感不是无所谓，是有底气的从容，声音里要带着温度而不是冷漠。',
        '"慢慢来"三字可以略微拉长，强化你不催促对方的信号。',
      ],
    },
  ],
  totalXP: 65,
}
