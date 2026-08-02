/**
 * Sembrar · laboratorio de siembra Ecoyuma × Cacao Colab
 *
 * Eje pedagógico: modelo araucano (FEAR 5 · FTA 2 · FSA 13), genéticos
 * Fedecacao cercanos al debate de denominación de origen.
 * Catálogo Ecoyuma (FEAR 5 / TCS 19 / TCS 06) = vivero externo; no inventamos stock.
 */

export type SembrarGenotype = "FEAR 5" | "FTA 2" | "FSA 13" | "FSV 41" | "TCS 19" | "TCS 06"

export type SembrarPlantula = {
  code: SembrarGenotype
  label: string
  family: string
  role: string
  why: string
  tier: "modelo_araucano" | "ecoyuma_catalog" | "referencia_coex"
  ecoyumaHref: string | null
  ecoyumaSkuNote: string
}

export type BitacoraPrompt = {
  id: string
  week: string
  title: string
  ask: string
  tip: string
}

export type AgroforestryModel = {
  id: "agroforesteria" | "sombra-regulada" | "demostrativa" | "comunitaria-estratos"
  name: string
  strata: string[]
  intent: string
  forWhom: string
}

export type CartografiaLayer = {
  id: string
  name: string
  prompt: string
}

/** Trío del modelo araucano (Fedecacao · Arauquita / Tame / Saravena). */
export const modeloAraucanoPlantulas: SembrarPlantula[] = [
  {
    code: "FEAR 5",
    label: "FEAR 5 · Fedecacao Arauquita 5",
    family: "Modelo araucano · Arauquita",
    role: "Eje tipicidad · Benevolo · paper de fermentación",
    why: "Híbrido trinitario seleccionado en Arauquita (2002). Notas afrutadas/cítricas/florales en literatura Fedecacao; material de referencia ante panel y mercado.",
    tier: "modelo_araucano",
    ecoyumaHref:
      "https://tienda.ecoyuma.com.co/cacao-injertado-regional/45-plantula-de-cacao-fear-05.html",
    ecoyumaSkuNote: "Plántula injertada FEAR-05 · verifica stock en Ecoyuma",
  },
  {
    code: "FTA 2",
    label: "FTA 2 · Fedecacao Tame 2",
    family: "Modelo araucano · Tame",
    role: "Completa el arreglo clonal araucano",
    why: "Parte del trío galardonado (Salón du Chocolat París 2010–2011 con FEAR 5 y FSA 13). Sin stock inventado en Colab — consulta Fedecacao / viveros regionales.",
    tier: "modelo_araucano",
    ecoyumaHref: null,
    ecoyumaSkuNote: "Material Fedecacao · no listado como SKU Ecoyuma en este hub",
  },
  {
    code: "FSA 13",
    label: "FSA 13 · Fedecacao Saravena 13",
    family: "Modelo araucano · Saravena",
    role: "Tercer genotipo del modelo integrado",
    why: "Con FEAR 5 y FTA 2 integra el modelo araucano de Arauquita. Tipicidad de territorio, no de monoclon. No mezcles genotipos en un solo lote si quieres leer origen.",
    tier: "modelo_araucano",
    ecoyumaHref: null,
    ecoyumaSkuNote: "Material Fedecacao · verifica vivero / ICA regional",
  },
]

/**
 * Referencia CoEx · Fedecacao San Vicente 41.
 * Oro Ámsterdam 2024: muestra WORKAKAO / Agroguamal (Guamal · Meta) con FEAR 5 + FSV 41.
 * No atribuir tipificación a Chocolover ni a otros nodos sin declaración.
 */
export const coexReferencePlantulas: SembrarPlantula[] = [
  {
    code: "FSV 41",
    label: "FSV 41 · Fedecacao San Vicente 41",
    family: "Referencia CoEx · Meta / Guamal",
    role: "Contexto medalla oro Ámsterdam 2024",
    why: "Clon Fedecacao San Vicente (Santander) presente en la muestra oro Cacao of Excellence (feb. 2024, Ámsterdam) de WORKAKAO / Agroguamal · Guamal Meta, junto a FEAR 5. Escenario didáctico — no tipificación de marca Colab.",
    tier: "referencia_coex",
    ecoyumaHref: null,
    ecoyumaSkuNote: "Material Fedecacao · sin SKU Ecoyuma inventado en este hub",
  },
]

