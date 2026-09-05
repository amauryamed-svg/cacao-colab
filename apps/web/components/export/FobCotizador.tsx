"use client"

import { useMemo, useState } from "react"
import TrackedLink from "@/components/analytics/TrackedLink"
import {
  buildFobQuote,
  fobDestinations,
  fobProducts,
  fobWhatsappQuote,
  formatUsd,
  type FobDestinationId,
  type FobProductId,
} from "@/lib/export-fob"

export default function FobCotizador() {
  const [productId, setProductId] = useState<FobProductId>("beans-ff")
  const [destinationId, setDestinationId] = useState<FobDestinationId>("usa")
  const [quantityKg, setQuantityKg] = useState(1000)

  const quote = useMemo(
    () => buildFobQuote({ productId, destinationId, quantityKg }),
    [productId, destinationId, quantityKg],
  )

  const regions = ["USA", "UE", "Asia"] as const

  return (
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
                {p.label} · desde {formatUsd(p.exWorksUsdPerKg)}/kg
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
          <small>Mínimo {quote.product.minOrderKg} kg · {quote.product.nodeHint}</small>
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

      <aside className="fob-cotizador-result">
        <p className="eyebrow text-colab-yellow">Cotización FOB · Cacao Colab</p>
        <h3>
          {quote.product.label}
          <span>
            → {quote.destination.label}
          </span>
        </h3>
        <p className="fob-meta">
          {quote.quantityKg.toLocaleString("es-CO")} kg · tránsito {quote.transitDays[0]}–
          {quote.transitDays[1]} días · {quote.destination.tradeFrame}
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
              <span>Arancel destino (~{(quote.destination.dutyAdValorem * 100).toFixed(0)} %)</span>
              <strong>{formatUsd(quote.dutyUsd)}</strong>
            </li>
          )}
          {quote.vatUsd > 0 && (
            <li>
              <span>IVA / consumption tax (~{(quote.destination.vatAdValorem * 100).toFixed(0)} %)</span>
              <strong>{formatUsd(quote.vatUsd)}</strong>
            </li>
          )}
        </ul>

        <p className="fob-notes">{quote.destination.notes}</p>
        <p className="fob-disclaimer">{quote.disclaimer}</p>
        <p className="fob-updated">{quote.updatedLabel}</p>

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
      </aside>
    </div>
  )
}
