/**
 * Bars. · Output de aceleración R&D del Colab
 * Producto nativo cacaotier en cacaocolab.org — no dominio Benevolo.co aparte.
 */

export const BARS_PRODUCT_PATH = "/rd/bars"
export const BARS_PRODUCT_URL = `https://cacaocolab.org${BARS_PRODUCT_PATH}`

export const barsPackaging = {
  sku: "BARS-FEAR5-80",
  name: "Bars.",
  brandLine: "cacaotier · Chocolate Benevolo",
  house: "Cacao Colab · R&D",
  category: "Duja de Marañón sugar free",
  netWeight: "80 g",
  formatLine: "Chocolatina de leche con frutos secos. Neto 80 g.",
  genotype: "FEAR 5",
  originSeal: "Cacao colombiano de origen",
  node: "Quara Cacao · Tame · Arauca",
  transform: "Zurych SAS · Bogotá / Landázuri",
  /** Dimensiones wrapper landscape (mm) — print artboard */
  artboardMm: { width: 180, height: 95, bleed: 3 },
  colors: {
    orange: "#F05A28",
    navy: "#15243F",
    cream: "#F7F1EE",
    white: "#FFFFFF",
    ink: "#140E0A",
  },
  assets: {
    packshot: "/benevolo/bars-fear5.png",
    frontSvg: "/benevolo/packaging/bars-fear5-front.svg",
    backSvg: "/benevolo/packaging/bars-fear5-back.svg",
  },
} as const

export const barsFrontCopy = {
  brand: "CHOCOLATE BENEVOLO",
  sub: "DUJA DE MARAÑÓN",
  sugarFree: "SUGAR FREE",
  wordmark: "Bars.",
  footerLeft: "Chocolatina de leche con frutos secos. Neto 80 g.",
  footerRight: "cacaocolab.org/rd/bars",
  sealCenter: "FEAR 5",
  sealRing: "CACAO COLOMBIANO DE ORIGEN",
} as const

export const barsBackCopy = {
  eyebrow: "Output de aceleración · Cacao Colab",
  headline: "Bars.",
  lede:
    "Contiene la majestuosidad del cacao FEAR 5 Trinitario, la untuosidad del marañón y la cremosidad de la leche en polvo en una chocolatina indulgente con almendras y avellanas. Endulzada con alulosa y stevia.",
  processTitle: "Benevolencia del oficio",
  process:
    "En los detalles está la benevolencia de nuestros procesos: fermentación controlada, tostión a temperatura baja por tiempo corto y refino exacto para integrar y elevar el Fine-Flavor. Técnica tipo duja italiana con ingredientes naturales colombianos.",
  invite:
    "Disfruta una barra de untuosidad infinita que te conecte con tus mejores intenciones — bien hecha y libre de remordimiento.",
  colabPitch:
    "Bars. es un output del laboratorio R&D del Colab: cacaotier acelera criterio de origen hasta la mesa. No es un dominio aparte — es producto nativo en cacaocolab.org.",
  ingredientsTitle: "Ingredientes",
  ingredients: [
    "Masa / licor de cacao FEAR 5 (Quara · Arauca)",
    "Duja de marañón",
    "Almendras y avellanas",
    "Leche en polvo orgánica",
    "Alulosa",
    "Ácido cítrico",
    "Stevia",
  ],
  legal: [
    "Elaborado por: Zurych SAS · NSA-0011242-2021 · Bogotá, Colombia",
    "Output R&D para Cacao Colab · marca nativa cacaotier",
    "Contacto WhatsApp: +57 310 222 7848",
  ],
  tagline: "Siente la benevolencia de la barra de autor del Colab.",
  qrLabel: "Escanea · une al Colab",
  qrUrl: BARS_PRODUCT_URL,
} as const

export const barsProductPage = {
  title: "Bars. · producto R&D del Colab",
  description:
    "Duja de Marañón sugar free FEAR 5 Quara × Zurych. Output de aceleración cacaotier en Cacao Colab — empaque listo para campaña e impresión.",
  heroEyebrow: "R&D Colab · Output de aceleración",
  heroTitle: "Bars.",
  heroSub: "Duja de Marañón sugar free · FEAR 5",
  heroLede:
    "La barra que traduce el campus cacaotier a la mesa: origen Quara, oficio Zurych, marca nativa del Colab. Empaque en capas para campaña e impresión — no hace falta inventar Benevolo.co.",
  claims: [
    { label: "Casa", value: "Cacao Colab · R&D" },
    { label: "Marca", value: "cacaotier · Benevolo" },
    { label: "Genética", value: "FEAR 5 · Quara · Arauca" },
    { label: "Formato", value: "Bars. · 80 g" },
  ],
  pillars: [
    {
      n: "01",
      title: "Origen legible",
      body: "FEAR 5 del nodo Quara en Tame, Arauca. Fermentación con criterio Master Cacaotier — tipicidad antes que moda.",
      href: "/aprende/cacaotier",
      cta: "Campus cacaotier →",
    },
    {
      n: "02",
      title: "Oficio de transformación",
      body: "Zurych aporta refino y duja. Tendencia gianduja con marañón colombiano, sugar free sin tapar el cacao.",
      href: "/rd/coberturas",
      cta: "Coberturas CAÚA × Zurych →",
    },
    {
      n: "03",
      title: "Aceleración Dualita",
      body: "Track corto de marca: tendencia × territorio, formulación y preorden colectiva. Diploma compartible en el muro.",
      href: "/campus/benevolo",
      cta: "Abrir aceleración →",
    },
  ],
  preorderWhatsapp:
    "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20preordenar%20Bars.%20Duja%20de%20Mara%C3%B1%C3%B3n%20sugar%20free%20FEAR%205%20(80g)%20%C2%B7%20cacaocolab.org%2Frd%2Fbars",
  whatIsReady: [
    "Arte de empaque frente + dorso en SVG por capas (impresión / campaña)",
    "Página de producto Colab en /rd/bars (casa canónica)",
    "Fórmula FEAR 5 × duja × leche orgánica × alulosa/stevia",
    "Track Dualita de aceleración + preventa WhatsApp",
  ],
  whatIsNotReady: [
    "Checkout con inventario confirmado",
    "Dominio Benevolo.co como tienda separada (no es la estrategia)",
    "Medalla CoEx atribuida a esta SKU (usamos el lente, no el premio)",
  ],
} as const
