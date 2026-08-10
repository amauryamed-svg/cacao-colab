"use client"

import { useState } from "react"

const PAGE_URL = "https://www.cacaocolab.org/aprende/cacaotier"
const OG_LANDSCAPE = "/api/og/cacaotier"
const OG_SQUARE = "/api/og/cacaotier?v=square"

const WHATSAPP_TEXT = [
  "Master Cacaotier · Del péptido al bouquet internacional",
  "",
  "Fermentación controlada Tc-pH (CoEx × Agrosavia Arauca): biomarcadores precursores → floral, nuez y frutal limpio para Japón y Europa.",
  "",
  PAGE_URL,
].join("\n")

export default function CacaotierShareKit() {
  const [copied, setCopied] = useState<"link" | "wa" | null>(null)

  async function copy(value: string, kind: "link" | "wa") {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      window.setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(WHATSAPP_TEXT)}`

  return (
    <section className="cacaotier-share-kit" aria-labelledby="share-kit-title">
      <div className="cacaotier-share-copy">
        <p className="eyebrow text-colab-yellow">Listo para redes y WhatsApp</p>
        <h2 id="share-kit-title" className="font-serif text-3xl md:text-4xl font-bold text-colab-cream mt-3">
          Thumbnail de excelencia.
        </h2>
        <p className="text-sm leading-relaxed text-colab-cream/55 mt-4">
          Al pegar el enlace, WhatsApp, LinkedIn y X muestran esta imagen.
          Descarga la versión cuadrada para stories o estado.
        </p>
        <div className="cacaotier-share-actions">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="cacaotier-share-btn cacaotier-share-btn-primary">
            Compartir en WhatsApp
          </a>
          <button type="button" className="cacaotier-share-btn" onClick={() => copy(PAGE_URL, "link")}>
            {copied === "link" ? "Enlace copiado" : "Copiar enlace"}
          </button>
          <button type="button" className="cacaotier-share-btn" onClick={() => copy(WHATSAPP_TEXT, "wa")}>
            {copied === "wa" ? "Texto copiado" : "Copiar texto del post"}
          </button>
          <a href={OG_LANDSCAPE} download="cacaotier-og-1200x630.png" className="cacaotier-share-btn" target="_blank" rel="noopener noreferrer">
            Descargar 1200×630
          </a>
          <a href={OG_SQUARE} download="cacaotier-og-1080.png" className="cacaotier-share-btn" target="_blank" rel="noopener noreferrer">
            Descargar story 1080
          </a>
        </div>
      </div>

      <div className="cacaotier-share-previews">
        <figure>
          <img src={OG_LANDSCAPE} alt="Thumbnail Master Cacaotier para link preview 1200×630" width={1200} height={630} />
          <figcaption>Link preview · 1200×630</figcaption>
        </figure>
        <figure>
          <img src={OG_SQUARE} alt="Thumbnail Master Cacaotier cuadrado para stories 1080×1080" width={1080} height={1080} />
          <figcaption>Stories / estado · 1080×1080</figcaption>
        </figure>
      </div>
    </section>
  )
}
