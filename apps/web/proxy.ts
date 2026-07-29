import { updateSupabaseSession } from "@cacao-colab/supabase-client/middleware"
import type { NextRequest } from "next/server"

/**
 * Refresca Supabase Auth únicamente en el portal interno y su callback.
 * Next.js 16 renombró la convención `middleware` a `proxy`.
 */
export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request)
}

export const config = {
  matcher: ["/equipo/:path*", "/auth/:path*"],
}
