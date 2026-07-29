'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import OnboardingFlow from './OnboardingFlow'

interface Props {
  alreadyOnboarded: boolean
  children: React.ReactNode
}

// Rutas internas (portal de equipo, auth) nunca deben mostrar el popup de
// captura de leads HoReCa — no son visitantes a calificar, son Oscar/Hellen/Amaury.
const EXCLUDED_PREFIXES = ['/equipo', '/auth', '/cuenta', '/campus', '/juega']

export default function OnboardingGateClient({ alreadyOnboarded, children }: Props) {
  const pathname = usePathname()
  const [hidden,    setHidden]    = useState(false)
  const [dismissed, setDismissed] = useState(alreadyOnboarded)

  const excluded = EXCLUDED_PREFIXES.some(p => pathname?.startsWith(p))

  async function dismiss() {
    setHidden(true)
    setTimeout(() => setDismissed(true), 500)
  }

  async function skip() {
    // set cookie server-side so it survives page reloads
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
          onClick={e => { if (e.target === e.currentTarget) skip() }}
          style={{
            position:   'fixed',
            inset:      0,
            zIndex:     9999,
            background: 'rgba(10,16,6,.6)',
            backdropFilter: 'blur(2px)',
            overflowY:  'auto',
            display:    'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding:    '5vh 16px',
            transition: 'opacity .45s ease',
            opacity:    hidden ? 0 : 1,
            pointerEvents: hidden ? 'none' : 'auto',
          }}
        >
          {/* popup card */}
          <div
            className="w-full max-w-lg rounded-2xl relative"
            style={{
              background: '#1A2E10',
              border: '1px solid rgba(247,241,238,.1)',
              boxShadow: '0 24px 64px rgba(0,0,0,.4)',
              padding: '2rem',
            }}
          >
            <button
              onClick={skip}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-xs font-semibold transition-colors z-10"
              style={{ color: 'rgba(247,241,238,.3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(247,241,238,.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,241,238,.3)')}
            >
              Saltar ✕
            </button>

            <OnboardingFlow onComplete={dismiss} />
          </div>

          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
