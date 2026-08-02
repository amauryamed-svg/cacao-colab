import "server-only"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { nextRank, resolveRank } from "@/lib/loyalty"
import { mapNodeBioRow } from "@/lib/nodo/map"
import type { NodeBio } from "@/lib/nodo/types"
import { loadCourseTracks, type CourseTrackSnapshot } from "@/lib/cuenta/courses"

export type CuentaHomeSnapshot = {
  userId: string
  email: string
  displayName: string
  city: string | null
  roles: string[]
  wallet: {
    balance: number
    lifetime: number
    rankName: string
    rankIcon: string
    rankSlug: string
    nextName: string | null
    mdToNext: number | null
  }
  bio: NodeBio | null
  courses: {
    masters: CourseTrackSnapshot[]
    micro: {
      completedCount: number
      totalLessons: number
      percent: number
      href: string
    } | null
  }
  redemptionCount: number
}

async function loadBioByEmail(email: string): Promise<NodeBio | null> {
  try {
    const admin = createSupabaseAdminClient()
    const { data, error } = await admin
      .from("node_bios")
      .select("*")
      .eq("email", email.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    if (error || !data) return null
    return mapNodeBioRow(data)
  } catch {
    return null
  }
}

export async function loadCuentaHome(userId: string, email: string, metadataName?: string | null) {
  const supabase = await createSupabaseServerClient()
  const [{ data: profile }, { data: wallet }, { data: roles }, bio, courses] = await Promise.all([
    supabase.from("profiles").select("full_name,city").eq("id", userId).maybeSingle(),
    supabase.from("mazorca_wallets").select("balance,lifetime_earned").eq("profile_id", userId).maybeSingle(),
    supabase.from("actor_roles").select("role,is_primary").eq("profile_id", userId),
    loadBioByEmail(email),
    loadCourseTracks(userId),
  ])

  let redemptionCount = 0
  try {
    const { count } = await supabase
      .from("benefit_redemptions")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", userId)
      .neq("status", "cancelled")
    redemptionCount = count ?? 0
  } catch {
    redemptionCount = 0
  }

  const lifetime = wallet?.lifetime_earned ?? 0
  const rank = resolveRank(lifetime)
  const upcoming = nextRank(lifetime)
  const roleList = (roles ?? [])
    .slice()
    .sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
    .map((r) => r.role)

  const snapshot: CuentaHomeSnapshot = {
    userId,
    email,
    displayName:
      profile?.full_name?.trim() ||
      metadataName?.trim() ||
      email.split("@")[0] ||
      "Cacaotier",
    city: profile?.city ?? bio?.city ?? null,
    roles: roleList,
    wallet: {
      balance: wallet?.balance ?? 0,
      lifetime,
      rankName: rank.name,
      rankIcon: rank.icon,
      rankSlug: rank.slug,
      nextName: upcoming?.name ?? null,
      mdToNext: upcoming ? upcoming.threshold - lifetime : null,
    },
    bio,
    courses,
    redemptionCount,
  }
  return snapshot
}
