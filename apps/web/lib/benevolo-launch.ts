/**
 * Prelanzamiento Benevolo · noviembre 2026
 *
 * Fuente pública: Infonegocios Colombia (8 sep 2026).
 * No inventa día de fábrica, stock ni mercado ya abierto.
 */

export const BENEVOLO_INSTAGRAM_HANDLE = "chocolate.benevolo"
export const BENEVOLO_INSTAGRAM_URL = "https://www.instagram.com/chocolate.benevolo/"

/** Inicio de la ventana publicada: noviembre 2026 (medianoche America/Bogota). */
export const BENEVOLO_LAUNCH_AT = new Date("2026-11-01T05:00:00.000Z")

export const benevoloPress = {
  outlet: "Infonegocios Colombia",
  title: "Benévolo, la chocolatina con la que el cacao colombiano busca conquistar Estados Unidos",
  url: "https://infonegocios.com.co/nota-principal-2/benevolo-la-chocolatina-con-la-que-el-cacao-colombiano-busca-conquistar-estados-unidos",
  published: "2026-09-08",
  launchedWindow: "noviembre 2026",
  firstMarket: "Estados Unidos (primera apuesta comercial, no mercado ya abierto)",
} as const

export const benevoloLaunchCopy = {
  kicker: "Prelanzamiento · noviembre",
  headline: "Noviembre.",
  subhead:
    "Lanzamiento previsto para noviembre, con Bars. hecha en Colombia. Preventa ahora; WhatsApp confirma el lote.",
  quote:
    "Quiero que sea una chocolatina que cuando la pruebes digas: esto es una barra de chocolate, pero detrás hay un origen, una fermentación y un cacao colombiano que tienen una historia.",
  quoteAttr: "Amaury Amed · Infonegocios Colombia",
  fermentation:
    "En la nota, Amaury resume el estudio Colab: la fermentación tiene cerca del 80 % de la incidencia en el fine flavor — no tanto la tostión.",
  fear5:
    "FEAR 5 (Federación Arauquita 5): cacao trinitario colombiano de Fedecacao, centro de la propuesta de origen.",
  lines: {
    bars: "Bars. · gran formato · cacao colombiano · chocolatina de leche · marañón salado",
    bons: "Bons. · bombones rellenos de dátil con marañón salado (anunciado; aún no es SKU de tienda)",
  },
  scale:
    "Small batch: capacidad aliada de hasta 1 t/mes; volumen inicial posible 250–500 kg. Meta de largo plazo ~10 t, sin perder microlotes.",
  honesty: [
    "La fecha es ventana de noviembre, no un día de planta confirmado.",
    "Estados Unidos, Madrid, China y Japón son intenciones de mercado — no ventas abiertas.",
    "Preventa Shopify + WhatsApp de lote. Sin stock inventado ni medalla CoEx en Bars.",
  ],
} as const

export const benevolo360 = [
  {
    id: "preorden",
    kicker: "Producto",
    title: "Preventa Bars.",
    body: "Misma caja Shopify Colab. Benevolo.shop es el dominio de marca. 80 g · Duja de Marañón sugar free · FEAR 5.",
    href: "/benevolo#preorden",
    cta: "Preordenar",
    external: false,
  },
  {
    id: "instagram",
    kicker: "Comunidad",
    title: "@chocolate.benevolo",
    body: "El 360 de prelanzamiento vive en Instagram: contexto, origen y antojo — no solo la barra.",
    href: BENEVOLO_INSTAGRAM_URL,
    cta: "Seguir en Instagram",
    external: true,
  },
  {
    id: "whatsapp",
    kicker: "Lote",
    title: "WhatsApp confirma",
    body: "+57 310 222 7848. Pregunta por el lote; no prometemos envío inmediato.",
    href: "https://wa.me/573102227848?text=Hola%20Chocolate%20Benevolo%2C%20vi%20Infonegocios%20y%20quiero%20preordenar%20Bars.%20para%20noviembre.",
    cta: "Escribir",
    external: true,
  },
  {
    id: "colab",
    kicker: "Conocimiento",
    title: "Cacao Colab",
    body: "Formación, fermentación y oficio. Benevolo es la chocolatina; Colab es cómo se entiende el cacao.",
    href: "/campus/benevolo",
    cta: "Abrir aceleración",
    external: false,
  },
] as const

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  arrived: boolean
}

export function remainingUntil(targetMs: number, nowMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - nowMs)
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1_000)
  return { days, hours, minutes, seconds, arrived: diff === 0 }
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0")
}
