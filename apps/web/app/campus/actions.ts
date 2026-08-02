"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"
import { architectMissions } from "@/lib/architect-course"
import { CHOCOLATIER_COURSE_SLUG, chocolatierMissions, chocolatierTotalXp } from "@/lib/chocolatier-course"
import { CATADOR_COURSE_SLUG, catadorMissions, catadorTotalXp } from "@/lib/catador-course"
import { BENEVOLO_COURSE_SLUG, benevoloMissions, benevoloTotalXp } from "@/lib/benevolo-brand"
import { mazorcaRewards } from "@/lib/loyalty"
import { awardMazorcas } from "@/lib/loyalty-server"
import { syncLearnerFollowup } from "@/lib/followup-sync"
import { PERFECT_CARE_HOUR, isPerfectCareReady } from "@/lib/sembrar-care"

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

export async function saveCatadorProgress(
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
    course_slug: CATADOR_COURSE_SLUG,
    state: toJson(state),
    xp_total: Math.max(0, Math.min(catadorTotalXp, Math.round(xpTotal))),
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
        const mission = catadorMissions.find((item) => item.slug === slug)
        if (!mission) continue
        await awardLearningMissionMd({
          profileId: user.id,
          amount: mazorcaRewards.catadorMission,
          idempotencyKey: `campus:${CATADOR_COURSE_SLUG}:${slug}`,
          sourceId: slug,
          courseSlug: CATADOR_COURSE_SLUG,
        })
      }
      if (complete) {
        await awardLearningCourseMd({
          profileId: user.id,
          amount: mazorcaRewards.catadorCourseComplete,
          idempotencyKey: `campus:${CATADOR_COURSE_SLUG}:course`,
          courseSlug: CATADOR_COURSE_SLUG,
        })
      }
      void syncLearnerFollowup(user.id, "campus_mission")
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

  const parsedState = state as {
    actions?: unknown
    phase?: unknown
    fermentationHour?: unknown
    genotype?: unknown
    genotypeCode?: unknown
    plantedAt?: unknown
    ageHours?: unknown
    moisture?: unknown
    health?: unknown
    knowledge?: unknown
    nutrition?: unknown
    soilCover?: unknown
    biodiversity?: unknown
    decadePlanComplete?: unknown
  }
  const genotypeLabel =
    typeof parsedState.genotype === "string" && parsedState.genotype.trim()
      ? parsedState.genotype.trim().slice(0, 120)
      : typeof parsedState.genotypeCode === "string"
        ? parsedState.genotypeCode
        : "FEAR 5"
  const cycleKey =
    typeof parsedState.plantedAt === "string" && parsedState.plantedAt
      ? parsedState.plantedAt.slice(0, 19)
      : "default"

  const { error } = await supabase.from("gotchi_runs").upsert(
    {
      profile_id: user.id,
      slot: 1,
      selected_node: selectedNode,
      genotype: genotypeLabel,
      treatment,
      state: toJson(state),
      xp_total: Math.max(0, Math.round(xpTotal)),
    },
    { onConflict: "profile_id,slot" },
  )
  if (!error) {
    try {
      const actions =
        typeof parsedState.actions === "number" ? Math.max(0, Math.floor(parsedState.actions)) : 0
      const phase = parsedState.phase
      if (actions > 0 && phase === "cultivation") {
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
      // Cosecha: más MD al abrir lote y al cerrar fermentación (sin tope diario de cuidado).
      if (phase === "fermentation" || phase === "complete") {
        await awardMazorcas({
          profileId: user.id,
          amount: mazorcaRewards.gotchiHarvestOpen,
          category: "care",
          reasonCode: "gotchi_harvest_open",
          idempotencyKey: `gotchi:harvest-open:slot-1:${cycleKey}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
        })
        const ageHours = typeof parsedState.ageHours === "number" ? parsedState.ageHours : 0
        const metric = (key: keyof typeof parsedState) =>
          typeof parsedState[key] === "number" ? (parsedState[key] as number) : 0
        const perfect = isPerfectCareReady({
          ageHours,
          moisture: metric("moisture"),
          health: metric("health"),
          knowledge: metric("knowledge"),
          nutrition: metric("nutrition"),
          soilCover: metric("soilCover"),
          biodiversity: metric("biodiversity"),
        })
        if (perfect && ageHours >= PERFECT_CARE_HOUR) {
          await awardMazorcas({
            profileId: user.id,
            amount: mazorcaRewards.gotchiPerfectCare,
            category: "care",
            reasonCode: "gotchi_perfect_care",
            idempotencyKey: `gotchi:perfect-care:slot-1:${cycleKey}`,
            sourceType: "gotchi_run",
            sourceId: "slot-1",
          })
        }
      }
      if (phase === "complete") {
        await awardMazorcas({
          profileId: user.id,
          amount: mazorcaRewards.gotchiHarvest,
          category: "care",
          reasonCode: "gotchi_harvest_fermented",
          idempotencyKey: `gotchi:complete:slot-1:${cycleKey}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
        })
      }
      if (parsedState.decadePlanComplete === true) {
        await awardMazorcas({
          profileId: user.id,
          amount: mazorcaRewards.gotchiDecadePlan,
          category: "care",
          reasonCode: "gotchi_decade_plan",
          idempotencyKey: `gotchi:decade-plan:slot-1:${cycleKey}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
        })
      }
      void syncLearnerFollowup(user.id, "sembrar_save")
    } catch {
      // Cuidado y progreso siguen guardándose aunque loyalty esté pendiente.
    }
  }
  return error ? { ok: false, error: error.message } : { ok: true }
}
