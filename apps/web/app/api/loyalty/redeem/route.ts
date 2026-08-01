import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redeemBenefit } from "@/lib/loyalty-server"

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth_required" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const catalogItemId = typeof body?.catalogItemId === "string" ? body.catalogItemId : ""
  if (!catalogItemId) {
    return NextResponse.json({ ok: false, error: "catalogItemId_requerido" }, { status: 400 })
  }

  try {
    const result = await redeemBenefit({ profileId: user.id, catalogItemId })
    if (!result.ok) {
      const status =
        result.error === "saldo_insuficiente" || result.error === "rango_insuficiente"
          ? 402
          : result.error === "beneficio_no_encontrado"
            ? 404
            : 400
      return NextResponse.json(result, { status })
    }
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "redeem_failed"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
