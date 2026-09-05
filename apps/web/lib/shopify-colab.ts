/**
 * Shopify · Cacao Colab (producto digital Masters + cross-sell nodos)
 *
 * Checkout de la tienda Shopify del Colab para Masters (SKU digital) con
 * venta cruzada a coberturas/nibs/kits de nodos. Las URLs usan el dominio
 * configurado en NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN; si faltan variant IDs,
 * el CTA cae a WhatsApp de inscripción (sin fingir carrito).
 */

import { cauaShopSkus, type ShopSku } from "@/lib/caua-shop"
import {
  ARCHITECT_COURSE_SLUG,
} from "@/lib/architect-course"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"

export const COLAB_SHOPIFY_DOMAIN =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN?.trim()) ||
  "shop.cacaocolab.org"

export const COLAB_SHOPIFY_STOREFRONT = `https://${COLAB_SHOPIFY_DOMAIN}`

export type MasterShopifySku = {
  courseSlug: string
  handle: string
  title: string
  priceUsdLabel: string
  priceCopLabel: string
  /** Variant ID numérico Shopify; vacío = usar WhatsApp */
  variantId: string
  campusHref: string
  marketingHref: string
  blurb: string
  crossSellSkuIds: string[]
}

const envVariant = (key: string) =>
  (typeof process !== "undefined" && process.env[key]?.trim()) || ""

/** Tres Masters · producto digital en Shopify Colab. */
export const masterShopifySkus: MasterShopifySku[] = [
  {
    courseSlug: ARCHITECT_COURSE_SLUG,
    handle: "master-cacaotier",
    title: "Master Cacaotier · Architect",
    priceUsdLabel: "USD 189",
    priceCopLabel: "COP 780.000",
    variantId: envVariant("NEXT_PUBLIC_SHOPIFY_VARIANT_CACAOTIER"),
    campusHref: "/campus/arquitecto-fermentacion",
    marketingHref: "/aprende/cacaotier",
    blurb: "Fermentación de precisión, tipicidad y bitácora — hereda el saber hacer de finca.",
    crossSellSkuIds: ["nibs-arauca", "cob-100"],
  },
  {
    courseSlug: CATADOR_COURSE_SLUG,
    handle: "master-catador",
    title: "Master Catador",
    priceUsdLabel: "USD 149",
    priceCopLabel: "COP 620.000",
    variantId: envVariant("NEXT_PUBLIC_SHOPIFY_VARIANT_CATADOR"),
    campusHref: "/campus/catador-cacao",
    marketingHref: "/aprende/catador",
    blurb: "Panel, rueda Fine-Flavor y criterio sensorial para defender origen en mesa.",
    crossSellSkuIds: ["nibs-santander", "ritual-pack"],
  },
  {
    courseSlug: CHOCOLATIER_COURSE_SLUG,
    handle: "master-chocolatier",
    title: "Master Chocolatier 70 %",
    priceUsdLabel: "USD 219",
    priceCopLabel: "COP 890.000",
    variantId: envVariant("NEXT_PUBLIC_SHOPIFY_VARIANT_CHOCOLATIER"),
    campusHref: "/campus/maestro-chocolatier",
    marketingHref: "/aprende/chocolatier",
    blurb: "Barra 70 % con lente de excelencia — oficio que lleva la herencia a formato deseable.",
    crossSellSkuIds: ["cob-70", "cob-85", "ritual-pack"],
  },
]

export function getMasterShopifySku(courseSlug: string) {
  return masterShopifySkus.find((s) => s.courseSlug === courseSlug) ?? null
}

/** Permalink cart Shopify (1 unidad). */
export function shopifyCartCheckoutUrl(variantId: string, quantity = 1) {
  if (!variantId) return null
  return `${COLAB_SHOPIFY_STOREFRONT}/cart/${variantId}:${quantity}`
}

export function masterCheckoutUrl(sku: MasterShopifySku) {
  const cart = shopifyCartCheckoutUrl(sku.variantId)
  if (cart) return { href: cart, mode: "shopify" as const }
  return {
    href:
      "https://wa.me/573102227848?text=" +
      encodeURIComponent(
        `Hola Cacao Colab — quiero inscribirme en ${sku.title} (checkout Shopify / producto digital).`,
      ),
    mode: "whatsapp" as const,
  }
}

export function crossSellForMaster(courseSlug: string): ShopSku[] {
  const sku = getMasterShopifySku(courseSlug)
  if (!sku) return cauaShopSkus.slice(0, 3)
  const map = new Map(cauaShopSkus.map((s) => [s.id, s]))
  return sku.crossSellSkuIds.map((id) => map.get(id)).filter(Boolean) as ShopSku[]
}

export function shopifyProductUrl(handle: string) {
  return `${COLAB_SHOPIFY_STOREFRONT}/products/${handle}`
}
