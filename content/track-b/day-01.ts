import type { DayLesson } from '../schema'

export const trackBDay01: DayLesson = {
  id: 'track-b-day-01',
  trackId: 'b',
  day: 1,
  title: '权威音色基础',
  subtitle: '低沉稳定，奠定职场声音底色',
  exercises: [
    {
      id: 'track-b-day-01-ex-01',
      type: 'resonance',
      title: '胸腔共鸣激活',
      instruction: '双脚与肩同宽站立，挺胸收腹。深吸气，呼气时发出低沉的"嗯——"声，感受胸骨处的振动。保持音调在你自然音域的偏低区间，持续发声，不要刻意压低喉咙。重复练习，每次发声前先停顿 1 秒再开口。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 145,
        stability_min: 0.75,
      },
      scoringWeights: { depth: 0.6, stability: 0.3, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '将一只手放在胸口，感受共鸣振动，而非喉部紧绷',
        '不要强迫压低音调，胸腔共鸣来自放松，而非用力',
      ],
      safetyNote: '练习前请充分饮水；若感到喉部疼痛或不适，立即停止并休息。',
    },
    {
      id: 'track-b-day-01-ex-02',
      type: 'stability',
      title: '音调持稳训练',
      instruction: '用胸声区发一个长音"啊——"，目标是在整个发声过程中音调保持平稳，不颤抖、不上扬、不下滑。发声时保持下巴微微放松，牙关不要咬紧。每次发声持续约 5 秒，中间停顿 2 秒后再发下一次。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 145,
        stability_min: 0.80,
      },
      scoringWeights: { depth: 0.35, stability: 0.55, pace: 0.10 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '想象声音像一根水平的线，不起伏、不断裂',
        '肩膀放松下沉，避免耸肩导致气息不稳',
      ],
    },
    {
      id: 'track-b-day-01-ex-03',
      type: 'scene-reading',
      title: '会议开场白跟读',
      instruction: '朗读下方会议开场白，语速放慢至平常说话的 80%。在每个逗号处停顿约 0.5 秒，句号处停顿约 1 秒。保持音调低沉稳定，结尾不要上扬，让声音落下来，给人"已准备好，一切尽在掌握"的感觉。',
      prompt: '大家好，我是张明，负责本季度的产品规划。今天的会议，我们将回顾上月进展，并确认下一阶段的优先级。请大家先静一下，我们准时开始。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 155,
        stability_min: 0.72,
        pace_score_min: 0.60,
        pause_ratio_min: 0.18,
      },
      scoringWeights: { depth: 0.35, stability: 0.35, pace: 0.30 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '句尾"开始"两字要降调收尾，避免疑问式上扬',
        '逗号停顿给听众留出思考空间，也体现你不慌不忙的节奏感',
      ],
    },
  ],
  totalXP: 65,
}
