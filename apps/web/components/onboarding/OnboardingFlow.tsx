'use client'

import { useState } from 'react'
import SquirrelSVG from '@/components/brand/SquirrelSVG'

/* ─── types ─── */
type OperationType = 'restaurante' | 'hotel' | 'cafeteria' | 'pasteleria' | 'otra' | ''
type InterestType  = 'productos' | 'aprendizaje' | 'marca' | 'todo' | ''

interface FormData {
  tipo:      OperationType
  nombre:    string
  operacion: string
  interes:   InterestType
  ciudad:    string
  email:     string
  whatsapp:  string
}

const TOTAL_STEPS = 5

const TIPOS: { id: OperationType; label: string; emoji: string }[] = [
  { id: 'restaurante', label: 'Restaurante',               emoji: '🍽️' },
  { id: 'hotel',       label: 'Hotel & Glamping',          emoji: '🏨' },
  { id: 'cafeteria',   label: 'Cafetería & Bar de cacao',  emoji: '☕' },
  { id: 'pasteleria',  label: 'Pastelería & Chocolatería', emoji: '🍫' },
  { id: 'otra',        label: 'Otra operación',            emoji: '✦'  },
]

const INTERESES: { id: InterestType; label: string; sub: string }[] = [
  { id: 'productos',   label: 'Los productos',    sub: 'Coberturas, NIBS y Ritual Cacao' },
  { id: 'aprendizaje', label: 'El aprendizaje',   sub: 'Dualita: MOOC + CAÚA Academy'   },
  { id: 'marca',       label: 'Sumar mi marca',   sub: 'Quiero estar en el marketplace'  },
  { id: 'todo',        label: 'Todo lo anterior', sub: 'Soy curioso/a por naturaleza'    },
]

/* ─── sub-components ─── */
function Progress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div key={i} className="rounded-full transition-all duration-500" style={{
          width: i === current ? 24 : 8, height: 8,
          background: i <= current ? '#F2C830' : 'rgba(247,241,238,.2)',
        }} />
      ))}
    </div>
  )
}

function StepWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-lg mx-auto" style={{ animation: 'fadeUp .45s ease both' }}>
      {children}
    </div>
  )
}

