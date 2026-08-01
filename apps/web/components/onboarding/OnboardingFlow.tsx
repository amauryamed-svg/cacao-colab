'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SquirrelSVG from '@/components/brand/SquirrelSVG'
import AuthConsentFields, { consentIsReady } from '@/components/legal/AuthConsentFields'
import { hasAnalyticsConsentClient } from '@/lib/cookie-prefs'
import { getAnalyticsIdentity, trackColabEvent } from '@/lib/analytics'

/* ─── types ─── */
type OperationType =
  | 'finca'
  | 'transformacion'
  | 'restaurante'
  | 'hotel'
  | 'cafeteria'
  | 'pasteleria'
  | 'marca'
  | 'nueva-generacion'
  | 'otra'
  | ''

type InterestType =
  | 'excelencia'
  | 'productos'
  | 'aprendizaje'
  | 'competitividad'
  | 'legado'
  | 'marca'
  | 'todo'
  | ''

interface FormData {
  tipo: OperationType
  nombre: string
  operacion: string
  interes: InterestType
  ciudad: string
  email: string
  whatsapp: string
}

/** 0 manifiesto + 5 captura */
const TOTAL_STEPS = 6

const TIPOS: { id: OperationType; label: string; sub: string }[] = [
  { id: 'finca', label: 'Finca / cacaocultor', sub: 'Origen, fermentación y calidad de lote' },
  { id: 'transformacion', label: 'Transformación bean-to-bar', sub: 'Cobertura, tableta, nibs, laboratorio' },
  { id: 'pasteleria', label: 'Pastelería & chocolatería', sub: 'Oficio que traduce el grano en mesa' },
  { id: 'restaurante', label: 'Restaurante', sub: 'Cocina que quiere hablar buen cacao' },
  { id: 'hotel', label: 'Hotel & experiencia', sub: 'Hospitalidad con ritual de origen' },
  { id: 'cafeteria', label: 'Cafetería & bar de cacao', sub: 'Hábitos diarios y bebida de especialidad' },
  { id: 'marca', label: 'Marca / comercio', sub: 'Llevar cacao colombiano a más mesas' },
  { id: 'nueva-generacion', label: 'Nueva generación', sub: 'Heredas tierra o quieres continuar el oficio' },
  { id: 'otra', label: 'Otra vía', sub: 'Investigación, educación, aliados…' },
]

const INTERESES: { id: InterestType; label: string; sub: string }[] = [
  {
    id: 'excelencia',
    label: 'Hablar cacao de excelencia',
    sub: 'Fine Flavor, tipicidad y criterio de especialidad',
  },
  {
    id: 'aprendizaje',
    label: 'Educarme con Dualita',
    sub: 'MOOC Zurych + protocolo CAÚA + Masters',
  },
  {
    id: 'productos',
    label: 'Productos con origen',
    sub: 'Coberturas, nibs y ritual de cacao funcional',
  },
  {
    id: 'competitividad',
    label: 'Subir competitividad',
    sub: 'Colaborar como industria, no en silos',
  },
  {
    id: 'legado',
    label: 'Legado generacional',
    sub: 'Dar propósito a quienes heredan la tierra',
  },
  {
    id: 'marca',
    label: 'Sumar mi marca al Colab',
    sub: 'Marketplace y nodos territoriales',
  },
  {
    id: 'todo',
    label: 'Todo el ecosistema',
    sub: 'Aceleración completa: aprender, conectar, competir',
  },
]

const PROMESAS = [
  {
    kicker: '01',
    title: 'Competitividad colaborativa',
    body: 'Aceleramos cacao y chocolate colombiano trabajando como industria: nodos, marcas y oficio compartido.',
  },
  {
    kicker: '02',
    title: 'Lenguaje de excelencia',
    body: 'Educarte en cacao de excelencia y especialidad eleva tu criterio sibarita — sabes pedir, probar y contar origen.',
  },
  {
    kicker: '03',
    title: 'Propósito que se hereda',
    body: 'Ese mismo lenguaje da sentido a nuevas generaciones que heredan la tierra: una razón para continuar con marcas globales de cacao.',
  },
]

