import "server-only"
import { NextResponse, type NextRequest } from "next/server"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { sendFollowupEmail } from "@/lib/followup-sync"
import type { FollowupEmailKey } from "@/lib/followup-email-render"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

const DAY_MS = 24 * 60 * 60 * 1000
const CHECKPOINTS: Array<{ key: FollowupEmailKey; ageMs: number }> = [
  { key: "day1", ageMs: 0 },
  { key: "day7", ageMs: 7 * DAY_MS },
  { key: "day14", ageMs: 14 * DAY_MS },
]

/**
 * Cron diario (ver vercel.json). Reemplaza el enroll+delay que hubiera hecho
 * un HubSpot Workflow — bloqueado por plan (Marketing Hub Pro/Suite Starter).
 * HubSpot solo recibe el sync de props colab_* (dentro de sendFollowupEmail
 * → syncLearnerFollowup), el envío del correo pasa por Resend.
 */
export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const admin = createSupabaseAdminClient()

  const [{ data: profiles, error: profilesError }, { data: sentRows, error: sentError }] = await Promise.all([
    admin.from("profiles").select("id,created_at").eq("marketing_opt_in", true),
    admin.from("followup_email_log").select("profile_id,email_key"),
  ])
  if (profilesError || sentError) {
    return NextResponse.json({ ok: false, error: (profilesError ?? sentError)?.message }, { status: 500 })
  }

  const alreadySent = new Set((sentRows ?? []).map((row) => `${row.profile_id}:${row.email_key}`))
  const now = Date.now()
  const results: Array<{ profileId: string; emailKey: FollowupEmailKey; ok: boolean; reason?: string }> = []

  for (const profile of profiles ?? []) {
    const ageMs = now - new Date(profile.created_at).getTime()
    for (const checkpoint of CHECKPOINTS) {
      if (ageMs < checkpoint.ageMs) continue
      if (alreadySent.has(`${profile.id}:${checkpoint.key}`)) continue

      const outcome = await sendFollowupEmail(profile.id, checkpoint.key)
      results.push({ profileId: profile.id, emailKey: checkpoint.key, ok: outcome.ok, reason: "reason" in outcome ? outcome.reason : undefined })
    }
  }

  return NextResponse.json({ ok: true, checked: profiles?.length ?? 0, sent: results.filter((r) => r.ok).length, results })
}
