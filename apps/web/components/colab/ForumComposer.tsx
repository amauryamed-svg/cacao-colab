"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition, type FormEvent } from "react"
import { createForumPost } from "@/app/colab/actions"
import ForumDiplomaCard from "@/components/colab/ForumDiplomaCard"
import {
  COURSE_SHARE_LABEL,
  defaultProgressCopy,
  diplomaShareUrl,
  type ForumPostKind,
} from "@/lib/colab-foro"

export default function ForumComposer({
  presetShare,
  presetGrade,
  presetDiploma,
}: {
  presetShare?: string | null
  presetGrade?: string | null
  presetDiploma?: string | null
}) {
  const router = useRouter()
  const diplomaUrl =
    presetShare && presetDiploma ? diplomaShareUrl(presetShare, presetDiploma) : null
  const preset = presetShare
    ? defaultProgressCopy(presetShare, presetGrade, diplomaUrl)
    : null
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
        diplomaUrl,
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
      <p className="eyebrow text-colab-yellow">Publicar en el foro</p>
      <h2>Comparte diploma, avance o sincronicidad</h2>
      {presetShare && (
        <p className="colab-forum-preset">
          Preparado desde {COURSE_SHARE_LABEL[presetShare] ?? presetShare}
          {presetGrade ? ` · ${presetGrade}` : ""}
          {diplomaUrl ? " · con diploma de exhibición" : ""}
        </p>
      )}
      {diplomaUrl && (
        <ForumDiplomaCard
          diplomaUrl={diplomaUrl}
          fallbackGrade={presetGrade}
          fallbackCourse={presetShare}
        />
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
          placeholder="Ej. Cerré Arquitecto de Fermentación"
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
          placeholder="Cuenta qué practicaste — tu diploma se exhibe con el diseño de credencial…"
        />
      </label>
      {error && <p className="colab-forum-error">{error}</p>}
      <button type="submit" className="colab-forum-submit" disabled={pending}>
        {pending ? "Publicando…" : "Publicar en el foro →"}
      </button>
    </form>
  )
}