/** Catálogo externo Ecoyuma — contraste bajo el mismo protocolo. */
export const ecoyumaCatalogPlantulas: SembrarPlantula[] = [
  {
    code: "FEAR 5",
    label: "FEAR 5 · Trinitario comercial Fedecacao",
    family: "Federación · prioridad cacaotier",
    role: "Eje de la finca idónea y del paper de fermentación Colab",
    why: "Material de referencia para tipicidad, Benevolo y comparación de lotes. Empieza aquí si quieres un genotipo defendible ante panel y mercado.",
    tier: "ecoyuma_catalog",
    ecoyumaHref:
      "https://tienda.ecoyuma.com.co/cacao-injertado-regional/45-plantula-de-cacao-fear-05.html",
    ecoyumaSkuNote: "Plántula injertada FEAR-05 · verifica stock en Ecoyuma",
  },
  {
    code: "TCS 19",
    label: "TCS 19 · clon regional",
    family: "Catálogo Ecoyuma (alias de campo TSS 19)",
    role: "Contraste de sanidad, rendimiento y perfil sensorial",
    why: "Diversifica la labranza frente a monoclon. Compara bajo el mismo protocolo de sombra, nutrición y fermentación.",
    tier: "ecoyuma_catalog",
    ecoyumaHref:
      "https://tienda.ecoyuma.com.co/cacao-injertado-regional/44-plantula-de-cacao-tcs-19.html",
    ecoyumaSkuNote: "Plántula injertada TCS-19 · catálogo externo",
  },
  {
    code: "TCS 06",
    label: "TCS 06 · clon regional",
    family: "Catálogo Ecoyuma (alias de campo TSS 6)",
    role: "Segunda línea de renovación genética",
    why: "Útil para parcelar ensayos: mismo manejo, distinto material. No mezcles genotipos en un solo lote de fermentación si quieres leer tipicidad.",
    tier: "ecoyuma_catalog",
    ecoyumaHref:
      "https://tienda.ecoyuma.com.co/cacao-injertado-regional/42-plantula-de-cacao-tcs-06.html",
    ecoyumaSkuNote: "Plántula injertada TCS-06 · catálogo externo",
  },
]

/** Unión para resolución por código (modelo araucano primero). */
export const sembrarPlantulas: SembrarPlantula[] = [
  ...modeloAraucanoPlantulas,
  ...coexReferencePlantulas,
  ...ecoyumaCatalogPlantulas.filter((p) => p.code !== "FEAR 5"),
]

export const sembrarCatalogHref =
  "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao"

/** Disputa DO — honesta: no hay DO registrada consolidada en este hub. */
export const sembrarDoDispute = {
  eyebrow: "Denominación de origen · Arauca vs Orinoquía",
  title: "Modelo araucano cerca de la DO — sin inventar el registro",
  body: "Fedecacao impulsó ante la SIC la figura «Cacao de la Orinoquía»; productores y la Gobernación de Arauca defienden una DO exclusiva de cacao araucano. Mientras no haya registro firme, el Colab habla de origen declarado y trazable, anclado al modelo FEAR 5 · FTA 2 · FSA 13.",
  bullets: [
    "Modelo araucano documentado: FEAR 5 (Arauquita), FTA 2 (Tame), FSA 13 (Saravena) — Fedecacao; reconocimiento Salón du Chocolat París 2010–2011.",
    "Trámite Orinoquía (Fedecacao / SIC) vs. reivindicación territorial de origen exclusivo araucano — proceso abierta, no DO consolidada aquí.",
    "Genética sola no basta: pliego, mapa, gobernanza y control de uso. Sembrar entrena lote etiquetado y fermentación comparable.",
  ],
  knowledgeHref: "/conocimiento/denominacion-origen",
  fedecacaoAraucaHref: "https://www.fedecacao.com.co/post/desde-arauca-elchocolatenosune-arauquita",
  orinoquiaTraceHref: "https://docacao.org/",
} as const

export const bitacoraPrompts: BitacoraPrompt[] = [
  {
    id: "b0",
    week: "Semana 0",
    title: "Línea base de finca",
    ask: "¿Qué ves hoy? Suelo, pendiente, sombra actual, vecinos, agua y riesgos.",
    tip: "Sin línea base no hay mejora. Foto + tres frases bastan para empezar.",
  },
  {
    id: "b1",
    week: "Semana 1–2",
    title: "Trasplante y tutor",
    ask: "Fecha de siembra, genotipo (FEAR 5 / FTA 2 / FSA 13 o contraste Ecoyuma), profundidad, tutor y riego.",
    tip: "Una plántula mal marcada es un lote sin identidad. Etiqueta el clon del modelo araucano.",
  },
  {
    id: "b2",
    week: "Mes 1",
    title: "Establecimiento",
    ask: "Supervivencia %, síntomas foliares, competencia de malezas, humedad del suelo.",
    tip: "Registra antes de intervenir. La bitácora vence al recuerdo.",
  },
  {
    id: "b3",
    week: "Mes 2–3",
    title: "Sombra y coberturas",
    ask: "¿Qué sombra temporal/permanente plantaste? ¿Cobertura viva o mulch?",
    tip: "Agroforestería se diseña: no es ‘dejar crecer monte’.",
  },
  {
    id: "b4",
    week: "Trimestre",
    title: "Sanidad y comunidad",
    ask: "Plagas/enfermedades vistas, ayuda recibida, trueque de mano de obra, acuerdos de linderos.",
    tip: "La cartografía social también es sanidad: vecinos importan.",
  },
]

