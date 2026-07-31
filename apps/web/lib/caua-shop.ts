/**
 * Shop CAÚA (cauacolombia.co) · coberturas y nibs
 * URLs verificadas vía sitemap Shopify. Precios/stock los define la tienda.
 *
 * Convergencia de nodos: CAÚA (protocolo + retail) × Zurych (bean-to-bar Santander)
 * como punto de pedido de coberturas y nibs para cocina y mesa Colab.
 */

export const CAUA_SHOP_HOME = "https://cauacolombia.co"
export const CAUA_SHOP_COLLECTION = "https://cauacolombia.co/collections/all"
export const ZURYCH_SHOP_HOME = "https://chocolatezurych.com"

export type ShopSku = {
  id: string
  title: string
  kind: "cobertura" | "nibs" | "kit" | "membresia"
  cacaoPct?: string
  sweetener?: string
  origin: string
  format: string
  nodes: ("CAÚA" | "Zurych" | "Quara")[]
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
    nodes: ["CAÚA", "Zurych"],
    role: "Intensidad máxima para temperar y barras dark · convergencia con cobertura 100 % Zurych.",
    href: "https://cauacolombia.co/products/cobertura-cacao-100-origen-santander-1kg",
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
    nodes: ["CAÚA", "Zurych"],
    role: "Dark con dulzor de panela — puente entre oficio Colab y mesa saludable.",
    href: "https://cauacolombia.co/products/cobertura-de-chocolate-85-cacao-santander-1kg-endulzado-con-panela",
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
    nodes: ["CAÚA", "Zurych"],
    role: "Categoría hermana del Master Chocolatier 70 % — pedir en shop CAÚA; Zurych publica 70 % bean-to-bar.",
    href: "https://cauacolombia.co/products/cobertura-cacao-70-panela-santander-1kg",
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
    nodes: ["CAÚA", "Zurych"],
    role: "Perfil de dulzor alternativo alineado a coberturas 60 % del nodo Zurych.",
    href: "https://cauacolombia.co/products/cobertura-cacao-60-maltitol-santander-1kg",
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
    nodes: ["CAÚA"],
    role: "Línea blanca del catálogo CAÚA Santander — verifica ficha en shop antes de formular.",
    href: "https://cauacolombia.co/products/cobertura-cacao-blanca-40-santander-1kg",
    askLabel: "Quiero cobertura blanca 40 %",
  },
  {
    id: "nibs-arauca",
    title: "NIBS™ bioactivo · Arauca",
    kind: "nibs",
    origin: "Arauca",
    format: "100 g",
    nodes: ["CAÚA", "Quara"],
    role: "Nibs de origen Arauca — puente al nodo Quara / FEAR 5 y al ritual Colab.",
    href: "https://cauacolombia.co/products/nibs%E2%84%A2-de-cacao-bioactvio-origen-arauca-100gr",
    askLabel: "Quiero NIBS Arauca",
  },
  {
    id: "nibs-santander",
    title: "NIBS™ tostado · Santander",
    kind: "nibs",
    origin: "Santander",
    format: "100 g",
    nodes: ["CAÚA", "Zurych"],
    role: "Nibs tostados Santander — convergencia con nibs 100 % sin azúcar de Zurych (@tiendazurych).",
    href: "https://cauacolombia.co/products/nibs-cacao-tostado-santander-100gr",
    askLabel: "Quiero NIBS Santander",
  },
  {
    id: "ritual-pack",
    title: "Ritual Pack · Cobertura 100 × NIBS",
    kind: "kit",
    origin: "Santander + mix",
    format: "Kit 30 días",
    nodes: ["CAÚA", "Zurych"],
    role: "Kit completo para pedir coberturas + nibs en un solo gesto de shop.",
    href: "https://cauacolombia.co/products/ritual-pack-cacao-nibs-bebida-funcional",
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
    id: "shop-caua",
    label: "Tienda CAÚA",
    sub: "Coberturas y nibs · cauacolombia.co",
    href: CAUA_SHOP_COLLECTION,
    external: true,
    event: "caua_shop_clicked",
  },
  {
    id: "wa-coberturas",
    label: "Pedir coberturas por WhatsApp",
    sub: "Colab × CAÚA · te orientamos SKU y uso",
    href:
      "https://wa.me/573102227848?text=" +
      encodeURIComponent(
        "Hola Cacao Colab — quiero pedir coberturas CAÚA (Santander) / convergencia Zurych. ¿Me orientan?",
      ),
    external: true,
    event: "sponsor_interest",
  },
  {
    id: "wa-nibs",
    label: "Pedir NIBS por WhatsApp",
    sub: "Arauca o Santander · ritual y topping",
    href:
      "https://wa.me/573102227848?text=" +
      encodeURIComponent(
        "Hola Cacao Colab — quiero NIBS CAÚA (Arauca o Santander) y saber cómo conectar con Zurych.",
      ),
    external: true,
    event: "sponsor_interest",
  },
  {
    id: "shop-zurych",
    label: "Nodo Zurych",
    sub: "Coberturas bean-to-bar · chocolatezurych.com",
    href: ZURYCH_SHOP_HOME,
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
    encodeURIComponent(`Hola Cacao Colab — ${sku.askLabel} (${sku.format}). Vi el shop CAÚA / convergencia Zurych.`)
  )
}
