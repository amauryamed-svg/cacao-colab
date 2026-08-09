"use client"

import { useState } from "react"
import { linkedInShareUrl } from "@/lib/campus-rigor"
import { playDualitaSfx } from "@/lib/campus-gamify"

/** Panel de copy LinkedIn + abrir share (LinkedIn no acepta texto en la URL). */
export default function DiplomaLinkedInShare({
  diplomaUrl,
  copy,
  compact = false,
}: {
  diplomaUrl: string
  copy: string
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function copyText() {
    try {
      await navigator.clipboard.writeText(copy)
      setCopied(true)
      playDualitaSfx("xp")
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // fallback: select textarea
      const el = document.getElementById("diploma-li-copy") as HTMLTextAreaElement | null
      el?.select()
    }
  }

  function openLinkedIn() {
    playDualitaSfx("select")
    window.open(linkedInShareUrl(diplomaUrl), "_blank", "noopener,noreferrer")
  }

  return (
    <div className={`diploma-li-share${compact ? " is-compact" : ""}`}>
      {!compact && (
        <p className="diploma-li-share-label">
          Copy para LinkedIn — pégalo en el post (el thumbnail sale del diploma)
        </p>
      )}
      <textarea
        id="diploma-li-copy"
        className="diploma-li-share-text"
        readOnly
        value={copy}
        rows={compact ? 5 : 8}
        aria-label="Copy para LinkedIn"
      />
      <div className="diploma-li-share-actions">
        <button type="button" className="diploma-li-share-copy" onClick={copyText}>
          {copied ? "Copy listo ✓" : "Copiar copy + hashtags →"}
        </button>
        <button type="button" className="diploma-li" onClick={openLinkedIn}>
          Abrir LinkedIn →
        </button>
      </div>
      {!compact && (
        <p className="diploma-li-share-hint">
          1) Copia el texto · 2) Abre LinkedIn · 3) Pega y publica — el preview muestra tu diploma.
        </p>
      )}
    </div>
  )
}
