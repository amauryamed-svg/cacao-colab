import { createHmac, timingSafeEqual } from "node:crypto"
import {
  courseSlugsFromShopifyLineItems,
  unlockMastersFromShopifyOrder,
} from "@/lib/shopify-unlock"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Shopify webhook · orders/paid
 * Acredita Masters digitales en la cuenta Colab (mismo email).
 *
 * Config: Admin Shopify → Settings → Notifications → Webhooks
 * URL: https://www.cacaocolab.org/api/shopify/webhooks/orders-paid
 * Event: Order payment
 * Secret: SHOPIFY_WEBHOOK_SECRET
 */
export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET?.trim()
  if (!secret) {
    return Response.json({ ok: false, error: "webhook_not_configured" }, { status: 503 })
  }

  const raw = Buffer.from(await request.arrayBuffer())
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256") ?? ""
  const digest = createHmac("sha256", secret).update(raw).digest("base64")
  const a = Buffer.from(digest)
  const b = Buffer.from(hmacHeader)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ ok: false, error: "invalid_hmac" }, { status: 401 })
  }

  let order: {
    id?: number | string
    name?: string
    email?: string
    contact_email?: string
    customer?: { email?: string }
    line_items?: Array<{
      handle?: string
      product_handle?: string
      sku?: string
      title?: string
    }>
  }
  try {
    order = JSON.parse(raw.toString("utf8"))
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const email = order.email ?? order.contact_email ?? order.customer?.email ?? ""
  const courseSlugs = courseSlugsFromShopifyLineItems(order.line_items ?? [])

  if (!email) {
    return Response.json({ ok: true, skipped: "no_email", courseSlugs })
  }
  if (courseSlugs.length === 0) {
    return Response.json({ ok: true, skipped: "no_master_line_items" })
  }

  try {
    const result = await unlockMastersFromShopifyOrder({
      email,
      orderId: order.id ?? "unknown",
      orderName: order.name,
      courseSlugs,
    })
    return Response.json(result)
  } catch (err) {
    console.error("[shopify/orders-paid]", err)
    return Response.json({ ok: false, error: "unlock_failed" }, { status: 500 })
  }
}
