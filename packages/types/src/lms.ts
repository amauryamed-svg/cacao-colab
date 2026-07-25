import { z } from "zod";

/** Dualita = sistema dual: MOOC largo (Zurych) + microlearning corto gamificado (CAÚA Academy). */
export const courseTrack = z.enum(["mooc_zurych", "micro_caua"]);
export type CourseTrack = z.infer<typeof courseTrack>;

export const course = z.object({
  id: z.string().uuid(),
  track: courseTrack,
  slug: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  published: z.boolean().default(false),
});
export type Course = z.infer<typeof course>;

export const courseModule = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  title: z.string(),
  position: z.number().int().nonnegative(),
});
export type CourseModule = z.infer<typeof courseModule>;

export const lessonContentType = z.enum(["video", "text", "quiz"]);
export type LessonContentType = z.infer<typeof lessonContentType>;

export const lesson = z.object({
  id: z.string().uuid(),
  moduleId: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  contentType: lessonContentType,
  contentUrl: z.string().nullable(),
  bodyMdx: z.string().nullable(),
  xpReward: z.number().int().nonnegative().default(10),
  position: z.number().int().nonnegative(),
});
export type Lesson = z.infer<typeof lesson>;

export const quizQuestion = z.object({
  prompt: z.string(),
  options: z.array(z.string()).min(2),
  correctIndex: z.number().int().nonnegative(),
});
export type QuizQuestion = z.infer<typeof quizQuestion>;

export const quiz = z.object({
  id: z.string().uuid(),
  lessonId: z.string().uuid(),
  questions: z.array(quizQuestion),
  passingScorePct: z.number().int().min(0).max(100).default(70),
});
export type Quiz = z.infer<typeof quiz>;

export const quizAttempt = z.object({
  id: z.string().uuid(),
  quizId: z.string().uuid(),
  profileId: z.string().uuid(),
  scorePct: z.number().int().min(0).max(100),
  passed: z.boolean(),
  attemptedAt: z.string().datetime(),
});
export type QuizAttempt = z.infer<typeof quizAttempt>;
