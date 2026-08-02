/**
 * Set / Drop de catación Colab · 10 chocolatinas de aprendizaje.
 * Orígenes colombianos con evidencia pública de excelencia o tipicidad
 * documentada. No inventa medallas Colab ni stock de terceros.
 */

export type TastingSample = {
  id: string
  number: string
  name: string
  origin: string
  genotype: string
  format: "chocolatina 70 %" | "chocolatina 75 %" | "nibs + guía" | "licor testigo"
  evidenceNote: string
  evidenceLevel: "coex_context" | "salon_context" | "colab_reference" | "territorial"
  wheelFocus: string[]
  guidePrompt: string
  sourceHref?: string
}

export const tastingDropMeta = {
  slug: "set-catacion-colombia-10",
  title: "Set Catación Colombia · 10 chocolatinas",
  eyebrow: "Drop · R&D Colab · guía profesional",
  subtitle:
    "Flight de aprendizaje Fine-Flavor: diez piezas para entrenar la Rueda Colab con cacaos colombianos de referencia mundial — sin inventar premios del Colab.",
  priceNote: "Preventa / cupo Dualita · fulfillment manual hasta activar checkout",
  whatsapp:
    "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20el%20Set%20Cataci%C3%B3n%20Colombia%2010.",
  guideBlurb:
    "Guía profesional incluida: protocolo ciego, orden de catación, ficha 0–10 (core / complementary / defectos), tipicidad vs preferencia, y puente a Callebaut (cómo llevar el perfil a cobertura/duja).",
  honesty:
    "Las menciones de Awards/Salón son contexto de origen publicado. El Colab no vende medallas ajenas ni garantiza réplica de panel CoEx.",
} as const

export const tastingGuideSteps = [
  {
    n: "01",
    title: "Higiene de panel",
    body: "Sin perfume, café reciente ni humo. Agua tibia entre muestras. Código ciego antes de abrir la guía de origen.",
  },
  {
    n: "02",
    title: "Orden del flight",
    body: "De perfiles más delicados (floral/fruta) a más intensos (cacao profundo / especias). Deja defectos de entrenamiento al final si usas testigo defectuoso.",
  },
  {
    n: "03",
    title: "Ficha 0–10",
    body: "Marca core (cacao, acidez, amargor, astringencia, tostado), complementary y off-flavours. Global Quality aparte: tipicidad + limpieza.",
  },
  {
    n: "04",
    title: "Rueda Colab",
    body: "Elige hasta 5 descriptores de la Rueda Fine-Flavor Colab. Compara eco CoEx vs eco Callebaut: ¿sirve para barra 70 % o para duja?",
  },
  {
    n: "05",
    title: "Justificación",
    body: "Una frase por muestra: tipicidad defendible o rechazo. Preferencia personal no gana el panel.",
  },
] as const

