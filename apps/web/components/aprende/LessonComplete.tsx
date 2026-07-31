import SquirrelSVG from '@/components/brand/SquirrelSVG'
import MazorcaSVG from '@/components/atmosphere/MazorcaSVG'
import { type Lesson, lessons } from '@/lib/lessons'
import type { MicroLessonResult } from '@/lib/microlearning'

interface Props {
  lesson: Lesson
  loyalty?: MicroLessonResult | null
  onContinue: () => void
}

export default function LessonComplete({ lesson, loyalty, onContinue }: Props) {
  const nextLesson = lessons.find(l => l.number === lesson.number + 1)

  return (
    <div
      className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6 lesson-complete-burst"
      style={{ animation: 'fadeUp .5s ease both' }}
    >
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '3px solid #F2C830', animation: 'confettiBurst 1s ease-out both' }}
        />
        <span className="absolute -top-2 -left-1 opacity-70" style={{ animation: 'podFloat 3s ease-in-out infinite' }}>
          <MazorcaSVG tone="yellow" size={28} />
        </span>
        <span className="absolute -bottom-1 -right-2 opacity-60" style={{ animation: 'podFloat 3.6s .4s ease-in-out infinite' }}>
          <MazorcaSVG tone="coral" size={24} />
        </span>
        <div className="squirrel-bob">
          <SquirrelSVG size={100} />
        </div>
      </div>

      <div
        className="px-5 py-2 rounded-full font-bold text-lg font-sans"
        style={{ background: 'rgba(255,106,61,.15)', border: '1px solid rgba(255,106,61,.35)', color: '#FF6A3D' }}
      >
        {lesson.emoji} +{lesson.xp} XP
      </div>

      <h2 className="font-serif text-colab-cream leading-tight" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
        {lesson.companionComplete}
      </h2>

      <p className="font-sans text-sm text-colab-cream/50">
        Módulo {lesson.number} de 6 completado.
        {nextLesson ? ` Siguiente: ${nextLesson.title}.` : ' ¡Has completado toda la Academia Dualita!'}
      </p>

      {loyalty?.status === 'guest' && (
        <div className="lesson-loyalty-note">
          <strong>Este avance vive solo en este navegador.</strong>
          <p>Entra con tu cuenta para guardar el progreso del campus y acumular Mazorcas Doradas.</p>
          <a href={`/cuenta/entrar?next=/aprende/${lesson.slug}`}>Crear cuenta o entrar →</a>
        </div>
      )}

      {loyalty?.status === 'saved' && (
        <div className="lesson-loyalty-note">
          <strong>
            Progreso guardado · {loyalty.completedCount}/{loyalty.totalLessons} módulos
          </strong>
          <p>
            {loyalty.awarded > 0
              ? `Ganaste ${loyalty.awarded} Mazorcas Doradas por este módulo.`
              : 'Ya habías ganado las Mazorcas Doradas de este módulo, así que no se acreditan de nuevo.'}
            {loyalty.balance !== null && ` Saldo actual: ${loyalty.balance} MD.`}
          </p>
          <a href="/cuenta/mazorcas">Ver mi wallet →</a>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full mt-2">
        {nextLesson ? (
          <a
            href={`/aprende/${nextLesson.slug}`}
            className="w-full py-4 rounded-xl font-bold text-sm text-center transition-all duration-200"
            style={{ background: '#F2C830', color: '#1A2E10', display: 'block', fontFamily: 'Arial, sans-serif' }}
          >
            Módulo {nextLesson.number}: {nextLesson.title} →
          </a>
        ) : (
          <div
            className="w-full py-4 rounded-xl font-bold text-sm text-center"
            style={{ background: 'rgba(135,170,39,.2)', border: '1px solid #87AA27', color: '#87AA27', fontFamily: 'Arial, sans-serif' }}
          >
            🎓 ¡Academia Dualita completada!
          </div>
        )}
        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl font-semibold text-sm text-center transition-all duration-200"
          style={{ background: 'rgba(247,241,238,.06)', border: '1px solid rgba(247,241,238,.14)', color: 'rgba(247,241,238,.6)', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}
        >
          ← Volver al hub de aprendizaje
        </button>
      </div>
    </div>
  )
}
