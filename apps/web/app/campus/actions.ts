"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"
import { architectMissions } from "@/lib/architect-course"
import { CHOCOLATIER_COURSE_SLUG, chocolatierMissions, chocolatierTotalXp } from "@/lib/chocolatier-course"
import { BENEVOLO_COURSE_SLUG, benevoloMissions, benevoloTotalXp } from "@/lib/benevolo-brand"
import { mazorcaRewards } from "@/lib/loyalty"
import { awardMazorcas } from "@/lib/loyalty-server"
import { syncLearnerFollowup } from "@/lib/followup-sync"

type SaveResult = { ok: true } | { ok: false; error: string }

function toJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json
}

/** Awards secuenciales para respetar tope diario de learning. */
async function awardLearningMissionMd(input: {
  profileId: string
  amount: number
  idempotencyKey: string
  sourceId: string
  courseSlug: string
}) {
  return awardMazorcas({
    profileId: input.profileId,
    amount: input.amount,
    category: "learning",
    reasonCode: "campus_mission_complete",
    idempotencyKey: input.idempotencyKey,
    sourceType: "campus_mission",
    sourceId: input.sourceId,
    dailyCap: mazorcaRewards.learningDailyCap,
  })
}

async function awardLearningCourseMd(input: {
  profileId: string
  amount: number
  idempotencyKey: string
  courseSlug: string
}) {
  return awardMazorcas({
    profileId: input.profileId,
    amount: input.amount,
    category: "learning",
    reasonCode: "campus_course_complete",
    idempotencyKey: input.idempotencyKey,
    sourceType: "campus_course",
    sourceId: input.courseSlug,
    dailyCap: mazorcaRewards.learningDailyCap,
  })
}

export async function saveArchitectProgress(state: unknown, xpTotal: number, complete = false): Promise<SaveResult> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "auth_required" }

  const row: {
    profile_id: string
    course_slug: string
    state: Json
    xp_total: number
    completed_at?: string
  } = {
    profile_id: user.id,
    course_slug: "arquitecto-fermentacion",
    state: toJson(state),
    xp_total: Math.max(0, Math.min(700, Math.round(xpTotal))),
  }
  if (complete) row.completed_at = new Date().toISOString()

  const { error } = await supabase.from("campus_progress").upsert(row, {
    onConflict: "profile_id,course_slug",
  })
  if (!error) {
    try {
      const parsed = state as { completed?: unknown }
      const completed = Array.isArray(parsed?.completed)
        ? parsed.completed.filter((slug): slug is string => typeof slug === "string")
        : []
      for (const slug of completed) {
        const mission = architectMissions.find((item) => item.slug === slug)
        if (!mission) continue
        await awardLearningMissionMd({
          profileId: user.id,
          amount: mazorcaRewards.architectMission,
          idempotencyKey: `campus:arquitecto-fermentacion:${slug}`,
          sourceId: slug,
          courseSlug: "arquitecto-fermentacion",
        })
      }
      if (complete) {
        await awardLearningCourseMd({
          profileId: user.id,
          amount: mazorcaRewards.architectCourseComplete,
          idempotencyKey: "campus:arquitecto-fermentacion:course",
          courseSlug: "arquitecto-fermentacion",
        })
      }
    } catch {
      // El progreso académico no falla si loyalty aún no está migrado.
    }
  }
  return error ? { ok: false, error: error.message } : { ok: true }
}

export async function saveChocolatierProgress(
  state: unknown,
  xpTotal: number,
  complete = false,
): Promise<SaveResult> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "auth_required" }

  const row: {
    profile_id: string
    course_slug: string
    state: Json
    xp_total: number
    completed_at?: string
  } = {
    profile_id: user.id,
    course_slug: CHOCOLATIER_COURSE_SLUG,
    state: toJson(state),
    xp_total: Math.max(0, Math.min(chocolatierTotalXp, Math.round(xpTotal))),
  }
  if (complete) row.completed_at = new Date().toISOString()

  const { error } = await supabase.from("campus_progress").upsert(row, {
    onConflict: "profile_id,course_slug",
  })
  if (!error) {
    try {
      const parsed = state as { completed?: unknown }
      const completed = Array.isArray(parsed?.completed)
        ? parsed.completed.filter((slug): slug is string => typeof slug === "string")
        : []
      for (const slug of completed) {
        const mission = chocolatierMissions.find((item) => item.slug === slug)
        if (!mission) continue
        await awardLearningMissionMd({
          profileId: user.id,
          amount: mazorcaRewards.chocolatierMission,
          idempotencyKey: `campus:${CHOCOLATIER_COURSE_SLUG}:${slug}`,
          sourceId: slug,
          courseSlug: CHOCOLATIER_COURSE_SLUG,
        })
      }
      if (complete) {
        await awardLearningCourseMd({
          profileId: user.id,
          amount: mazorcaRewards.chocolatierCourseComplete,
          idempotencyKey: `campus:${CHOCOLATIER_COURSE_SLUG}:course`,
          courseSlug: CHOCOLATIER_COURSE_SLUG,
        })
      }
    } catch {
      // El progreso académico no falla si loyalty aún no está migrado.
    }
  }
  return error ? { ok: false, error: error.message } : { ok: true }
}

