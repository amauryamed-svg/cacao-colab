"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"

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
  return error ? { ok: false, error: error.message } : { ok: true }
}
