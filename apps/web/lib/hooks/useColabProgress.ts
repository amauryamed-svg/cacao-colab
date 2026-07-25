'use client'

import { useSyncExternalStore } from 'react'
import { microModules } from '@/lib/dualita'

export type ColabProgress = {
  xp: number
  completed: Record<string, boolean>
  completedCount: number
  totalLessons: number
}

const STORAGE_KEY = 'colab_progress'
const TOTAL_LESSONS = microModules.length
const EMPTY: ColabProgress = { xp: 0, completed: {}, completedCount: 0, totalLessons: TOTAL_LESSONS }

let cachedRaw: string | null = null
let cachedSnapshot: ColabProgress = EMPTY

function readProgress(): ColabProgress {
  const raw = window.localStorage.getItem(STORAGE_KEY) ?? '{}'
  if (raw === cachedRaw) return cachedSnapshot // stable reference — useSyncExternalStore needs this
  cachedRaw = raw
  try {
    const { xp, ...completed } = JSON.parse(raw)
    const completedCount = Object.values(completed).filter(Boolean).length
    cachedSnapshot = { xp: xp ?? 0, completed, completedCount, totalLessons: TOTAL_LESSONS }
  } catch {
    cachedSnapshot = EMPTY
  }
  return cachedSnapshot
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

/**
 * Lee el mismo localStorage['colab_progress'] que ya escribe
 * components/aprende/LessonPlayer.tsx al completar una lección — sin
 * cambiar el esquema, sin backend. useSyncExternalStore es el patrón
 * correcto de React para una fuente externa como localStorage: evita
 * mismatch de hidratación (server snapshot = EMPTY) sin necesitar un
 * setState manual dentro de un efecto. El evento 'storage' nativo solo
 * dispara entre pestañas distintas (la navegación lección→hub ya es un
 * hard reload), así que esto es solo una capa extra de sincronía.
 */
export function useColabProgress(): ColabProgress {
  return useSyncExternalStore(subscribe, readProgress, () => EMPTY)
}
