/**
 * Ruta pública: de ceros → maestría chocolatier → Collaboratorio R&D.
 * Esencia del Colab: el nodo no solo aprende — publica producto con criterio.
 */

export const COLLABORATORIO_PATH = "/collaboratorio"

export type RutaActor = "emprendedor" | "marca" | "nodo"

export type RutaStep = {
  n: string
  phase: string
  title: string
  forWho: RutaActor[]
  body: string
  evidence: string
  href: string
  cta: string
}

/** Escalones operativos que un nodo puede seguir hoy. */
export const colabRutaSteps: RutaStep[] = [
  {
    n: "01",
    phase: "Ceros",
    title: "Llegar con hambre, sin pose",
    forWho: ["emprendedor", "marca", "nodo"],
    body: "Entras al Colab sin medalla inventada. Eliges propósito (finca, marca o aliado) y dejas que Dualita te ponga el primer mapa: excelencia es lenguaje compartido, no ego.",
    evidence: "Cuenta + onboarding de propósito",
    href: "/unete",
    cta: "Unirme al Colab →",
  },
  {
    n: "02",
    phase: "Hábito",
    title: "Dualita + Sembrar: evidencia diaria",
    forWho: ["emprendedor", "nodo"],
    body: "Micro CAÚA y MOOC Zurych construyen criterio en minutos; Sembrar convierte ese criterio en labranza, bitácora y Mazorcas Doradas. Aquí nace el rango — no el discurso.",
    evidence: "Módulo completo · día de cuidado · MD ganadas",
    href: "/aprende",
    cta: "Abrir campus →",
  },
  {
    n: "03",
    phase: "Oficio",
    title: "Arquitecto + Catador: tipicidad defendible",
    forWho: ["emprendedor", "marca", "nodo"],
    body: "Master Cacaotier enseña fermentación con método; Master Catador enseña a oler y nombrar sin inventar DO. El pesimismo del oficio se vuelve dato — y microvictoria.",
    evidence: "Diploma Arquitecto o Catador · ficha de lote",
    href: "/aprende/catador",
    cta: "Ver Catador →",
  },
  {
    n: "04",
    phase: "Maestría",
    title: "Chocolatier: de la mazorca a la barra 70 %",
    forWho: ["emprendedor", "marca"],
    body: "Master Chocolatier cierra el arco Fine-Flavor: tipicidad, lente CoEx/Awards y barra con criterio. No es un logo de premio — es oficio que se puede repetir y enseñar.",
    evidence: "Diploma Chocolatier · nota de primer intento",
    href: "/aprende/chocolatier",
    cta: "Ruta Chocolatier →",
  },
  {
    n: "05",
    phase: "Collaboratorio",
    title: "R&D: del campus al producto real",
    forWho: ["marca", "nodo"],
    body: "El Collaboratorio es la esencia Colab: prototipar en público. Coberturas, set de catación y marcas aceleradas viven en R&D — con honestidad de lo que sí y no está listo.",
    evidence: "SKU documentada · preventa · track Dualita",
    href: "/rd",
    cta: "Entrar a R&D →",
  },
  {
    n: "06",
    phase: "Página de producto",
    title: "Tu nodo publica su propia barra",
    forWho: ["marca", "nodo"],
    body: "Bars. es el ejemplo: output de aceleración con empaque, preorden y casa en el Colab — no un dominio paralelo. Cada nodo puede aspirar a su página de producto con la misma rigurosidad.",
    evidence: "Página de producto Colab · bio de nodo · muro",
    href: "/benevolo",
    cta: "Ver Bars. como modelo →",
  },
]

export const colabRutaTracks = [
  {
    id: "emprendedor" as const,
    eyebrow: "Emprendedor · de ceros",
    title: "Construyes criterio antes que marca",
    body: "Empiezas sin portafolio. Dualita, Sembrar y los Masters te dan lenguaje de excelencia. El diploma no es el fin: es permiso para prototipar con responsabilidad.",
    milestones: ["Unirme", "Primera MD en Sembrar", "Arquitecto o Catador", "Chocolatier", "Prototipo en R&D"],
  },
  {
    id: "marca" as const,
    eyebrow: "Marca · aceleración",
    title: "Traduces oficio a deseo de mesa",
    body: "Ya tienes origen o transformación. El Colab te pide tipicidad legible, fórmula honesta y una página de producto que invite a preordenar — sin inventar medallas.",
    milestones: ["Bio de nodo", "Track Dualita", "Fórmula documentada", "Empaque / campaña", "Página en R&D"],
  },
  {
    id: "nodo" as const,
    eyebrow: "Nodo · red",
    title: "Tu territorio se vuelve puerta pública",
    body: "La bio de nodo es el primer escaparate. El Collaboratorio es el siguiente: producto, coberturas o set que otros nodos puedan catar, pedir y mejorar juntos.",
    milestones: ["Publicar /nodo", "Conectar aliados", "Sumar evidencia", "Output R&D", "Invitar a la red"],
  },
]

export const collaboratorioEssence = {
  title: "Collaboratorio",
  tagline: "La esencia del Colab: aprender hasta poder publicar producto.",
  lede: "No basta con un curso. El Colab es un laboratorio colaborativo donde emprendedores y marcas pasan de ceros a maestría chocolatier — y dejan una página de producto que otros nodos puedan imitar.",
  principles: [
    {
      title: "Criterio antes que hype",
      body: "Fermentación, panel y barra se ganan con microvictorias. El muro celebra diplomas reales, no medallas ajenas.",
    },
    {
      title: "Producto en casa Colab",
      body: "La página de producto vive en cacaocolab.org/rd — no en un micrositio paralelo que desconecta la red.",
    },
    {
      title: "Nodos que se contagian",
      body: "Si un nodo publica Bars. con rigor, el siguiente quiere su propia SKU. Esa es la gravedad del Collaboratorio.",
    },
  ],
  caseStudy: {
    name: "Bars. · Chocolate Benevolo",
    role: "Output de aceleración R&D",
    body: "De track Dualita + FEAR 5 Quara × Zurych a empaque, preventa y página de producto. Modelo para que tu nodo publique el suyo.",
    href: "/benevolo",
    cta: "Abrir el modelo Bars. →",
  },
}

/** Actualiza el último peldaño del funnel corto hacia producto. */
export const colabRutaFunnelTail = {
  n: "06",
  title: "Producto R&D",
  href: "/benevolo",
  note: "Página de producto · Collaboratorio",
} as const
