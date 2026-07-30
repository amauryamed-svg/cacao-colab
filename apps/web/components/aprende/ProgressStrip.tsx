'use client'

import { useColabProgress } from '@/lib/hooks/useColabProgress'
import type { RegisteredMicroProgress } from '@/lib/microlearning'

/**
 * Muestra el progreso de la cuenta cuando hay sesión, y el de localStorage
 * cuando el learner navega sin registrarse. Sin racha ni leaderboard todavía.
 */
export default function ProgressStrip({ registered }: { registered?: RegisteredMicroProgress | null }) {
  const local = useColabProgress()
  const { xp, completedCount, totalLessons } = registered ?? local
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
      <p className="text-[10px] font-sans text-colab-cream/35 mt-2">
        {registered
          ? 'Progreso guardado en tu cuenta · disponible en cualquier dispositivo.'
          : 'Progreso local de este navegador · entra con tu cuenta para conservarlo.'}
      </p>
    </div>
  )
}
