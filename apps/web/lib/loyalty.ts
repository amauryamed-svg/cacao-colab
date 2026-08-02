export const communityRanks = [
  { slug: "semilla", name: "Semilla", icon: "●", threshold: 0, benefit: "Acceso a retos abiertos" },
  { slug: "brote", name: "Brote", icon: "♧", threshold: 120, benefit: "Bitácoras y rutas de aprendizaje" },
  { slug: "labrador", name: "Labrador del cacao", icon: "♣", threshold: 400, benefit: "Retos territoriales prioritarios" },
  { slug: "guardian", name: "Guardián de origen", icon: "◆", threshold: 1000, benefit: "Círculos de comunidad y cata" },
  { slug: "maestro", name: "Maestro Fine-Flavor", icon: "✦", threshold: 2200, benefit: "Beneficios de aliados habilitados" },
  { slug: "heritage", name: "Heritage", icon: "◉", threshold: 5000, benefit: "Mentoría y transferencia generacional" },
] as const

// Las Mazorcas Doradas no son XP. El XP desbloquea contenido y apalanca el
// scorecard; MD es saldo de fidelidad con montos declarados aquí.
// Principio de sostenibilidad: la actividad propia da un empujón; los packs
// financian sinks con costo real (mentorías, aceleraciones).
export const mazorcaRewards = {
  microLesson: 6,
  architectMission: 6,
  architectCourseComplete: 24,
  chocolatierMission: 6,
  chocolatierCourseComplete: 24,
  benevoloMission: 5,
  benevoloCourseComplete: 16,
  gotchiCare: 2,
  /** Apertura de cosecha (fase fermentación) — una vez por labranza. */
  gotchiHarvestOpen: 12,
  /** Cierre fermentado a 120 h — recompensa principal de Sembrar. */
  gotchiHarvest: 28,
  /** Hito cuidado perfecto: hora ≥100 y métricas al 100 % al cosechar. */
  gotchiPerfectCare: 40,
  /** Premio por plan comparativo a 10 años (conciencia de labranza). */
  gotchiDecadePlan: 18,
  /** Tope MD/día categoría care por acciones de cuidado (no aplica a cosecha). */
  gotchiCareDailyCap: 10,
  /** Tope MD/día categoría learning (campus + micro). */
  learningDailyCap: 20,
} as const

/** Packs de compra de MD. Crédito solo tras pago verificado; no suman a rango. */
export const mdBuyPacks = [
  {
    slug: "saco",
    name: "Saco",
    md: 80,
    priceCop: 28_000,
    blurb: "Entrada a canjes digitales del Colab.",
  },
  {
    slug: "cesta",
    name: "Cesta",
    md: 220,
    priceCop: 75_000,
    blurb: "Ideal para una aceleración o preview de curso.",
  },
  {
    slug: "cosecha",
    name: "Cosecha",
    md: 550,
    priceCop: 180_000,
    blurb: "Bundle intensivo: varios sinks digitales.",
  },
] as const

export type ScorecardPerspective = "learning" | "care" | "community" | "verified_purchase"
export type EconomyRole = "farmer" | "chocolatier" | "maquilador" | "buyer" | "learner"

/** Balanced scorecard: bonificación por productividad propia, sin multinivel. */
export const scorecardConfig = {
  /** MD base semanal antes de pesos, equilibrio, maestría y XP. */
  weeklyPoolMd: 16,
  /** Eventos propios por perspectiva para coverage = 1. */
  targetEventsPerPerspective: 4,
  perspectives: ["learning", "care", "community", "verified_purchase"] as const satisfies readonly ScorecardPerspective[],
  perspectiveLabels: {
    learning: "Aprendizaje",
    care: "Cuidado",
    community: "Comunidad",
    verified_purchase: "Comercio verificado",
  } satisfies Record<ScorecardPerspective, string>,
  roleWeights: {
    farmer: { learning: 0.9, care: 1.3, community: 1.0, verified_purchase: 0.8 },
    chocolatier: { learning: 1.3, care: 0.9, community: 1.0, verified_purchase: 1.0 },
    maquilador: { learning: 1.1, care: 0.8, community: 0.9, verified_purchase: 1.2 },
    buyer: { learning: 1.0, care: 0.7, community: 0.9, verified_purchase: 1.3 },
    learner: { learning: 1.0, care: 1.0, community: 1.0, verified_purchase: 1.0 },
  } satisfies Record<EconomyRole, Record<ScorecardPerspective, number>>,
  /** Techo MD / semana por rango (slug). */
  weeklyCeilingByRank: {
    semilla: 6,
    brote: 12,
    labrador: 20,
    guardian: 32,
    maestro: 42,
    heritage: 55,
  } satisfies Record<(typeof communityRanks)[number]["slug"], number>,
  /** Factor de maestría por rango (amplifica el pool). */
  masteryFactorByRank: {
    semilla: 1.0,
    brote: 1.03,
    labrador: 1.06,
    guardian: 1.08,
    maestro: 1.1,
    heritage: 1.12,
  } satisfies Record<(typeof communityRanks)[number]["slug"], number>,
  /** Cada 750 XP suma +0.03 al leverage, tope 1.12. */
  xpStep: 750,
  xpLeverageStep: 0.03,
  xpLeverageMax: 1.12,
} as const

