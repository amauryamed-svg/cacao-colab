import "server-only"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import {
  courseSlugFromPayload,
  resolveBenefitUse,
  serviceFromPayload,
  slugFromPayload,
  type BenefitUseGuide,
} from "@/lib/benefit-use"
import { nextRank, resolveRank } from "@/lib/loyalty"
import { mapNodeBioRow } from "@/lib/nodo/map"
import type { NodeBio } from "@/lib/nodo/types"
import { loadCourseTracks, type CourseTrackSnapshot } from "@/lib/cuenta/courses"

export type CuentaRedemption = {
  id: string
  title: string
  slug: string
  costMd: number
  status: string
  createdAt: string
  use: BenefitUseGuide | null
}

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
  redemptions: CuentaRedemption[]
}

/**
 * Resuelve la bio del usuario autenticado:
 * 1) por profile_id (vínculo fuerte)
 * 2) por email case-insensitive (código anterior / pre-login)
 * Si encuentra por email sin profile_id, la reclama para esta cuenta.
 */
export async function loadBioForUser(userId: string, email: string): Promise<NodeBio | null> {
  const normalized = email.trim().toLowerCase()
  try {
    const admin = createSupabaseAdminClient()

    const byProfile = await admin
      .from("node_bios")
      .select("*")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (byProfile.data && !byProfile.error) {
      return mapNodeBioRow(byProfile.data)
    }

    if (!normalized.includes("@")) return null

    const byEmailExact = await admin
      .from("node_bios")
      .select("*")
      .eq("email", normalized)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    let row = !byEmailExact.error ? byEmailExact.data : null

    // Compat: emails con casing distinto (antes de normalizar en migración)
    if (!row) {
      const escaped = normalized.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_")
      const byEmailLoose = await admin
        .from("node_bios")
        .select("*")
        .ilike("email", escaped)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
      if (!byEmailLoose.error) row = byEmailLoose.data
    }

    if (!row) return null

    // No robar bios ya vinculadas a otra cuenta
    if (row.profile_id && row.profile_id !== userId) return null

    if (!row.profile_id || row.email !== normalized) {
      const { data: claimed } = await admin
        .from("node_bios")
        .update({ profile_id: userId, email: normalized })
        .eq("id", row.id)
        .select("*")
        .maybeSingle()
      if (claimed) return mapNodeBioRow(claimed)
    }

    return mapNodeBioRow(row)
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
    loadBioForUser(userId, email),
    loadCourseTracks(userId),
  ])

  let redemptionCount = 0
  let redemptions: CuentaRedemption[] = []
  try {
    const { data: redemptionRows } = await supabase
      .from("benefit_redemptions")
      .select(
        "id,status,cost_md,created_at,fulfillment_payload,benefit_catalog_items(title,slug,metadata)",
      )
      .eq("profile_id", userId)
      .neq("status", "cancelled")
      .order("created_at", { ascending: false })
      .limit(12)
    redemptions = (redemptionRows ?? []).map((row) => {
      const catalog = Array.isArray(row.benefit_catalog_items)
        ? row.benefit_catalog_items[0]
        : row.benefit_catalog_items
      const catalogMeta = (catalog?.metadata ?? {}) as {
        course_slug?: string
        service?: string
      }
      const courseSlug =
        courseSlugFromPayload(row.fulfillment_payload) ?? catalogMeta.course_slug ?? null
      const service = serviceFromPayload(row.fulfillment_payload) ?? catalogMeta.service ?? null
      const slug =
        slugFromPayload(row.fulfillment_payload) ??
        (typeof catalog?.slug === "string" ? catalog.slug : "")
      const title =
        typeof catalog?.title === "string" && catalog.title
          ? catalog.title
          : slug || "Beneficio Colab"
      return {
        id: row.id,
        title,
        slug,
        costMd: row.cost_md,
        status: row.status,
        createdAt: row.created_at,
        use: resolveBenefitUse({ courseSlug, service, slug }),
      }
    })
    redemptionCount = redemptions.length
  } catch {
    redemptionCount = 0
    redemptions = []
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
    redemptions,
  }
  return snapshot
}
