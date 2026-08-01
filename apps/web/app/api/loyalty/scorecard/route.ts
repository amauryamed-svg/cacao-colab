import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { isoWeekPeriodKey } from "@/lib/loyalty"
import { previewScorecard, settleScorecard } from "@/lib/loyalty-server"

function cronAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim()
  if (!secret) return false
  const header = request.headers.get("authorization")
  return header === `Bearer ${secret}`
}

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth_required" }, { status: 401 })
  }

  const periodKey = request.nextUrl.searchParams.get("period") ?? isoWeekPeriodKey()
  try {
    const preview = await previewScorecard(user.id, periodKey)
    return NextResponse.json({ ok: true, preview })
  } catch (error) {
    const message = error instanceof Error ? error.message : "scorecard_failed"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}

/** Settle propio del learner, o batch cron con CRON_SECRET + profileId. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const periodKey = typeof body?.periodKey === "string" ? body.periodKey : isoWeekPeriodKey()

  if (cronAuthorized(request) && typeof body?.profileId === "string") {
    try {
      const result = await settleScorecard(body.profileId, periodKey)
      return NextResponse.json({ ok: true, ...result })
    } catch (error) {
      const message = error instanceof Error ? error.message : "scorecard_failed"
      return NextResponse.json({ ok: false, error: message }, { status: 500 })
    }
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth_required" }, { status: 401 })
  }

  try {
    const result = await settleScorecard(user.id, periodKey)
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    const message = error instanceof Error ? error.message : "scorecard_failed"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
