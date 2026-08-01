import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./database.types";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * Refresca la cookie de sesión de Supabase en cada request que matchee el
 * middleware de apps/web (ver apps/web/middleware.ts, matcher scoped a
 * /equipo y /auth). Patrón estándar de `@supabase/ssr` para Next.js App
 * Router — sin esto, sesiones largas se cortan silenciosamente.
 *
 * Si Supabase no está configurado (Fase 0, sin proyecto real), no hace
 * nada y deja pasar el request — no debe romper el resto del sitio.
 */
export async function updateSupabaseSession(request: NextRequest) {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  let response = NextResponse.next({ request });

  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Importante: dispara la lectura/refresh de sesión. No usar getSession()
  // acá — getUser() valida el JWT contra Supabase Auth en vez de solo leer
  // la cookie (recomendación oficial de seguridad de Supabase SSR).
  //
  // Si esta llamada falla (red, timeout, hiccup transitorio de Supabase),
  // no debe tumbar el request completo — el middleware corre en /cuenta,
  // /campus, /aprende, /juega y /equipo, así que un error acá se traducía
  // en un 503 duro para cualquier página o Server Action bajo esas rutas
  // (ej. el submit de magic link en /cuenta/entrar).
  try {
    await supabase.auth.getUser();
  } catch {
    return response;
  }

  return response;
}
