import "server-only"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import type { Json } from "@cacao-colab/supabase-client/database.types"
import {
  communityRanks,
  computeScorecardBonus,
  isoWeekPeriodKey,
  mdBuyPacks,
  resolveRank,
  type EconomyRole,
  type ScorecardPerspective,
} from "@/lib/loyalty"
import { resolveBenefitUse } from "@/lib/benefit-use"

export type CatalogBenefit = {
  id: string | null
  brandKey: string
  brand: string
  slug: string
  title: string
  description: string
  cost: number
  rank: string
  minRankSlug: string | null
  status: string
  connector: string
  connectorActive: boolean
  fulfillmentType: string
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
      // Canjes Colab nativos activos no dependen de marca externa.
      const colabNativeActive =
        item.status === "active" &&
        item.fulfillment_type === "colab_digital" &&
        (adapter?.adapter_type === "colab_native" || adapter?.status === "active")
      return {
        id: item.id,
        brandKey: item.brand_key,
        brand: typeof metadata.brand === "string" ? metadata.brand : item.brand_key,
        slug: item.slug,
        title: item.title,
        description: item.description,
        cost: item.cost_md,
        rank: (item.min_rank_slug && rankNames.get(item.min_rank_slug)) || "Semilla",
        minRankSlug: item.min_rank_slug,
        status: item.status,
        connector: adapterLabels[adapter?.adapter_type ?? "none"] ?? "Sin conector",
        connectorActive: adapter?.status === "active" || colabNativeActive,
        fulfillmentType: item.fulfillment_type,
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
  category: "learning" | "care" | "community" | "verified_purchase" | "adjustment" | "scorecard_bonus" | "pack_purchase"
  reasonCode: string
  idempotencyKey: string
  sourceType?: string
  sourceId?: string
  metadata?: Json
  dailyCap?: number
}) {
  const admin = createSupabaseAdminClient()
  let amount = Math.max(1, Math.round(input.amount))

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
    const remaining = input.dailyCap - earnedToday
    if (remaining <= 0) return { awarded: 0, capped: true }
    amount = Math.min(amount, remaining)
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

async function resolveEconomyRole(profileId: string): Promise<EconomyRole> {
  const admin = createSupabaseAdminClient()
  const { data } = await admin
    .from("actor_roles")
    .select("role,is_primary")
    .eq("profile_id", profileId)
    .order("is_primary", { ascending: false })
  const primary = data?.find((r) => r.is_primary) ?? data?.[0]
  const role = primary?.role
  if (role === "farmer" || role === "chocolatier" || role === "maquilador" || role === "buyer") {
    return role
  }
  return "learner"
}

function periodBounds(periodKey: string) {
  const match = /^(\d{4})-W(\d{2})$/.exec(periodKey)
  if (!match) throw new Error("period_key inválido")
  const year = Number(match[1])
  const week = Number(match[2])
  // Lunes UTC de la semana ISO
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const day = jan4.getUTCDay() || 7
  const mondayWeek1 = new Date(jan4)
  mondayWeek1.setUTCDate(jan4.getUTCDate() - day + 1)
  const start = new Date(mondayWeek1)
  start.setUTCDate(mondayWeek1.getUTCDate() + (week - 1) * 7)
  const end = new Date(start)
  end.setUTCDate(start.getUTCDate() + 7)
  return { start, end }
}

async function loadXpTotal(profileId: string) {
  const admin = createSupabaseAdminClient()
  const [{ data: campus }, { data: gotchi }] = await Promise.all([
    admin.from("campus_progress").select("xp_total").eq("profile_id", profileId),
    admin.from("gotchi_runs").select("xp_total").eq("profile_id", profileId),
  ])
  const campusXp = (campus ?? []).reduce((s, r) => s + (r.xp_total ?? 0), 0)
  const gotchiXp = (gotchi ?? []).reduce((s, r) => s + (r.xp_total ?? 0), 0)
  return campusXp + gotchiXp
}

async function countPerspectiveEvents(profileId: string, periodKey: string) {
  const admin = createSupabaseAdminClient()
  const { start, end } = periodBounds(periodKey)
  const { data } = await admin
    .from("mazorca_ledger")
    .select("category,amount")
    .eq("profile_id", profileId)
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString())
    .gt("amount", 0)

  const counts: Partial<Record<ScorecardPerspective, number>> = {}
  for (const row of data ?? []) {
    const cat = row.category as ScorecardPerspective
    if (cat === "learning" || cat === "care" || cat === "community" || cat === "verified_purchase") {
      counts[cat] = (counts[cat] ?? 0) + 1
    }
  }
  return counts
}

