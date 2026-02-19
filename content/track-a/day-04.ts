import type { DayLesson } from '../schema'

export const trackADay04: DayLesson = {
  id: 'track-a-day-04',
  trackId: 'a',
  day: 4,
  title: '节奏控制',
  subtitle: '语速与停顿的精准掌握',
  exercises: [
    {
      id: 'track-a-day-04-ex-01',
      type: 'resonance',
      title: '声音重心下沉练习',
      instruction: '用"嗯哼"做起始热身音，连续发 5 次，每次都感受声音的振动点在胸口而不是喉咙或鼻子。然后切换到"好的——"发音，把"好"字的尾音像往下拉一样收尾，而不是让它上扬。重复"好的"5 次。',
      durationSeconds: 10,
      targetMetrics: {
        f0_min: 85,
        f0_max: 140,
        stability_min: 0.74,
      },
      scoringWeights: { depth: 0.55, stability: 0.35, pace: 0.1 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '尾音下沉是权威感和自信的重要信号，上扬尾音容易显得不确定。',
        '"嗯哼"不用大声，轻轻的、带着胸腔振动的音量即可。',
      ],
    },
    {
      id: 'track-a-day-04-ex-02',
      type: 'pace',
      title: '变速朗读控制',
      instruction: '朗读同一句话两遍：第一遍正常语速，第二遍刻意放慢到正常的 70%，感受两者在表达效果上的差异。句子是："我一直觉得，值得期待的事情，不用急。"放慢版本中每个词组之间都留出约 0.8 秒的停顿。',
      durationSeconds: 10,
      targetMetrics: {
        pace_score_min: 0.62,
        pause_ratio_min: 0.22,
        stability_min: 0.68,
      },
      scoringWeights: { depth: 0.2, stability: 0.25, pace: 0.55 },
      passScore: 60,
      xpReward: 20,
      tips: [
        '对比练习能帮你建立语速"肌肉记忆"，知道慢下来是什么感觉。',
        '放慢不等于拖沓，元音要清晰饱满，辅音要干净利落。',
      ],
    },
    {
      id: 'track-a-day-04-ex-03',
      type: 'scene-reading',
      title: '场景跟读：轻松邀约',
      instruction: '朗读下面这句邀约话语，语速维持在放松的中慢速，"有没有兴趣"四字之前停顿半拍以制造期待感，结尾不要加上扬语气，保持平稳或略微下行，显示出你在提议而不是在祈求。',
      prompt: '最近发现一家很不错的咖啡馆，你有没有兴趣一起去看看？',
      durationSeconds: 8,
      targetMetrics: {
        f0_min: 88,
        f0_max: 155,
        stability_min: 0.66,
        pace_score_min: 0.60,
        pause_ratio_min: 0.15,
      },
      scoringWeights: { depth: 0.35, stability: 0.3, pace: 0.35 },
      passScore: 60,
      xpReward: 25,
      tips: [
        '邀约时声音里要有真实的期待，但不能有紧张感，想象你已经确定他会来。',
        '"很不错"可以适当加重，但不要夸张，给对方留下自己判断的空间。',
      ],
    },
  ],
  totalXP: 65,
}
