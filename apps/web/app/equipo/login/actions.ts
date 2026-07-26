"use server";

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server";

export type MagicLinkResult = { ok: true } | { ok: false; error: string };

/**
 * Login real del portal /equipo — Supabase Auth, magic link (sin
 * password que gestionar). Solo funciona en cuanto exista el proyecto
 * Supabase real (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY) — hasta entonces
 * lanza un error claro en vez de fingir que envió el correo.
 *
 * No hay allowlist de emails a nivel de código: cualquiera puede pedir un
 * magic link, pero solo quien tenga una fila en `team_members` (Oscar,
 * Hellen, Amaury — ver supabase/seed.sql) va a poder resolver su nombre y
 * ver el panel de /equipo. Los demás simplemente no tienen fila que
 * mostrar (ver equipo/page.tsx).
 */
export async function requestMagicLink(formData: FormData): Promise<MagicLinkResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return { ok: false, error: "Ingresa un email válido." };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/equipo`,
      },
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Supabase no está configurado todavía (ver docs/00-SPEC.md, pendientes).",
    };
  }
}
