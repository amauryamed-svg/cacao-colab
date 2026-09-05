"use client"

import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import { waAskSku } from "@/lib/caua-shop"
import {
  crossSellForMaster,
  getMasterShopifySku,
  masterCheckoutUrl,
  masterShopifySkus,
  type MasterShopifySku,
} from "@/lib/shopify-colab"

export function MasterShopifyCheckout({ courseSlug }: { courseSlug: string }) {
  const sku = getMasterShopifySku(courseSlug)
  if (!sku) return null
  return <MasterCheckoutCard sku={sku} compact />
}

export function MasterCheckoutCard({
  sku,
  compact = false,
}: {
  sku: MasterShopifySku
  compact?: boolean
}) {
  const checkout = masterCheckoutUrl(sku)
  return (
    <article className={compact ? "master-shopify-card compact" : "master-shopify-card"}>
      <p className="eyebrow text-colab-yellow">Shopify · producto digital</p>
      <h3>{sku.title}</h3>
      <p>{sku.blurb}</p>
      <p className="master-shopify-price">
        <strong>{sku.priceUsdLabel}</strong>
        <span>{sku.priceCopLabel}</span>
      </p>
      <div className="master-shopify-actions">
        <TrackedLink
          href={checkout.href}
          event="sponsor_interest"
          targetName={`shopify-${sku.handle}`}
          source="master-checkout"
          external
          className="master-shopify-buy"
        >
          {checkout.mode === "shopify" ? "Checkout Shopify →" : "Inscribirme por WhatsApp →"}
        </TrackedLink>
        <Link href={sku.campusHref} className="master-shopify-campus">
          Ver campus →
        </Link>
      </div>
    </article>
  )
}

export function MastersShopifyGrid() {
  return (
    <div className="masters-shopify-grid">
      {masterShopifySkus.map((sku) => (
        <MasterCheckoutCard key={sku.courseSlug} sku={sku} />
      ))}
    </div>
  )
}

export function MasterCrossSellRail({ courseSlug }: { courseSlug: string }) {
  const items = crossSellForMaster(courseSlug)
  if (items.length === 0) return null
  return (
    <section className="master-cross-sell">
      <p className="eyebrow text-colab-champagne">Venta cruzada · nodos</p>
      <h3>Lleva el oficio a la mesa de los nodos</h3>
      <ul>
        {items.map((sku) => (
          <li key={sku.id}>
            <div>
              <strong>{sku.title}</strong>
              <p>
                {sku.format} · {sku.nodes.join(" × ")}
              </p>
            </div>
            <TrackedLink
              href={waAskSku(sku)}
              event="sponsor_interest"
              targetName={sku.id}
              source={`cross-sell-${courseSlug}`}
              external
              className="master-cross-sell-cta"
            >
              Pedir →
            </TrackedLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
