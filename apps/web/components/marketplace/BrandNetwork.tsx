'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { type Brand } from '@/lib/brands'
import { type Territory } from '@/lib/territories'
import BrandCard from './BrandCard'
import ComingSoonSlot from './ComingSoonSlot'
import TerritoryDetail from './TerritoryDetail'

const sp = { type: 'spring' as const, stiffness: 90, damping: 18 }

type ComingSoon = { id: string; hint: string }

type Props = {
  founders: Brand[]
  collaborators: Brand[]
  comingSoonSlots: ComingSoon[]
  territories: Territory[]
}

type NodeKind = 'territory' | 'founder' | 'collaborator' | 'coming-soon'
type Selected = { kind: NodeKind; id: string } | null

type PositionedNode = {
  kind: NodeKind
  id: string
  label: string
  color: string
  angle: number
  orbit: number
  r: number
}

/**
 * Red de nodos en círculos concéntricos — reemplaza el grid plano de
 * BrandCard. Mismo técnica que EcosistemaIllustration en
 * ~/caua-io/app/components/TrackIllustrations.tsx (SVG a mano + framer-motion,
 * sin librería de gráficos — no hay d3/visx/react-flow en este stack).
 *
 * Anillos, de adentro hacia afuera — cada uno cuenta una historia real:
 *   1. Territorios — la tierra es la raíz (Huila, Santander, Meta, Arauca, Cundinamarca)
 *   2. Marcas fundadoras — se construyen directo sobre ese origen (CAÚA, Zurych)
 *   3. Colaboradoras + próximamente — el borde en crecimiento del Colab (Lust, slots abiertos)
 *
 * `directoryCandidates` (el Market Directory) NO entra acá a propósito —
 * son candidatas sin confirmar, meterlas en la red implicaría que ya fueron
 * admitidas.
 */
