import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { NextResponse, type NextRequest } from "next/server"
import { persistUserConsent } from "@/lib/legal/consent"

/**
 * Callback del magic link / OAuth de Supabase Auth (PKCE).
 * Tras sesión: claim team + persistir opt-in de privacidad si viene en metadata/cookie.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const requestedNext = searchParams.get("next") ?? "/aprende"
  const allowedPrefixes = [
    "/equipo",
    "/aprende",
    "/campus",
    "/juega",
    "/sembrar",
    "/cuenta",
    "/benevolo",
    "/rd",
    "/credencial",
    "/cuenta/consejo",
  ]
  const next = allowedPrefixes.some((prefix) => requestedNext.startsWith(prefix))
    ? requestedNext
    : "/aprende"

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
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
  }

  const errorPath = next.startsWith("/equipo") ? "/equipo/login" : "/cuenta/entrar"
  return NextResponse.redirect(`${origin}${errorPath}?error=auth_callback_failed`)
}
