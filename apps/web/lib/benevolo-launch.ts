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

export const benevoloInstagram = {
  handle: BENEVOLO_INSTAGRAM_HANDLE,
  url: BENEVOLO_INSTAGRAM_URL,
  linkInBio: "https://cacaocolab.org/benevolo/noviembre",
  outletNote:
    "Infonegocios titula Benévolo. En voz de marca el nombre es Benevolo, sin tilde.",
  bio: [
    "Chocolate Benevolo",
    "Bars. · cacao colombiano de origen",
    "Prelanzamiento noviembre",
    "Preventa · WhatsApp confirma el lote",
    "cacaocolab.org/benevolo/noviembre",
  ].join("\n"),
  highlights: [
    { name: "Origen", body: "FEAR 5 · Federación Arauquita 5 · Trinitario Fedecacao" },
    { name: "Fermenta", body: "Cerca del 80 % del fine flavor nace en fermentación, no en la tostión." },
    { name: "Bars.", body: "Chocolatina de leche con marañón salado. Preventa." },
    { name: "Prensa", body: "Infonegocios Colombia · 8 sep 2026" },
    { name: "Noviembre", body: "Ventana de lanzamiento publicada. No es un día de planta." },
    { name: "Colab", body: "Conocimiento y formación. Comprar contexto, no solamente chocolate." },
  ],
  rules: [
    "Benevolo sin tilde en pies propios. El titular de Infonegocios puede citarse con tilde.",
    "FEAR 5 por nombre y origen — no restar % de cacao en este copy.",
    "Bons. está anunciado; todavía no es SKU de tienda.",
    "Estados Unidos, Madrid, China y Japón son intenciones, no tiendas abiertas.",
    "Preventa + WhatsApp de lote. Sin stock, CoEx ni seguidores inventados.",
  ],
  calendar: [
    { when: "Hoy", channel: "Feed + stories", postId: "prensa" as const },
    { when: "Día 2", channel: "Feed cita", postId: "quote" as const },
    { when: "Día 3", channel: "Carrusel", postId: "fear5" as const },
    { when: "Día 4", channel: "Feed producto", postId: "bars" as const },
    { when: "Día 5", channel: "Feed manifiesto", postId: "benevolente" as const },
    { when: "Día 6", channel: "Feed tesis", postId: "entender" as const },
    { when: "Cada lunes", channel: "Stories countdown", postId: "noviembre" as const },
  ],
  posts: [
    {
      id: "prensa",
      format: "Feed",
      title: "Salió la nota",
      hook: "Hoy nos leyeron en Infonegocios.",
      frame: {
        kicker: "Infonegocios · 8 sep",
        wordmark: "Bars.",
        display: "Hoy nos leyeron.",
        support: "Prelanzamiento noviembre. No es mercado abierto.",
      },
      caption: `Hoy Infonegocios Colombia publicó la historia de Benevolo: una chocolatina de origen que busca llegar a Estados Unidos en noviembre.

No es mercado abierto todavía. Es prelanzamiento. Bars. se hace en Colombia, en small batch. WhatsApp confirma el lote.

Leer: ${benevoloPress.url}

Prelanzamiento → cacaocolab.org/benevolo/noviembre
@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
    {
      id: "quote",
      format: "Feed · cita",
      title: "Comprar contexto",
      hook: "Que sepa a chocolate. Que detrás haya origen.",
      frame: {
        kicker: "Amaury Amed",
        display: "Antojo, no pretensión.",
        quote:
          "Que sepa a una barra de chocolate. Que detrás haya origen, fermentación e historia.",
        support: "Infonegocios Colombia",
      },
      caption: `“Quiero que sea una chocolatina que cuando la pruebes digas: esto es una barra de chocolate, pero detrás hay un origen, una fermentación y un cacao colombiano que tienen una historia.”

— Amaury Amed, Infonegocios Colombia

Eso es Benevolo: antojo, no pretensión.

@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
    {
      id: "fear5",
      format: "Carrusel",
      title: "FEAR 5 + fermentación",
      hook: "El cacao de especialidad se parece más al café de especialidad de lo que creemos.",
      frame: {
        kicker: "Origen · Fedecacao",
        display: "FEAR 5",
        quote: "Federación Arauquita 5. Cerca del 80 % del fine flavor nace en fermentación.",
        support: "Trinitario colombiano · microlotes",
      },
      caption: `FEAR 5 = Federación Arauquita 5. Cacao trinitario colombiano de Fedecacao.

Amaury lo pone al centro por sabor, aroma y apariencia — y porque la fermentación controlada, no tanto la tostión, carga cerca del 80 % del fine flavor.

Microlotes. Pequeños productores. Historia en la barra.

@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
    {
      id: "bars",
      format: "Feed",
      title: "Bars. y Bons.",
      hook: "El comienzo es una chocolatina. Después, el bombón.",
      frame: {
        kicker: "Línea",
        wordmark: "Bars.",
        display: "El comienzo es una chocolatina.",
        quote: "Bons. anunciado. Todavía no es SKU de tienda.",
        support: "Marañón salado · preventa Benevolo.shop",
      },
      caption: `Bars. · cacao colombiano · chocolatina de leche · marañón salado.

Bons. · bombones rellenos de dátil con marañón salado — anunciado, todavía no es SKU de tienda.

El marañón también es territorio.

Preventa Bars. en Benevolo.shop. Noviembre es la ventana.

@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
    {
      id: "benevolente",
      format: "Feed",
      title: "Bueno para todos",
      hook: "Benevolente: el cacao para quien lo come, quien lo produce y el territorio.",
      frame: {
        kicker: "Benevolente",
        display: "Bueno para todos.",
        quote: "Para quien lo come, quien lo produce y el territorio.",
        support: "Cacao Colab · conocimiento y oficio",
      },
      caption: `“Si utilizas todos los residuos del cacao y les metes tecnología, puedes generar nuevos productos. Para mí eso también es parte de lo benevolente.”

No es solo una barra más sofisticada. Es Cacao Colab: conocimiento, formación y una forma de mirar el cacao colombiano.

Comprar contexto, no solamente chocolate.

@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
    {
      id: "entender",
      format: "Feed · cita",
      title: "Entender el cacao",
      hook: "No solamente una marca de chocolate.",
      frame: {
        kicker: "Tesis",
        display: "Comprar contexto.",
        quote: "No solamente chocolate. Una manera de entender el cacao.",
        support: "Link in bio · noviembre",
      },
      caption: `“No quiero que Benevolo sea solamente una marca de chocolate. Quiero que sea una manera de entender el cacao. Que cuando alguien vea el producto pueda preguntarse de dónde viene, qué cacao es, cómo fue fermentado y qué hay detrás de esa barra.”

Si la gente empieza a comprar contexto y no solamente chocolate, cambia la conversación alrededor del cacao colombiano.

Prelanzamiento → cacaocolab.org/benevolo/noviembre
@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
    {
      id: "noviembre",
      format: "Story + feed",
      title: "Cuenta atrás",
      hook: "Noviembre. Preventa ahora.",
      frame: {
        kicker: "Ventana publicada",
        wordmark: "Bars.",
        display: "Noviembre.",
        quote: "Preventa ahora. WhatsApp confirma el lote.",
        support: "Intención: Estados Unidos — no tienda abierta",
      },
      caption: `Lanzamiento previsto para noviembre. Primera apuesta: Estados Unidos. También se exploran Madrid, China y Japón — son intenciones, no tiendas abiertas.

Small batch: de 250 a 500 kg al inicio, con techo aliado de 1 t/mes.

Cuenta atrás y preorden:
cacaocolab.org/benevolo/noviembre

@${BENEVOLO_INSTAGRAM_HANDLE}`,
    },
  ],
} as const

export function getBenevoloIgPost(id: string) {
  return benevoloInstagram.posts.find((post) => post.id === id) ?? null
}

export function benevoloIgFeedPath(id: string) {
  return `/benevolo/ig/${id}.html`
}

export function benevoloIgPngPath(id: string) {
  return `/benevolo/ig/${id}.png`
}

export function benevoloIgStoryPath() {
  return "/benevolo/ig/noviembre-story.html"
}

export const benevolo360 = [
  {
    id: "prensa",
    kicker: "Prensa",
    title: "Infonegocios, 8 sep",
    body: "El artículo del día: chocolatina de origen, fermentación y la apuesta de salir de Colombia con Bars.",
    href: benevoloPress.url,
    cta: "Leer la nota",
    external: true,
  },
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
    body: "Seguir la conversación ahí. El guion de la semana (prensa → origen → preventa) está en esta página.",
    href: BENEVOLO_INSTAGRAM_URL,
    cta: "Seguir en Instagram",
    external: true,
  },
  {
    id: "guion",
    kicker: "Editorial",
    title: "Guion de prelanzamiento",
    body: "Siete piezas listas para pegar: la nota de hoy, FEAR 5, fermentación ~80 %, Bars. y el cierre de comprar contexto.",
    href: "#comunidad",
    cta: "Abrir el 360",
    external: false,
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
