export const communityRanks = [
  { slug: "semilla", name: "Semilla", icon: "●", threshold: 0, benefit: "Acceso a retos abiertos" },
  { slug: "brote", name: "Brote", icon: "♧", threshold: 100, benefit: "Bitácoras y rutas de aprendizaje" },
  { slug: "labrador", name: "Labrador del cacao", icon: "♣", threshold: 300, benefit: "Retos territoriales prioritarios" },
  { slug: "guardian", name: "Guardián de origen", icon: "◆", threshold: 700, benefit: "Círculos de comunidad y cata" },
  { slug: "maestro", name: "Maestro Fine-Flavor", icon: "✦", threshold: 1500, benefit: "Beneficios de aliados habilitados" },
  { slug: "heritage", name: "Heritage", icon: "◉", threshold: 3000, benefit: "Mentoría y transferencia generacional" },
] as const

// Las Mazorcas Doradas no son XP. El XP desbloquea contenido y apalanca el
// scorecard; MD es saldo de fidelidad con montos declarados aquí.
export const mazorcaRewards = {
  microLesson: 40,
  architectMission: 30,
  architectCourseComplete: 120,
  chocolatierMission: 30,
  chocolatierCourseComplete: 120,
  benevoloMission: 25,
  benevoloCourseComplete: 80,
  gotchiCare: 5,
  gotchiHarvest: 60,
  gotchiCareDailyCap: 50,
} as const

/** Packs de compra de MD. Crédito solo tras pago verificado; no suman a rango. */
export const mdBuyPacks = [
  {
    slug: "saco",
    name: "Saco",
    md: 100,
    priceCop: 25_000,
    blurb: "Entrada a canjes digitales del Colab.",
  },
  {
    slug: "cesta",
    name: "Cesta",
    md: 300,
    priceCop: 65_000,
    blurb: "Ideal para una aceleración o preview de curso.",
  },
  {
    slug: "cosecha",
    name: "Cosecha",
    md: 800,
    priceCop: 150_000,
    blurb: "Bundle intensivo: varios sinks digitales.",
  },
] as const

export type ScorecardPerspective = "learning" | "care" | "community" | "verified_purchase"
export type EconomyRole = "farmer" | "chocolatier" | "maquilador" | "buyer" | "learner"

/** Balanced scorecard: bonificación por productividad propia, sin multinivel. */
export const scorecardConfig = {
  /** MD base semanal antes de pesos, equilibrio, maestría y XP. */
  weeklyPoolMd: 40,
  /** Eventos propios por perspectiva para coverage = 1. */
  targetEventsPerPerspective: 3,
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
    semilla: 15,
    brote: 30,
    labrador: 50,
    guardian: 75,
    maestro: 100,
    heritage: 120,
  } satisfies Record<(typeof communityRanks)[number]["slug"], number>,
  /** Factor de maestría por rango (amplifica el pool). */
  masteryFactorByRank: {
    semilla: 1.0,
    brote: 1.05,
    labrador: 1.1,
    guardian: 1.12,
    maestro: 1.16,
    heritage: 1.2,
  } satisfies Record<(typeof communityRanks)[number]["slug"], number>,
  /** Cada 500 XP suma +0.05 al leverage, tope 1.25. */
  xpStep: 500,
  xpLeverageStep: 0.05,
  xpLeverageMax: 1.25,
} as const

// Espejo de seeds: planned (marcas) + active Colab digital (migración scorecard).
export const plannedBenefits = [
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Aceleración Arquitecto de Fermentación",
    cost: 300, rank: "Brote", status: "active", connector: "Colab nativo",
    description: "Acceso digital a la ruta acelerada de Arquitecto (misiones Dualita + bitácora).",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Preview Master Chocolatier",
    cost: 400, rank: "Labrador del cacao", status: "active", connector: "Colab nativo",
    description: "Desbloqueo de misiones iniciales del track Master Chocolatier con Dualita.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Ruta Benevolo (capstone)",
    cost: 350, rank: "Labrador del cacao", status: "active", connector: "Colab nativo",
    description: "Track digital del capstone Chocolate Benevolo conectado a Master Chocolatier.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Cupo mentoría Dualita (semana)",
    cost: 200, rank: "Guardián de origen", status: "active", connector: "Colab nativo",
    description: "Un cupo semanal de acompañamiento Dualita para dudas de fermentación o producto.",
  },
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Reto avanzado de Arquitecto",
    cost: 250, rank: "Brote", status: "planned", connector: "Colab nativo",
    description: "Misión digital adicional con Dualita. Activación pendiente de contenido y términos.",
  },
  {
    brandKey: "zurych", brand: "Zurych", title: "Beneficio en ecommerce Zurych",
    cost: 500, rank: "Guardián de origen", status: "planned", connector: "Sin conector",
    description: "Canje por acordar con la marca. No existe cupón ni integración activa todavía.",
  },
  {
    brandKey: "la-querencia", brand: "La Querencia", title: "Experiencia del nodo Arbeláez",
    cost: 450, rank: "Labrador del cacao", status: "planned", connector: "Fulfillment manual",
    description: "Experiencia territorial propuesta; disponibilidad y alcance requieren confirmación del nodo.",
  },
  {
    brandKey: "la-lomita", brand: "La Lomita", title: "Reto de labranza Paicol",
    cost: 350, rank: "Labrador del cacao", status: "planned", connector: "Fulfillment manual",
    description: "Reto comunitario planeado, sujeto a acuerdo y capacidad de acompañamiento.",
  },
  {
    brandKey: "quara", brand: "Quara Cacao", title: "Ruta de origen Tame",
    cost: 450, rank: "Guardián de origen", status: "planned", connector: "Sin conector",
    description: "Beneficio territorial propuesto. No representa inventario ni promesa comercial.",
  },
  {
    brandKey: "chocolover", brand: "Chocolover", title: "Experiencia de chocolate Meta",
    cost: 400, rank: "Labrador del cacao", status: "planned", connector: "Sin conector",
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
