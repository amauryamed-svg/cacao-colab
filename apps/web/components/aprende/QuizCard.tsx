'use client'

import { useState } from 'react'
import { type Lesson } from '@/lib/lessons'

interface Props {
  quiz: Lesson['quiz']
  onCorrect: () => void
}

export default function QuizCard({ quiz, onCorrect }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  function pick(id: string) {
    if (selected) return
    setSelected(id)
    const opt = quiz.options.find(o => o.id === id)
    if (opt?.correct) setTimeout(onCorrect, 1400)
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6" style={{ animation: 'fadeUp .4s ease both' }}>
      {/* badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[3px] uppercase w-fit"
        style={{ background: 'rgba(135,170,39,.15)', border: '1px solid rgba(135,170,39,.3)', color: '#87AA27', fontFamily: 'Arial, sans-serif' }}
      >
        Quiz
      </div>

      <h2 className="font-serif text-colab-cream leading-tight" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 900 }}>
        {quiz.question}
      </h2>

      <div className="flex flex-col gap-3">
        {quiz.options.map(opt => {
          const isSelected = selected === opt.id
          const revealed = selected !== null

          let bg = 'rgba(247,241,238,.06)'
          let border = 'rgba(247,241,238,.14)'
          let color = '#F7F1EE'

          if (revealed) {
            if (opt.correct)        { bg = 'rgba(135,170,39,.15)'; border = '#87AA27'; color = '#87AA27' }
            else if (isSelected)    { bg = 'rgba(220,60,60,.1)';   border = '#e05555'; color = '#e08080' }
            else                    { bg = 'rgba(247,241,238,.03)'; border = 'rgba(247,241,238,.07)'; color = 'rgba(247,241,238,.35)' }
          }

          return (
            <button
              key={opt.id}
              onClick={() => pick(opt.id)}
              disabled={!!selected}
              className="w-full text-left rounded-xl px-5 py-4 border transition-all duration-300"
              style={{ background: bg, borderColor: border, color, cursor: selected ? 'default' : 'pointer', fontFamily: 'Arial, sans-serif' }}
            >
              <span className="font-semibold text-sm">{opt.text}</span>
              {revealed && isSelected && !opt.correct && (
                <p className="text-xs mt-2 opacity-80">{opt.explanation}</p>
              )}
              {revealed && opt.correct && (
                <p className="text-xs mt-2 opacity-80">{opt.explanation}</p>
              )}
            </button>
          )
        })}
      </div>

      {selected && !quiz.options.find(o => o.id === selected)?.correct && (
        <p className="text-xs text-center" style={{ color: 'rgba(247,241,238,.4)', fontFamily: 'Arial, sans-serif' }}>
          Inténtalo de nuevo — el aprendizaje también está en el error.
        </p>
      )}
    </div>
  )
}
