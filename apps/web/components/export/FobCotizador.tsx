"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import {
  buildFobQuote,
  compareDestinations,
  fobDestinations,
  fobPresets,
  fobProducts,
  fobWhatsappQuote,
  formatUsd,
  quoteSummaryText,
  type FobDestinationId,
  type FobProductId,
} from "@/lib/export-fob"
import { COLAB_SHOPIFY_STOREFRONT } from "@/lib/shopify-colab"

type AppTab = "cotizar" | "comparar" | "guia"

export default function FobCotizador() {
  const [tab, setTab] = useState<AppTab>("cotizar")
  const [productId, setProductId] = useState<FobProductId>("beans-ff")
  const [destinationId, setDestinationId] = useState<FobDestinationId>("usa")
  const [quantityKg, setQuantityKg] = useState(1000)
  const [copied, setCopied] = useState(false)
  const [, startTransition] = useTransition()

  const quote = useMemo(
    () => buildFobQuote({ productId, destinationId, quantityKg }),
    [productId, destinationId, quantityKg],
  )

  const comparison = useMemo(
    () => compareDestinations(productId, quantityKg),
    [productId, quantityKg],
  )

  const regions = ["USA", "UE", "Asia"] as const

  function applyPreset(id: (typeof fobPresets)[number]["id"]) {
    const preset = fobPresets.find((p) => p.id === id)
    if (!preset) return
    setProductId(preset.productId)
    setDestinationId(preset.destinationId)
    setQuantityKg(preset.quantityKg)
    setTab("cotizar")
  }

  function copyQuote() {
    const text = quoteSummaryText(quote)
    startTransition(async () => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        setCopied(false)
      }
    })
  }

  function printQuote() {
    window.print()
  }

  return (
    <div className="fob-app">
      <nav className="fob-app-tabs" aria-label="App cotizador FOB">
        {(
          [
            ["cotizar", "Cotizar"],
            ["comparar", "Comparar mercados"],
            ["guia", "Guía export"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "active" : undefined}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
        <Link href="/shop" className="fob-app-shop-link">
          Tienda Shopify →
        </Link>
      </nav>

      <div className="fob-presets" aria-label="Escenarios">
        {fobPresets.map((p) => (
          <button key={p.id} type="button" onClick={() => applyPreset(p.id)}>
            <strong>{p.label}</strong>
            <em>{p.blurb}</em>
          </button>
        ))}
      </div>

      {tab === "cotizar" && (
        <div className="fob-cotizador">
          <div className="fob-cotizador-controls">
            <label>
              <span>Producto</span>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value as FobProductId)}
              >
                {fobProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} · desde {formatUsd(p.exWorksUsdPerKg)}/kg · {p.hsHint}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Cantidad (kg)</span>
              <input
                type="number"
                min={quote.product.minOrderKg}
                step={50}
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value) || quote.product.minOrderKg)}
              />
              <small>
                Mínimo {quote.product.minOrderKg} kg · {quote.product.nodeHint}
              </small>
            </label>

            <fieldset>
              <legend>Mercado destino</legend>
              <div className="fob-dest-grid">
                {regions.map((region) => (
                  <div key={region} className="fob-dest-col">
                    <p className="fob-dest-region">{region}</p>
                    {fobDestinations
                      .filter((d) => d.region === region)
                      .map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          className={destinationId === d.id ? "active" : undefined}
                          onClick={() => setDestinationId(d.id)}
                        >
                          <strong>{d.label}</strong>
                          <em>{d.port}</em>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="fob-cotizador-result" id="fob-quote-print">
            <p className="eyebrow text-colab-yellow">App FOB · Cacao Colab</p>
            <h3>
              {quote.product.label}
              <span>→ {quote.destination.label}</span>
            </h3>
            <p className="fob-meta">
              {quote.quantityKg.toLocaleString("es-CO")} kg · tránsito {quote.transitDays[0]}–
              {quote.transitDays[1]} días · {quote.destination.tradeFrame} · {quote.product.hsHint}
            </p>

            <dl className="fob-totals">
              <div>
                <dt>FOB Cartagena</dt>
                <dd>
                  {formatUsd(quote.fobCartagenaUsd)}
                  <small>{formatUsd(quote.fobPerKg)}/kg</small>
                </dd>
              </div>
              <div>
                <dt>CIF estimado</dt>
                <dd>
                  {formatUsd(quote.cifUsd)}
                  <small>{formatUsd(quote.cifPerKg)}/kg</small>
                </dd>
              </div>
              <div className="landed">
                <dt>Landed estimado</dt>
                <dd>
                  {formatUsd(quote.landedUsd)}
                  <small>{formatUsd(quote.landedPerKg)}/kg</small>
                </dd>
              </div>
            </dl>

            <ul className="fob-lines">
              {quote.lines.map((line) => (
                <li key={line.label}>
                  <span>{line.label}</span>
                  <strong>{formatUsd(line.usdTotal)}</strong>
                </li>
              ))}
              {quote.dutyUsd > 0 && (
                <li>
                  <span>
                    Arancel destino (~{(quote.destination.dutyAdValorem * 100).toFixed(0)} %)
                  </span>
                  <strong>{formatUsd(quote.dutyUsd)}</strong>
                </li>
              )}
              {quote.vatUsd > 0 && (
                <li>
                  <span>
                    IVA / consumption tax (~{(quote.destination.vatAdValorem * 100).toFixed(0)} %)
                  </span>
                  <strong>{formatUsd(quote.vatUsd)}</strong>
                </li>
              )}
            </ul>

            <p className="fob-notes">{quote.destination.notes}</p>
            <p className="fob-disclaimer">{quote.disclaimer}</p>
            <p className="fob-updated">{quote.updatedLabel}</p>

            <div className="fob-actions">
              <TrackedLink
                href={fobWhatsappQuote(quote)}
                event="sponsor_interest"
                targetName="fob-proforma"
                source="export-fob"
                external
                className="fob-cta"
              >
                Pedir proforma FOB →
              </TrackedLink>
              <button type="button" className="fob-secondary" onClick={copyQuote}>
                {copied ? "Copiado ✓" : "Copiar cotización"}
              </button>
              <button type="button" className="fob-secondary" onClick={printQuote}>
                Imprimir / PDF
              </button>
            </div>
          </aside>
        </div>
      )}

      {tab === "comparar" && (
        <div className="fob-compare">
          <div className="fob-compare-controls">
            <label>
              <span>Producto a comparar</span>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value as FobProductId)}
              >
                {fobProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Cantidad (kg)</span>
              <input
                type="number"
                min={100}
                step={50}
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value) || 1000)}
              />
            </label>
          </div>
          <div className="fob-compare-grid">
            {comparison.map((q) => (
              <article key={q.destination.id}>
                <p className="fob-dest-region">{q.destination.region}</p>
                <h3>{q.destination.label}</h3>
                <p className="fob-meta">{q.destination.port}</p>
                <dl>
                  <div>
                    <dt>FOB/kg</dt>
                    <dd>{formatUsd(q.fobPerKg)}</dd>
                  </div>
                  <div>
                    <dt>CIF/kg</dt>
                    <dd>{formatUsd(q.cifPerKg)}</dd>
                  </div>
                  <div>
                    <dt>Landed/kg</dt>
                    <dd className="landed">{formatUsd(q.landedPerKg)}</dd>
                  </div>
                  <div>
                    <dt>Tránsito</dt>
                    <dd>
                      {q.transitDays[0]}–{q.transitDays[1]} d
                    </dd>
                  </div>
                </dl>
                <button type="button" onClick={() => { setDestinationId(q.destination.id); setTab("cotizar") }}>
                  Abrir cotización →
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === "guia" && (
        <div className="fob-guide">
          <article>
            <h3>1 · Criterio de lote</h3>
            <p>
              Fermentación controlada, tipicidad y trazabilidad. Sin lote real no hay proforma —
              solo orientación de esta app.
            </p>
          </article>
          <article>
            <h3>2 · Incoterm FOB Cartagena</h3>
            <p>
              El ancla Colab es FOB: inland, docs y stuffing hasta puerto. CIF y landed son
              estimados para conversar con el comprador USA / UE / Asia.
            </p>
          </article>
          <article>
            <h3>3 · Cumplimiento</h3>
            <p>
              EUDR, cadmio y certificados de origen viven en{" "}
              <Link href="/conocimiento">/conocimiento</Link>. La app no sustituye due diligence.
            </p>
          </article>
          <article>
            <h3>4 · Tienda + Masters</h3>
            <p>
              Producto digital y antojo en{" "}
              <a href={COLAB_SHOPIFY_STOREFRONT} target="_blank" rel="noopener noreferrer">
                cacao-colab.myshopify.com
              </a>{" "}
              · hub Colab en <Link href="/shop">/shop</Link>.
            </p>
          </article>
        </div>
      )}
    </div>
  )
}
