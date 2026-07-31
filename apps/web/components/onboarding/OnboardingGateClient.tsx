'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import OnboardingFlow from './OnboardingFlow'

interface Props {
  alreadyOnboarded: boolean
  children: React.ReactNode
}

// Rutas internas / flujos propios no muestran el gate (evita doble onboarding).
const EXCLUDED_PREFIXES = ['/equipo', '/auth', '/cuenta', '/campus', '/juega', '/sembrar', '/unete']

export default function OnboardingGateClient({ alreadyOnboarded, children }: Props) {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [dismissed, setDismissed] = useState(alreadyOnboarded)

  const excluded = EXCLUDED_PREFIXES.some((p) => pathname?.startsWith(p))

  async function dismiss() {
    setHidden(true)
    setTimeout(() => setDismissed(true), 500)
  }

  async function skip() {
    await fetch('/api/onboarding/skip', { method: 'POST' })
    setHidden(true)
    setTimeout(() => setDismissed(true), 400)
  }

  return (
    <>
      {children}

      {!dismissed && !excluded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Únete al Cacao Colab"
          className="onboard-gate"
          onClick={(e) => {
            if (e.target === e.currentTarget) skip()
          }}
          style={{
            opacity: hidden ? 0 : 1,
            pointerEvents: hidden ? 'none' : 'auto',
          }}
        >
          <div className="onboard-gate-panel">
            <button
              onClick={skip}
              aria-label="Cerrar"
              className="onboard-gate-skip"
              type="button"
            >
              Saltar ✕
            </button>
            <OnboardingFlow onComplete={dismiss} />
          </div>
        </div>
      )}
    </>
  )
}
