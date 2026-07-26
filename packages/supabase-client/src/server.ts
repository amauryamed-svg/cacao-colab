import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import { requireSupabaseEnv } from "./env";

/**
 * Cliente Supabase para Server Components / Server Actions / Route
 * Handlers. Lee y escribe la cookie de sesión vía `next/headers`.
 *
 * `cookies()` es async desde Next.js 15 — por eso este helper también lo
 * es. Llamar con `await createSupabaseServerClient()`.
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // `setAll` puede fallar si se llama desde un Server Component
          // puro (no Server Action/Route Handler). Es seguro ignorarlo si
          // hay middleware refrescando la sesión (ver middleware.ts) —
          // patrón estándar documentado por Supabase para Next.js App
          // Router.
        }
      },
    },
  });
}
