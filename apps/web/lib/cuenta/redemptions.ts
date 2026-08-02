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

export type ProfileRedemption = {
  id: string
  title: string
  slug: string
  costMd: number
  status: string
  createdAt: string
  use: BenefitUseGuide | null
}

function titleFromSlug(slug: string) {
  if (!slug) return "Beneficio Colab"
  if (slug.includes("arquitecto")) return "Aceleración Arquitecto de Fermentación"
  if (slug.includes("chocolatier")) return "Preview Master Chocolatier"
  if (slug.includes("benevolo")) return "Ruta Benevolo (capstone)"
  if (slug.includes("mentoria") || slug.includes("mentor")) return "Cupo mentoría Dualita"
  return slug.replace(/-/g, " ")
}

/**
 * Lista canjes del learner. No depende del embed PostgREST al catálogo
 * (ese join fallaba en silencio y dejaba «0 canjes» con el debit hecho).
 */
export async function loadProfileRedemptions(userId: string): Promise<ProfileRedemption[]> {
  const supabase = await createSupabaseServerClient()
  const { data: rows, error } = await supabase
    .from("benefit_redemptions")
    .select("id,status,cost_md,created_at,fulfillment_payload,catalog_item_id")
    .eq("profile_id", userId)
    .neq("status", "cancelled")
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) {
    // Fallback: reconstruir desde ledger si la tabla/redención falla.
    return loadRedemptionsFromLedger(userId)
  }

  const list = rows ?? []
  if (list.length === 0) {
    // Debit sin fila de redención (caso raro) — aún así mostrar el canje.
    return loadRedemptionsFromLedger(userId)
  }

  const catalogIds = [...new Set(list.map((r) => r.catalog_item_id).filter(Boolean))]
  const catalogById = new Map<string, { title: string; slug: string; metadata: unknown }>()
  if (catalogIds.length > 0) {
    try {
      const admin = createSupabaseAdminClient()
      const { data: catalog } = await admin
        .from("benefit_catalog_items")
        .select("id,title,slug,metadata")
        .in("id", catalogIds)
      for (const item of catalog ?? []) {
        catalogById.set(item.id, {
          title: item.title,
          slug: item.slug,
          metadata: item.metadata,
        })
      }
    } catch {
      // Título cae a fulfillment_payload / slug.
    }
  }

  return list.map((row) => {
    const catalog = catalogById.get(row.catalog_item_id)
    const catalogMeta = (catalog?.metadata ?? {}) as { course_slug?: string; service?: string }
    const courseSlug =
      courseSlugFromPayload(row.fulfillment_payload) ?? catalogMeta.course_slug ?? null
    const service = serviceFromPayload(row.fulfillment_payload) ?? catalogMeta.service ?? null
    const slug =
      slugFromPayload(row.fulfillment_payload) ?? catalog?.slug ?? ""
    const title = catalog?.title || titleFromSlug(slug)
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
}

async function loadRedemptionsFromLedger(userId: string): Promise<ProfileRedemption[]> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: ledger } = await supabase
      .from("mazorca_ledger")
      .select("id,amount,created_at,metadata,reason_code")
      .eq("profile_id", userId)
      .eq("reason_code", "benefit_redemption")
      .order("created_at", { ascending: false })
      .limit(20)

    return (ledger ?? []).map((entry) => {
      const meta = (entry.metadata ?? {}) as {
        title?: unknown
        slug?: unknown
        course_slug?: unknown
        service?: unknown
      }
      const slug = typeof meta.slug === "string" ? meta.slug : ""
      const title =
        typeof meta.title === "string" && meta.title ? meta.title : titleFromSlug(slug)
      const courseSlug = typeof meta.course_slug === "string" ? meta.course_slug : null
      const service = typeof meta.service === "string" ? meta.service : null
      return {
        id: entry.id,
        title,
        slug,
        costMd: Math.abs(entry.amount),
        status: "issued",
        createdAt: entry.created_at,
        use: resolveBenefitUse({ courseSlug, service, slug }),
      }
    })
  } catch {
    return []
  }
}
