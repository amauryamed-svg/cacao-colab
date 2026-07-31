/**
 * Consejos de avance para correos de seguimiento.
 * Principio: la maestría se logra con consistencia — estudiar y practicar en repetición.
 */
import { communityRanks, nextRank, resolveRank } from "@/lib/loyalty"

export type SembrarSnapshot = {
  phase: "cultivation" | "fermentation" | "complete" | "none"
  stageName: string
  genotypeCode: string | null
  ageHours: number
  bitacoraCount: number
}

export type LearnerFollowupSnapshot = {
  firstName?: string | null
  mdBalance: number
  mdLifetime: number
  microCompleted: number
  microTotal: number
  lastLessonSlug?: string | null
  sembrar: SembrarSnapshot
}

export type FollowupAdvice = {
  headline: string
  principle: string
  mdSummary: string
  rankName: string
  rankNext: string | null
  mdToNext: number | null
  studyTip: string
  practiceTip: string
  sembrarTip: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  emailSubject: string
}

/** Umbrales alineados a CacaoGotchiLab `stages` (ageHours). */
const STAGE_BY_HOURS = [
  { threshold: 0, name: "Semilla" },
  { threshold: 1, name: "Plántula" },
  { threshold: 12, name: "Árbol joven" },
  { threshold: 30, name: "Floración" },
  { threshold: 54, name: "Mazorca" },
  { threshold: 78, name: "Cosecha" },
]

export function stageNameFromAgeHours(ageHours: number) {
  const found = [...STAGE_BY_HOURS].reverse().find((s) => ageHours >= s.threshold)
  return found?.name ?? "Semilla"
}

export function emptySembrarSnapshot(): SembrarSnapshot {
  return {
    phase: "none",
    stageName: "Sin labranza aún",
    genotypeCode: null,
    ageHours: 0,
    bitacoraCount: 0,
  }
}

