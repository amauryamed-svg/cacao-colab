import { updateSupabaseSession } from "@cacao-colab/supabase-client/middleware"
import type { NextRequest } from "next/server"

/**
 * Refresca Supabase Auth en el portal interno y el campus registrado.
 * Next.js 16 renombró la convención `middleware` a `proxy`.
 */
export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request)
}

export const config = {
  matcher: ["/equipo/:path*", "/auth/:path*", "/cuenta/:path*", "/campus/:path*", "/juega/:path*", "/aprende/:path*"],
}