export async function previewScorecard(profileId: string, periodKey = isoWeekPeriodKey()) {
  const admin = createSupabaseAdminClient()
  const [{ data: wallet }, role, xpTotal, eventCounts] = await Promise.all([
    admin.from("mazorca_wallets").select("lifetime_earned,balance").eq("profile_id", profileId).maybeSingle(),
    resolveEconomyRole(profileId),
    loadXpTotal(profileId),
    countPerspectiveEvents(profileId, periodKey),
  ])

  const lifetime = wallet?.lifetime_earned ?? 0
  const computed = computeScorecardBonus({
    eventCounts,
    role,
    lifetimeMd: lifetime,
    xpTotal,
  })

  let alreadySettled = false
  try {
    const { data: prior } = await admin
      .from("mazorca_scorecard_settlements")
      .select("id,bonus_md")
      .eq("profile_id", profileId)
      .eq("period_key", periodKey)
      .maybeSingle()
    alreadySettled = Boolean(prior)
  } catch {
    alreadySettled = false
  }

  return {
    periodKey,
    role,
    balance: wallet?.balance ?? 0,
    lifetime,
    xpTotal,
    alreadySettled,
    ...computed,
  }
}

export async function settleScorecard(profileId: string, periodKey = isoWeekPeriodKey()) {
  const preview = await previewScorecard(profileId, periodKey)
  if (preview.alreadySettled) {
    return { settled: false as const, reason: "already_settled" as const, preview }
  }
  if (preview.bonusMd < 1) {
    return { settled: false as const, reason: "no_bonus" as const, preview }
  }

  const admin = createSupabaseAdminClient()
  const idempotencyKey = `scorecard:${periodKey}`

  let award: Awaited<ReturnType<typeof awardMazorcas>>
  try {
    award = await awardMazorcas({
      profileId,
      amount: preview.bonusMd,
      category: "scorecard_bonus",
      reasonCode: "scorecard_settlement",
      idempotencyKey,
      sourceType: "scorecard",
      sourceId: periodKey,
      metadata: {
        role: preview.role,
        xp_total: preview.xpTotal,
        xp_leverage: preview.xpLeverage,
        balance_score: preview.balanceScore,
        ceiling: preview.ceiling,
        perspectives: preview.perspectives,
      },
    })
  } catch (err) {
    // Si la migración de categorías aún no corre, usa adjustment.
    const message = err instanceof Error ? err.message : String(err)
    if (!/category|check constraint|scorecard_bonus/i.test(message)) throw err
    award = await awardMazorcas({
      profileId,
      amount: preview.bonusMd,
      category: "adjustment",
      reasonCode: "scorecard_settlement",
      idempotencyKey,
      sourceType: "scorecard",
      sourceId: periodKey,
      metadata: {
        role: preview.role,
        xp_total: preview.xpTotal,
        xp_leverage: preview.xpLeverage,
        balance_score: preview.balanceScore,
        ceiling: preview.ceiling,
        perspectives: preview.perspectives,
        fallback_category: "adjustment",
      },
    })
  }

  if (award.duplicate) {
    return { settled: false as const, reason: "already_settled" as const, preview }
  }

  const { data: ledger } = await admin
    .from("mazorca_ledger")
    .select("id")
    .eq("profile_id", profileId)
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle()

  try {
    const { error } = await admin.from("mazorca_scorecard_settlements").insert({
      profile_id: profileId,
      period_key: periodKey,
      role_slug: preview.role,
      xp_total: preview.xpTotal,
      xp_leverage: preview.xpLeverage,
      balance_score: preview.balanceScore,
      bonus_md: preview.bonusMd,
      ceiling_md: preview.ceiling,
      perspectives: preview.perspectives as unknown as Json,
      ledger_credit_id: ledger?.id ?? null,
    })
    if (error && error.code !== "23505") throw error
  } catch (err) {
    // Tabla ausente si migración no aplicada: el crédito en ledger ya quedó.
    const message = err instanceof Error ? err.message : String(err)
    if (!/mazorca_scorecard_settlements|schema cache|does not exist/i.test(message)) throw err
  }

  return { settled: true as const, awarded: award.awarded, preview }
}