export const tastingSamples: TastingSample[] = [
  {
    id: "s01",
    number: "01",
    name: "Arauca · FEAR 5 referencia",
    origin: "Arauca · modelo araucano",
    genotype: "FEAR 5",
    format: "chocolatina 70 %",
    evidenceNote:
      "Clon Fedecacao Arauquita 5 — eje del modelo araucano y del paper de biorreactor Colab. Tipicidad territorial, no medalla Colab.",
    evidenceLevel: "colab_reference",
    wheelFocus: ["cacao", "fresh-fruit", "nutty"],
    guidePrompt: "¿Se lee FEAR 5 limpio o solo ‘chocolate genérico’?",
  },
  {
    id: "s02",
    number: "02",
    name: "Tame · FTA 2 contraste",
    origin: "Tame · Arauca",
    genotype: "FTA 2",
    format: "chocolatina 70 %",
    evidenceNote: "Segundo genotipo del modelo araucano. Compara bajo el mismo protocolo de tostión/refino.",
    evidenceLevel: "territorial",
    wheelFocus: ["acidity", "fresh-fruit", "tipicity"],
    guidePrompt: "Misma curva que #01: ¿qué cambia en acidez y fruta?",
  },
  {
    id: "s03",
    number: "03",
    name: "Saravena · FSA 13",
    origin: "Saravena · Arauca",
    genotype: "FSA 13",
    format: "chocolatina 70 %",
    evidenceNote: "Tercer pilar araucano. Evita mezclar lotes si quieres atribuir tipicidad.",
    evidenceLevel: "territorial",
    wheelFocus: ["floral", "cacao", "astringency"],
    guidePrompt: "¿Hay floral corto o solo astringencia de proceso?",
  },
  {
    id: "s04",
    number: "04",
    name: "Meta · FSV 41 contexto CoEx",
    origin: "Guamal · Meta",
    genotype: "FSV 41",
    format: "chocolatina 70 %",
    evidenceNote:
      "Clon Fedecacao San Vicente 41 presente, con FEAR 5, en la muestra oro Cacao of Excellence (Ámsterdam, feb. 2024) de WORKAKAO / Agroguamal. Contexto territorial — no tipificación Chocolover.",
    evidenceLevel: "coex_context",
    wheelFocus: ["fresh-fruit", "cacao", "tipicity"],
    guidePrompt: "Sin logo: ¿defenderías tipicidad Meta ante panel ciego?",
    sourceHref: "https://www.cacaoofexcellence.org/",
  },
  {
    id: "s05",
    number: "05",
    name: "Meta · FEAR 5 en contexto CoEx",
    origin: "Guamal · Meta",
    genotype: "FEAR 5",
    format: "chocolatina 70 %",
    evidenceNote:
      "Mismo contexto WORKAKAO / Agroguamal 2024 (oro CoEx) con FEAR 5. Compara con #01 Arauca: genotipo ≠ terroir.",
    evidenceLevel: "coex_context",
    wheelFocus: ["browned-fruit", "nutty", "cacao"],
    guidePrompt: "FEAR 5 Arauca vs FEAR 5 Meta: ¿qué descriptor cambia?",
    sourceHref: "https://www.cacaoofexcellence.org/",
  },
  {
    id: "s06",
    number: "06",
    name: "Santander · lente Zurych",
    origin: "Santander",
    genotype: "Blend didáctico · MOOC",
    format: "chocolatina 70 %",
    evidenceNote:
      "Puente al MOOC Zurych (bean-to-bar territorial). No inventa medalla; entrena lectura de cacao de montaña/Santander en hábito Dualita.",
    evidenceLevel: "colab_reference",
    wheelFocus: ["woody", "cacao", "roast"],
    guidePrompt: "¿El tostado revela o tapa el origen?",
  },
  {
    id: "s07",
    number: "07",
    name: "Huila · protocolo CAÚA",
    origin: "Huila",
    genotype: "Origen funcional · micro CAÚA",
    format: "chocolatina 75 %",
    evidenceNote:
      "Ligado al microlearning CAÚA (cacao funcional / hábitos). Pieza para contrastar intensidad y amargor limpio.",
    evidenceLevel: "colab_reference",
    wheelFocus: ["bitterness", "caramel", "cacao"],
    guidePrompt: "Amargor limpio vs astringencia: márcalos aparte (0–10).",
  },
  {
    id: "s08",
    number: "08",
    name: "Quara · FEAR 5 lot testigo",
    origin: "Tame · Quara",
    genotype: "FEAR 5",
    format: "licor testigo",
    evidenceNote:
      "Licor 100 % de referencia Colab (Master Chocolatier / Benevolo). Sin inclusiones: control de tipicidad.",
    evidenceLevel: "colab_reference",
    wheelFocus: ["cacao", "nutty", "acidity"],
    guidePrompt: "Usa #08 como ancla: toda barra del set se juzga contra este control.",
  },
  {
    id: "s09",
    number: "09",
    name: "Arauca · memoria Salón",
    origin: "Arauca",
    genotype: "Modelo araucano · contexto histórico",
    format: "chocolatina 70 %",
    evidenceNote:
      "Contexto histórico de galardones Salón du Chocolat París asociados al cacao araucano (2010–2011 en narrativas Fedecacao). Entrenamiento de tipicidad territorial — verifica fuentes; no es SKU premiado Colab.",
    evidenceLevel: "salon_context",
    wheelFocus: ["floral", "fresh-fruit", "tipicity"],
    guidePrompt: "¿La ‘memoria’ del origen aparece en boca o solo en el texto?",
  },
  {
    id: "s10",
    number: "10",
    name: "Contraste defectos (didáctico)",
    origin: "Laboratorio Colab",
    genotype: "Testigo de defecto controlado",
    format: "nibs + guía",
    evidenceNote:
      "Pieza de entrenamiento: humo / moho / sobre-fermentado (según lote didáctico). Obliga a marcar off-flavours y rechazar. No es producto comercial de mesa.",
    evidenceLevel: "colab_reference",
    wheelFocus: ["off", "astringency", "roast"],
    guidePrompt: "Si hay defecto: Global Quality cae. Documenta el rechazo en una línea.",
  },
]

export const tastingDropWhatsapp = tastingDropMeta.whatsapp
