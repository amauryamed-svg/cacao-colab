"use client"

import { useState } from "react"

export default function BenevoloCaptionCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" onClick={copy} className="benevolo-ig-copy">
      {copied ? "Copiado" : "Copiar pie"}
    </button>
  )
}
