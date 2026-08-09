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

/** Sonidos Dualita / UI (incluye celebrate). */
export type DualitaSfxKind =
  | CelebrateKind
  | "tap"
  | "tip"
  | "select"
  | "whoosh"
  | "xp"

const MUTE_KEY = "dualita_sfx_muted"

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
let masterGain: GainNode | null = null

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
    if (!audioCtx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtx = new AC()
      masterGain = audioCtx.createGain()
      masterGain.gain.value = 0.85
      masterGain.connect(audioCtx.destination)
    }
    if (audioCtx.state === "suspended") void audioCtx.resume()
    return audioCtx
  } catch {
    return null
  }
}

export function isSfxMuted(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1"
  } catch {
    return false
  }
}

export function setSfxMuted(muted: boolean) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0")
    window.dispatchEvent(new CustomEvent("dualita-sfx-mute", { detail: muted }))
  } catch {
    // ignore
  }
}

export function toggleSfxMuted(): boolean {
  const next = !isSfxMuted()
  setSfxMuted(next)
  return next
}

function tone(
  frequency: number,
  start: number,
  duration: number,
  type: OscillatorType = "triangle",
  gain = 0.08,
) {
  const ac = ctx()
  if (!ac || !masterGain) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  const filter = ac.createBiquadFilter()
  filter.type = "lowpass"
  filter.frequency.value = Math.min(4200, frequency * 4)
  osc.type = type
  osc.frequency.value = frequency
  g.gain.value = 0.0001
  osc.connect(filter)
  filter.connect(g)
  g.connect(masterGain)
  const t0 = ac.currentTime + start
  g.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.start(t0)
  osc.stop(t0 + duration + 0.03)
}

function slide(
  from: number,
  to: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.06,
) {
  const ac = ctx()
  if (!ac || !masterGain) return
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from, ac.currentTime + start)
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), ac.currentTime + start + duration)
  g.gain.value = 0.0001
  osc.connect(g)
  g.connect(masterGain)
  const t0 = ac.currentTime + start
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

/** SFX Dualita / campus — estilo Duolingo, sintetizados (sin archivos). */
export function playDualitaSfx(kind: DualitaSfxKind) {
  try {
    if (isSfxMuted()) return
    if (!ctx()) return

    if (kind === "tap") {
      tone(880, 0, 0.05, "triangle", 0.07)
      tone(1320, 0.03, 0.06, "sine", 0.04)
    } else if (kind === "tip") {
      tone(659.25, 0, 0.07, "triangle", 0.06)
      tone(987.77, 0.07, 0.1, "sine", 0.05)
    } else if (kind === "select") {
      tone(740, 0, 0.04, "triangle", 0.05)
    } else if (kind === "whoosh") {
      slide(640, 320, 0, 0.12, "sine", 0.04)
    } else if (kind === "xp") {
      tone(1046.5, 0, 0.07, "square", 0.035)
      tone(1318.5, 0.06, 0.1, "triangle", 0.05)
    } else if (kind === "correct") {
      // Fanfarria corta Duo-like: C5 → E5 → G5
      tone(523.25, 0, 0.1, "triangle", 0.09)
      tone(659.25, 0.09, 0.11, "triangle", 0.085)
      tone(783.99, 0.18, 0.2, "triangle", 0.08)
      tone(1046.5, 0.3, 0.12, "sine", 0.045)
    } else if (kind === "wrong") {
      tone(311.13, 0, 0.12, "sawtooth", 0.045)
      tone(233.08, 0.1, 0.18, "sawtooth", 0.04)
    } else if (kind === "heart") {
      tone(246.94, 0, 0.1, "triangle", 0.05)
      tone(196, 0.1, 0.22, "sawtooth", 0.035)
    } else if (kind === "mission") {
      ;[392, 523.25, 659.25, 783.99].forEach((f, i) => {
        tone(f, i * 0.09, 0.14, i > 1 ? "square" : "triangle", i > 1 ? 0.045 : 0.07)
      })
    } else if (kind === "levelup" || kind === "diploma") {
      ;[523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
        tone(f, i * 0.08, 0.18, i >= 3 ? "square" : "triangle", i >= 3 ? 0.04 : 0.07)
      })
    }
  } catch {
    // silencioso si el navegador bloquea audio
  }
}

/** Alias histórico usado por Masters. */
export function playCampusSfx(kind: CelebrateKind) {
  playDualitaSfx(kind)
}
