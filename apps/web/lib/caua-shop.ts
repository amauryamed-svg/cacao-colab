/**
 * Shop Colab · coberturas y nibs
 * Precios/stock los define la tienda (cacao-colab.myshopify.com).
 *
 * 2026-09-05: coberturas, nibs y el Ritual Pack ya existen como productos reales
 * en cacao-colab.myshopify.com (precios referenciales de mercado, pendientes de
 * confirmar con el equipo — ver tag `precio-referencial` en cada producto). El
 * punto de compra primario es el checkout de Shopify; WhatsApp queda como canal
 * secundario de asesoría, no como único punto de pedido.
 */

export const COLAB_STORE_DOMAIN = "https://cacao-colab.myshopify.com"
export const ZURYCH_INSTAGRAM = "https://www.instagram.com/tiendazurych/"

export type ShopSku = {
  id: string
  title: string
  kind: "cobertura" | "nibs" | "kit" | "membresia"
  cacaoPct?: string
  sweetener?: string
  origin: string
  format: string
  nodes: ("Zurych" | "Quara")[]
  role: string
  href: string
  askLabel: string
}

export const cauaShopSkus: ShopSku[] = [
  {
    id: "cob-100",
    title: "Cobertura 100 % · Santander",
    kind: "cobertura",
    cacaoPct: "100 %",
    sweetener: "Sin azúcar añadida",
    origin: "Santander",
    format: "1 kg",
    nodes: ["Zurych"],
    role: "Intensidad máxima para temperar y barras dark · convergencia con cobertura 100 % Zurych.",
    href: `${COLAB_STORE_DOMAIN}/products/cobertura-100-santander`,
    askLabel: "Quiero cobertura 100 % Santander",
  },
  {
    id: "cob-85",
    title: "Cobertura 85 % · panela",
    kind: "cobertura",
    cacaoPct: "85 %",
    sweetener: "Panela",
    origin: "Santander",
    format: "1 kg",
    nodes: ["Zurych"],
    role: "Dark con dulzor de panela — puente entre oficio Colab y mesa saludable.",
    href: `${COLAB_STORE_DOMAIN}/products/cobertura-85-panela`,
    askLabel: "Quiero cobertura 85 % panela",
  },
  {
    id: "cob-70",
    title: "Cobertura 70 % · panela",
    kind: "cobertura",
    cacaoPct: "70 %",
    sweetener: "Panela",
    origin: "Santander",
    format: "1 kg",
    nodes: ["Zurych"],
    role: "Categoría hermana del Master Chocolatier 70 % — Zurych publica 70 % bean-to-bar.",
    href: `${COLAB_STORE_DOMAIN}/products/cobertura-70-panela`,
    askLabel: "Quiero cobertura 70 % panela",
  },
  {
    id: "cob-60",
    title: "Cobertura 60 % · maltitol",
    kind: "cobertura",
    cacaoPct: "60 %",
    sweetener: "Maltitol",
    origin: "Santander",
    format: "1 kg",
    nodes: ["Zurych"],
    role: "Perfil de dulzor alternativo alineado a coberturas 60 % del nodo Zurych.",
    href: `${COLAB_STORE_DOMAIN}/products/cobertura-60-maltitol`,
    askLabel: "Quiero cobertura 60 % maltitol",
  },
  {
    id: "cob-blanca",
    title: "Cobertura blanca 40 %",
    kind: "cobertura",
    cacaoPct: "40 %",
    sweetener: "Según ficha de tienda",
    origin: "Santander",
    format: "1 kg",
    nodes: [],
    role: "Línea blanca de origen Santander — verifica ficha en shop antes de formular.",
    href: `${COLAB_STORE_DOMAIN}/products/cobertura-blanca-40`,
    askLabel: "Quiero cobertura blanca 40 %",
  },
  {
    id: "nibs-arauca",
    title: "NIBS™ bioactivo · Arauca",
    kind: "nibs",
    origin: "Arauca",
    format: "100 g",
    nodes: ["Quara"],
    role: "Nibs de origen Arauca — puente al nodo Quara / FEAR 5 y al ritual Colab.",
    href: `${COLAB_STORE_DOMAIN}/products/nibs-bioactivo-arauca`,
    askLabel: "Quiero NIBS Arauca",
  },
  {
    id: "nibs-santander",
    title: "NIBS™ tostado · Santander",
    kind: "nibs",
    origin: "Santander",
    format: "100 g",
    nodes: ["Zurych"],
    role: "Nibs tostados Santander — convergencia con nibs 100 % sin azúcar de Zurych (@tiendazurych).",
    href: `${COLAB_STORE_DOMAIN}/products/nibs-tostado-santander`,
    askLabel: "Quiero NIBS Santander",
  },
  {
    id: "ritual-pack",
    title: "Ritual Pack · Cobertura 100 × NIBS",
    kind: "kit",
    origin: "Santander + mix",
    format: "Kit 30 días",
    nodes: ["Zurych"],
    role: "Kit completo para pedir coberturas + nibs en un solo gesto de shop.",
    href: `${COLAB_STORE_DOMAIN}/products/ritual-pack-cobertura-100-nibs`,
    askLabel: "Quiero el Ritual Pack coberturas × nibs",
  },
]

export const coberturasConvergence = cauaShopSkus.filter((s) => s.kind === "cobertura")
export const nibsConvergence = cauaShopSkus.filter((s) => s.kind === "nibs" || s.kind === "kit")

export type ContactPoint = {
  id: string
  label: string
  sub: string
  href: string
  external?: boolean
  event?: "caua_shop_clicked" | "zurych_shop_clicked" | "sponsor_interest"
}

export const shopContactPoints: ContactPoint[] = [
  {
    id: "wa-coberturas",
    label: "Asesoría de coberturas por WhatsApp",
    sub: "Colab · te orientamos SKU y uso (compra real en la tienda Shopify)",
    href:
      "https://wa.me/573102227848?text=" +
      encodeURIComponent(
        "Hola Cacao Colab — quiero orientación sobre coberturas (Santander) / convergencia Zurych.",
      ),
    external: true,
    event: "sponsor_interest",
  },
  {
    id: "wa-nibs",
    label: "Asesoría de NIBS por WhatsApp",
    sub: "Arauca o Santander · ritual y topping (compra real en la tienda Shopify)",
    href:
      "https://wa.me/573102227848?text=" +
      encodeURIComponent(
        "Hola Cacao Colab — quiero orientación sobre NIBS (Arauca o Santander) y su conexión con Zurych.",
      ),
    external: true,
    event: "sponsor_interest",
  },
  {
    id: "shop-zurych",
    label: "Nodo Zurych",
    sub: "Coberturas bean-to-bar · @tiendazurych en Instagram",
    href: ZURYCH_INSTAGRAM,
    external: true,
    event: "zurych_shop_clicked",
  },
  {
    id: "ig-zurych",
    label: "@tiendazurych",
    sub: "Nibs 100 % y novedades en redes",
    href: "https://www.instagram.com/tiendazurych/",
    external: true,
    event: "zurych_shop_clicked",
  },
  {
    id: "rd-hub",
    label: "Hub R&D Colab",
    sub: "Benevolo + catálogo de convergencia",
    href: "/rd",
    external: false,
  },
]

export function waAskSku(sku: ShopSku) {
  return (
    "https://wa.me/573102227848?text=" +
    encodeURIComponent(`Hola Cacao Colab — ${sku.askLabel} (${sku.format}). Vi el shop en cacao-colab.myshopify.com.`)
  )
}
