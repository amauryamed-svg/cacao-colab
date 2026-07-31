import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import type { Json } from "@cacao-colab/supabase-client/database.types"

const allowedEvents = new Set([
  "page_view",
  "onboarding_started",
  "onboarding_submitted",
  "account_registered",
  "microlearning_link_clicked",
  "mooc_link_clicked",
  "lesson_completed",
  "sponsor_interest",
  "knowledge_link_clicked",
  "ecoyuma_link_clicked",
  "benevolo_interest",
  "video_intro_played",
])

function clean(value: unknown, max = 180) {
  return typeof value === "string" ? value.slice(0, max) : null
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > 8_192) return NextResponse.json({ ok: false }, { status: 413 })

  const body = await request.json().catch(() => null)
  if (!body || !allowedEvents.has(body.event) || !clean(body.visitorId, 80) || !clean(body.sessionId, 80)) {
    return NextResponse.json({ ok: false, error: "evento inválido" }, { status: 400 })
  }

  try {
    const sessionClient = await createSupabaseServerClient()
    const { data: { user } } = await sessionClient.auth.getUser()
    const admin = createSupabaseAdminClient()
    const utms = body.utms && typeof body.utms === "object" ? body.utms : {}
    const metadata: Json = {
      source: clean(body.source, 80),
      referrer: clean(body.referrer, 300),
    }
    const { error } = await admin.from("analytics_events").insert({
      visitor_id: clean(body.visitorId, 80)!,
      session_id: clean(body.sessionId, 80)!,
      profile_id: user?.id ?? null,
      event_type: body.event,
      target: clean(body.target),
      pathname: clean(body.pathname),
      utm_source: clean(utms.utm_source, 100),
      utm_medium: clean(utms.utm_medium, 100),
      utm_campaign: clean(utms.utm_campaign, 100),
      metadata,
    })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch {
    // Analytics nunca bloquea navegación ni aprendizaje.
    return NextResponse.json({ ok: false, stored: false }, { status: 202 })
  }
}
