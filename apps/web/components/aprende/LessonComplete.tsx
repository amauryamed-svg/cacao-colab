import SquirrelSVG from '@/components/brand/SquirrelSVG'
import { type Lesson, lessons } from '@/lib/lessons'

interface Props {
  lesson: Lesson
  onContinue: () => void
}

export default function LessonComplete({ lesson, onContinue }: Props) {
  const nextLesson = lessons.find(l => l.number === lesson.number + 1)

  return (
    <div
      className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6"
      style={{ animation: 'fadeUp .5s ease both' }}
    >
      {/* confetti ring + squirrel */}
      <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '3px solid #F2C830', animation: 'confettiBurst 1s ease-out both' }}
        />
        <div className="squirrel-bob">
          <SquirrelSVG size={100} />
        </div>
      </div>

      {/* badge */}
      <div
        className="px-5 py-2 rounded-full font-bold text-lg"
        style={{ background: 'rgba(242,200,48,.15)', border: '1px solid rgba(242,200,48,.3)', color: '#F2C830', fontFamily: 'Arial, sans-serif' }}
      >
        {lesson.emoji} +{lesson.xp} XP
      </div>

      <h2 className="font-serif text-colab-cream leading-tight" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
        {lesson.companionComplete}
      </h2>

      <p style={{ color: 'rgba(247,241,238,.5)', fontSize: 14, fontFamily: 'Arial, sans-serif' }}>
        Módulo {lesson.number} de 6 completado.
        {nextLesson ? ` Siguiente: ${nextLesson.title}.` : ' ¡Has completado toda la Academia Dualita!'}
      </p>

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
