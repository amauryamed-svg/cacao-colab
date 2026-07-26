/**
 * Lectura centralizada de env vars de Supabase. Deliberadamente NO lanza
 * en import time — el foundation build (Fase 0) debe compilar y renderizar
 * páginas estáticas/marketing sin que exista el proyecto Supabase todavía.
 * Las funciones que sí necesitan una sesión real (login, /equipo) fallan
 * en runtime con un mensaje claro si faltan las env vars.
 */
export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabaseAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function requireSupabaseEnv(): { url: string; anonKey: string } {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    throw new Error(
      "Supabase no está configurado todavía: faltan NEXT_PUBLIC_SUPABASE_URL " +
        "y/o NEXT_PUBLIC_SUPABASE_ANON_KEY. El proyecto Supabase real está " +
        "pendiente de `supabase login` — ver docs/00-SPEC.md 'Pendientes'.",
    );
  }
  return { url, anonKey };
}
