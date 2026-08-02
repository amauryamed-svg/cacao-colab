/**
 * Gamify compartido Masters · shuffle estable + SFX Web Audio + celebra.
 * Sin dependencias externas: Duolingo-vibes con rigor Colab.
 */

export type QuizOption = {
  id: string
  text: string
  correct: boolean
  explanation: string
}

export type CelebrateKind = "correct" | "wrong" | "heart" | "mission" | "levelup" | "diploma"

/** Hash simple y estable para seed por misión. */
export function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Mezcla opciones de forma determinista por misión (no siempre la correcta en B).
 * Conserva id/text/correct originales — las letras A/B/C se asignan en UI por índice.
 */
export function orderQuizOptions(options: QuizOption[], missionSlug: string): QuizOption[] {
  const rng = mulberry32(hashSeed(`quiz:${missionSlug}`))
  const copy = options.map((o) => ({ ...o }))
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

let audioCtx: AudioContext | null = null

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtx = new AC()
    }
    if (audioCtx.state === "suspended") void audioCtx.resume()
    return audioCtx
  } catch {
    return null
  }
}

function tone(
  frequency: number,
  start: number,
  duration: number,
  type: OscillatorType = "triangle",
  gain = 0.08,
) {
  const ac = ctx()
  if (!ac) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.value = frequency
  g.gain.value = 0.0001
  osc.connect(g)
  g.connect(ac.destination)
  const t0 = ac.currentTime + start
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

/** SFX ligeros: acierto / error / vida / misión / diploma. */
export function playCampusSfx(kind: CelebrateKind) {
  try {
    if (kind === "correct") {
      tone(523.25, 0, 0.12, "triangle", 0.09)
      tone(659.25, 0.1, 0.14, "triangle", 0.09)
      tone(783.99, 0.2, 0.22, "square", 0.05) // trompeta corta
    } else if (kind === "wrong" || kind === "heart") {
      tone(220, 0, 0.1, "sawtooth", 0.05)
      tone(164.81, 0.08, 0.18, "sawtooth", 0.04)
    } else if (kind === "mission") {
      tone(392, 0, 0.1, "triangle", 0.08)
      tone(523.25, 0.1, 0.12, "triangle", 0.08)
      tone(659.25, 0.22, 0.28, "square", 0.06)
    } else if (kind === "levelup" || kind === "diploma") {
      ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        tone(f, i * 0.09, 0.2, i === 3 ? "square" : "triangle", 0.07)
      })
    }
  } catch {
    // silencioso si el navegador bloquea audio
  }
}
