import "server-only"
import type { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"

type ServerClient = Awaited<ReturnType<typeof createSupabaseServerClient>>

export async function isSuperadminUser(supabase: ServerClient, userId: string) {
  await supabase.rpc("claim_team_membership")
  const { data } = await supabase
    .from("team_members")
    .select("access_level")
    .eq("user_id", userId)
    .maybeSingle()
  return data?.access_level === "superadmin"
}

/** Tras login: el superadmin va a /equipo solo si no pedía campus, cuenta o prueba. */
export function landingAfterAuth(next: string, superadmin: boolean) {
  if (!superadmin) return next
  const learnerPrefixes = [
    "/campus",
    "/aprende",
    "/cuenta",
    "/credencial",
    "/juega",
    "/sembrar",
    "/benevolo",
    "/prueba",
    "/export",
    "/rd",
    "/shop",
    "/conocimiento",
  ]
  if (learnerPrefixes.some((prefix) => next.startsWith(prefix))) return next
  return "/equipo"
}
