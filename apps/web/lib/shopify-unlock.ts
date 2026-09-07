import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { masterShopifySkus } from "@/lib/shopify-colab"
import type { Json } from "@cacao-colab/supabase-client/database.types"

const HANDLE_TO_COURSE = Object.fromEntries(
  masterShopifySkus.map((s) => [s.handle, s.courseSlug]),
) as Record<string, string>

const VARIANT_TO_COURSE = Object.fromEntries(
  masterShopifySkus
    .filter((s) => s.variantId)
    .map((s) => [s.variantId, s.courseSlug]),
) as Record<string, string>

export function courseSlugFromShopifyHandle(handle: string | null | undefined) {
  if (!handle) return null
  return HANDLE_TO_COURSE[handle.trim().toLowerCase()] ?? null
}

export function courseSlugsFromShopifyLineItems(
  lineItems: Array<{
    handle?: string | null
    product_handle?: string | null
    variant_id?: string | number | null
    sku?: string | null
    title?: string | null
    name?: string | null
  }>,
) {
  const slugs = new Set<string>()
  for (const item of lineItems) {
    const variantKey = item.variant_id != null ? String(item.variant_id) : ""
    if (variantKey && VARIANT_TO_COURSE[variantKey]) {
      slugs.add(VARIANT_TO_COURSE[variantKey])
      continue
    }

    const handle = item.handle ?? item.product_handle ?? item.sku ?? ""
    const fromHandle = courseSlugFromShopifyHandle(handle)
    if (fromHandle) {
      slugs.add(fromHandle)
      continue
    }

    const title = `${item.title ?? ""} ${item.name ?? ""}`.toLowerCase()
    for (const sku of masterShopifySkus) {
      const needle = sku.handle.replace(/-/g, " ")
      if (
        title.includes(sku.handle) ||
        title.includes(needle) ||
        title.includes(sku.title.toLowerCase())
      ) {
        slugs.add(sku.courseSlug)
      }
    }
  }
  return [...slugs]
}

/** Acredita Masters digitales en campus_progress.state.shopify_unlocked. */
export async function unlockMastersFromShopifyOrder(input: {
  email: string
  orderId: string | number
  orderName?: string
  courseSlugs: string[]
}) {
  const email = input.email.trim().toLowerCase()
  if (!email || input.courseSlugs.length === 0) {
    return { ok: false as const, reason: "missing_email_or_slugs" }
  }

  const admin = createSupabaseAdminClient()
  const { data: profile } = await admin
    .from("profiles")
    .select("id,email")
    .ilike("email", email)
    .maybeSingle()

  if (!profile?.id) {
    return { ok: false as const, reason: "profile_not_found", email }
  }

  const unlocked: string[] = []
  for (const courseSlug of input.courseSlugs) {
    const { data: progress } = await admin
      .from("campus_progress")
      .select("id,state")
      .eq("profile_id", profile.id)
      .eq("course_slug", courseSlug)
      .maybeSingle()

    const prev = (progress?.state ?? {}) as Record<string, unknown>
    const nextState = {
      ...prev,
      shopify_unlocked: true,
      shopify_order_id: String(input.orderId),
      shopify_order_name: input.orderName ?? null,
      shopify_unlocked_at: new Date().toISOString(),
    } as Json

    if (progress) {
      const { error } = await admin
        .from("campus_progress")
        .update({ state: nextState })
        .eq("id", progress.id)
      if (error) throw error
    } else {
      const { error } = await admin.from("campus_progress").insert({
        profile_id: profile.id,
        course_slug: courseSlug,
        state: nextState,
        xp_total: 0,
      })
      if (error) throw error
    }
    unlocked.push(courseSlug)
  }

  return { ok: true as const, profileId: profile.id, unlocked }
}