export function buildFollowupAdvice(snap: LearnerFollowupSnapshot): FollowupAdvice {
  const rank = resolveRank(snap.mdLifetime)
  const upcoming = nextRank(snap.mdLifetime)
  const mdToNext = upcoming ? Math.max(0, upcoming.threshold - snap.mdLifetime) : null
  const name = snap.firstName?.trim() || "cacaotier"
  const modulesLeft = Math.max(0, snap.microTotal - snap.microCompleted)
  const consistencyScore =
    snap.microCompleted +
    (snap.sembrar.phase === "none" ? 0 : 1) +
    Math.min(3, Math.floor(snap.sembrar.bitacoraCount / 2)) +
    (snap.mdLifetime >= 100 ? 1 : 0)

  const principle =
    "La maestría no llega de un golpe: se logra cuando estudiar y practicar se repiten con constancia."

  let studyTip =
    "Abre el siguiente módulo de Dualita hoy — aunque sean 8 minutos. La racha corta vence a la sesión épica abandonada."
  if (snap.microCompleted === 0) {
    studyTip =
      "Empieza por un solo módulo de Microlearning CAÚA. Una semilla de conocimiento basta para marcar el primer surco."
  } else if (modulesLeft > 0) {
    studyTip = `Llevas ${snap.microCompleted}/${snap.microTotal} módulos. Te faltan ${modulesLeft}: repite el hábito antes de ampliar el mapa.`
  } else {
    studyTip =
      "Completaste el microlearning. Repasa un módulo débil o entra a Master Cacaotier: la repetición fija el criterio Fine-Flavor."
  }

  let practiceTip =
    "Practica en Sembrar: cuida la labranza, anota en la bitácora y observa. El oficio se graba en el cuerpo, no solo en la lectura."
  if (snap.sembrar.phase === "none") {
    practiceTip =
      "Siembra tu primera labranza en Sembrar (FEAR 5 recomendado). Estudiar sin practicar se olvida; practicar sin estudiar se desvía."
  } else if (snap.sembrar.phase === "cultivation") {
    practiceTip = `Tu labranza está en ${snap.sembrar.stageName}${
      snap.sembrar.genotypeCode ? ` · ${snap.sembrar.genotypeCode}` : ""
    }. Hoy: una acción de cuidado + una nota en bitácora.`
  } else if (snap.sembrar.phase === "fermentation") {
    practiceTip =
      "Estás en fermentación simulada: registra temperatura/pH mentales y compara con el paper FEAR 5. Consistencia > improvisación."
  } else {
    practiceTip =
      "Cosecha fermentada lista. Celebra con una revisión: ¿qué repetirías igual? La maestría es el mismo gesto, cada vez más limpio."
  }

  let sembrarTip =
    "Sembrar es tu consejo de avance vivo: el estado de la labranza te dice qué estudiar después."
  if (snap.sembrar.bitacoraCount === 0 && snap.sembrar.phase !== "none") {
    sembrarTip =
      "Abre la bitácora: sin registro no hay tipicidad. Anota sombra, agua o floración — una línea basta."
  } else if (snap.sembrar.bitacoraCount > 0 && snap.sembrar.bitacoraCount < 3) {
    sembrarTip = `Llevas ${snap.sembrar.bitacoraCount} notas. Apunta a 3 bitácoras esta semana: el patrón enseña más que el pico de un día.`
  } else if (snap.sembrar.phase === "complete") {
    sembrarTip =
      "Labranza completa. Siguiente repetición: nueva parcela o genotipo (TCS 19 / TCS 06) con el mismo protocolo."
  }

  const mdSummary =
    snap.mdLifetime === 0
      ? "Aún no has recolectado Mazorcas Doradas. Cada módulo y cada cuidado cuentan."
      : `Has recolectado ${snap.mdLifetime} MD de por vida` +
        (snap.mdBalance !== snap.mdLifetime ? ` (saldo actual ${snap.mdBalance} MD)` : "") +
        `. Rango: ${rank.name}.`

  let headline = `${name}, tu cacao crece con la repetición`
  if (consistencyScore >= 5) {
    headline = `${name}, la constancia ya se nota en tus Mazorcas`
  } else if (snap.mdLifetime === 0) {
    headline = `${name}, el primer surco es el que más importa`
  }

  const emailSubject =
    snap.mdLifetime > 0
      ? `${snap.mdLifetime} MD · sigue el ritmo, no el sprint`
      : `Tu primer paso Colab · estudiar + practicar`

  return {
    headline,
    principle,
    mdSummary,
    rankName: rank.name,
    rankNext: upcoming?.name ?? null,
    mdToNext,
    studyTip,
    practiceTip,
    sembrarTip,
    ctaPrimary: {
      label: modulesLeft > 0 || snap.microCompleted === 0 ? "Continuar Dualita →" : "Abrir Master Cacaotier →",
      href:
        modulesLeft > 0 || snap.microCompleted === 0
          ? "https://cacaocolab.org/aprende"
          : "https://cacaocolab.org/aprende/cacaotier",
    },
    ctaSecondary: {
      label: snap.sembrar.phase === "none" ? "Empezar Sembrar →" : "Cuidar labranza →",
      href: "https://cacaocolab.org/juega",
    },
    emailSubject,
  }
}

/** Texto plano para CRM / HubSpot note */
export function adviceToPlainText(advice: FollowupAdvice) {
  const next =
    advice.rankNext && advice.mdToNext != null
      ? `Próximo rango ${advice.rankNext} · faltan ${advice.mdToNext} MD.`
      : "Estás en el rango máximo documentado."
  return [
    advice.headline,
    "",
    advice.principle,
    "",
    advice.mdSummary,
    `Rango: ${advice.rankName}. ${next}`,
    "",
    `Estudiar: ${advice.studyTip}`,
    `Practicar: ${advice.practiceTip}`,
    `Sembrar: ${advice.sembrarTip}`,
    "",
    `${advice.ctaPrimary.label} ${advice.ctaPrimary.href}`,
    `${advice.ctaSecondary.label} ${advice.ctaSecondary.href}`,
  ].join("\n")
}

export { communityRanks }