/* ─── sub-components ─── */
function Progress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Paso ${current + 1} de ${TOTAL_STEPS}`}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === current ? 24 : 8,
            height: 8,
            background: i <= current ? '#F2C830' : 'rgba(247,241,238,.2)',
          }}
        />
      ))}
    </div>
  )
}

function StepWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="onboard-step w-full max-w-lg mx-auto">
      {children}
    </div>
  )
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="onboard-option"
      data-selected={selected || undefined}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  optional,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  optional?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold tracking-[3px] uppercase" style={{ color: '#87AA27' }}>
        {label}
        {optional && (
          <span className="ml-2 opacity-40 normal-case tracking-normal font-normal">opcional</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl px-5 py-4 text-base outline-none transition-all duration-200"
        style={{
          background: 'rgba(247,241,238,.08)',
          border: '1.5px solid rgba(247,241,238,.16)',
          color: '#F7F1EE',
          fontFamily: 'Arial, sans-serif',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#F2C830'
          e.target.style.background = 'rgba(242,200,48,.06)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(247,241,238,.16)'
          e.target.style.background = 'rgba(247,241,238,.08)'
        }}
      />
    </div>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-4 rounded-xl font-semibold transition-all"
      style={{ background: 'rgba(247,241,238,.08)', color: 'rgba(247,241,238,.5)' }}
    >
      ← Atrás
    </button>
  )
}

function PrimaryBtn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200"
      style={{
        background: !disabled ? '#F2C830' : 'rgba(242,200,48,.2)',
        color: !disabled ? '#1A2E10' : 'rgba(242,200,48,.4)',
        cursor: !disabled ? 'pointer' : 'not-allowed',
      }}
    >
      {children}
    </button>
  )
}

/* ─── main ─── */
export default function OnboardingFlow({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [data, setData] = useState<FormData>({
    tipo: '',
    nombre: '',
    operacion: '',
    interes: '',
    ciudad: '',
    email: '',
    whatsapp: '',
  })

  useEffect(() => {
    trackColabEvent('onboarding_started', { target: 'onboarding-flow', source: 'gate-or-unete' })
  }, [])

  const set = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }))

  const canAdvance =
    (
      [
        true,
        data.tipo !== '',
        data.nombre.trim().length > 1,
        data.interes !== '',
        data.ciudad.trim().length > 1,
        data.email.includes('@') && consentIsReady(privacyAccepted, termsAccepted),
      ] as boolean[]
    )[step] ?? true

  const next = () => {
    if (canAdvance && step < TOTAL_STEPS - 1) setStep((s) => s + 1)
  }
  const back = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  async function submit() {
    if (!canAdvance || submitting) return
    setSubmitting(true)
    try {
      let utms: Record<string, string> = {}
      try {
        utms = JSON.parse(sessionStorage.getItem('colab_utms') ?? '{}')
      } catch {
        // sin UTMs
      }
      const analytics = hasAnalyticsConsentClient() ? getAnalyticsIdentity() : {}
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          ...utms,
          ...analytics,
          privacy_accepted: privacyAccepted,
          terms_accepted: termsAccepted,
          marketing_opt_in: marketingOptIn,
        }),
      })
    } catch {
      // HubSpot failure no bloquea
    } finally {
      setSubmitting(false)
      setStep(TOTAL_STEPS)
    }
  }

  /* ── STEP 0: manifiesto ── */
  if (step === 0)
    return (
      <div className="flex flex-col items-center gap-7 w-full">
        <Progress current={0} />
        <StepWrap>
          <p className="onboard-eyebrow">Bienvenido a Cacao Colab</p>
          <h2 className="onboard-title">
            Aceleramos el cacao
            <br />
            <em>como industria.</em>
          </h2>
          <p className="onboard-lede">
            Cacao Colab es una organización sin ánimo de lucro (.org): intermediarios para potenciar
            la comunidad colectiva y colaborativa del cacao. Aceleramos competitividad compartida —
            finca, marca, cocina y nuevas generaciones en el mismo idioma.{" "}
            <Link href="/manifiesto" className="text-colab-yellow underline">
              Leer el Manifiesto →
            </Link>
          </p>

          <ol className="onboard-promises">
            {PROMESAS.map((p) => (
              <li key={p.kicker}>
                <span>{p.kicker}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <button
            onClick={next}
            className="mt-8 w-full py-4 rounded-xl font-bold text-base transition-all duration-200"
            style={{ background: '#F2C830', color: '#1A2E10', cursor: 'pointer' }}
          >
            Quiero ser parte →
          </button>
          <p className="onboard-footnote">
            Al unirte, el equipo te orienta hacia aprendizaje, productos o nodos según tu rol.
          </p>
        </StepWrap>
      </div>
    )

  /* ── STEP 1: rol ── */
  if (step === 1)
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <Progress current={1} />
        <StepWrap>
          <p className="onboard-eyebrow">Tu lugar en la cadena</p>
          <h2 className="onboard-title">
            ¿Desde dónde
            <br />
            entras al Colab?
          </h2>
          <p className="onboard-lede">
            No importa si cultivas, transformas, sirves o heredas: el Colab existe para subir el
            nivel juntos.
          </p>
          <div className="flex flex-col gap-2.5 max-h-[min(52vh,420px)] overflow-y-auto pr-1">
            {TIPOS.map((t) => (
              <OptionCard key={t.id} selected={data.tipo === t.id} onClick={() => set('tipo', t.id)}>
                <div className="font-bold text-[15px] leading-tight">{t.label}</div>
                <div className="text-sm mt-1 opacity-60">{t.sub}</div>
              </OptionCard>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <BackBtn onClick={back} />
            <PrimaryBtn onClick={next} disabled={!canAdvance}>
              Continuar →
            </PrimaryBtn>
          </div>
        </StepWrap>
      </div>
    )

  /* ── STEP 2: nombre ── */
  if (step === 2)
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <Progress current={2} />
        <StepWrap>
          <p className="onboard-eyebrow">Identidad</p>
          <h2 className="onboard-title">
            ¿Cómo te
            <br />
            llamamos?
          </h2>
          <p className="onboard-lede">
            Tu nombre y, si aplica, la finca, marca u operación con la que quieres competir mejor.
          </p>
          <div className="flex flex-col gap-5">
            <Field
              label="Tu nombre"
              value={data.nombre}
              onChange={(v) => set('nombre', v)}
              placeholder="Ej. Carolina"
            />
            <Field
              label="Tu operación / marca / finca"
              value={data.operacion}
              onChange={(v) => set('operacion', v)}
              placeholder="Ej. Finca El Roble, Café Selva, Zurych…"
              optional
            />
          </div>
          <div className="flex gap-3 mt-8">
            <BackBtn onClick={back} />
            <PrimaryBtn onClick={next} disabled={!canAdvance}>
              Continuar →
            </PrimaryBtn>
          </div>
        </StepWrap>
      </div>
    )

  /* ── STEP 3: interés ── */
  if (step === 3)
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <Progress current={3} />
        <StepWrap>
          <p className="onboard-eyebrow">Lo que puedes lograr</p>
          <h2 className="onboard-title">
            {data.nombre ? `${data.nombre}, ¿qué` : '¿Qué'}
            <br />
            quieres acelerar?
          </h2>
          <p className="onboard-lede">
            Educarte en cacao de excelencia no es snobismo: es subir tu sibarismo con criterio y
            abrir puertas a marcas globales con identidad propia.
          </p>
          <div className="flex flex-col gap-2.5 max-h-[min(52vh,420px)] overflow-y-auto pr-1">
            {INTERESES.map((i) => (
              <OptionCard
                key={i.id}
                selected={data.interes === i.id}
                onClick={() => set('interes', i.id)}
              >
                <div className="font-bold text-[15px]">{i.label}</div>
                <div className="text-sm mt-1 opacity-60">{i.sub}</div>
              </OptionCard>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <BackBtn onClick={back} />
            <PrimaryBtn onClick={next} disabled={!canAdvance}>
              Continuar →
            </PrimaryBtn>
          </div>
        </StepWrap>
      </div>
    )

  /* ── STEP 4: ciudad ── */
  if (step === 4)
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <Progress current={4} />
        <StepWrap>
          <p className="onboard-eyebrow">Territorio</p>
          <h2 className="onboard-title">
            ¿Desde dónde
            <br />
            construyes?
          </h2>
          <p className="onboard-lede">
            El cacao colombiano viaja. Queremos saber desde qué ciudad o región vas a empujar la
            competitividad.
          </p>
          <Field
            label="Ciudad / región / país"
            value={data.ciudad}
            onChange={(v) => set('ciudad', v)}
            placeholder="Ej. Landázuri, Bogotá, Huila, Ciudad de México…"
          />
          <div className="flex gap-3 mt-8">
            <BackBtn onClick={back} />
            <PrimaryBtn onClick={next} disabled={!canAdvance}>
              Continuar →
            </PrimaryBtn>
          </div>
        </StepWrap>
      </div>
    )

  /* ── STEP 5: contacto ── */
  if (step === 5)
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <Progress current={5} />
        <StepWrap>
          <p className="onboard-eyebrow">Contacto</p>
          <h2 className="onboard-title">
            Abramos la
            <br />
            conversación
          </h2>
          <p className="onboard-lede">
            El equipo Cacao Colab te escribe para orientarte: Dualita, Masters, marketplace o nodo.
            Sin spam — solo cacao con propósito.
          </p>
          <div className="flex flex-col gap-5">
            <Field
              label="Correo electrónico"
              type="email"
              value={data.email}
              onChange={(v) => set('email', v)}
              placeholder="hola@tuoperacion.com"
            />
            <Field
              label="WhatsApp"
              type="tel"
              value={data.whatsapp}
              onChange={(v) => set('whatsapp', v)}
              placeholder="+57 300 000 0000"
              optional
            />
          </div>
          <div className="mt-6">
            <AuthConsentFields
              privacyAccepted={privacyAccepted}
              termsAccepted={termsAccepted}
              marketingOptIn={marketingOptIn}
              onPrivacyChange={setPrivacyAccepted}
              onTermsChange={setTermsAccepted}
              onMarketingChange={setMarketingOptIn}
              tone="dark"
            />
          </div>
          <div className="flex gap-3 mt-8">
            <BackBtn onClick={back} />
            <button
              onClick={submit}
              disabled={!canAdvance || submitting}
              className="flex-1 py-4 rounded-xl font-bold text-base transition-all duration-200"
              style={{
                background: canAdvance && !submitting ? '#F2C830' : 'rgba(242,200,48,.2)',
                color: canAdvance && !submitting ? '#1A2E10' : 'rgba(242,200,48,.4)',
                cursor: canAdvance && !submitting ? 'pointer' : 'not-allowed',
              }}
            >
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
        <div className="onboard-welcome-pill">Ya eres parte del Colab</div>
        <h2 className="onboard-title" style={{ textAlign: 'center' }}>
          {data.nombre ? `${data.nombre},` : 'Listo:'} el cacao
          <br />
          necesita tu <em>criterio.</em>
        </h2>
        <p className="onboard-lede mx-auto" style={{ textAlign: 'center' }}>
          Te escribimos a <strong style={{ color: '#F7F1EE' }}>{data.email}</strong>. Mientras,
          empieza a hablar el lenguaje de la excelencia: educa tu paladar, conecta territorio y da
          razones para que la siguiente generación continúe.
        </p>
        <div className="flex flex-col gap-3 mt-2">
          <Link
            href={`/unete/bio?${new URLSearchParams({
              email: data.email,
              nombre: data.nombre,
              operacion: data.operacion,
              ciudad: data.ciudad,
            }).toString()}`}
            className="onboard-cta-primary"
            onClick={onComplete}
          >
            Crear bio de nodo →
          </Link>
          <Link href="/aprende" className="onboard-cta-ghost" onClick={onComplete}>
            Entrar al campus Dualita →
          </Link>
          {onComplete ? (
            <button onClick={onComplete} className="onboard-cta-ghost" type="button">
              Explorar el Colab →
            </button>
          ) : (
            <Link href="/marketplace" className="onboard-cta-ghost">
              Explorar el marketplace →
            </Link>
          )}
          <Link href="/manifiesto" className="onboard-cta-ghost" onClick={onComplete}>
            Leer el Manifiesto .org →
          </Link>
        </div>
      </StepWrap>
    </div>
  )
}