export async function redeemBenefit(input: {
  profileId: string
  catalogItemId: string
}) {
  const admin = createSupabaseAdminClient()
  const { data: item, error: itemError } = await admin
    .from("benefit_catalog_items")
    .select("*")
    .eq("id", input.catalogItemId)
    .maybeSingle()
  if (itemError) throw itemError
  if (!item) return { ok: false as const, error: "beneficio_no_encontrado" }
  if (item.status !== "active") return { ok: false as const, error: "beneficio_inactivo" }

  const { data: adapter } = await admin
    .from("brand_commerce_adapters")
    .select("adapter_type,status")
    .eq("brand_key", item.brand_key)
    .maybeSingle()

  const colabOk =
    item.fulfillment_type === "colab_digital" &&
    (adapter?.adapter_type === "colab_native" || adapter?.status === "active")
  if (!colabOk && adapter?.status !== "active") {
    return { ok: false as const, error: "conector_inactivo" }
  }

  const { data: wallet } = await admin
    .from("mazorca_wallets")
    .select("balance,lifetime_earned")
    .eq("profile_id", input.profileId)
    .maybeSingle()
  const balance = wallet?.balance ?? 0
  const lifetime = wallet?.lifetime_earned ?? 0
  if (balance < item.cost_md) return { ok: false as const, error: "saldo_insuficiente", balance, cost: item.cost_md }

  if (item.min_rank_slug) {
    const rank = resolveRank(lifetime)
    const order = ["semilla", "brote", "labrador", "guardian", "maestro", "heritage"]
    if (order.indexOf(rank.slug) < order.indexOf(item.min_rank_slug)) {
      const requiredMeta = communityRanks.find((r) => r.slug === item.min_rank_slug)
      return {
        ok: false as const,
        error: "rango_insuficiente",
        rank: rank.slug,
        rankName: rank.name,
        required: item.min_rank_slug,
        requiredName: requiredMeta?.name ?? item.min_rank_slug,
        lifetime,
        requiredThreshold: requiredMeta?.threshold ?? null,
        balance,
      }
    }
  }

  const { count } = await admin
    .from("benefit_redemptions")
    .select("id", { count: "exact", head: true })
    .eq("profile_id", input.profileId)
    .eq("catalog_item_id", item.id)
    .neq("status", "cancelled")
  if ((count ?? 0) >= item.per_user_limit) {
    return { ok: false as const, error: "limite_por_usuario" }
  }

  if (item.stock_qty !== null && item.stock_qty !== undefined) {
    const { count: stockUsed } = await admin
      .from("benefit_redemptions")
      .select("id", { count: "exact", head: true })
      .eq("catalog_item_id", item.id)
      .neq("status", "cancelled")
    if ((stockUsed ?? 0) >= item.stock_qty) {
      return { ok: false as const, error: "sin_stock" }
    }
  }

  const idempotencyKey = `redeem:${item.id}:${input.profileId}:${(count ?? 0) + 1}`
  const { data: debit, error: debitError } = await admin
    .from("mazorca_ledger")
    .insert({
      profile_id: input.profileId,
      amount: -item.cost_md,
      category: "redemption",
      reason_code: "benefit_redemption",
      idempotency_key: idempotencyKey,
      source_type: "benefit_catalog",
      source_id: item.id,
      metadata: {
        brand_key: item.brand_key,
        slug: item.slug,
        title: item.title,
        fulfillment_type: item.fulfillment_type,
        course_slug:
          typeof (item.metadata as { course_slug?: unknown } | null)?.course_slug === "string"
            ? (item.metadata as { course_slug: string }).course_slug
            : null,
      },
    })
    .select("id")
    .single()

  if (debitError?.code === "23505") return { ok: false as const, error: "canje_duplicado" }
  if (debitError) {
    if (/saldo insuficiente/i.test(debitError.message)) {
      return { ok: false as const, error: "saldo_insuficiente" }
    }
    throw debitError
  }

  const metadata = (item.metadata ?? {}) as { service?: string; course_slug?: string }
  const fulfillmentPayload: Json = {
    service: metadata.service ?? item.fulfillment_type,
    course_slug: metadata.course_slug ?? null,
    brand_key: item.brand_key,
    slug: item.slug,
    issued_at: new Date().toISOString(),
  }

  const status = item.fulfillment_type === "colab_digital" ? "issued" : "pending"
  const { data: redemption, error: redemptionError } = await admin
    .from("benefit_redemptions")
    .insert({
      profile_id: input.profileId,
      catalog_item_id: item.id,
      cost_md: item.cost_md,
      status,
      ledger_debit_id: debit.id,
      fulfillment_payload: fulfillmentPayload,
    })
    .select("id,status")
    .single()

  if (redemptionError) throw redemptionError

  // Entitlement digital: marca unlock en campus_progress.state si hay course_slug.
  if (item.fulfillment_type === "colab_digital" && typeof metadata.course_slug === "string") {
    const { data: progress } = await admin
      .from("campus_progress")
      .select("id,state")
      .eq("profile_id", input.profileId)
      .eq("course_slug", metadata.course_slug)
      .maybeSingle()
    const prev = (progress?.state ?? {}) as Record<string, unknown>
    const nextState = {
      ...prev,
      md_unlocked: true,
      md_unlock_redemption_id: redemption.id,
      md_unlocked_at: new Date().toISOString(),
    } as Json
    if (progress) {
      await admin.from("campus_progress").update({ state: nextState }).eq("id", progress.id)
    } else {
      await admin.from("campus_progress").insert({
        profile_id: input.profileId,
        course_slug: metadata.course_slug,
        state: nextState,
        xp_total: 0,
      })
    }
  }

  const useGuide = resolveBenefitUse({
    courseSlug: metadata.course_slug ?? null,
    service: metadata.service ?? null,
    slug: item.slug,
  })

  return {
    ok: true as const,
    redemptionId: redemption.id,
    status: redemption.status,
    cost: item.cost_md,
    title: item.title,
    slug: item.slug,
    courseSlug: metadata.course_slug ?? null,
    useHref: useGuide?.href ?? "/cuenta",
    useCta: useGuide?.cta ?? "Ver mi cuenta",
    howTo: useGuide?.howTo ?? "Tu canje quedó registrado en Mi cuenta · wallet.",
  }
}

/** Crea intención de compra de pack. El crédito real llega con webhook Stripe. */
export async function createPackIntent(profileId: string, packSlug: string) {
  const pack = mdBuyPacks.find((p) => p.slug === packSlug)
  if (!pack) return { ok: false as const, error: "pack_desconocido" }

  const admin = createSupabaseAdminClient()
  try {
    const { data, error } = await admin
      .from("mazorca_pack_intents")
      .insert({
        profile_id: profileId,
        pack_slug: pack.slug,
        md_amount: pack.md,
        price_cop: pack.priceCop,
        status: "pending",
        metadata: { name: pack.name, stripe: "pending_activation" },
      })
      .select("id,pack_slug,md_amount,price_cop,status")
      .single()
    if (error) throw error
    return {
      ok: true as const,
      intent: data,
      checkoutReady: false,
      message: "Pack registrado. El checkout Stripe se activa cuando exista STRIPE_SECRET_KEY (ver docs/08 y 26).",
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (/mazorca_pack_intents|schema cache|does not exist/i.test(message)) {
      return {
        ok: false as const,
        error: "migracion_pendiente",
        message: "Aplica la migración 20260801120000_economia_md_scorecard.sql para registrar intents de compra.",
      }
    }
    throw err
  }
}
