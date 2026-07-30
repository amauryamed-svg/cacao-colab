import "server-only"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import type { Json } from "@cacao-colab/supabase-client/database.types"

export type CatalogBenefit = {
  brandKey: string
  brand: string
  title: string
  description: string
  cost: number
  rank: string
  status: string
  connector: string
  connectorActive: boolean
  terms: string
}

const adapterLabels: Record<string, string> = {
  none: "Sin conector",
  manual_coupon: "Fulfillment manual",
  colab_native: "Colab nativo",
  shopify: "Shopify",
  woocommerce: "WooCommerce",
  custom_webhook: "Webhook propio",
}

/**
 * Lee el catálogo real. Devuelve null cuando la base no está migrada para que la
 * página use su lista declarada en código sin inventar disponibilidad.
 */
export async function listBenefitCatalog(): Promise<CatalogBenefit[] | null> {
  try {
    const admin = createSupabaseAdminClient()
    const [items, ranks, adapters] = await Promise.all([
      admin.from("benefit_catalog_items").select("*").neq("status", "retired").order("cost_md"),
      admin.from("community_ranks").select("slug,name"),
      admin.from("brand_commerce_adapters").select("brand_key,adapter_type,status"),
    ])
    if (items.error || !items.data?.length) return null

    const rankNames = new Map((ranks.data ?? []).map((rank) => [rank.slug, rank.name]))
    const adapterByBrand = new Map((adapters.data ?? []).map((adapter) => [adapter.brand_key, adapter]))

    return items.data.map((item) => {
      const metadata = (item.metadata ?? {}) as { brand?: unknown }
      const adapter = adapterByBrand.get(item.brand_key)
      return {
        brandKey: item.brand_key,
        brand: typeof metadata.brand === "string" ? metadata.brand : item.brand_key,
        title: item.title,
        description: item.description,
        cost: item.cost_md,
        rank: (item.min_rank_slug && rankNames.get(item.min_rank_slug)) || "Semilla",
        status: item.status,
        connector: adapterLabels[adapter?.adapter_type ?? "none"] ?? "Sin conector",
        connectorActive: adapter?.status === "active",
        terms: item.terms,
      }
    })
  } catch {
    return null
  }
}

export async function awardMazorcas(input: {
  profileId: string
  amount: number
  category: "learning" | "care" | "community" | "verified_purchase" | "adjustment"
  reasonCode: string
  idempotencyKey: string
  sourceType?: string
  sourceId?: string
  metadata?: Json
  dailyCap?: number
}) {
  const admin = createSupabaseAdminClient()
  const amount = Math.max(1, Math.round(input.amount))

  if (input.dailyCap) {
    const since = new Date()
    since.setUTCHours(0, 0, 0, 0)
    const { data } = await admin
      .from("mazorca_ledger")
      .select("amount")
      .eq("profile_id", input.profileId)
      .eq("category", input.category)
      .gte("created_at", since.toISOString())
    const earnedToday = (data ?? []).reduce((total, entry) => total + Math.max(0, entry.amount), 0)
    if (earnedToday >= input.dailyCap) return { awarded: 0, capped: true }
  }

  const { error } = await admin.from("mazorca_ledger").insert({
    profile_id: input.profileId,
    amount,
    category: input.category,
    reason_code: input.reasonCode,
    idempotency_key: input.idempotencyKey,
    source_type: input.sourceType ?? null,
    source_id: input.sourceId ?? null,
    metadata: input.metadata ?? {},
  })
  if (error?.code === "23505") return { awarded: 0, duplicate: true }
  if (error) throw error
  return { awarded: amount }
}
