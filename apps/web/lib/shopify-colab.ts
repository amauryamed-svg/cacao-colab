/**
 * Shopify · Cacao Colab storefront
 * Dominio canónico Colab: cacao-colab.myshopify.com
 * Dominio de marca Benevolo: benevolo.shop (misma tienda; ver docs/33)
 */

import { cauaShopSkus, type ShopSku } from "@/lib/caua-shop"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"

const envTrim = (key: string) =>
  (typeof process !== "undefined" && process.env[key]?.trim()) || ""

export const COLAB_SHOPIFY_DOMAIN =
  envTrim("NEXT_PUBLIC_COLAB_SHOPIFY_DOMAIN") || "cacao-colab.myshopify.com"

export const COLAB_SHOPIFY_STOREFRONT = `https://${COLAB_SHOPIFY_DOMAIN}`
export const COLAB_SHOPIFY_COLLECTION = `${COLAB_SHOPIFY_STOREFRONT}/collections/all`
export const COLAB_SHOPIFY_CART = `${COLAB_SHOPIFY_STOREFRONT}/cart`

/** Dominio de marca Chocolate Benevolo — alias de la misma tienda Shopify Colab. */
export const BENEVOLO_SHOP_BRAND_HOST = "benevolo.shop"

/**
 * Host para fichas/carrito Benevolo.
 * Default = tienda Colab (funciona hoy). Tras conectar DNS en Shopify Admin,
 * setear `NEXT_PUBLIC_BENEVOLO_SHOP_DOMAIN=benevolo.shop`.
 */
export const BENEVOLO_SHOPIFY_DOMAIN =
  envTrim("NEXT_PUBLIC_BENEVOLO_SHOP_DOMAIN") || COLAB_SHOPIFY_DOMAIN

export const BENEVOLO_SHOPIFY_STOREFRONT = `https://${BENEVOLO_SHOPIFY_DOMAIN}`
export const BENEVOLO_SHOP_BRAND_URL = `https://${BENEVOLO_SHOP_BRAND_HOST}`

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

const envVariant = (key: string) => envTrim(key)

/** Variant ID público de Bars. (products.json storefront). Override con env. */
const BARS_BENEVOLO_VARIANT_FALLBACK = "51232297222396"

export type BenevoloShopifySku = {
  handle: string
  collectionHandle: string
  title: string
  priceCopLabel: string
  variantId: string
  blurb: string
  campusHref: string
  marketingHref: string
}

export const benevoloShopifySku: BenevoloShopifySku = {
  handle: "bars-benevolo",
  collectionHandle: "bars-benevolo",
  title: "Bars. Benevolo · 80 g",
  priceCopLabel: "COP 20.000 · preventa",
  variantId: envVariant("NEXT_PUBLIC_SHOPIFY_VARIANT_BARS_BENEVOLO") || BARS_BENEVOLO_VARIANT_FALLBACK,
  blurb:
    "Duja de marañón sugar free · 80 g. Ficha oficial en la tienda Shopify Colab; WhatsApp confirma el lote. Sin stock fingido.",
  campusHref: "/campus/benevolo",
  marketingHref: "/benevolo",
}

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
    blurb: "Chocolate de leche con marañón · sugar free · preventa · Benevolo.shop.",
    priceLabel: "Preventa",
    href: `${BENEVOLO_SHOPIFY_STOREFRONT}/products/bars-benevolo`,
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
export function shopifyCartCheckoutUrl(
  variantId: string,
  quantity = 1,
  storefront = COLAB_SHOPIFY_STOREFRONT,
) {
  if (!variantId) return null
  return `${storefront}/cart/${variantId}:${quantity}`
}

export function benevoloProductUrl() {
  return `${BENEVOLO_SHOPIFY_STOREFRONT}/products/${benevoloShopifySku.handle}`
}

export function benevoloCollectionUrl() {
  return `${BENEVOLO_SHOPIFY_STOREFRONT}/collections/${benevoloShopifySku.collectionHandle}`
}

export function benevoloCartUrl(quantity = 1) {
  return shopifyCartCheckoutUrl(
    benevoloShopifySku.variantId,
    quantity,
    BENEVOLO_SHOPIFY_STOREFRONT,
  )
}

export function benevoloCheckoutUrl() {
  const cart = benevoloCartUrl()
  if (cart) {
    return { href: cart, mode: "shopify" as const, productHref: benevoloProductUrl() }
  }
  return {
    href: benevoloProductUrl(),
    mode: "shopify-product" as const,
    productHref: benevoloProductUrl(),
  }
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
