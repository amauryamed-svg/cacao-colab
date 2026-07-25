'use client'

import { useState } from 'react'
import OnboardingFlow from './OnboardingFlow'

interface Props {
  alreadyOnboarded: boolean
  children: React.ReactNode
}

export default function OnboardingGateClient({ alreadyOnboarded, children }: Props) {
  const [hidden,    setHidden]    = useState(false)
  const [dismissed, setDismissed] = useState(alreadyOnboarded)

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

      {!dismissed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Únete al Cacao Colab"
          style={{
            position:   'fixed',
            inset:      0,
            zIndex:     9999,
            background: '#1A2E10',
            overflowY:  'auto',
            transition: 'opacity .45s ease',
            opacity:    hidden ? 0 : 1,
            pointerEvents: hidden ? 'none' : 'auto',
          }}
        >
          {/* top bar */}
          <div
            className="w-full border-b sticky top-0 z-10 flex items-center justify-between px-6 py-4"
            style={{ background: '#1A2E10', borderColor: 'rgba(247,241,238,.08)' }}
          >
            <span className="text-xs font-bold tracking-[3px] uppercase" style={{ color: 'rgba(247,241,238,.3)' }}>
              CACAO COLAB
            </span>
            <button
              onClick={skip}
              className="text-xs font-semibold transition-colors"
              style={{ color: 'rgba(247,241,238,.3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(247,241,238,.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,241,238,.3)')}
            >
              Saltar →
            </button>
          </div>

          {/* onboarding */}
          <div className="min-h-[calc(100vh-57px)] flex flex-col items-center justify-center px-4 py-16">
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
