'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Lesson } from '@/lib/lessons'
import LessonCard from './LessonCard'
import QuizCard from './QuizCard'
import LessonComplete from './LessonComplete'
import DualitaCompanion from './DualitaCompanion'
import CourseIntroPlayer from './CourseIntroPlayer'
import { trackColabEvent } from '@/lib/analytics'
import { completeMicroLesson } from '@/app/aprende/actions'
import type { MicroLessonResult } from '@/lib/microlearning'
import { getLessonIntroVideo } from '@/lib/course-videos'

type Phase = 'cards' | 'quiz' | 'complete'

interface Props { lesson: Lesson }

export default function LessonPlayer({ lesson }: Props) {
  const [cardIndex, setCardIndex] = useState(0)
  const [phase,     setPhase]     = useState<Phase>('cards')
  const [loyalty,   setLoyalty]   = useState<MicroLessonResult | null>(null)
  const introVideo = getLessonIntroVideo(lesson.slug)

  // save progress to localStorage on complete
  useEffect(() => {
    if (phase !== 'complete') return
    try {
      const raw  = localStorage.getItem('colab_progress') ?? '{}'
      const data = JSON.parse(raw)
      data[lesson.slug] = true
      data['xp'] = (data['xp'] ?? 0) + lesson.xp
      localStorage.setItem('colab_progress', JSON.stringify(data))
    } catch {
      // localStorage puede fallar en modo privado / SSR — no bloquea la lección.
    }
    trackColabEvent('lesson_completed', { target: lesson.slug, source: 'microlearning-caua' })
    completeMicroLesson(lesson.slug).then(setLoyalty).catch(() => setLoyalty(null))
  }, [phase, lesson.slug, lesson.xp])

  const totalCards = lesson.cards.length

  const companionMsg =
    phase === 'complete'   ? lesson.companionComplete :
    phase === 'quiz'       ? lesson.companionQuiz     :
    cardIndex === 0        ? lesson.companionIntro     :
    cardIndex >= Math.floor(totalCards / 2) ? lesson.companionMid : lesson.companionIntro

  const progress =
    phase === 'complete' ? 100 :
    phase === 'quiz'     ? 90  :
    Math.round((cardIndex / (totalCards + 1)) * 85)

  function nextCard() {
    if (cardIndex < totalCards - 1) setCardIndex(i => i + 1)
    else setPhase('quiz')
  }

  return (
    <div className="min-h-screen bg-colab-forest flex flex-col">
      {/* sticky progress header */}
      <div
        className="sticky top-0 z-40 w-full px-4 py-3 flex items-center gap-4"
        style={{ background: 'rgba(26,46,16,.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(247,241,238,.08)' }}
      >
        <Link href="/aprende" className="text-xs font-bold uppercase tracking-[2px] shrink-0" style={{ color: 'rgba(247,241,238,.4)', fontFamily: 'Arial, sans-serif' }}>← Hub</Link>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(247,241,238,.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: '#F2C830' }}
          />
        </div>
        <span className="text-xs font-bold shrink-0" style={{ color: '#F2C830', fontFamily: 'Arial, sans-serif' }}>
          {lesson.emoji} {lesson.number}/6
        </span>
      </div>

      {/* lesson title band */}
      {phase === 'cards' && cardIndex === 0 && (
        <div
          className={`px-4 pt-10 pb-6 mx-auto w-full ${introVideo ? "max-w-3xl" : "max-w-lg"}`}
          style={{ animation: 'fadeUp .4s ease both' }}
        >
          <p className="text-xs font-bold tracking-[3px] uppercase mb-2" style={{ color: '#87AA27', fontFamily: 'Arial, sans-serif' }}>
            Módulo {lesson.number} · {lesson.duration}
          </p>
          <h1 className="font-serif text-colab-cream" style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', fontWeight: 900 }}>
            {lesson.title}
          </h1>
          {introVideo && (
            <div className="mt-6">
              <CourseIntroPlayer video={introVideo} source={`lesson-${lesson.slug}`} />
            </div>
          )}
        </div>
      )}

      {/* main content */}
      <div className="flex-1 px-4 pb-32 pt-8 flex flex-col items-center">
        {phase === 'cards' && (
          <LessonCard
            key={cardIndex}
            card={lesson.cards[cardIndex]}
            index={cardIndex}
            total={totalCards}
            isLast={cardIndex === totalCards - 1}
            onNext={nextCard}
          />
        )}
        {phase === 'quiz' && (
          <QuizCard
            quiz={lesson.quiz}
            onCorrect={() => setPhase('complete')}
          />
        )}
        {phase === 'complete' && (
          <LessonComplete
            lesson={lesson}
            loyalty={loyalty}
            onContinue={() => { window.location.href = '/aprende' }}
          />
        )}
      </div>

      {/* Dualita companion */}
      <DualitaCompanion message={companionMsg} tips={lesson.companionTips} />
    </div>
  )
}
