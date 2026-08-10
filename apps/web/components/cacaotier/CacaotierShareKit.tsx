"use client"

import { useMemo, useState } from "react"
import { trackColabEvent } from "@/lib/analytics"
import {
  CACAOTIER_UTM_CAMPAIGN,
  type CacaotierShareChannel,
  cacaotierShareUrl,
  cacaotierShareUtms,
} from "@/lib/utm"

const OG_LANDSCAPE = "/api/og/cacaotier"
const OG_SQUARE = "/api/og/cacaotier?v=square"

const CHANNELS: { id: CacaotierShareChannel; label: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "x", label: "X" },
  { id: "copy", label: "Copiar" },
]

function shareCopy(trackedUrl: string) {
  return [
    "Master Cacaotier · Del péptido al bouquet internacional",
    "",
    "Fermentación controlada Tc-pH (CoEx × Agrosavia Arauca): biomarcadores precursores → floral, nuez y frutal limpio para Japón y Europa.",
    "",
    trackedUrl,
  ].join("\n")
}

export default function CacaotierShareKit() {
  const [channel, setChannel] = useState<CacaotierShareChannel>("whatsapp")
  const [copied, setCopied] = useState<"link" | "wa" | null>(null)

  const trackedUrl = useMemo(() => cacaotierShareUrl(channel), [channel])
  const utms = useMemo(() => cacaotierShareUtms(channel), [channel])
  const postText = useMemo(() => shareCopy(trackedUrl), [trackedUrl])
  const waHref = `https://wa.me/?text=${encodeURIComponent(postText)}`

  function trackShare(target: string) {
    trackColabEvent("knowledge_link_clicked", {
      target,
      source: `cacaotier_share_${channel}`,
      pathname: "/aprende/cacaotier",
    })
  }

  async function copy(value: string, kind: "link" | "wa") {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      trackShare(kind === "link" ? "copy_tracked_link" : "copy_tracked_post")
      window.setTimeout(() => setCopied(null), 2000)
    } catch {
      setCopied(null)
    }
  }

  return (
    <section className="cacaotier-share-kit" aria-labelledby="share-kit-title">
      <div className="cacaotier-share-copy">
        <p className="eyebrow text-colab-yellow">Listo para redes y WhatsApp · trackeable HubSpot</p>
        <h2 id="share-kit-title" className="font-serif text-3xl md:text-4xl font-bold text-colab-cream mt-3">
          Thumbnail con UTM.
        </h2>
        <p className="text-sm leading-relaxed text-colab-cream/55 mt-4">
          Cada enlace lleva UTM. Al convertir en onboarding, HubSpot escribe source / medium / campaign
          en las propiedades de contacto (`hs_analytics_*`) que ya usa la app.
        </p>

        <div className="cacaotier-share-channels" role="tablist" aria-label="Canal de publicación">
          {CHANNELS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={channel === item.id}
              className={`cacaotier-share-channel ${channel === item.id ? "is-active" : ""}`}
              onClick={() => setChannel(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <dl className="cacaotier-utm-grid">
          <div><dt>utm_source</dt><dd>{utms.utm_source}</dd></div>
          <div><dt>utm_medium</dt><dd>{utms.utm_medium}</dd></div>
          <div><dt>utm_campaign</dt><dd>{utms.utm_campaign}</dd></div>
          <div><dt>utm_content</dt><dd>{utms.utm_content}</dd></div>
        </dl>

        <p className="cacaotier-tracked-url" title={trackedUrl}>
          {trackedUrl}
        </p>

        <div className="cacaotier-share-actions">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cacaotier-share-btn cacaotier-share-btn-primary"
            onClick={() => trackShare("whatsapp_share")}
          >
            Compartir en WhatsApp
          </a>
          <button type="button" className="cacaotier-share-btn" onClick={() => copy(trackedUrl, "link")}>
            {copied === "link" ? "Enlace UTM copiado" : "Copiar enlace UTM"}
          </button>
          <button type="button" className="cacaotier-share-btn" onClick={() => copy(postText, "wa")}>
            {copied === "wa" ? "Texto copiado" : "Copiar texto del post"}
          </button>
          <a
            href={OG_LANDSCAPE}
            download="cacaotier-og-1200x630.png"
            className="cacaotier-share-btn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setChannel("og_landscape")
              trackShare("download_og_landscape")
            }}
          >
            Descargar 1200×630
          </a>
          <a
            href={OG_SQUARE}
            download="cacaotier-og-1080.png"
            className="cacaotier-share-btn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setChannel("og_square")
              trackShare("download_og_square")
            }}
          >
            Descargar story 1080
          </a>
        </div>

        <p className="cacaotier-utm-note">
          Campaña <strong>{CACAOTIER_UTM_CAMPAIGN}</strong> → HubSpot
          <code> hs_analytics_source_data_2</code>. Fuente del canal →
          <code> hs_analytics_source_data_1</code>.
        </p>
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
