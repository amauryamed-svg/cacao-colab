import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { mdBuyPacks } from "@/lib/loyalty"
import { createPackIntent } from "@/lib/loyalty-server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    packs: mdBuyPacks,
    checkout: "pending_stripe",
    note: "Los packs acreditan MD tras pago verificado y no suman al rango (lifetime).",
  })
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth_required" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const packSlug = typeof body?.packSlug === "string" ? body.packSlug : ""
  if (!packSlug) {
    return NextResponse.json({ ok: false, error: "packSlug_requerido" }, { status: 400 })
  }

  try {
    const result = await createPackIntent(user.id, packSlug)
    if (!result.ok) {
      return NextResponse.json(result, { status: result.error === "pack_desconocido" ? 404 : 503 })
    }
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "pack_failed"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
