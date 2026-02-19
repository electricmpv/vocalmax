import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TrackId = "a" | "b";

export interface ProgressState {
  // 用户选择的赛道
  selectedTrack: TrackId;
  // 已完成的关卡 ID 集合
  completedLessons: string[];
  // XP
  totalXP: number;
  // Streak
  streakDays: number;
  lastTrainedDate: string | null; // ISO date string (YYYY-MM-DD)
  // 今日 XP
  xpToday: number;
  todayDate: string | null;

  // Actions
  selectTrack: (track: TrackId) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  resetStreak: () => void;
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      selectedTrack: "a",
      completedLessons: [],
      totalXP: 0,
      streakDays: 0,
      lastTrainedDate: null,
      xpToday: 0,
      todayDate: null,

      selectTrack: (track) => set({ selectedTrack: track }),

      completeLesson: (lessonId, xpReward) => {
        const state = get();
        const today = getTodayStr();

        // 计算 streak
        let newStreak = state.streakDays;
        let newXpToday = state.xpToday;

        if (state.todayDate !== today) {
          // 新的一天
          newXpToday = 0;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().slice(0, 10);

          if (state.lastTrainedDate === yesterdayStr) {
            newStreak = state.streakDays + 1;
          } else if (state.lastTrainedDate === today) {
            // 同一天多次，不变
          } else {
            newStreak = 1; // 断了，重新开始
          }
        }

        // 避免重复完成
        const alreadyDone = state.completedLessons.includes(lessonId);
        const xpGain = alreadyDone ? 0 : xpReward;

        set({
          completedLessons: alreadyDone
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
          totalXP: state.totalXP + xpGain,
          xpToday: newXpToday + xpGain,
          streakDays: newStreak,
          lastTrainedDate: today,
          todayDate: today,
        });
      },

      resetStreak: () => set({ streakDays: 0 }),
    }),
    {
      name: "vocalmax-progress",
      // 仅持久化必要字段
      partialize: (state) => ({
        selectedTrack: state.selectedTrack,
        completedLessons: state.completedLessons,
        totalXP: state.totalXP,
        streakDays: state.streakDays,
        lastTrainedDate: state.lastTrainedDate,
        xpToday: state.xpToday,
        todayDate: state.todayDate,
      }),
    }
  )
);
