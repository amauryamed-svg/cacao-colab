/**
 * Sembrar · laboratorio de siembra Ecoyuma × Cacao Colab
 *
 * Plántulas y conocimiento anclado al catálogo externo Ecoyuma
 * (tienda.ecoyuma.com.co). No inventamos stock ni precios.
 * Ruta mental: agricultor que recién empieza y quiere el mejor cacao
 * posible para su finca idónea — bitácora, planeación, cartografía social
 * y agroforestería comunitaria.
 */

export type SembrarGenotype = "FEAR 5" | "TCS 19" | "TCS 06"

export type SembrarPlantula = {
  code: SembrarGenotype
  label: string
  family: string
  role: string
  why: string
  ecoyumaHref: string
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

/** Plántulas prioritarias Ecoyuma — mismas URLs que knowledge-base / brands */
export const sembrarPlantulas: SembrarPlantula[] = [
  {
    code: "FEAR 5",
    label: "FEAR 5 · Trinitario comercial Fedecacao",
    family: "Federación · prioridad cacaotier",
    role: "Eje de la finca idónea y del paper de fermentación Colab",
    why: "Material de referencia para tipicidad, Benevolo y comparación de lotes. Empieza aquí si quieres un genotipo defendible ante panel y mercado.",
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
    ecoyumaHref:
      "https://tienda.ecoyuma.com.co/cacao-injertado-regional/42-plantula-de-cacao-tcs-06.html",
    ecoyumaSkuNote: "Plántula injertada TCS-06 · catálogo externo",
  },
]

export const sembrarCatalogHref =
  "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao"

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
    ask: "Fecha de siembra, genotipo Ecoyuma, profundidad, tutor y riego de establecimiento.",
    tip: "Una plántula mal marcada es un lote sin identidad. Etiqueta FEAR 5 / TCS.",
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
    title: "Diseñar la finca idónea",
    body: "Define meta a 5 años: volumen, tipicidad, sombra y quién hereda el criterio.",
  },
  {
    id: "p2",
    title: "Elegir material Ecoyuma",
    body: "FEAR 5 como eje; TCS 19 / TCS 06 como parcelas de contraste. Verifica stock en tienda.",
  },
  {
    id: "p3",
    title: "Trazar cartografía social",
    body: "Parcelas, agua, caminos, vecinos, zonas de riesgo y acuerdos comunitarios.",
  },
  {
    id: "p4",
    title: "Modelo agroforestal",
    body: "Elige estratos (temporal, permanente, servicio) y calendario de siembra.",
  },
  {
    id: "p5",
    title: "Bitácora semanal",
    body: "Observar → registrar → decidir. Luego fermentar con evidencia (Master Cacaotier).",
  },
  {
    id: "p6",
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
    strata: ["Parcelas etiquetadas FEAR 5 / TCS", "Sendero de visita", "Punto de bitácora"],
    intent: "Enseñar a la comunidad y a la siguiente generación con evidencia visible.",
    forWhom: "Escuelas de campo, nodos Colab, familias que quieren legar criterio.",
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
    prompt: "Dibuja o describe bloques: FEAR 5 / TCS 19 / TCS 06 y año de siembra.",
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
  body: "Sembrar no es solo meter plántula: es diseñar tipicidad, sombra y memoria. Cacao Colab acelera contigo — finca, campus y colectivo — para que la siguiente generación tenga razones de continuar con marcas globales de cacao.",
  ctaCollective: "Únete al colectivo Colab",
}

export function plantulaFor(code: SembrarGenotype) {
  return sembrarPlantulas.find((p) => p.code === code) ?? sembrarPlantulas[0]
}
