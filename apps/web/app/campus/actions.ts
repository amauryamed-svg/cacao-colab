"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"
import { architectMissions } from "@/lib/architect-course"
import { awardMazorcas } from "@/lib/loyalty-server"

type SaveResult = { ok: true } | { ok: false; error: string }

function toJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json
}

export async function saveArchitectProgress(state: unknown, xpTotal: number, complete = false): Promise<SaveResult> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "auth_required" }

  const { error } = await supabase.from("campus_progress").upsert(
    {
      profile_id: user.id,
      course_slug: "arquitecto-fermentacion",
      state: toJson(state),
      xp_total: Math.max(0, Math.min(700, Math.round(xpTotal))),
      completed_at: complete ? new Date().toISOString() : null,
    },
    { onConflict: "profile_id,course_slug" },
  )
  if (!error) {
    try {
      const parsed = state as { completed?: unknown }
      const completed = Array.isArray(parsed?.completed)
        ? parsed.completed.filter((slug): slug is string => typeof slug === "string")
        : []
      await Promise.all(completed.map((slug) => {
        const mission = architectMissions.find((item) => item.slug === slug)
        return mission
          ? awardMazorcas({
              profileId: user.id,
              amount: mission.xp,
              category: "learning",
              reasonCode: "campus_mission_complete",
              idempotencyKey: `campus:arquitecto-fermentacion:${slug}`,
              sourceType: "campus_mission",
              sourceId: slug,
            })
          : Promise.resolve({ awarded: 0 })
      }))
    } catch {
      // El progreso académico no falla si loyalty aún no está migrado.
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
          amount: 5,
          category: "care",
          reasonCode: "gotchi_care",
          idempotencyKey: `gotchi:care:${new Date().toISOString().slice(0, 10)}:${actions}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
          dailyCap: 50,
        })
      }
      if (parsed.phase === "complete") {
        await awardMazorcas({
          profileId: user.id,
          amount: 60,
          category: "care",
          reasonCode: "gotchi_harvest_fermented",
          idempotencyKey: `gotchi:complete:slot-1:${fermentationHour}`,
          sourceType: "gotchi_run",
          sourceId: "slot-1",
        })
      }
    } catch {
      // Cuidado y progreso siguen guardándose aunque loyalty esté pendiente.
    }
  }
  return error ? { ok: false, error: error.message } : { ok: true }
}