export default function BrandNetwork({ founders, collaborators, comingSoonSlots, territories }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [selected, setSelected] = useState<Selected>(
    founders[0] ? { kind: 'founder', id: founders[0].id } : null,
  )

  const cx = 230
  const cy = 230

  const territoryNodes: PositionedNode[] = territories.map((t, i) => ({
    kind: 'territory',
    id: t.id,
    label: t.name,
    color: t.accentColor,
    angle: -90 + i * (360 / territories.length),
    orbit: 62,
    r: 24,
  }))

  const founderAngles = [-45, 135, 15, -165] // enough spread for up to 4 founders
  const founderNodes: PositionedNode[] = founders.map((b, i) => ({
    kind: 'founder',
    id: b.id,
    label: b.name,
    color: b.accentColor,
    angle: founderAngles[i % founderAngles.length],
    orbit: 122,
    r: 34,
  }))

  const outerItems: PositionedNode[] = [
    ...collaborators.map((b, i) => ({
      kind: 'collaborator' as const,
      id: b.id,
      label: b.name,
      color: b.accentColor,
      angle: i * 90,
      orbit: 165,
      r: 28,
    })),
    ...comingSoonSlots.map((s, i) => ({
      kind: 'coming-soon' as const,
      id: s.id,
      label: s.hint,
      color: '#E8E0DA',
      angle: 180 + i * 90,
      orbit: 165,
      r: 24,
    })),
  ]

  const allNodes = [...territoryNodes, ...founderNodes, ...outerItems]

  function selectNode(n: PositionedNode) {
    setSelected({ kind: n.kind, id: n.id })
  }

  function renderDetail() {
    if (!selected) return null
    if (selected.kind === 'territory') {
      const t = territories.find((x) => x.id === selected.id)
      return t ? <TerritoryDetail territory={t} /> : null
    }
    if (selected.kind === 'coming-soon') {
      const s = comingSoonSlots.find((x) => x.id === selected.id)
      return s ? <ComingSoonSlot hint={s.hint} /> : null
    }
    const b = [...founders, ...collaborators].find((x) => x.id === selected.id)
    return b ? <BrandCard brand={b} /> : null
  }

  return (
    <div ref={ref}>
      {/* ══ desktop / tablet — red concéntrica en SVG ══ */}
      <div className="hidden md:flex justify-center py-4 select-none">
        <svg viewBox="0 0 460 460" width="460" height="460" role="group" aria-label="Red de marcas y territorios del Cacao Colab">
          {[62, 122, 178].map((radius, i) => (
            <motion.circle
              key={radius}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="rgba(247,241,238,0.12)"
              strokeWidth={1}
              strokeDasharray="5 8"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ ...sp, delay: i * 0.08 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}

          {allNodes.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180
            const nx = cx + n.orbit * Math.cos(rad)
            const ny = cy + n.orbit * Math.sin(rad)
            const isSelected = selected?.kind === n.kind && selected.id === n.id
            return (
              <g key={`${n.kind}-${n.id}`}>
                <motion.line
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke={n.color}
                  strokeWidth={1}
                  strokeOpacity={0.25}
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  animate={inView ? { strokeDashoffset: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
                />
                <motion.g
                  role="button"
                  tabIndex={0}
                  aria-label={n.label}
                  aria-pressed={isSelected}
                  onClick={() => selectNode(n)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      selectNode(n)
                    }
                  }}
                  style={{ cursor: 'pointer', outline: 'none', transformOrigin: `${nx}px ${ny}px` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  whileFocus={{ scale: 1.08 }}
                  transition={{ ...sp, delay: 0.25 + i * 0.06 }}
                >
                  <circle
                    cx={nx}
                    cy={ny}
                    r={n.r}
                    fill={isSelected ? `${n.color}30` : `${n.color}14`}
                    stroke={n.color}
                    strokeWidth={isSelected ? 2 : 1.2}
                  />
                  <text
                    x={nx}
                    y={ny + 3}
                    textAnchor="middle"
                    fontSize={n.kind === 'territory' ? 8 : 9}
                    fontWeight="700"
                    fill={n.color}
                    style={{ fontFamily: 'Arial, sans-serif', pointerEvents: 'none' }}
                  >
                    {(() => {
                      // Máximo de caracteres proporcional al radio del nodo — evita
                      // que etiquetas largas ("Productor directo · Arauca") se
                      // salgan del círculo, sin depender de un solo umbral fijo.
                      const maxChars = Math.max(6, Math.floor(n.r / 2))
                      return n.label.length > maxChars ? `${n.label.slice(0, maxChars - 2)}…` : n.label
                    })()}
                  </text>
                </motion.g>
              </g>
            )
          })}

          <circle cx={cx} cy={cy} r={20} fill="#1A2E1230" stroke="#1A2E12" strokeWidth={1} />
          <text x={cx} y={cy + 3} textAnchor="middle" fontSize={7} fontWeight="700" fill="#1C3B26" style={{ fontFamily: 'Georgia, serif' }}>
            Colab
          </text>
        </svg>
      </div>

      {/* ══ mobile — filas de botones reales, mismo comportamiento ══ */}
      <div className="md:hidden flex flex-col gap-5">
        <div>
          <p className="text-[10px] font-bold tracking-[2px] uppercase font-sans text-colab-ink/40 mb-2">Territorios</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {territoryNodes.map((n) => (
              <button
                key={n.id}
                onClick={() => selectNode(n)}
                className="shrink-0 rounded-full px-4 py-2 text-xs font-bold font-sans border-2"
                style={{ borderColor: n.color, color: n.color, background: selected?.id === n.id ? `${n.color}20` : 'transparent' }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[2px] uppercase font-sans text-colab-ink/40 mb-2">Círculo fundador</p>
          <div className="grid grid-cols-2 gap-2">
            {founderNodes.map((n) => (
              <button
                key={n.id}
                onClick={() => selectNode(n)}
                className="rounded-xl px-4 py-3 text-sm font-bold font-sans border-2 text-left"
                style={{ borderColor: n.color, color: n.color, background: selected?.id === n.id ? `${n.color}20` : 'transparent' }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[2px] uppercase font-sans text-colab-ink/40 mb-2">Colaboradoras &amp; próximamente</p>
          <div className="grid grid-cols-2 gap-2">
            {outerItems.map((n) => (
              <button
                key={n.id}
                onClick={() => selectNode(n)}
                className="rounded-xl px-4 py-3 text-xs font-bold font-sans border-2 border-dashed text-left"
                style={{ borderColor: n.color, color: n.color, background: selected?.id === n.id ? `${n.color}20` : 'transparent' }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ panel de detalle, compartido entre desktop y mobile ══ */}
      <div className="mt-8 max-w-md mx-auto">{renderDetail()}</div>
    </div>
  )
}
