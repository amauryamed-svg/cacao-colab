'use client'

import { useColabProgress } from '@/lib/hooks/useColabProgress'

/**
 * Superficie el progreso que LessonPlayer.tsx ya guarda en localStorage
 * pero que hoy no se muestra en ningún lado. Sin racha ni leaderboard —
 * eso requeriría sync de servidor, queda para una fase futura.
 */
export default function ProgressStrip() {
  const { xp, completedCount, totalLessons } = useColabProgress()
  const pct = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="max-w-lg mx-auto mt-6 px-4 sm:px-0">
      <div className="flex items-center justify-between text-xs font-sans font-bold mb-2">
        <span className="text-colab-cream/60">{completedCount}/{totalLessons} módulos</span>
        <span className="text-colab-yellow">{xp} XP</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(247,241,238,.1)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: '#F2C830' }}
        />
      </div>
    </div>
  )
}
