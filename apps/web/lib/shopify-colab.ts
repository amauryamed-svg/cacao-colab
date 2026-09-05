/**
 * Shopify · Cacao Colab storefront
 * Dominio canónico: cacao-colab.myshopify.com
 */

import { cauaShopSkus, type ShopSku } from "@/lib/caua-shop"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"

export const COLAB_SHOPIFY_DOMAIN =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN?.trim()) ||
  "cacao-colab.myshopify.com"

export const COLAB_SHOPIFY_STOREFRONT = `https://${COLAB_SHOPIFY_DOMAIN}`
export const COLAB_SHOPIFY_COLLECTION = `${COLAB_SHOPIFY_STOREFRONT}/collections/all`
export const COLAB_SHOPIFY_CART = `${COLAB_SHOPIFY_STOREFRONT}/cart`

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

export type ColabStoreProduct = {
  id: string
  handle: string
  title: string
  kind: "digital" | "physical" | "kit"
  blurb: string
  priceLabel: string
  href: string
  badge?: string
}

const envVariant = (key: string) =>
  (typeof process !== "undefined" && process.env[key]?.trim()) || ""

/** Tres Masters · producto digital en cacao-colab.myshopify.com */
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

/** Catálogo vitrina Colab (handles alineados a la tienda Shopify). */
export const colabStorefrontCatalog: ColabStoreProduct[] = [
  {
    id: "master-cacaotier",
    handle: "master-cacaotier",
    title: "Master Cacaotier",
    kind: "digital",
    blurb: "Producto digital · fermentación y tipicidad.",
    priceLabel: "USD 189",
    href: `${COLAB_SHOPIFY_STOREFRONT}/products/master-cacaotier`,
    badge: "Digital",
  },
  {
    id: "master-catador",
    handle: "master-catador",
    title: "Master Catador",
    kind: "digital",
    blurb: "Producto digital · panel Fine-Flavor.",
    priceLabel: "USD 149",
    href: `${COLAB_SHOPIFY_STOREFRONT}/products/master-catador`,
    badge: "Digital",
  },
  {
    id: "master-chocolatier",
    handle: "master-chocolatier",
    title: "Master Chocolatier 70 %",
    kind: "digital",
    blurb: "Producto digital · barra de autor.",
    priceLabel: "USD 219",
    href: `${COLAB_SHOPIFY_STOREFRONT}/products/master-chocolatier`,
    badge: "Digital",
  },
  {
    id: "bars-benevolo",
    handle: "bars-benevolo",
    title: "Bars. Benevolo · 80 g",
    kind: "physical",
    blurb: "Chocolate de leche con marañón · sugar free · preventa.",
    priceLabel: "Preventa",
    href: `${COLAB_SHOPIFY_STOREFRONT}/products/bars-benevolo`,
    badge: "Antojo",
  },
  {
    id: "set-catacion-10",
    handle: "set-catacion-10",
    title: "Set Catación 10",
    kind: "kit",
    blurb: "Kit sensorial para practicar tipicidad en casa o lab.",
    priceLabel: "Kit",
    href: `${COLAB_SHOPIFY_STOREFRONT}/products/set-catacion-10`,
    badge: "Kit",
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
  const product = `${COLAB_SHOPIFY_STOREFRONT}/products/${sku.handle}`
  // Si el producto ya está publicado sin variant env, abrir ficha Shopify.
  return {
    href: product,
    mode: "shopify-product" as const,
    fallbackWa:
      "https://wa.me/573102227848?text=" +
      encodeURIComponent(
        `Hola Cacao Colab — quiero inscribirme en ${sku.title} (tienda cacao-colab.myshopify.com).`,
      ),
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
