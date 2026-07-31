"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"
import { lessons } from "@/lib/lessons"
import { mazorcaRewards } from "@/lib/loyalty"
import { awardMazorcas } from "@/lib/loyalty-server"
import { syncLearnerFollowup } from "@/lib/followup-sync"
import { MICRO_COURSE_SLUG, type MicroLessonResult } from "@/lib/microlearning"

export async function completeMicroLesson(slug: string): Promise<MicroLessonResult> {
  const lesson = lessons.find((item) => item.slug === slug)
  const base: MicroLessonResult = {
    status: "guest",
    awarded: 0,
    balance: null,
    completedCount: 0,
    totalLessons: lessons.length,
  }
  if (!lesson) return { ...base, status: "unavailable" }

  // Supabase puede no estar configurado (o la sesión puede fallar) sin que eso
  // rompa la lección: el módulo ya se completó del lado del learner.
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>
  let userId: string
  try {
    supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return base
    userId = user.id
  } catch {
    return { ...base, status: "unavailable" }
  }

  const { data: existing } = await supabase
    .from("campus_progress")
    .select("state")
    .eq("profile_id", userId)
    .eq("course_slug", MICRO_COURSE_SLUG)
    .maybeSingle()

  const previous = existing?.state as { completed?: unknown } | null
  const completed = new Set(
    Array.isArray(previous?.completed)
      ? previous.completed.filter((item): item is string => typeof item === "string")
      : [],
  )
  completed.add(lesson.slug)

  const completedSlugs = lessons.filter((item) => completed.has(item.slug)).map((item) => item.slug)
  const xpTotal = lessons
    .filter((item) => completed.has(item.slug))
    .reduce((total, item) => total + item.xp, 0)
  const allDone = completedSlugs.length === lessons.length

  const { error } = await supabase.from("campus_progress").upsert(
    {
      profile_id: userId,
      course_slug: MICRO_COURSE_SLUG,
      state: { completed: completedSlugs, lastSlug: lesson.slug } as Json,
      xp_total: xpTotal,
      completed_at: allDone ? new Date().toISOString() : null,
    },
    { onConflict: "profile_id,course_slug" },
  )
  if (error) return { ...base, status: "unavailable" }

  let awarded = 0
  let balance: number | null = null
  try {
    const result = await awardMazorcas({
      profileId: userId,
      amount: mazorcaRewards.microLesson,
      category: "learning",
      reasonCode: "lesson_completed",
      idempotencyKey: `micro:${lesson.slug}`,
      sourceType: "micro_lesson",
      sourceId: lesson.slug,
    })
    awarded = result.awarded
    const { data: wallet } = await supabase
      .from("mazorca_wallets")
      .select("balance")
      .eq("profile_id", userId)
      .maybeSingle()
    balance = wallet?.balance ?? null
  } catch {
    // El progreso se guarda aunque la migración de fidelidad no esté aplicada.
  }

  void syncLearnerFollowup(userId, `micro:${lesson.slug}`)

  return {
    status: "saved",
    awarded,
    balance,
    completedCount: completedSlugs.length,
    totalLessons: lessons.length,
  }
}
