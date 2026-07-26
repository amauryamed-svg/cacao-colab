import { updateSupabaseSession } from "@cacao-colab/supabase-client/middleware";
import type { NextRequest } from "next/server";

/**
 * Refresca la sesión de Supabase Auth solo en las rutas del portal
 * interno (/equipo) y el callback de auth. El resto del sitio (marketing,
 * marketplace, aprende) no necesita sesión y no paga el costo de este
 * middleware — importante para mantener el ISR/edge cache agresivo del
 * blog (ver docs/06-ARQUITECTURA.md).
 */
export async function middleware(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/equipo/:path*", "/auth/:path*"],
};
