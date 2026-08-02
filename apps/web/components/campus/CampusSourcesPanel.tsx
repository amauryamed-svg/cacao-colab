"use client"

import { useState } from "react"
import { campusKnowledgeSources, type CampusSource } from "@/lib/campus-sources"

const KIND_LABEL: Record<CampusSource["kind"], string> = {
  paper: "Paper",
  program: "Programa",
  cartilla: "Cartilla",
  video: "Video",
  campus: "Colab",
}

export default function CampusSourcesPanel({
  title = "Fuentes · rigor que puedes abrir",
  compact = false,
}: {
  title?: string
  compact?: boolean
}) {
  const [open, setOpen] = useState(!compact)

  return (
    <div className={`campus-sources ${compact ? "compact" : ""}`}>
      <button type="button" className="campus-sources-toggle" onClick={() => setOpen((v) => !v)}>
        <span>{title}</span>
        <em>{open ? "−" : "+"}</em>
      </button>
      {open && (
        <ul>
          {campusKnowledgeSources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                <span>{KIND_LABEL[source.kind]}</span>
                <strong>{source.label}</strong>
                <small>{source.note}</small>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
