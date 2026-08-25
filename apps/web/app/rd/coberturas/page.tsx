import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import {
  ZURYCH_INSTAGRAM,
  coberturasConvergence,
  nibsConvergence,
  shopContactPoints,
  waAskSku,
} from "@/lib/caua-shop"

export const metadata: Metadata = {
  title: "Coberturas CAÚA × Zurych · R&D Colab",
  description:
    "Punto de convergencia de nodos: coberturas y nibs CAÚA, alineados al bean-to-bar Zurych. Las tiendas propias están fuera de línea — pedidos por WhatsApp.",
}

export default function RdCoberturasPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream">
      <header className="rd-hero rd-hero--coberturas">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-22">
          <Link href="/rd" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
            ← R&D Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-6">Convergencia de nodos · CAÚA × Zurych</p>
          <h1 className="display-title mt-4 max-w-3xl">
            Coberturas que
            <br />
            <em>unen los nodos.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-colab-cream/55 leading-relaxed">
            Santander es el territorio compartido: CAÚA formula coberturas y nibs; Zurych transforma
            bean-to-bar desde Landázuri/Bogotá. Las tiendas propias de los nodos están fuera de línea
            hoy — el Colab conecta el pedido por WhatsApp con un criterio de industria, no de góndola
            genérica.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <TrackedLink
              href={shopContactPoints.find((p) => p.id === "wa-coberturas")!.href}
              event="sponsor_interest"
              targetName="wa-coberturas-hero"
              source="rd-coberturas-hero"
              external
              className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Pedir coberturas por WhatsApp →
            </TrackedLink>
            <TrackedLink
              href={ZURYCH_INSTAGRAM}
              event="zurych_shop_clicked"
              targetName="zurych-instagram"
              source="rd-coberturas-hero"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Ver @tiendazurych →
            </TrackedLink>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <section className="grid md:grid-cols-3 gap-4 -mt-2 mb-14">
          {[
            {
              n: "CAÚA",
              t: "Shop + protocolo",
              b: "Coberturas Santander y nibs Arauca/Santander — tienda fuera de línea, pide por WhatsApp.",
              href: shopContactPoints.find((p) => p.id === "wa-coberturas")!.href,
              event: "sponsor_interest" as const,
            },
            {
              n: "Zurych",
              t: "Bean-to-bar · Landázuri",
              b: "Coberturas 60–100 %, chocolatinas y nibs 100 % sin azúcar — @tiendazurych en Instagram.",
              href: ZURYCH_INSTAGRAM,
              event: "zurych_shop_clicked" as const,
            },
            {
              n: "Colab",
              t: "Punto de pedido",
              b: "WhatsApp orienta SKU, uso HoReCa/pastelería y conexión entre nodos. El checkout vive en el shop CAÚA.",
              href: shopContactPoints.find((p) => p.id === "wa-coberturas")!.href,
              event: "sponsor_interest" as const,
            },
          ].map((card) => (
            <TrackedLink
              key={card.n}
              href={card.href}
              event={card.event}
              targetName={`node-${card.n}`}
              source="rd-coberturas-nodes"
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
          <p className="eyebrow text-colab-yellow">Catálogo · coberturas</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Santander en el shop</h2>
          <p className="text-sm text-colab-cream/45 mt-3 max-w-xl leading-relaxed">
            Precios y stock los define la tienda. Mientras está fuera de línea, cada SKU se pide por
            WhatsApp con contexto Colab.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {coberturasConvergence.map((sku) => (
              <article key={sku.id} className="rd-sku rd-sku--row">
                <div>
                  <p className="rd-sku-nodes">{sku.nodes.join(" × ")} · {sku.origin}</p>
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
                    source="rd-coberturas-list"
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
          <p className="eyebrow text-colab-pod">NIBS · Arauca × Santander</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Pedir nibs con los nodos</h2>
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
                    source="rd-nibs"
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

        <section className="mt-16 rounded-3xl bg-colab-yellow text-colab-forest p-8 md:p-12 grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          <div>
            <p className="eyebrow opacity-55">Checkout</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black mt-3">
              El carrito llega cuando haya tienda propia
            </h2>
            <p className="text-sm opacity-70 mt-4 leading-relaxed max-w-xl">
              Mientras no hay checkout en línea, el Colab te orienta qué cobertura o nibs pedir según
              uso (temperado, 70 %, topping) y te conecta con Zurych cuando el camino es bean-to-bar.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TrackedLink
              href={shopContactPoints.find((p) => p.id === "wa-coberturas")!.href}
              event="sponsor_interest"
              targetName="caua-checkout-wa"
              source="rd-coberturas-cta"
              external
              className="bg-colab-forest text-colab-yellow text-center rounded-full px-6 py-4 text-sm font-bold"
            >
              Pedir coberturas por WhatsApp →
            </TrackedLink>
            <TrackedLink
              href={shopContactPoints.find((p) => p.id === "wa-nibs")!.href}
              event="sponsor_interest"
              targetName="wa-nibs-cta"
              source="rd-coberturas-cta"
              external
              className="border border-colab-forest/25 text-center rounded-full px-6 py-4 text-sm font-bold"
            >
              WhatsApp NIBS →
            </TrackedLink>
          </div>
        </section>
      </main>
    </div>
  )
}
