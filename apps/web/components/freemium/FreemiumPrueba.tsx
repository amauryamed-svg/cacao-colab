"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { playDualitaSfx } from "@/lib/campus-gamify"
import {
  freemiumAudiences,
  freemiumQuestions,
  type FreemiumAudienceId,
} from "@/lib/freemium-prueba"

export default function FreemiumPrueba() {
  const [audience, setAudience] = useState<FreemiumAudienceId | null>(null)
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const profile = freemiumAudiences.find((item) => item.id === audience)
  const question = freemiumQuestions[step]
  const done = audience !== null && step >= freemiumQuestions.length

  const headline = useMemo(() => {
    if (!done) return null
    if (score === freemiumQuestions.length) return "Criterio listo para viajar."
    if (score >= 2) return "Buen ojo. Afina el lote."
    return "El oficio se practica. Sigue abierto."
  }, [done, score])

  function chooseAudience(id: FreemiumAudienceId) {
    setAudience(id)
    setStep(0)
    setPicked(null)
    setScore(0)
  }

  function pick(id: string) {
    if (picked || !question) return
    setPicked(id)
    const option = question.options.find((item) => item.id === id)
    if (option?.correct) {
      playDualitaSfx("correct")
      setScore((n) => n + 1)
    } else {
      playDualitaSfx("wrong")
    }
  }

  function next() {
    setPicked(null)
    setStep((n) => n + 1)
  }

  if (!audience) {
    return (
      <div className="freemium-prueba">
        <p className="eyebrow text-colab-yellow">¿Desde dónde llegas?</p>
        <h2 className="font-serif text-3xl font-bold text-colab-cream mt-3">Elige tu grupo de interés</h2>
        <p className="text-sm text-colab-cream/55 mt-3 max-w-xl leading-relaxed">
          Secretaría, Cancillería, nodo o comprador: la prueba es la misma. Cambia el siguiente paso.
          El Colab no es un programa oficial de esas entidades — es la casa abierta para quien llega
          desde ellas.
        </p>
        <div className="freemium-audience-grid">
          {freemiumAudiences.map((item) => (
            <button key={item.id} type="button" onClick={() => chooseAudience(item.id)}>
              <strong>{item.label}</strong>
              <span>{item.lede}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (done && profile) {
    return (
      <div className="freemium-prueba">
        <p className="eyebrow text-colab-yellow">
          {score}/{freemiumQuestions.length} · {profile.label}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-colab-cream mt-3">{headline}</h2>
        <p className="text-sm text-colab-cream/60 mt-4 max-w-xl leading-relaxed">{profile.lede}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href={profile.nextHref} className="rounded-full bg-colab-yellow text-colab-forest px-6 py-3 text-sm font-bold">
            {profile.nextLabel}
          </Link>
          <Link
            href="/aprende/cacaotier"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-colab-cream"
          >
            Landing Cacaotier →
          </Link>
          <Link
            href="/cuenta/entrar?next=/campus/arquitecto-fermentacion"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-colab-cream"
          >
            Empezar certificación →
          </Link>
          <Link href="/unete" className="text-sm font-bold text-colab-champagne underline underline-offset-4">
            Unirme al Colab
          </Link>
        </div>
        <button type="button" className="freemium-reset" onClick={() => setAudience(null)}>
          Elegir otro grupo
        </button>
      </div>
    )
  }

  const revealed = Boolean(picked)
  const chosen = question.options.find((item) => item.id === picked)

  return (
    <div className="freemium-prueba">
      <p className="eyebrow text-colab-yellow">
        {profile?.label} · {step + 1}/{freemiumQuestions.length}
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-colab-cream mt-3 leading-tight">
        {question.question}
      </h2>
      <div className="freemium-options">
        {question.options.map((option) => {
          const isPicked = picked === option.id
          let tone = ""
          if (revealed && option.correct) tone = "ok"
          else if (revealed && isPicked) tone = "bad"
          return (
            <button
              key={option.id}
              type="button"
              disabled={revealed}
              className={tone}
              onClick={() => pick(option.id)}
            >
              {option.text}
            </button>
          )
        })}
      </div>
      {revealed && chosen && (
        <div className="freemium-explain">
          <p>{chosen.explanation}</p>
          <button type="button" onClick={next}>
            {step + 1 === freemiumQuestions.length ? "Ver resultado →" : "Siguiente →"}
          </button>
        </div>
      )}
    </div>
  )
}
