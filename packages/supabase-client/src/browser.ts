"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { requireSupabaseEnv } from "./env";

/**
 * Cliente Supabase de navegador (Client Components). Usar para acciones
 * que corren del lado del usuario, ej. escuchar cambios de sesión con
 * `onAuthStateChange`. El login en sí se hace vía Server Actions
 * (ver apps/web/app/equipo/login/actions.ts) para no exponer el flujo a JS
 * client-side innecesariamente.
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey);
}
