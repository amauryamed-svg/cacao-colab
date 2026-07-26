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
  const next = searchParams.get("next") ?? "/equipo";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/equipo/login?error=auth_callback_failed`);
}
