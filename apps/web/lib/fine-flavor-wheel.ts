/**
 * Rueda Fine-Flavor Colab — lente de entrenamiento (no copia IP de CoEx ni Callebaut).
 *
 * Comparativa didáctica:
 * - CoEx: rueda + glosario para cacao (masa/chocolate) · core / complementary / off-flavours · score 0–10
 *   + formulario Excel oficial · Guide for the Evaluation of Cacao Quality and Flavour (2023).
 * - Callebaut / Chocolate Academy: lenguaje de chocolate (cacao, lácteos, tostado, fruta, etc.)
 *   orientado a aplicación en pastelería y barra — útil en Master Chocolatier.
 * - Colab: puente finca→panel→barra. Misma honestidad: lente, no medalla ni software CoEx.
 */

export type WheelRing = "core" | "complementary" | "defect" | "bridge"

export type WheelSpoke = {
  id: string
  label: string
  ring: WheelRing
  hue: number
  /** Descriptores de entrenamiento (Colab) */
  descriptors: string[]
  /** Eco CoEx (atributo homólogo, no cita literal de su glosario cerrado) */
  coexEcho: string
  /** Eco Callebaut / chocolate (aplicación) */
  callebautEcho: string
}

export const fineFlavorWheelMeta = {
  name: "Rueda Fine-Flavor Colab",
  version: "1.0",
  eyebrow: "Sensorial · lente Colab",
  principle:
    "Entrenamos vocabulario compartido para catar cacao colombiano Fine-Flavor. CoEx aporta el marco de evaluación de cacao; Callebaut el de chocolate aplicado; Colab une ambos sin atribuir medallas ni software oficial.",
  scaleNote: "Intensidad de entrenamiento 0–10 (como CoEx). Global Quality aparte: tipicidad + limpieza.",
  softwareNote:
    "CoEx publica formulario Excel / ficha impresa. El Colab usa ficha digital de entrenamiento en Catador — no sustituye el tool oficial del programa.",
  sources: [
    {
      label: "CoEx · Quality evaluation & protocols",
      href: "https://www.cacaoofexcellence.org/rd-laboratory-and-training/quality-evaluation-protocols",
    },
    {
      label: "CoEx · Tools for sensory evaluation (PDF)",
      href: "https://www.cacaoofexcellence.org/fileadmin/Websites/CocoaOfExcellence/docs/CoEx-Tools_For_Sensory_Evaluation-25Sept2023.pdf",
    },
    {
      label: "Chocolate Academy / Callebaut (contexto oficio)",
      href: "https://www.chocolate-academy.com/",
    },
  ],
} as const

