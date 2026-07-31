import "server-only"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { upsertContactByEmail } from "@cacao-colab/hubspot-client"
import {
  adviceToPlainText,
  buildFollowupAdvice,
  emptySembrarSnapshot,
  stageNameFromAgeHours,
  type LearnerFollowupSnapshot,
  type SembrarSnapshot,
} from "@/lib/followup-advice"
import { lessons } from "@/lib/lessons"
import { MICRO_COURSE_SLUG } from "@/lib/microlearning"

/**
 * Propiedades personalizadas HubSpot (crear en Settings → Properties).
 * Si aún no existen, el PATCH falla en silencio y no bloquea al learner.
 */
export const HUBSPOT_COLAB_PROPS = {
  mdBalance: "colab_md_balance",
  mdLifetime: "colab_md_lifetime",
  rank: "colab_rank",
  microCompleted: "colab_micro_completed",
  sembrarStage: "colab_sembrar_stage",
  sembrarGenotype: "colab_sembrar_genotype",
  sembrarPhase: "colab_sembrar_phase",
  lastAdvice: "colab_last_advice",
} as const

function parseSembrarState(raw: unknown): SembrarSnapshot {
  if (!raw || typeof raw !== "object") return emptySembrarSnapshot()
  const state = raw as Record<string, unknown>
  const phase =
    state.phase === "cultivation" || state.phase === "fermentation" || state.phase === "complete"
      ? state.phase
      : "none"
  const ageHours = typeof state.ageHours === "number" ? state.ageHours : 0
  const genotypeCode = typeof state.genotypeCode === "string" ? state.genotypeCode : null
  const bitacoraCount = Array.isArray(state.bitacora) ? state.bitacora.length : 0
  if (phase === "none") return emptySembrarSnapshot()
  return {
    phase,
    stageName: phase === "fermentation" ? "Fermentación" : phase === "complete" ? "Cosecha fermentada" : stageNameFromAgeHours(ageHours),
    genotypeCode,
    ageHours,
    bitacoraCount,
  }
}

export async function loadLearnerFollowupSnapshot(profileId: string): Promise<LearnerFollowupSnapshot | null> {
  try {
    const admin = createSupabaseAdminClient()
    const [{ data: profile }, { data: wallet }, { data: micro }, { data: gotchi }] = await Promise.all([
      admin.from("profiles").select("full_name,email").eq("id", profileId).maybeSingle(),
      admin.from("mazorca_wallets").select("balance,lifetime_earned").eq("profile_id", profileId).maybeSingle(),
      admin
        .from("campus_progress")
        .select("state")
        .eq("profile_id", profileId)
        .eq("course_slug", MICRO_COURSE_SLUG)
        .maybeSingle(),
      admin.from("gotchi_runs").select("state").eq("profile_id", profileId).eq("slot", 1).maybeSingle(),
    ])

    const microState = micro?.state as { completed?: unknown; lastSlug?: unknown } | null
    const completed = Array.isArray(microState?.completed)
      ? microState.completed.filter((item): item is string => typeof item === "string")
      : []
    const firstName =
      typeof profile?.full_name === "string" ? profile.full_name.split(/\s+/)[0] : null

    return {
      firstName,
      mdBalance: wallet?.balance ?? 0,
      mdLifetime: wallet?.lifetime_earned ?? 0,
      microCompleted: completed.length,
      microTotal: lessons.length,
      lastLessonSlug: typeof microState?.lastSlug === "string" ? microState.lastSlug : null,
      sembrar: parseSembrarState(gotchi?.state),
    }
  } catch {
    return null
  }
}

/**
 * Tras un avance (MD / lección / Sembrar): genera consejo, anota CRM y
 * sincroniza props HubSpot. Nunca lanza — el aprendizaje no se bloquea.
 */
export async function syncLearnerFollowup(profileId: string, trigger: string) {
  try {
    const admin = createSupabaseAdminClient()
    const snap = await loadLearnerFollowupSnapshot(profileId)
    if (!snap) return { ok: false as const, reason: "no_snapshot" }

    const advice = buildFollowupAdvice(snap)
    const plain = adviceToPlainText(advice)

    const { data: profile } = await admin.from("profiles").select("email,full_name").eq("id", profileId).maybeSingle()
    const email = profile?.email
    if (!email) return { ok: false as const, reason: "no_email" }

    const { data: contact } = await admin
      .from("crm_contacts")
      .select("id,hubspot_contact_id")
      .eq("email", email)
      .maybeSingle()

    if (contact?.id) {
      await admin.from("crm_activities").insert({
        crm_contact_id: contact.id,
        type: "note",
        metadata: {
          kind: "followup_advice",
          trigger,
          subject: advice.emailSubject,
          mdLifetime: snap.mdLifetime,
          mdBalance: snap.mdBalance,
          rank: advice.rankName,
          microCompleted: snap.microCompleted,
          sembrarStage: snap.sembrar.stageName,
          sembrarPhase: snap.sembrar.phase,
          advice: plain,
        },
      })
      await admin.from("crm_contacts").update({ profile_id: profileId }).eq("id", contact.id)
    }

    const props: Record<string, string> = {
      email,
      [HUBSPOT_COLAB_PROPS.mdBalance]: String(snap.mdBalance),
      [HUBSPOT_COLAB_PROPS.mdLifetime]: String(snap.mdLifetime),
      [HUBSPOT_COLAB_PROPS.rank]: advice.rankName,
      [HUBSPOT_COLAB_PROPS.microCompleted]: String(snap.microCompleted),
      [HUBSPOT_COLAB_PROPS.sembrarStage]: snap.sembrar.stageName,
      [HUBSPOT_COLAB_PROPS.sembrarPhase]: snap.sembrar.phase,
      [HUBSPOT_COLAB_PROPS.sembrarGenotype]: snap.sembrar.genotypeCode ?? "",
      [HUBSPOT_COLAB_PROPS.lastAdvice]: plain.slice(0, 65000),
    }
    if (profile?.full_name) props.firstname = profile.full_name.split(/\s+/)[0] ?? ""

    try {
      await upsertContactByEmail(props)
    } catch {
      // Props custom pueden no existir aún en HubSpot.
    }

    return { ok: true as const, advice, snap }
  } catch {
    return { ok: false as const, reason: "sync_failed" }
  }
}
