import { trackADay01 } from './track-a/day-01'
import { trackADay02 } from './track-a/day-02'
import { trackADay03 } from './track-a/day-03'
import { trackADay04 } from './track-a/day-04'
import { trackADay05 } from './track-a/day-05'
import { trackADay06 } from './track-a/day-06'
import { trackADay07 } from './track-a/day-07'

import { trackBDay01 } from './track-b/day-01'
import { trackBDay02 } from './track-b/day-02'
import { trackBDay03 } from './track-b/day-03'
import { trackBDay04 } from './track-b/day-04'
import { trackBDay05 } from './track-b/day-05'
import { trackBDay06 } from './track-b/day-06'
import { trackBDay07 } from './track-b/day-07'

import type { DayLesson, LessonExercise } from './schema'
import type { TrackId } from '../store/progress'

export type { DayLesson, LessonExercise }
export { trackADay01, trackADay02, trackADay03, trackADay04, trackADay05, trackADay06, trackADay07 }
export { trackBDay01, trackBDay02, trackBDay03, trackBDay04, trackBDay05, trackBDay06, trackBDay07 }

/** 所有课程（按 trackId + day 索引） */
export const ALL_LESSONS: DayLesson[] = [
  trackADay01, trackADay02, trackADay03, trackADay04, trackADay05, trackADay06, trackADay07,
  trackBDay01, trackBDay02, trackBDay03, trackBDay04, trackBDay05, trackBDay06, trackBDay07,
]

/** 按 ID 查找课程 */
export function getLessonById(id: string): DayLesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id)
}

/** 按关卡 ID 查找单个关卡 */
export function getExerciseById(exerciseId: string): LessonExercise | undefined {
  for (const lesson of ALL_LESSONS) {
    const ex = lesson.exercises.find((e) => e.id === exerciseId)
    if (ex) return ex
  }
  return undefined
}

/** 获取某赛道的所有课程（按 day 排序） */
export function getLessonsByTrack(trackId: TrackId): DayLesson[] {
  return ALL_LESSONS.filter((l) => l.trackId === trackId).sort((a, b) => a.day - b.day)
}

/** 获取某赛道某天的课程 */
export function getLessonByTrackAndDay(trackId: TrackId, day: number): DayLesson | undefined {
  return ALL_LESSONS.find((l) => l.trackId === trackId && l.day === day)
}
