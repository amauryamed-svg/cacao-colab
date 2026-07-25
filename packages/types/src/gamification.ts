import { z } from "zod";

export const progressStatus = z.enum(["not_started", "in_progress", "completed"]);
export type ProgressStatus = z.infer<typeof progressStatus>;

export const learnerProgress = z.object({
  profileId: z.string().uuid(),
  lessonId: z.string().uuid(),
  status: progressStatus,
  completedAt: z.string().datetime().nullable(),
});
export type LearnerProgress = z.infer<typeof learnerProgress>;

/** Append-only. El total de XP de un profile es SUM(amount), nunca un contador mutable — evita race conditions. */
export const xpLedgerEntry = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  amount: z.number().int(),
  reason: z.enum(["lesson_completed", "quiz_passed", "streak_bonus", "listing_published", "order_completed", "manual_adjustment"]),
  refId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});
export type XpLedgerEntry = z.infer<typeof xpLedgerEntry>;

export const streak = z.object({
  profileId: z.string().uuid(),
  currentStreak: z.number().int().nonnegative(),
  longestStreak: z.number().int().nonnegative(),
  lastActivityDate: z.string().date().nullable(),
});
export type Streak = z.infer<typeof streak>;

export const badge = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  iconUrl: z.string().nullable(),
});
export type Badge = z.infer<typeof badge>;

export const profileBadge = z.object({
  profileId: z.string().uuid(),
  badgeId: z.string().uuid(),
  earnedAt: z.string().datetime(),
});
export type ProfileBadge = z.infer<typeof profileBadge>;

/** Refrescada por pg_cron sobre xp_ledger, no una tabla mutable. Ver docs/06-ARQUITECTURA.md. */
export const leaderboardEntry = z.object({
  profileId: z.string().uuid(),
  displayName: z.string(),
  totalXp: z.number().int().nonnegative(),
  rank: z.number().int().positive(),
  period: z.enum(["weekly", "all_time"]),
});
export type LeaderboardEntry = z.infer<typeof leaderboardEntry>;
