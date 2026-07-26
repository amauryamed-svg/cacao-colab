import { type LessonCard as LessonCardType } from '@/lib/lessons'

interface Props {
  card: LessonCardType
  index: number
  total: number
  isLast: boolean
  onNext: () => void
}

export default function LessonCard({ card, index, total, isLast, onNext }: Props) {
  return (
    <div
      className="w-full max-w-lg mx-auto flex flex-col gap-6"
      style={{ animation: 'fadeUp .4s ease both' }}
    >
      {/* kicker */}
      <p className="text-xs font-bold tracking-[3px] uppercase" style={{ color: '#87AA27' }}>
        {card.kicker}
      </p>

      {/* headline */}
      <h2
        className="font-serif text-colab-cream leading-tight"
        style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: 900 }}
      >
        {card.headline}
      </h2>

      {/* body */}
      <p className="leading-relaxed" style={{ color: 'rgba(247,241,238,.72)', fontSize: 15, fontFamily: 'Arial, sans-serif' }}>
        {card.body}
      </p>

      {/* highlight stat */}
      {card.highlight && (
        <div
          className="rounded-2xl p-5 flex flex-col gap-1"
          style={{ background: 'rgba(242,200,48,.1)', border: '1px solid rgba(242,200,48,.2)' }}
        >
          <span
            className="font-serif font-black"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#F2C830', lineHeight: 1 }}
          >
            {card.highlight.value}
          </span>
          <span className="text-xs uppercase tracking-[2px] font-bold" style={{ color: 'rgba(242,200,48,.6)', fontFamily: 'Arial, sans-serif' }}>
            {card.highlight.label}
          </span>
        </div>
      )}

      {/* nav */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs" style={{ color: 'rgba(247,241,238,.3)', fontFamily: 'Arial, sans-serif' }}>
          {index + 1} / {total}
        </span>
        <button
          onClick={onNext}
          className="px-7 py-3 rounded-full font-bold text-sm transition-all duration-200"
          style={{ background: '#F2C830', color: '#1A2E10', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}
        >
          {isLast ? 'Ir al quiz →' : 'Siguiente →'}
        </button>
      </div>
    </div>
  )
}
