import OnboardingFlow from '@/components/onboarding/OnboardingFlow'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Únete al Colab · Cacao Colab',
  description:
    'Plataforma de aceleración del cacao colombiano. Educarte en excelencia y especialidad, subir competitividad colaborativa y dar propósito a nuevas generaciones.',
}

export default function UnetePage() {
  return (
    <main className="onboard-page min-h-screen bg-colab-forest flex flex-col">
      <div className="w-full border-b border-white/8 py-4 px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-bold tracking-[3px] uppercase text-colab-cream/40 hover:text-colab-cream/70 transition-colors"
        >
          ← Cacao Colab
        </Link>
        <span className="text-xs font-bold tracking-[3px] uppercase text-colab-pod">
          Aceleración
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-14 md:py-20">
        <div className="w-full max-w-xl">
          <OnboardingFlow />
        </div>
      </div>

      <div className="w-full border-t border-white/8 py-5 px-6 text-center">
        <p className="text-xs text-colab-cream/20 max-w-md mx-auto leading-relaxed">
          Cacao Colab · aceleración colaborativa del cacao y el chocolate colombiano · Dualita ·
          nodos · marcas
        </p>
      </div>
    </main>
  )
}
