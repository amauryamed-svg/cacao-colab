import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Callback del magic link de Supabase Auth. El link que llega al correo
 * apunta acá con `?code=...`; se intercambia por una sesión real y se
 * redirige al portal /equipo. Patrón estándar de `@supabase/ssr` para
 * Next.js App Router (PKCE flow).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/aprende";
  const allowedPrefixes = ["/equipo", "/aprende", "/campus", "/juega", "/cuenta"];
  const next = allowedPrefixes.some((prefix) => requestedNext.startsWith(prefix))
    ? requestedNext
    : "/aprende";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.rpc("claim_team_membership");
        const { data: teamMember } = await supabase
          .from("team_members")
          .select("id,access_level")
          .eq("user_id", user.id)
          .maybeSingle();
        if (teamMember?.access_level === "superadmin") {
          return NextResponse.redirect(`${origin}/equipo`);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  const errorPath = next.startsWith("/equipo") ? "/equipo/login" : "/cuenta/entrar";
  return NextResponse.redirect(`${origin}${errorPath}?error=auth_callback_failed`);
}
