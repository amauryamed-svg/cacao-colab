'use client'

import { useState } from 'react'
import SquirrelSVG from '@/components/brand/SquirrelSVG'

interface Props {
  message: string
  tips?: string[]
}

export default function DualitaCompanion({ message, tips = [] }: Props) {
  const [tipIndex, setTipIndex] = useState<number | null>(null)
  const [bounce, setBounce] = useState(false)

  function handleClick() {
    if (tips.length === 0) return
    setBounce(true)
    setTipIndex(i => {
      const next = i === null ? 0 : (i + 1) % tips.length
      return next
    })
    setTimeout(() => setBounce(false), 400)
  }

  const displayed = tipIndex !== null && tips.length > 0 ? tips[tipIndex] : message

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 20,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        maxWidth: 260,
      }}
    >
      {/* speech bubble */}
      <div
        style={{
          background: '#F2C830',
          color: '#1A2E10',
          borderRadius: '16px 16px 4px 16px',
          padding: '10px 14px',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 1.4,
          boxShadow: '0 4px 20px rgba(242,200,48,.35)',
          fontFamily: 'Arial, sans-serif',
          animation: 'fadeUp .35s ease both',
        }}
      >
        {displayed}
        {tips.length > 0 && (
          <span style={{ display: 'block', fontSize: 10, opacity: .6, marginTop: 4 }}>
            Toca a Dualita para más tips →
          </span>
        )}
      </div>

      {/* squirrel */}
      <button
        onClick={handleClick}
        aria-label="Tip de Dualita"
        style={{
          background: 'none',
          border: 'none',
          cursor: tips.length > 0 ? 'pointer' : 'default',
          padding: 0,
          animation: bounce ? 'dualitaBounce .35s ease' : 'squirrelBob 2.8s ease-in-out infinite',
          display: 'block',
        }}
      >
        <SquirrelSVG size={72} />
      </button>

      <style>{`
        @keyframes dualitaBounce {
          0%  { transform: scale(1) rotate(0deg); }
          30% { transform: scale(1.2) rotate(-8deg); }
          60% { transform: scale(.95) rotate(5deg); }
          100%{ transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  )
}
