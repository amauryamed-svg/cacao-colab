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
import { isPerfectCareReady } from "@/lib/sembrar-care"
import { lessons } from "@/lib/lessons"
import { MICRO_COURSE_SLUG } from "@/lib/microlearning"
import { FOLLOWUP_SUBJECT, renderFollowupTemplate, type FollowupEmailKey } from "@/lib/followup-email-render"
import { FOLLOWUP_FROM, getResendClient } from "@/lib/resend"

/**
 * Propiedades personalizadas HubSpot (Settings → Properties → Contact).
 * Si aún no existen, el PATCH falla en silencio y no bloquea al learner.
 *
 * El portal comparte un límite de 10 propiedades custom con el resto del
 * ecosistema CAÚA (arquetipo/tarot, caua_completed_orders, etc.) — con 9 ya
 * ocupadas solo quedaba 1 slot libre para las 3 que faltaban
 * (genotype/phase/last_advice). Se consolidó genotype+phase en
 * `colab_sembrar_meta` (ver buildSembrarMeta) y se sacó last_advice del
 * sync a HubSpot — ningún email la usa como token `{{ }}`, y el texto
 * completo ya queda logueado en `crm_activities.metadata.advice`.
 */
export const HUBSPOT_COLAB_PROPS = {
  mdBalance: "colab_md_balance",
  mdLifetime: "colab_md_lifetime",
  rank: "colab_rank",
  microCompleted: "colab_micro_completed",
  sembrarStage: "colab_sembrar_stage",
  sembrarMeta: "colab_sembrar_meta",
} as const

const SEMBRAR_PHASE_LABEL: Record<SembrarSnapshot["phase"], string> = {
  none: "",
  cultivation: "cultivo",
  fermentation: "fermentación",
  complete: "cosecha",
}

function buildSembrarMeta(sembrar: SembrarSnapshot): string {
  const phaseLabel = SEMBRAR_PHASE_LABEL[sembrar.phase]
  const parts = [
    sembrar.genotypeCode,
    phaseLabel ? `fase ${phaseLabel}` : null,
    sembrar.perfectCareReady ? "cuidado perfecto" : null,
    sembrar.decadePlanComplete ? "plan 10 años" : null,
  ].filter(Boolean)
  return parts.join(" · ")
}

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
  const num = (key: string) => (typeof state[key] === "number" ? (state[key] as number) : 0)
  const perfectCareReady =
    phase === "cultivation"
      ? isPerfectCareReady({
          moisture: num("moisture"),
          health: num("health"),
          knowledge: num("knowledge"),
          nutrition: num("nutrition"),
          soilCover: num("soilCover"),
          biodiversity: num("biodiversity"),
          ageHours,
        })
      : phase === "fermentation" || phase === "complete"
        ? ageHours >= 100 &&
          num("moisture") >= 100 &&
          num("health") >= 100 &&
          num("knowledge") >= 100 &&
          num("nutrition") >= 100 &&
          num("soilCover") >= 100 &&
          num("biodiversity") >= 100
        : false
  const decadePlanComplete = state.decadePlanComplete === true
  if (phase === "none") return emptySembrarSnapshot()
  return {
    phase,
    stageName: phase === "fermentation" ? "Fermentación" : phase === "complete" ? "Cosecha fermentada" : stageNameFromAgeHours(ageHours),
    genotypeCode,
    ageHours,
    bitacoraCount,
    perfectCareReady,
    decadePlanComplete,
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
      [HUBSPOT_COLAB_PROPS.sembrarMeta]: buildSembrarMeta(snap.sembrar),
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

/**
 * Envío real del correo de seguimiento (día1/7/14) vía Resend. HubSpot
 * Workflows/correos automatizados están bloqueados por el plan del portal
 * (Marketing Hub Pro / Suite Starter) — esta función asume ese trabajo,
 * `syncLearnerFollowup` sigue siendo lo único que le escribe a HubSpot
 * (solo las props colab_*, nunca el envío en sí).
 *
 * Idempotente vía followup_email_log (constraint unique profile_id+email_key)
 * y respeta profiles.marketing_opt_in — nunca manda nurture sin consentimiento.
 */
export async function sendFollowupEmail(profileId: string, emailKey: FollowupEmailKey) {
  try {
    const admin = createSupabaseAdminClient()

    const { data: already } = await admin
      .from("followup_email_log")
      .select("id")
      .eq("profile_id", profileId)
      .eq("email_key", emailKey)
      .maybeSingle()
    if (already) return { ok: false as const, reason: "already_sent" }

    const { data: profile } = await admin
      .from("profiles")
      .select("email,full_name,marketing_opt_in")
      .eq("id", profileId)
      .maybeSingle()
    if (!profile?.email) return { ok: false as const, reason: "no_email" }
    if (!profile.marketing_opt_in) return { ok: false as const, reason: "no_consent" }

    const sync = await syncLearnerFollowup(profileId, `email:${emailKey}`)
    if (!sync.ok) return { ok: false as const, reason: sync.reason }

    const html = renderFollowupTemplate(emailKey, {
      firstname: profile.full_name?.split(/\s+/)[0] ?? "cacaotier",
      colab_md_lifetime: String(sync.snap.mdLifetime),
      colab_md_balance: String(sync.snap.mdBalance),
      colab_rank: sync.advice.rankName,
      colab_micro_completed: String(sync.snap.microCompleted),
      colab_sembrar_stage: sync.snap.sembrar.stageName,
      colab_sembrar_meta: buildSembrarMeta(sync.snap.sembrar),
    })

    const resend = getResendClient()
    const { data: sent, error } = await resend.emails.send({
      from: FOLLOWUP_FROM,
      to: profile.email,
      subject: FOLLOWUP_SUBJECT[emailKey],
      html,
    })
    if (error) return { ok: false as const, reason: `resend_error:${error.message}` }

    await admin.from("followup_email_log").insert({
      profile_id: profileId,
      email_key: emailKey,
      resend_id: sent?.id ?? null,
    })

    return { ok: true as const, resendId: sent?.id ?? null }
  } catch (err) {
    return { ok: false as const, reason: err instanceof Error ? err.message : "send_failed" }
  }
}
