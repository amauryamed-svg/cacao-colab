"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type Perspective = {
  events: number
  weight: number
  score: number
  label: string
}

type Preview = {
  periodKey: string
  role: string
  xpTotal: number
  xpLeverage: number
  balanceScore: number
  bonusMd: number
  ceiling: number
  rankName: string
  alreadySettled: boolean
  perspectives: Record<string, Perspective>
}

export default function ScorecardPanel() {
  const router = useRouter()
  const [preview, setPreview] = useState<Preview | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function load() {
    startTransition(async () => {
      setError(null)
      try {
        const res = await fetch("/api/loyalty/scorecard")
        const data = await res.json()
        if (!res.ok || !data.ok) {
          setError(data.error === "auth_required" ? "Sesión requerida." : data.error ?? "No se pudo cargar el scorecard.")
          return
        }
        setPreview(data.preview)
      } catch {
        setError("Error de red al cargar el scorecard.")
      }
    })
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function settle() {
    startTransition(async () => {
      setNote(null)
      try {
        const res = await fetch("/api/loyalty/scorecard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
        const data = await res.json()
        if (!res.ok || !data.ok) {
          setNote(data.error ?? "No se pudo liquidar.")
          return
        }
        if (data.settled) {
          setNote(`Bono acreditado: +${data.awarded} MD por productividad equilibrada.`)
        } else if (data.reason === "already_settled") {
          setNote("Este periodo ya fue liquidado.")
        } else {
          setNote("Aún no hay bono: equilibra aprendizaje, cuidado y aportes propios.")
        }
        if (data.preview) setPreview(data.preview)
        router.refresh()
        load()
      } catch {
        setNote("Error de red al liquidar.")
      }
    })
  }

  return (
    <section className="scorecard-panel">
      <div className="scorecard-panel-head">
        <div>
          <p className="eyebrow text-colab-yellow">Balanced scorecard · productividad propia</p>
          <h2>XP apalanca · no se convierte</h2>
          <p>
            El bono semanal premia equilibrio entre aprendizaje, cuidado, comunidad moderada y comercio
            verificado. El rol solo reordena pesos; la maestría y el XP amplifican. Nunca hay bono por reclutar.
          </p>
        </div>
        {preview && (
          <div className="scorecard-bonus">
            <span>Bono estimado · {preview.periodKey}</span>
            <strong>{preview.bonusMd}</strong>
            <small>
              MD · techo {preview.ceiling} · leverage XP ×{preview.xpLeverage}
            </small>
          </div>
        )}
      </div>

      {error && <p className="scorecard-note">{error}</p>}
      {note && <p className="scorecard-note">{note}</p>}

      {preview && (
        <>
          <dl className="scorecard-meta">
            <div>
              <dt>Rol</dt>
              <dd>{preview.role}</dd>
            </div>
            <div>
              <dt>Rango</dt>
              <dd>{preview.rankName}</dd>
            </div>
            <div>
              <dt>XP acumulado</dt>
              <dd>{preview.xpTotal.toLocaleString("es-CO")}</dd>
            </div>
            <div>
              <dt>Equilibrio BSC</dt>
              <dd>{(preview.balanceScore * 100).toFixed(1)}%</dd>
            </div>
          </dl>
          <ul className="scorecard-perspectives">
            {Object.entries(preview.perspectives).map(([key, p]) => (
              <li key={key}>
                <strong>{p.label}</strong>
                <span>
                  {p.events} eventos · peso {p.weight} · score {(p.score * 100).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
          <button type="button" disabled={pending || preview.alreadySettled} onClick={settle}>
            {preview.alreadySettled
              ? "Periodo ya liquidado"
              : pending
                ? "Liquidando…"
                : `Liquidar bono de la semana (+${preview.bonusMd} MD)`}
          </button>
        </>
      )}
    </section>
  )
}
