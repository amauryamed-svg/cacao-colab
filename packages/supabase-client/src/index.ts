import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * NUNCA usar la URL de conexión directa (puerto 5432) desde código serverless de apps/api o
 * apps/web — agota el pool de Postgres a este volumen de funciones. La URL pooleada de Supavisor
 * (puerto 6543, "transaction" mode) es la única que corresponde acá. La URL directa es solo para
 * migraciones desde supabase/migrations (CLI). Ver docs/06-ARQUITECTURA.md.
 */
let browserClient: SupabaseClient | undefined;

/** Cliente para Server Components / route handlers — usa la service role key, nunca la expongas al browser. */
export function createServiceClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY no configuradas");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

/** Cliente para browser/mobile — usa la anon key, respeta RLS. Singleton por proceso. */
export function createBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY no configuradas");
  }
  browserClient = createClient(url, anonKey);
  return browserClient;
}

export type { SupabaseClient };
