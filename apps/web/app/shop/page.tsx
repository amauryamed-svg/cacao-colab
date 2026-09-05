import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import { MastersShopifyGrid } from "@/components/commerce/MasterShopifyCheckout"
import {
  COLAB_SHOPIFY_STOREFRONT,
} from "@/lib/shopify-colab"
import {
  ZURYCH_INSTAGRAM,
  cauaShopSkus,
  coberturasConvergence,
  nibsConvergence,
  shopContactPoints,
  waAskSku,
} from "@/lib/caua-shop"

export const metadata: Metadata = {
  title: "Tienda · Masters + nodos",
  description:
    "Checkout Shopify de los tres Masters (producto digital) y venta cruzada a coberturas y nibs de los nodos CAÚA × Zurych.",
}

const waGeneral =
  "https://wa.me/573102227848?text=" +
  encodeURIComponent("Hola Cacao Colab — quiero ver el catálogo CAÚA (coberturas, nibs, kits).")

export default function ShopPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream">
      <header className="rd-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-22">
          <Link href="/" className="eyebrow text-colab-cream/40 hover:text-colab-yellow">
            ← Cacao Colab
          </Link>
          <p className="eyebrow text-colab-yellow mt-6">Tienda Colab · Shopify + nodos</p>
          <h1 className="display-title mt-4 max-w-3xl">
            Masters digitales.
            <br />
            <em>Productos de los nodos.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-colab-cream/55 leading-relaxed">
            Checkout Shopify para los tres Masters (producto digital) y venta cruzada a coberturas,
            nibs y kits de CAÚA × Zurych. La herencia del oficio se compra, se practica y se lleva a
            la mesa.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#masters"
              className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Ver Masters →
            </Link>
            <TrackedLink
              href={COLAB_SHOPIFY_STOREFRONT}
              event="sponsor_interest"
              targetName="colab-shopify-home"
              source="shop-hero"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Abrir Shopify Colab →
            </TrackedLink>
            <TrackedLink
              href={waGeneral}
              event="sponsor_interest"
              targetName="wa-shop-hero"
              source="shop-hero"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Pedir nodos por WhatsApp →
            </TrackedLink>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <section id="masters" className="scroll-mt-20 mb-16">
          <p className="eyebrow text-colab-yellow">Producto digital · Shopify checkout</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">Los tres Masters</h2>
          <p className="mt-3 max-w-2xl text-sm text-colab-cream/55 leading-relaxed">
            Inscripción pagada vía tienda Shopify Colab. También puedes abrir el campus ganando rango
            con Mazorcas Doradas. Tras el Master, pide coberturas y nibs de los nodos.
          </p>
          <div className="mt-8">
            <MastersShopifyGrid />
          </div>
        </section>

        <section className="rounded-2xl border border-colab-yellow/25 bg-colab-yellow/10 px-6 py-5 mb-14 text-sm text-colab-cream/70 leading-relaxed">
          <strong className="text-colab-yellow">Nodos físicos.</strong> Mientras las tiendas propias
          de CAÚA / Zurych se estabilizan, el pedido de coberturas y nibs se confirma por WhatsApp con
          criterio Colab. Los Masters digitales viven en Shopify.
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-14">
          {[
            {
              n: "CAÚA",
              t: "Shop + protocolo",
              b: "Coberturas Santander y nibs Arauca/Santander — tienda fuera de línea, pide por WhatsApp.",
              href:
                "https://wa.me/573102227848?text=" +
                encodeURIComponent("Hola Cacao Colab — quiero ver el catálogo CAÚA (coberturas, nibs, kits)."),
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
              b: "WhatsApp confirma SKU, uso HoReCa/pastelería y conexión entre nodos hoy mismo.",
              href: waGeneral,
              event: "sponsor_interest" as const,
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
          <p className="eyebrow text-colab-yellow">Catálogo · coberturas</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Santander en el shop</h2>
          <p className="text-sm text-colab-cream/45 mt-3 max-w-xl leading-relaxed">
            Precios y stock los define la tienda. Aquí enlazamos cada SKU y un WhatsApp para pedir
            con contexto Colab.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {coberturasConvergence.map((sku) => (
              <article key={sku.id} className="rd-sku rd-sku--row">
                <div>
                  <p className="rd-sku-nodes">
                    {sku.nodes.join(" × ")} · {sku.origin}
                  </p>
                  <h3>
                    {sku.title} <small className="text-colab-cream/35 font-sans font-normal">{sku.format}</small>
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
          <p className="eyebrow text-colab-pod">NIBS y kits · Arauca × Santander</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Pedir nibs y kits con los nodos</h2>
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

        <section className="mt-16 rounded-3xl bg-colab-yellow text-colab-forest p-8 md:p-12 grid lg:grid-cols-[1.2fr_.8fr] gap-8 items-center">
          <div>
            <p className="eyebrow opacity-55">Checkout</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black mt-3">
              El carrito llega cuando haya tienda propia
            </h2>
            <p className="text-sm opacity-70 mt-4 leading-relaxed max-w-xl">
              Mientras no hay checkout en línea, el Colab confirma cada pedido por WhatsApp con el
              mismo criterio de industria: SKU correcto, uso (temperado, 70 %, topping) y conexión con
              Zurych cuando el camino es bean-to-bar.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <TrackedLink
              href="/rd"
              event="knowledge_link_clicked"
              targetName="shop-checkout"
              source="shop-cta"
              className="bg-colab-forest text-colab-yellow text-center rounded-full px-6 py-4 text-sm font-bold"
            >
              Ver hub R&D completo →
            </TrackedLink>
            <TrackedLink
              href={shopContactPoints.find((p) => p.id === "wa-coberturas")!.href}
              event="sponsor_interest"
              targetName="shop-wa-cta"
              source="shop-cta"
              external
              className="border border-colab-forest/25 text-center rounded-full px-6 py-4 text-sm font-bold"
            >
              Pedir por WhatsApp →
            </TrackedLink>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-colab-cream/30">
          {cauaShopSkus.length} SKUs activos en el protocolo Colab · datos verificados por nodo, no por góndola.
        </p>
      </main>
    </div>
  )
}
