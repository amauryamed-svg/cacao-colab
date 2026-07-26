import { z } from "zod";

/**
 * Gamificación — mapeo desde el prototipo Python `amauryamed-svg/dualita`
 * (xp_bar, streak_counter, achievement_badge, leaderboard, curriculum_view).
 * Ver docs/09-GAMIFICACION.md para el detalle componente-por-componente de
 * qué se porta a React Native.
 */
export const learnerProgressSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  lessonId: z.string().uuid(),
  completedAt: z.string().datetime().nullable(),
  quizScore: z.number().min(0).max(1).nullable(),
  createdAt: z.string().datetime(),
});
export type LearnerProgress = z.infer<typeof learnerProgressSchema>;

/** Append-only, igual que commission_ledger — nunca se hace UPDATE. */
export const xpLedgerEntrySchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  amount: z.number().int(),
  reason: z.string().min(1),
  lessonId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
});
export type XpLedgerEntry = z.infer<typeof xpLedgerEntrySchema>;

export const streakSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  currentLength: z.number().int().nonnegative(),
  longestLength: z.number().int().nonnegative(),
  lastActivityDate: z.string().date(),
});
export type Streak = z.infer<typeof streakSchema>;

export const badgeSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  iconEmoji: z.string().min(1),
});
export type Badge = z.infer<typeof badgeSchema>;

export const profileBadgeSchema = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  badgeId: z.string().uuid(),
  earnedAt: z.string().datetime(),
});
export type ProfileBadge = z.infer<typeof profileBadgeSchema>;

/** Vista materializada (refresh semanal via pg_cron). No es tabla base. */
export const leaderboardWeeklyEntrySchema = z.object({
  profileId: z.string().uuid(),
  fullName: z.string().min(1),
  weekStart: z.string().date(),
  xpTotal: z.number().int().nonnegative(),
  rank: z.number().int().positive(),
});
export type LeaderboardWeeklyEntry = z.infer<typeof leaderboardWeeklyEntrySchema>;
