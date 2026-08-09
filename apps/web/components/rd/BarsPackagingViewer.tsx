"use client"

import { useState } from "react"
import Image from "next/image"
import { barsPackaging } from "@/lib/bars-colab-product"

type Face = "front" | "back" | "photo"

export default function BarsPackagingViewer() {
  const [face, setFace] = useState<Face>("front")

  const src =
    face === "photo"
      ? barsPackaging.assets.packshot
      : face === "back"
        ? barsPackaging.assets.backSvg
        : barsPackaging.assets.frontSvg

  const label =
    face === "photo" ? "Packshot" : face === "back" ? "Dorso · marca Colab" : "Frente · capas SVG"

  return (
    <div className="bars-pack-viewer">
      <div className="bars-pack-tabs" role="tablist" aria-label="Caras del empaque">
        {(
          [
            ["front", "Frente vector"],
            ["back", "Dorso marca"],
            ["photo", "Packshot"],
          ] as const
        ).map(([id, text]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={face === id}
            className={face === id ? "active" : ""}
            onClick={() => setFace(id)}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="bars-pack-stage" data-face={face}>
        {face === "photo" ? (
          <Image
            src={src}
            alt="Bars. Chocolate Benevolo · packshot FEAR 5"
            width={1536}
            height={1024}
            priority
            className="bars-pack-img"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`Bars. empaque ${label}`} className="bars-pack-svg" />
        )}
        <p className="bars-pack-caption">{label} · 180×95 mm · print</p>
      </div>

      <div className="bars-pack-downloads">
        <a href={barsPackaging.assets.frontSvg} download>
          Descargar frente SVG →
        </a>
        <a href={barsPackaging.assets.backSvg} download>
          Descargar dorso SVG →
        </a>
      </div>
    </div>
  )
}