/** Radios de la rueda Colab (orden visual horario). */
export const fineFlavorSpokes: WheelSpoke[] = [
  {
    id: "cacao",
    label: "Cacao",
    ring: "core",
    hue: 28,
    descriptors: ["cacao limpio", "cacao tostado", "cacao profundo"],
    coexEcho: "Core · cacao",
    callebautEcho: "Cocoa / chocolate base",
  },
  {
    id: "acidity",
    label: "Acidez",
    ring: "core",
    hue: 48,
    descriptors: ["cítrica", "acética baja", "frutal viva"],
    coexEcho: "Core · acidity (fruta / acética / láctica…)",
    callebautEcho: "Bright / fruit acid balance",
  },
  {
    id: "bitterness",
    label: "Amargor",
    ring: "core",
    hue: 18,
    descriptors: ["amargor limpio", "amargor seco"],
    coexEcho: "Core · bitterness",
    callebautEcho: "Bitterness in dark applications",
  },
  {
    id: "astringency",
    label: "Astringencia",
    ring: "core",
    hue: 8,
    descriptors: ["seca", "tánica baja", "retrogusto limpio"],
    coexEcho: "Core · astringency",
    callebautEcho: "Mouthfeel / tannin perception",
  },
  {
    id: "roast",
    label: "Tostado",
    ring: "core",
    hue: 14,
    descriptors: ["crudo", "desarrollado", "sobre-tostado"],
    coexEcho: "Core · roast degree",
    callebautEcho: "Roast profile (Callebaut lens)",
  },
  {
    id: "fresh-fruit",
    label: "Fruta fresca",
    ring: "complementary",
    hue: 95,
    descriptors: ["cítricos", "frutos rojos", "tropical"],
    coexEcho: "Complementary · fresh fruit",
    callebautEcho: "Fruit notes in couverture",
  },
  {
    id: "browned-fruit",
    label: "Fruta seca",
    ring: "complementary",
    hue: 38,
    descriptors: ["pasa", "higo", "fruta cocida"],
    coexEcho: "Complementary · browned fruit",
    callebautEcho: "Dried fruit / caramelised fruit",
  },
  {
    id: "floral",
    label: "Floral",
    ring: "complementary",
    hue: 300,
    descriptors: ["jazmín", "flor blanca", "perfume corto"],
    coexEcho: "Complementary · floral",
    callebautEcho: "Floral top notes",
  },
  {
    id: "nutty",
    label: "Nuez",
    ring: "complementary",
    hue: 32,
    descriptors: ["almendra", "nuez tostada", "marañón"],
    coexEcho: "Complementary · nutty",
    callebautEcho: "Nutty / praline bridge (Benevolo)",
  },
  {
    id: "spice",
    label: "Especias",
    ring: "complementary",
    hue: 12,
    descriptors: ["canela", "pimienta suave", "especiado seco"],
    coexEcho: "Complementary · spice",
    callebautEcho: "Spice in ganache / dark",
  },
  {
    id: "woody",
    label: "Madera",
    ring: "complementary",
    hue: 25,
    descriptors: ["madera limpia", "cedro suave"],
    coexEcho: "Complementary · woody",
    callebautEcho: "Woody / oak-adjacent (cuidado con humo)",
  },
  {
    id: "caramel",
    label: "Caramelo / panela",
    ring: "complementary",
    hue: 42,
    descriptors: ["panela", "caramelo", "malta suave"],
    coexEcho: "Complementary · caramel/panela",
    callebautEcho: "Caramelised / dairy-adjacent sweetness",
  },
  {
    id: "vegetal",
    label: "Vegetal",
    ring: "complementary",
    hue: 110,
    descriptors: ["hierba", "verde", "té"],
    coexEcho: "Complementary · vegetal",
    callebautEcho: "Green / herbal (puede ser tipicidad o defecto según contexto)",
  },
  {
    id: "off",
    label: "Defectos",
    ring: "defect",
    hue: 0,
    descriptors: ["moho", "humo", "podrido", "sucio", "sobre-fermentado"],
    coexEcho: "Off-flavours · descalifican",
    callebautEcho: "Defects reject couverture applications",
  },
  {
    id: "tipicity",
    label: "Tipicidad Colab",
    ring: "bridge",
    hue: 160,
    descriptors: ["origen legible", "genotipo coherente", "fermentación limpia"],
    coexEcho: "Global quality + tipicidad (entrenamiento Colab)",
    callebautEcho: "Origin character usable in recipe design",
  },
]

export const wheelCompareRows = [
  {
    axis: "Objeto",
    coex: "Cacao (masa / chocolate protocolo)",
    callebaut: "Chocolate y aplicaciones",
    colab: "Cacao → panel → barra / duja",
  },
  {
    axis: "Herramienta",
    coex: "Rueda + glosario + Excel oficial",
    callebaut: "Lenguaje Academy / couverture",
    colab: "Rueda Fine-Flavor Colab + ficha Catador",
  },
  {
    axis: "Escala",
    coex: "0–10 atributos + Global Quality",
    callebaut: "Perfil de uso en oficio",
    colab: "0–10 entrenamiento + tipicidad defendible",
  },
  {
    axis: "Honestidad",
    coex: "Programa público Bioversity/CIAT",
    callebaut: "Marca formadora (Academy)",
    colab: "Lente pedagógica · sin medalla inventada",
  },
] as const

export function spokesByRing(ring: WheelRing) {
  return fineFlavorSpokes.filter((s) => s.ring === ring)
}
