import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { NextResponse, type NextRequest } from "next/server"
import { persistUserConsent } from "@/lib/legal/consent"

/**
 * Callback del magic link de Supabase Auth.
 * Soporta PKCE (`?code=`) y el fallback `token_hash` + `type` del email.
 * Google/Apple OAuth no están habilitados para registro público.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const tokenHash = searchParams.get("token_hash")
  const otpType = searchParams.get("type")
  const requestedNext = searchParams.get("next") ?? "/aprende"
  const allowedPrefixes = [
    "/equipo",
    "/aprende",
    "/campus",
    "/juega",
    "/sembrar",
    "/cuenta",
    "/benevolo",
    "/collaboratorio",
    "/rd",
    "/credencial",
  ]
  const next = allowedPrefixes.some((prefix) => requestedNext.startsWith(prefix))
    ? requestedNext
    : "/aprende"

  const supabase = await createSupabaseServerClient()
  let sessionOk = false

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    sessionOk = !error
  } else if (tokenHash && otpType) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: otpType as "email" | "magiclink" | "signup" | "invite" | "recovery" | "email_change",
    })
    sessionOk = !error
  }

  if (sessionOk) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await persistUserConsent(user.id, user.email ?? "", user.user_metadata as Record<string, unknown>)
      await supabase.rpc("claim_team_membership")
      const { data: teamMember } = await supabase
        .from("team_members")
        .select("id,access_level")
        .eq("user_id", user.id)
        .maybeSingle()
      if (teamMember?.access_level === "superadmin") {
        return NextResponse.redirect(`${origin}/equipo`)
      }
    }
    return NextResponse.redirect(`${origin}${next}`)
  }

  const errorPath = next.startsWith("/equipo") ? "/equipo/login" : "/cuenta/entrar"
  return NextResponse.redirect(
    `${origin}${errorPath}?error=auth_callback_failed&next=${encodeURIComponent(next)}`,
  )
}