function OptionCard({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button type="button" onClick={onClick}
      className="w-full text-left rounded-xl px-5 py-4 border transition-all duration-200 cursor-pointer"
      style={{
        background:  selected ? '#F2C830' : 'rgba(247,241,238,.06)',
        borderColor: selected ? '#F2C830' : 'rgba(247,241,238,.14)',
        color:       selected ? '#1A2E10' : '#F7F1EE',
        transform:   selected ? 'scale(1.015)' : 'scale(1)',
        boxShadow:   selected ? '0 4px 20px rgba(242,200,48,.35)' : 'none',
      }}>
      {children}
    </button>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', optional }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; optional?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold tracking-[3px] uppercase" style={{ color: '#87AA27' }}>
        {label}
        {optional && <span className="ml-2 opacity-40 normal-case tracking-normal font-normal">opcional</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="rounded-xl px-5 py-4 text-base outline-none transition-all duration-200"
        style={{ background: 'rgba(247,241,238,.08)', border: '1.5px solid rgba(247,241,238,.16)', color: '#F7F1EE', fontFamily: 'Arial, sans-serif' }}
        onFocus={e => { e.target.style.borderColor = '#F2C830';              e.target.style.background = 'rgba(242,200,48,.06)' }}
        onBlur={e  => { e.target.style.borderColor = 'rgba(247,241,238,.16)'; e.target.style.background = 'rgba(247,241,238,.08)' }}
      />
    </div>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-6 py-4 rounded-xl font-semibold transition-all"
      style={{ background: 'rgba(247,241,238,.08)', color: 'rgba(247,241,238,.5)' }}>
      ← Atrás
    </button>
  )
}

function PrimaryBtn({ onClick, disabled, children }: {
  onClick: () => void; disabled?: boolean; children: React.ReactNode
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200"
      style={{
        background: !disabled ? '#F2C830' : 'rgba(242,200,48,.2)',
        color:      !disabled ? '#1A2E10' : 'rgba(242,200,48,.4)',
        cursor:     !disabled ? 'pointer'  : 'not-allowed',
      }}>
      {children}
    </button>
  )
}

/* ─── main ─── */
export default function OnboardingFlow({ onComplete }: { onComplete?: () => void }) {
  const [step,       setStep]       = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [data,       setData]       = useState<FormData>({
    tipo: '', nombre: '', operacion: '', interes: '', ciudad: '', email: '', whatsapp: '',
  })

  const set = (k: keyof FormData, v: string) => setData(d => ({ ...d, [k]: v }))

  const canAdvance = ([
    data.tipo    !== '',
    data.nombre.trim().length > 1,
    data.interes !== '',
    data.ciudad.trim().length > 1,
    data.email.includes('@'),
  ] as boolean[])[step] ?? true

  const next = () => { if (canAdvance && step < TOTAL_STEPS - 1) setStep(s => s + 1) }
  const back = () => { if (step > 0) setStep(s => s - 1) }

  async function submit() {
    if (!canAdvance || submitting) return
    setSubmitting(true)
    try {
      let utms: Record<string, string> = {}
      try { utms = JSON.parse(sessionStorage.getItem('colab_utms') ?? '{}') } catch (_) {}
      await fetch('/api/onboarding', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, ...utms }),
      })
    } catch (_) {
      // continue silently — HubSpot failure no debe bloquear al usuario
    } finally {
      setSubmitting(false)
      setStep(TOTAL_STEPS)
    }
  }

  /* ── STEP 0: tipo ── */
  if (step === 0) return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Progress current={0} />
      <StepWrap>
        <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#87AA27' }}>Cuéntanos</p>
        <h2 className="font-serif text-colab-cream leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
          ¿Desde dónde<br />trabajas el cacao?
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: 'rgba(247,241,238,.55)', fontSize: 15 }}>
          Queremos entender tu operación antes de proponerte algo.
        </p>
        <div className="flex flex-col gap-3">
          {TIPOS.map(t => (
            <OptionCard key={t.id} selected={data.tipo === t.id} onClick={() => set('tipo', t.id)}>
              <span className="mr-3">{t.emoji}</span>
              <span className="font-semibold">{t.label}</span>
            </OptionCard>
          ))}
        </div>
        <button onClick={next} disabled={!canAdvance}
          className="mt-8 w-full py-4 rounded-xl font-bold text-base transition-all duration-200"
          style={{ background: canAdvance ? '#F2C830' : 'rgba(242,200,48,.2)', color: canAdvance ? '#1A2E10' : 'rgba(242,200,48,.4)', cursor: canAdvance ? 'pointer' : 'not-allowed' }}>
          Continuar →
        </button>
      </StepWrap>
    </div>
  )

  /* ── STEP 1: nombre ── */
  if (step === 1) return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Progress current={1} />
      <StepWrap>
        <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#87AA27' }}>Identidad</p>
        <h2 className="font-serif text-colab-cream leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
          ¿Cómo te<br />llamamos?
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: 'rgba(247,241,238,.55)', fontSize: 15 }}>
          Tu nombre y el de tu operación.
        </p>
        <div className="flex flex-col gap-5">
          <Field label="Tu nombre" value={data.nombre} onChange={v => set('nombre', v)} placeholder="Ej. Carolina" />
          <Field label="Tu operación" value={data.operacion} onChange={v => set('operacion', v)} placeholder="Ej. Café Selva, Hotel Piedra Verde…" optional />
        </div>
        <div className="flex gap-3 mt-8">
          <BackBtn onClick={back} />
          <PrimaryBtn onClick={next} disabled={!canAdvance}>Continuar →</PrimaryBtn>
        </div>
      </StepWrap>
    </div>
  )

  /* ── STEP 2: interés ── */
  if (step === 2) return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Progress current={2} />
      <StepWrap>
        <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#87AA27' }}>Motivación</p>
        <h2 className="font-serif text-colab-cream leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
          {data.nombre ? `${data.nombre}, ¿qué` : '¿Qué'}<br />te trajo aquí?
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: 'rgba(247,241,238,.55)', fontSize: 15 }}>
          Para acompañarte en lo que realmente necesitas.
        </p>
        <div className="flex flex-col gap-3">
          {INTERESES.map(i => (
            <OptionCard key={i.id} selected={data.interes === i.id} onClick={() => set('interes', i.id)}>
              <div className="font-bold text-base">{i.label}</div>
              <div className="text-sm mt-1 opacity-60">{i.sub}</div>
            </OptionCard>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <BackBtn onClick={back} />
          <PrimaryBtn onClick={next} disabled={!canAdvance}>Continuar →</PrimaryBtn>
        </div>
      </StepWrap>
    </div>
  )

  /* ── STEP 3: ciudad ── */
  if (step === 3) return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Progress current={3} />
      <StepWrap>
        <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#87AA27' }}>Ubicación</p>
        <h2 className="font-serif text-colab-cream leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
          ¿Desde dónde<br />nos escribes?
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: 'rgba(247,241,238,.55)', fontSize: 15 }}>
          El cacao colombiano viaja. Queremos saber desde dónde lo vas a usar.
        </p>
        <Field label="Ciudad / País" value={data.ciudad} onChange={v => set('ciudad', v)} placeholder="Ej. Bogotá, Medellín, Ciudad de México…" />
        <div className="flex gap-3 mt-8">
          <BackBtn onClick={back} />
          <PrimaryBtn onClick={next} disabled={!canAdvance}>Continuar →</PrimaryBtn>
        </div>
      </StepWrap>
    </div>
  )

  /* ── STEP 4: contacto + submit → HubSpot ── */
  if (step === 4) return (
    <div className="flex flex-col items-center gap-8 w-full">
      <Progress current={4} />
      <StepWrap>
        <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: '#87AA27' }}>Contacto</p>
        <h2 className="font-serif text-colab-cream leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 900 }}>
          ¿Cómo seguimos<br />la conversación?
        </h2>
        <p className="mb-8 leading-relaxed" style={{ color: 'rgba(247,241,238,.55)', fontSize: 15 }}>
          El equipo Cacao Colab te escribe. Sin spam, solo cacao.
        </p>
        <div className="flex flex-col gap-5">
          <Field label="Correo electrónico" type="email" value={data.email} onChange={v => set('email', v)} placeholder="hola@tuoperacion.com" />
          <Field label="WhatsApp" type="tel" value={data.whatsapp} onChange={v => set('whatsapp', v)} placeholder="+57 300 000 0000" optional />
        </div>
        <p className="mt-5 text-xs leading-relaxed" style={{ color: 'rgba(247,241,238,.28)' }}>
          Tus datos van al equipo Cacao Colab. Solo los usamos para hacerte seguimiento.
        </p>
        <div className="flex gap-3 mt-8">
          <BackBtn onClick={back} />
          <button onClick={submit} disabled={!canAdvance || submitting}
            className="flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200"
            style={{
              background: canAdvance && !submitting ? '#F2C830' : 'rgba(242,200,48,.2)',
              color:      canAdvance && !submitting ? '#1A2E10' : 'rgba(242,200,48,.4)',
              cursor:     canAdvance && !submitting ? 'pointer'  : 'not-allowed',
            }}>
            {submitting ? 'Enviando…' : 'Unirme al Colab →'}
          </button>
        </div>
      </StepWrap>
    </div>
  )

  /* ── CONFIRMACIÓN ── */
  return (
    <div className="flex flex-col items-center gap-8 w-full text-center">
      <div className="squirrel-bob">
        <SquirrelSVG size={96} />
      </div>
      <StepWrap>
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[3px] uppercase mb-6"
          style={{ background: 'rgba(135,170,39,.15)', border: '1px solid rgba(135,170,39,.3)', color: '#87AA27' }}>
          Bienvenido/a al Colab
        </div>
        <h2 className="font-serif text-colab-cream leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 900 }}>
          {data.nombre ? `${data.nombre}, el` : 'El'} cacao<br />
          ya sabe<br />
          <span style={{ color: '#F2C830' }}>que vienes.</span>
        </h2>
        <p className="leading-relaxed mb-10 mx-auto max-w-sm" style={{ color: 'rgba(247,241,238,.58)', fontSize: 15 }}>
          Te escribimos pronto a{' '}
          <strong style={{ color: '#F7F1EE' }}>{data.email}</strong>.
          Mientras tanto, explora el marketplace y el módulo de aprendizaje.
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={onComplete}
            className="w-full py-4 rounded-xl font-bold text-base text-center transition-all duration-200"
            style={{ background: '#F2C830', color: '#1A2E10', cursor: 'pointer' }}>
            Ver el marketplace →
          </button>
          <a href="/aprende"
            className="w-full py-4 rounded-xl font-bold text-base text-center transition-all duration-200"
            style={{ background: 'rgba(247,241,238,.06)', border: '1.5px solid rgba(247,241,238,.14)', color: '#F7F1EE', display: 'block' }}>
            Empezar CAÚA Academy gratis
          </a>
        </div>
      </StepWrap>
    </div>
  )
}
