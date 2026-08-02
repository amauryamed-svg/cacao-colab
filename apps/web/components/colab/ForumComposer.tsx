"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition, type FormEvent } from "react"
import { createForumPost } from "@/app/colab/actions"
import {
  COURSE_SHARE_LABEL,
  defaultProgressCopy,
  type ForumPostKind,
} from "@/lib/colab-foro"

export default function ForumComposer({
  presetShare,
  presetGrade,
}: {
  presetShare?: string | null
  presetGrade?: string | null
}) {
  const router = useRouter()
  const preset = presetShare ? defaultProgressCopy(presetShare, presetGrade) : null
  const [kind, setKind] = useState<ForumPostKind>(presetShare ? "progress" : "sync")
  const [title, setTitle] = useState(preset?.title ?? "")
  const [body, setBody] = useState(preset?.body ?? "")
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (pending) return
    startTransition(async () => {
      setError("")
      const result = await createForumPost({
        kind,
        title,
        body,
        courseSlug: presetShare,
        grade: presetGrade,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setTitle("")
      setBody("")
      router.refresh()
    })
  }

  return (
    <form className="colab-forum-composer" onSubmit={onSubmit}>
      <p className="eyebrow text-colab-yellow">Publicar en el Colab</p>
      <h2>Comparte avance, anuncio o sincronicidad</h2>
      {presetShare && (
        <p className="colab-forum-preset">
          Preparado desde {COURSE_SHARE_LABEL[presetShare] ?? presetShare}
          {presetGrade ? ` · ${presetGrade}` : ""}
        </p>
      )}
      <div className="colab-forum-kinds" role="group" aria-label="Tipo de publicación">
        {(
          [
            ["progress", "Avance"],
            ["sync", "Sincronicidad"],
            ["announcement", "Anuncio"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={kind === value ? "active" : ""}
            onClick={() => setKind(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <label>
        Título
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={160}
          required
          placeholder="Ej. Cerré Master Chocolatier"
        />
      </label>
      <label>
        Mensaje
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={4000}
          required
          rows={4}
          placeholder="Cuenta qué practicaste, qué descubriste o qué anuncio traes al colectivo…"
        />
      </label>
      {error && <p className="colab-forum-error">{error}</p>}
      <button type="submit" className="colab-forum-submit" disabled={pending}>
        {pending ? "Publicando…" : "Publicar en el foro →"}
      </button>
    </form>
  )
}
