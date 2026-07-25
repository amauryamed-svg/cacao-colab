import OnboardingFlow from '@/components/onboarding/OnboardingFlow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Únete al Colab · Cacao Colab',
  description:
    'Forma parte de la iniciativa colaborativa de cacao colombiano. Cuéntanos tu operación y te acompañamos.',
}

export default function UnetePage() {
  return (
    <main
      className="min-h-screen bg-colab-forest flex flex-col"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* top bar */}
      <div className="w-full border-b border-white/8 py-4 px-6 flex items-center justify-between">
        <a
          href="/"
          className="text-xs font-bold tracking-[3px] uppercase text-colab-cream/40 hover:text-colab-cream/70 transition-colors"
        >
          ← Cacao Colab
        </a>
        <span
          className="text-xs font-bold tracking-[3px] uppercase"
          style={{ color: '#87AA27' }}
        >
          Únete
        </span>
      </div>

      {/* onboarding area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <OnboardingFlow />
      </div>

      {/* bottom note */}
      <div className="w-full border-t border-white/8 py-5 px-6 text-center">
        <p className="text-xs" style={{ color: 'rgba(247,241,238,.2)' }}>
          Cacao Colab · CAÚA × Zurych · Cacao con propósito · Colombia
        </p>
      </div>

      {/* fadeUp keyframe injection (already in globals.css, this is just the style tag for the animation reference in OnboardingFlow) */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
