export const MICRO_COURSE_SLUG = "microlearning-caua"

export type RegisteredMicroProgress = {
  completedCount: number
  totalLessons: number
  xp: number
}

export type MicroLessonResult = {
  status: "guest" | "saved" | "unavailable"
  awarded: number
  balance: number | null
  completedCount: number
  totalLessons: number
}
