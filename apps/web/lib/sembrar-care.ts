/**
 * Cuidado perfecto, cadmio didáctico y planeación a 10 años · Sembrar
 *
 * Evidencia (no clínica ni promesa de Cd cero):
 * - Alta T (~45 °C) + acidificación del nib favorecen transferencia de Cd
 *   del nib → testa/cascarilla (Sci. Rep. 2024; Food Res. Int. 2019).
 * - La testa se descarta en tostión/descascarillado (winnowing).
 * - En finca, suelos más ácidos suelen aumentar biodisponibilidad de Cd;
 *   cobertura y nutrición equilibrada son parte del cuidado preventivo.
 * - Paper FEAR 5 / biorreactor: perfiles isotérmicos ~45 °C enseñan control
 *   de temperatura (Santander et al. / campus Architect).
 */

export const PERFECT_CARE_HOUR = 100

/** Barras visibles + variables de cuidado que deben estar al 100 %. */
export type PerfectCareMetrics = {
  moisture: number
  health: number
  knowledge: number
  nutrition: number
  soilCover: number
  biodiversity: number
  ageHours: number
}

export function isPerfectCareReady(m: PerfectCareMetrics) {
  return (
    m.ageHours >= PERFECT_CARE_HOUR &&
    m.moisture >= 100 &&
    m.health >= 100 &&
    m.knowledge >= 100 &&
    m.nutrition >= 100 &&
    m.soilCover >= 100 &&
    m.biodiversity >= 100
  )
}

export function perfectCareGaps(m: PerfectCareMetrics) {
  const gaps: string[] = []
  if (m.ageHours < PERFECT_CARE_HOUR) gaps.push(`${PERFECT_CARE_HOUR - m.ageHours} h para el hito`)
  if (m.moisture < 100) gaps.push(`Agua ${Math.round(m.moisture)}%`)
  if (m.health < 100) gaps.push(`Vitalidad ${Math.round(m.health)}%`)
  if (m.knowledge < 100) gaps.push(`Saber ${Math.round(m.knowledge)}%`)
  if (m.nutrition < 100) gaps.push(`Nutrición ${Math.round(m.nutrition)}%`)
  if (m.soilCover < 100) gaps.push(`Cobertura ${Math.round(m.soilCover)}%`)
  if (m.biodiversity < 100) gaps.push(`Biodiversidad ${Math.round(m.biodiversity)}%`)
  return gaps
}

/**
 * Índice didáctico 0–100 (mayor = más riesgo relativo de Cd en planta).
 * No es medición de laboratorio: guía conciencia de pH y cuidado.
 */
export function cadmiumRiskIndex(input: {
  soilPh: number
  soilCover: number
  nutrition: number
  biodiversity: number
}) {
  // pH ácido → más biodisponibilidad relativa (pedagogía simplificada)
  const phPenalty =
    input.soilPh < 5.2 ? 42 : input.soilPh < 5.8 ? 28 : input.soilPh < 6.2 ? 14 : input.soilPh <= 6.8 ? 6 : 12
  const careBuffer =
    (clamp01(input.soilCover) + clamp01(input.nutrition) + clamp01(input.biodiversity)) / 3
  const raw = phPenalty + (1 - careBuffer) * 38
  return Math.round(clamp(raw, 8, 92))
}

export function cadmiumRiskLabel(risk: number) {
  if (risk >= 55) return { tone: "high" as const, label: "Riesgo relativo alto", tip: "Sube cobertura, equilibra nutrición y evita acidificar el suelo sin criterio." }
  if (risk >= 35) return { tone: "mid" as const, label: "Riesgo relativo medio", tip: "Mantén pH cerca de 6.0–6.5 y suelo cubierto: menos Cd disponible para la planta." }
  return { tone: "low" as const, label: "Riesgo relativo contenido", tip: "Buen cuidado de suelo. La fermentación controlada ayuda después en el grano." }
}

export const cadmiumPedagogy = {
  eyebrow: "Cadmio · metales · cuidado",
  title: "El suelo decide; la fermentación también mueve Cd",
  farmBody:
    "En cacao, el cadmio del suelo puede pasar al grano. Suelos más ácidos suelen aumentar la biodisponibilidad. Cobertura viva, nutrición equilibrada y pH cercano a 6–6.5 son parte del cuidado preventivo — Sembrar lo simula, no sustituye análisis de laboratorio.",
  fermentBody:
    "En fermentación controlada, temperatura alta (~45 °C) y acidificación del nib favorecen que parte del Cd migre del nib a la testa (cascarilla). Esa cascarilla se descarta en tostión y descascarillado (winnowing). El paper de biorreactor FEAR 5 enseña perfiles isotérmicos: temperatura constante ≈ control reproducible — no es promesa de «cero cadmio».",
  sources: [
    {
      label: "Sci. Rep. 2024 · T alta + acidificación → Cd nib→testa",
      href: "https://doi.org/10.1038/s41598-024-62609-8",
    },
    {
      label: "Food Res. Int. 2019 · distribución de Cd en fermentación",
      href: "https://doi.org/10.1016/j.foodres.2019.108743",
    },
    {
      label: "Master Cacaotier · temperatura y pH (paper FEAR 5)",
      href: "/aprende/cacaotier",
    },
  ],
} as const

export const decadePlanCopy = {
  eyebrow: "Planeación · 10 años · conciencia",
  title: "Diseña una labranza comparativa a 10 años",
  body: "Compara dos materiales bajo el mismo protocolo (sombra, nutrición, fermentación). El premio no es solo MD: es criterio para heredar tipicidad sin inventar genética ni DO.",
  prizeNote: "Al guardar un plan comparativo completo (≈120 caracteres + dos genotipos) recibes Mazorcas de planeación consciente.",
} as const

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n / 100))
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
