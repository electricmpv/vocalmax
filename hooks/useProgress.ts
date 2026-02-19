"use client";

import { useProgressStore } from "../store/progress";
import { getLessonsByTrack, getLessonByTrackAndDay } from "../content";
import type { DayLesson } from "../content/schema";

export function useProgress() {
  const {
    selectedTrack,
    completedLessons,
    totalXP,
    streakDays,
    xpToday,
    selectTrack,
    completeLesson,
  } = useProgressStore();

  const trackLessons = getLessonsByTrack(selectedTrack);

  /** 当天最新可做的 day（1-7） */
  function getCurrentDay(): number {
    for (let day = 1; day <= 7; day++) {
      const lesson = getLessonByTrackAndDay(selectedTrack, day);
      if (!lesson) continue;
      const allDone = lesson.exercises.every((ex) =>
        completedLessons.includes(ex.id)
      );
      if (!allDone) return day;
    }
    return 7; // 全部完成，停留在第 7 天
  }

  /** 某天是否全部完成 */
  function isDayComplete(day: number): boolean {
    const lesson = getLessonByTrackAndDay(selectedTrack, day);
    if (!lesson) return false;
    return lesson.exercises.every((ex) => completedLessons.includes(ex.id));
  }

  /** 某关卡是否已完成 */
  function isExerciseDone(exerciseId: string): boolean {
    return completedLessons.includes(exerciseId);
  }

  const currentDay = getCurrentDay();
  const currentLesson: DayLesson | undefined = getLessonByTrackAndDay(
    selectedTrack,
    currentDay
  );

  return {
    selectedTrack,
    selectTrack,
    completeLesson,
    trackLessons,
    currentDay,
    currentLesson,
    totalXP,
    streakDays,
    xpToday,
    isDayComplete,
    isExerciseDone,
  };
}
