// Barrel deliberadamente angosto: NO reexporta browser.ts/server.ts/
// middleware.ts juntos. server.ts importa "server-only" + next/headers;
// mezclarlo en un barrel que también toquen Client Components arriesga
// arrastrar código server-only al bundle del navegador. Importar cada uno
// desde su subpath explícito:
//   @cacao-colab/supabase-client/browser
//   @cacao-colab/supabase-client/server
//   @cacao-colab/supabase-client/middleware
export { getSupabaseUrl, getSupabaseAnonKey, requireSupabaseEnv } from "./env";
export type { Database } from "./database.types";
