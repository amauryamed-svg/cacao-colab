import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import { MastersShopifyGrid } from "@/components/commerce/MasterShopifyCheckout"
import {
  COLAB_SHOPIFY_COLLECTION,
  COLAB_SHOPIFY_STOREFRONT,
  colabStorefrontCatalog,
} from "@/lib/shopify-colab"
import {
  ZURYCH_INSTAGRAM,
  coberturasConvergence,
  nibsConvergence,
  waAskSku,
} from "@/lib/caua-shop"

export const metadata: Metadata = {
  title: "Tienda · cacao-colab.myshopify.com",
  description:
    "Tienda Shopify de Cacao Colab: Masters digitales, Bars. Benevolo y venta cruzada a nodos. Checkout en cacao-colab.myshopify.com.",
}

export default function ShopPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream">
      <header className="rd-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-22">
          <Link href="/" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
            ← Cacao Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-6">
            Shopify · cacao-colab.myshopify.com
          </p>
          <h1 className="display-title mt-4 max-w-3xl">
            Tienda Colab.
            <br />
            <em>Checkout en Shopify.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-colab-cream/55 leading-relaxed">
            La tienda oficial vive en{" "}
            <strong className="text-colab-cream">cacao-colab.myshopify.com</strong>: Masters
            digitales, antojo Benevolo y kits. Aquí el hub Colab enlaza checkout, campus y nodos.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <TrackedLink
              href={COLAB_SHOPIFY_STOREFRONT}
              event="sponsor_interest"
              targetName="colab-shopify-home"
              source="shop-hero"
              external
              className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Abrir cacao-colab.myshopify.com →
            </TrackedLink>
            <Link
              href="/export"
              className="text-sm font-bold text-colab-cream/70 underline decoration-white/20 underline-offset-4 hover:text-colab-yellow"
            >
              App FOB
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <section className="mb-10 border-l-2 border-colab-yellow pl-5 text-sm text-colab-cream/70 leading-relaxed">
          <strong className="text-colab-yellow">Checkout oficial:</strong>{" "}
          <a
            href={COLAB_SHOPIFY_STOREFRONT}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-colab-yellow"
          >
            cacao-colab.myshopify.com
          </a>
          . Coberturas/nibs de nodos se confirman por WhatsApp.
        </section>

        <section id="masters" className="scroll-mt-20 mb-16">
          <p className="eyebrow text-colab-yellow">Empezar aquí · producto digital</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">Los tres Masters</h2>
          <p className="mt-3 max-w-2xl text-sm text-colab-cream/55 leading-relaxed">
            Un solo checkout en Shopify. También puedes abrir el campus ganando rango con Mazorcas
            Doradas.
          </p>
          <div className="mt-8">
            <MastersShopifyGrid />
          </div>
          <div className="mt-8">
            <TrackedLink
              href={COLAB_SHOPIFY_STOREFRONT}
              event="sponsor_interest"
              targetName="shop-primary-cta"
              source="shop-masters"
              external
              className="inline-flex bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Ir a checkout Shopify →
            </TrackedLink>
          </div>
        </section>

        <section className="mb-16">
          <p className="eyebrow text-colab-yellow">También en la tienda</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Vitrina Colab</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1 mt-6">
            {colabStorefrontCatalog.map((item) => (
              <TrackedLink
                key={item.id}
                href={item.href}
                event="sponsor_interest"
                targetName={`store-${item.handle}`}
                source="shop-vitrina"
                external
                className="colab-store-card"
              >
                {item.badge && <span className="colab-store-badge">{item.badge}</span>}
                <strong>{item.title}</strong>
                <p>{item.blurb}</p>
                <em>{item.priceLabel}</em>
              </TrackedLink>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-x-8 gap-y-1 mb-14">
          {[
            {
              n: "Shopify Colab",
              t: "cacao-colab.myshopify.com",
              b: "Masters, Bars. y kits · checkout oficial.",
              href: COLAB_SHOPIFY_STOREFRONT,
              event: "sponsor_interest" as const,
            },
            {
              n: "CAÚA",
              t: "Coberturas · WhatsApp",
              b: "Santander + nibs Arauca — pedido asistido Colab.",
              href:
                "https://wa.me/573102227848?text=" +
                encodeURIComponent("Hola Cacao Colab — quiero catálogo CAÚA (coberturas, nibs)."),
              event: "sponsor_interest" as const,
            },
            {
              n: "Zurych",
              t: "@tiendazurych",
              b: "Bean-to-bar Landázuri · Instagram.",
              href: ZURYCH_INSTAGRAM,
              event: "zurych_shop_clicked" as const,
            },
          ].map((card) => (
            <TrackedLink
              key={card.n}
              href={card.href}
              event={card.event}
              targetName={`node-${card.n}`}
              source="shop-nodes"
              external
              className="rd-node-card"
            >
              <span>{card.n}</span>
              <strong>{card.t}</strong>
              <p>{card.b}</p>
            </TrackedLink>
          ))}
        </section>

        <section>
          <p className="eyebrow text-colab-yellow">Cross-sell · coberturas</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Nodos a tu mesa</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {coberturasConvergence.map((sku) => (
              <article key={sku.id} className="rd-sku rd-sku--row">
                <div>
                  <p className="rd-sku-nodes">
                    {sku.nodes.join(" × ")} · {sku.origin}
                  </p>
                  <h3>
                    {sku.title}{" "}
                    <small className="text-colab-cream/35 font-sans font-normal">{sku.format}</small>
                  </h3>
                  <p>
                    {sku.cacaoPct}
                    {sku.sweetener ? ` · ${sku.sweetener}` : ""} — {sku.role}
                  </p>
                </div>
                <div className="rd-sku-actions">
                  <TrackedLink
                    href={waAskSku(sku)}
                    event="sponsor_interest"
                    targetName={`wa-${sku.id}`}
                    source="shop-coberturas"
                    external
                    className="rd-btn-shop"
                  >
                    Pedir por WhatsApp →
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="eyebrow text-colab-pod">NIBS y kits</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Pedir con los nodos</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {nibsConvergence.map((sku) => (
              <article key={sku.id} className="rd-sku">
                <p className="rd-sku-nodes">{sku.nodes.join(" × ")}</p>
                <h3>{sku.title}</h3>
                <p>{sku.role}</p>
                <div className="rd-sku-actions">
                  <TrackedLink
                    href={waAskSku(sku)}
                    event="sponsor_interest"
                    targetName={`wa-${sku.id}`}
                    source="shop-nibs"
                    external
                    className="rd-btn-shop"
                  >
                    Pedir por WhatsApp →
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t-2 border-colab-yellow pt-8 md:pt-10 grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-end text-colab-cream">
          <div>
            <p className="eyebrow text-colab-yellow">Checkout oficial</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black mt-3 text-colab-yellow">
              cacao-colab.myshopify.com
            </h2>
            <p className="text-sm text-colab-cream/55 mt-4 leading-relaxed max-w-xl">
              Carrito y pago en la tienda Shopify Colab. Exportación FOB y nodos físicos se atienden
              desde la app /export y WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-start lg:items-end">
            <TrackedLink
              href={COLAB_SHOPIFY_STOREFRONT}
              event="sponsor_interest"
              targetName="shop-cta-store"
              source="shop-cta"
              external
              className="bg-colab-yellow text-colab-forest text-center rounded-full px-6 py-4 text-sm font-bold"
            >
              Ir a la tienda Shopify →
            </TrackedLink>
            <Link
              href="/export"
              className="text-sm font-bold text-colab-cream/70 underline decoration-white/20 underline-offset-4 hover:text-colab-yellow"
            >
              Abrir app FOB →
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
