import { z } from "zod";

/**
 * `courses` → `modules` → `lessons` → `quizzes`. Reemplaza
 * `lib/dualita.ts` (moocModules/microModules) y `lib/lessons.ts` de
 * apps/web Spec v1. Ver docs/09-GAMIFICACION.md para el mapeo de XP/badges
 * y docs/10-DUALITA-IA.md para el companion.
 */
export const courseTrackSchema = z.enum(["mooc", "micro"]);
export type CourseTrack = z.infer<typeof courseTrackSchema>;

export const courseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  track: courseTrackSchema,
  ownerOrganizationId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});
export type Course = z.infer<typeof courseSchema>;

export const moduleSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  number: z.number().int().positive(),
  title: z.string().min(1),
  durationLabel: z.string().min(1),
  sortOrder: z.number().int().nonnegative().default(0),
});
export type LmsModule = z.infer<typeof moduleSchema>;

export const lessonSchema = z.object({
  id: z.string().uuid(),
  moduleId: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  emoji: z.string().nullable(),
  xp: z.number().int().nonnegative(),
  companionIntro: z.string().min(1),
  companionMid: z.string().min(1),
  companionQuiz: z.string().min(1),
  companionComplete: z.string().min(1),
  companionTips: z.array(z.string()).default([]),
  bodyMdx: z.string().min(1),
});
export type Lesson = z.infer<typeof lessonSchema>;

export const quizOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  correct: z.boolean(),
  explanation: z.string().min(1),
});
export type QuizOption = z.infer<typeof quizOptionSchema>;

export const quizSchema = z.object({
  id: z.string().uuid(),
  lessonId: z.string().uuid(),
  question: z.string().min(1),
  options: z.array(quizOptionSchema).min(2),
});
export type Quiz = z.infer<typeof quizSchema>;
