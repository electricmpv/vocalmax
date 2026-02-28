export type QuizType = "dating" | "work";

export interface QuizSentence {
  id: string;
  type: QuizType;
  text: string;
  hint: string;
}

export const datingSentences: QuizSentence[] = [
  {
    id: "d0",
    type: "dating",
    text: "我觉得今晚的风很适合走走，你有兴趣吗？",
    hint: "放松，慢速，低沉",
  },
  {
    id: "d1",
    type: "dating",
    text: "你说的那个地方，我也很想去看看。",
    hint: "语气平稳，不用刻意",
  },
  {
    id: "d2",
    type: "dating",
    text: "等你有空的时候，我们可以一起吃个饭。",
    hint: "自然，停顿清晰",
  },
];

export const workSentences: QuizSentence[] = [
  {
    id: "w0",
    type: "work",
    text: "这个方案我研究过，有几点想跟大家同步一下。",
    hint: "沉稳，清晰，有节奏",
  },
  {
    id: "w1",
    type: "work",
    text: "我的判断是，现在推进这件事的时机是合适的。",
    hint: "自信，语速适中",
  },
  {
    id: "w2",
    type: "work",
    text: "关于这个问题，我有不同的看法，可以说一下吗？",
    hint: "坚定但不强势",
  },
];

export function getRandomSentence(
  type: QuizType
): { sentence: QuizSentence; index: number } {
  const pool = type === "dating" ? datingSentences : workSentences;
  const index = Math.floor(Math.random() * pool.length);
  return { sentence: pool[index], index };
}