// Espejo de seeds: planned (marcas) + active Colab digital (migración scorecard).
export const plannedBenefits = [
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Aceleración Arquitecto (retirada)",
    cost: 500, rank: "Brote", status: "retired", connector: "Colab nativo",
    description:
      "Retirada: Arquitecto se abre con rango Brote. Gana MD en Sembrar y Dualita — no canjees saldo por acceso.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Preview Master Chocolatier (retirada)",
    cost: 700, rank: "Labrador del cacao", status: "retired", connector: "Colab nativo",
    description:
      "Retirada: Chocolatier se abre con rango Labrador. El canje ya no vende la llave del campus.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Ruta Benevolo (retirada)",
    cost: 600, rank: "Labrador del cacao", status: "retired", connector: "Colab nativo",
    description: "Retirada: Benevolo se abre con rango Labrador vía MD históricas, no por saldo.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Cupo mentoría Dualita (semana)",
    cost: 400, rank: "Guardián de origen", status: "active", connector: "Colab nativo",
    description:
      "Acompañamiento Dualita (no es llave de Master). Los Masters se abren por rango; este sink es mentoría real.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Reto avanzado de Arquitecto",
    cost: 450, rank: "Brote", status: "planned", connector: "Colab nativo",
    description: "Misión digital adicional con Dualita. Activación pendiente de contenido y términos.",
  },
  {
    brandKey: "zurych", brand: "Zurych", title: "Beneficio en ecommerce Zurych",
    cost: 800, rank: "Guardián de origen", status: "planned", connector: "Sin conector",
    description: "Canje por acordar con la marca. No existe cupón ni integración activa todavía.",
  },
  {
    brandKey: "la-querencia", brand: "La Querencia", title: "Experiencia del nodo Arbeláez",
    cost: 700, rank: "Labrador del cacao", status: "planned", connector: "Fulfillment manual",
    description: "Experiencia territorial propuesta; disponibilidad y alcance requieren confirmación del nodo.",
  },
  {
    brandKey: "la-lomita", brand: "La Lomita", title: "Reto de labranza Paicol",
    cost: 550, rank: "Labrador del cacao", status: "planned", connector: "Fulfillment manual",
    description: "Reto comunitario planeado, sujeto a acuerdo y capacidad de acompañamiento.",
  },
  {
    brandKey: "quara", brand: "Quara Cacao", title: "Ruta de origen Tame",
    cost: 700, rank: "Guardián de origen", status: "planned", connector: "Sin conector",
    description: "Beneficio territorial propuesto. No representa inventario ni promesa comercial.",
  },
  {
    brandKey: "chocolover", brand: "Chocolover", title: "Experiencia de chocolate Meta",
    cost: 650, rank: "Labrador del cacao", status: "planned", connector: "Sin conector",
    description: "Activación futura con el nodo Guamal; términos pendientes de aprobación.",
  },
] as const

export function resolveRank(lifetime: number) {
  return [...communityRanks].reverse().find((rank) => lifetime >= rank.threshold) ?? communityRanks[0]
}

export function nextRank(lifetime: number) {
  return communityRanks.find((rank) => rank.threshold > lifetime) ?? null
}

export function xpLeverageFromTotal(xpTotal: number) {
  const steps = Math.floor(Math.max(0, xpTotal) / scorecardConfig.xpStep)
  const raw = 1 + steps * scorecardConfig.xpLeverageStep
  return Math.min(scorecardConfig.xpLeverageMax, Math.round(raw * 100) / 100)
}

export function isoWeekPeriodKey(date = new Date()) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`
}

export function geometricMean(values: number[]) {
  const positive = values.filter((v) => v > 0)
  if (!positive.length) return 0
  const logSum = positive.reduce((sum, v) => sum + Math.log(v), 0)
  return Math.exp(logSum / positive.length)
}

export function computeScorecardBonus(input: {
  eventCounts: Partial<Record<ScorecardPerspective, number>>
  role: EconomyRole
  lifetimeMd: number
  xpTotal: number
}) {
  const rank = resolveRank(input.lifetimeMd)
  const weights = scorecardConfig.roleWeights[input.role]
  const ceiling = scorecardConfig.weeklyCeilingByRank[rank.slug]
  const mastery = scorecardConfig.masteryFactorByRank[rank.slug]
  const leverage = xpLeverageFromTotal(input.xpTotal)
  const target = scorecardConfig.targetEventsPerPerspective

  const scores = scorecardConfig.perspectives.map((p) => {
    const events = Math.max(0, input.eventCounts[p] ?? 0)
    const coverage = Math.min(1, events / target)
    return coverage * weights[p]
  })
  const balance = geometricMean(scores)
  const bonusRaw = Math.round(scorecardConfig.weeklyPoolMd * balance * mastery * leverage)
  const bonusMd = Math.min(ceiling, Math.max(0, bonusRaw))

  return {
    rankSlug: rank.slug,
    rankName: rank.name,
    ceiling,
    mastery,
    xpLeverage: leverage,
    balanceScore: Math.round(balance * 10000) / 10000,
    bonusMd,
    perspectives: Object.fromEntries(
      scorecardConfig.perspectives.map((p, i) => [
        p,
        {
          events: Math.max(0, input.eventCounts[p] ?? 0),
          weight: weights[p],
          score: Math.round(scores[i]! * 10000) / 10000,
          label: scorecardConfig.perspectiveLabels[p],
        },
      ]),
    ),
  }
}

export function formatCop(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount)
}