export const planningMilestones = [
  {
    id: "p1",
    title: "Diseñar la finca idónea a 10 años",
    body: "Meta decenal: volumen, tipicidad, sombra, cadmio/suelo y quién hereda el criterio — no solo la próxima cosecha.",
  },
  {
    id: "p2",
    title: "Elegir material del modelo araucano",
    body: "FEAR 5 · FTA 2 · FSA 13 como eje; TCS 19 / TCS 06 o FSV 41 (contexto CoEx) como contraste. Verifica stock real.",
  },
  {
    id: "p3",
    title: "Comparar dos genotipos bajo el mismo protocolo",
    body: "Misma sombra, nutrición y fermentación; distinto material. Así el simulador crea conciencia, no monoclon.",
  },
  {
    id: "p4",
    title: "Trazar cartografía social",
    body: "Parcelas, agua, caminos, vecinos, zonas de riesgo y acuerdos comunitarios.",
  },
  {
    id: "p5",
    title: "Cuidado de suelo y metales",
    body: "pH, cobertura y nutrición bajan el riesgo relativo de Cd en planta; la fermentación controlada ayuda a mover Cd a la cascarilla que se descarta.",
  },
  {
    id: "p6",
    title: "Bitácora semanal",
    body: "Observar → registrar → decidir. Luego fermentar con evidencia (Master Cacaotier).",
  },
  {
    id: "p7",
    title: "Cerrar el círculo Colab",
    body: "Del vivero al campus y a la mesa: Dualita, Mazorcas y colectivo con otras fincas.",
  },
]

export const agroforestryModels: AgroforestryModel[] = [
  {
    id: "agroforesteria",
    name: "Agroforestería diversa",
    strata: ["Sombra temporal (plátano/guineo)", "Cacao injertado", "Maderables / frutales", "Cobertura del suelo"],
    intent: "Biodiversidad, microclima y resiliencia hídrica para quien recién empieza.",
    forWhom: "Primera generación y labranzas heredadas que quieren suelo vivo.",
  },
  {
    id: "sombra-regulada",
    name: "Sombra regulada",
    strata: ["Sombra medible (50–70 % guía didáctica)", "Cacao en líneas", "Calles de manejo"],
    intent: "Aprender a ajustar luz sin extremos de quemado o humedad estancada.",
    forWhom: "Ensayos de tipicidad donde quieres comparar genotipos.",
  },
  {
    id: "demostrativa",
    name: "Labranza demostrativa",
    strata: ["Parcelas FEAR 5 / FTA 2 / FSA 13", "Sendero de visita", "Punto de bitácora"],
    intent: "Enseñar el modelo araucano con evidencia visible — sin confundir DO no registrada.",
    forWhom: "Escuelas de campo, nodos Colab, familias que quieren heredar criterio.",
  },
  {
    id: "comunitaria-estratos",
    name: "Agroforestería comunitaria",
    strata: ["Lotes compartidos", "Vivero / resguardo de plántulas", "Acuerdos de sombra y agua", "Trueque de jornal"],
    intent: "Competir como territorio, no como finca aislada.",
    forWhom: "Nueva generación que hereda tierra y quiere colectivo con Cacao Colab.",
  },
]

export const cartografiaLayers: CartografiaLayer[] = [
  {
    id: "parcelas",
    name: "Parcelas y genotipos",
    prompt: "Dibuja o describe bloques: FEAR 5 / FTA 2 / FSA 13 (y contrastes TCS) con año de siembra.",
  },
  {
    id: "agua",
    name: "Agua y drenaje",
    prompt: "Nacimiento, quebrada, tanque, zonas de encharque y época seca.",
  },
  {
    id: "sombra",
    name: "Sombra y viento",
    prompt: "Árboles existentes, huecos de luz, corridas de viento que queman hoja.",
  },
  {
    id: "social",
    name: "Cartografía social",
    prompt: "Vecinos, linderos, caminos, acuerdos, riesgos y manos que ayudan.",
  },
]

export const sembrarGenerationCopy = {
  headline: "Siembra para quien hereda la tierra.",
  body: "Sembrar no es solo meter plántula: es diseñar tipicidad araucana, sombra y memoria. Cacao Colab acelera contigo — finca, campus y colectivo — para que la siguiente generación tenga razones de continuar con marcas globales de cacao.",
  ctaCollective: "Únete al colectivo Colab",
}

const GENOTYPE_CODES: readonly SembrarGenotype[] = [
  "FEAR 5",
  "FTA 2",
  "FSA 13",
  "FSV 41",
  "TCS 19",
  "TCS 06",
]

export function isSembrarGenotype(value: unknown): value is SembrarGenotype {
  return typeof value === "string" && (GENOTYPE_CODES as readonly string[]).includes(value)
}

export function plantulaFor(code: SembrarGenotype) {
  return (
    modeloAraucanoPlantulas.find((p) => p.code === code) ??
    coexReferencePlantulas.find((p) => p.code === code) ??
    ecoyumaCatalogPlantulas.find((p) => p.code === code) ??
    modeloAraucanoPlantulas[0]
  )
}