export async function saveBenevoloProgress(
  state: unknown,
  xpTotal: number,
  complete = false,
): Promise<SaveResult> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "auth_required" }

  const row: {
    profile_id: string
    course_slug: string
    state: Json
    xp_total: number
    completed_at?: string
  } = {
    profile_id: user.id,
    course_slug: BENEVOLO_COURSE_SLUG,
    state: toJson(state),
    xp_total: Math.max(0, Math.min(benevoloTotalXp, Math.round(xpTotal))),
  }
  if (complete) row.completed_at = new Date().toISOString()

  const { error } = await supabase.from("campus_progress").upsert(row, {
    onConflict: "profile_id,course_slug",
  })
  if (!error) {
    try {
      const parsed = state as { completed?: unknown }
      const completed = Array.isArray(parsed?.completed)
        ? parsed.completed.filter((slug): slug is string => typeof slug === "string")
        : []
      for (const slug of completed) {
        const mission = benevoloMissions.find((item) => item.slug === slug)
        if (!mission) continue
        await awardLearningMissionMd({
          profileId: user.id,
          amount: mazorcaRewards.benevoloMission,
          idempotencyKey: `campus:${BENEVOLO_COURSE_SLUG}:${slug}`,
          sourceId: slug,
          courseSlug: BENEVOLO_COURSE_SLUG,
        })
      }
      if (complete) {
        await awardLearningCourseMd({
          profileId: user.id,
          amount: mazorcaRewards.benevoloCourseComplete,
          idempotencyKey: `campus:${BENEVOLO_COURSE_SLUG}:course`,
          courseSlug: BENEVOLO_COURSE_SLUG,
        })
      }
    } catch {
      // loyalty opcional
    }
  }
  return error ? { ok: false, error: error.message } : { ok: true }
}

export async function saveGotchiRun(
  state: unknown,
  xpTotal: number,
  selectedNode: string | null,
  treatment: string | null,
): Promise<SaveResult> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "auth_required" }

  const { error } = await supabase.from("gotchi_runs").upsert(
    {
      profile_id: user.id,
      slot: 1,
      selected_node: selectedNode,
      genotype: "FEAR 5 · Trinitario comercial",
      treatment,
      state: toJson(state),
      xp_total: Math.max(0, Math.round(xpTotal)),
    },
    { onConflict: "profile_id,slot" },
  )
  if (!error) {
    try {
      const parsed = state as { actions?: unknown; phase?: unknown; fermentationHour?: unknown }
      const actions = typeof parsed.actions === "number" ? Math.max(0, Math.floor(parsed.actions)) : 0
      const fermentationHour = typeof parsed.fermentationHour === "number" ? parsed.fermentationHour : 0
      if (actions > 0) {
        await awardMazorcas({
          profileId: user.id,
          amount: mazorcaRewards.gotchiCare,
          category: "care",
          reasonCode: "gotchi_care",
          idempotencyKey: `gotchi:care:${new Date().toISOString().slice(0, 10)}:${actions}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
          dailyCap: mazorcaRewards.gotchiCareDailyCap,
        })
      }
      if (parsed.phase === "complete") {
        await awardMazorcas({
          profileId: user.id,
          amount: mazorcaRewards.gotchiHarvest,
          category: "care",
          reasonCode: "gotchi_harvest_fermented",
          idempotencyKey: `gotchi:complete:slot-1:${fermentationHour}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
          dailyCap: mazorcaRewards.gotchiCareDailyCap,
        })
      }
      void syncLearnerFollowup(user.id, "sembrar_save")
    } catch {
      // Cuidado y progreso siguen guardándose aunque loyalty esté pendiente.
    }
  }
  return error ? { ok: false, error: error.message } : { ok: true }
}
