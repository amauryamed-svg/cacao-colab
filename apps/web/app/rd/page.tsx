import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import {
  CAUA_SHOP_COLLECTION,
  coberturasConvergence,
  nibsConvergence,
  shopContactPoints,
  waAskSku,
} from "@/lib/caua-shop"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "R&D · Bars. + coberturas CAÚA × Zurych",
  description:
    "Laboratorio R&D del Colab: Bars. (output de aceleración cacaotier) y la convergencia de nodos CAÚA × Zurych para pedir coberturas y nibs en cauacolombia.co.",
}

export default function RdHubPage() {
  return (
    <div className="bg-colab-forest min-h-screen text-colab-cream">
      <header className="rd-hero relative overflow-hidden">
        <AtmospherePlane src={shotById("shards").src} alt="" overlay="cocoa" />
        <FloatingPods variant="stage" />
        <div className="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="eyebrow text-colab-yellow">Cacao Colab · Research & Development</p>
          <h1 className="display-title mt-4 max-w-3xl">
            Del laboratorio
            <br />
            <em>a la cobertura.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-colab-cream/55 leading-relaxed">
            R&D es donde el Colab prototipa producto:{" "}
            <strong className="text-colab-cream">Bars.</strong> como output de aceleración cacaotier, y las{" "}
            <strong className="text-colab-cream">coberturas y nibs</strong> donde convergen los nodos CAÚA y
            Zurych — con shop real en cauacolombia.co y puntos de contacto para pedir.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/rd/bars"
              className="bg-colab-yellow text-colab-forest rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Bars. · producto Colab →
            </Link>
            <Link
              href="/rd/set-catacion"
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Set Catación 10 →
            </Link>
            <Link
              href="/rd/coberturas"
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Coberturas CAÚA × Zurych →
            </Link>
            <TrackedLink
              href={CAUA_SHOP_COLLECTION}
              event="caua_shop_clicked"
              targetName="caua-shop-collection"
              source="rd-hub"
              external
              className="border border-colab-yellow/40 text-colab-yellow rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Abrir tienda CAÚA →
            </TrackedLink>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <section className="grid md:grid-cols-3 gap-5 -mt-4">
          <Link href="/rd/set-catacion" className="rd-panel rd-panel--coberturas">
            <p className="eyebrow text-colab-yellow">01 · Drop sensorial</p>
            <h2>Set Catación Colombia 10</h2>
            <p>
              Diez chocolatinas/testigos con guía profesional y Rueda Fine-Flavor Colab. Capstone del
              Master Catador — contexto CoEx sin medallas inventadas.
            </p>
            <span>Ver set + guía →</span>
          </Link>
          <Link href="/rd/bars" className="rd-panel rd-panel--benevolo">
            <p className="eyebrow text-[#FF6A3D]">02 · Output de aceleración</p>
            <h2>Bars. · producto Colab</h2>
            <p>
              Duja de Marañón sugar free FEAR 5 · Quara × Zurych. Empaque en capas SVG, preventa y track
              Dualita — marca nativa cacaotier en cacaocolab.org, no Benevolo.co.
            </p>
            <span>Ver Bars. + empaque →</span>
          </Link>
          <Link href="/rd/coberturas" className="rd-panel rd-panel--coberturas">
            <p className="eyebrow text-colab-yellow">03 · Convergencia de nodos</p>
            <h2>Coberturas & NIBS</h2>
            <p>
              CAÚA (Santander / Arauca en shop) × Zurych (Landázuri bean-to-bar). Un solo gesto: leer,
              pedir y cocinar con coberturas reales.
            </p>
            <span>Ver catálogo de convergencia →</span>
          </Link>
        </section>

        <section className="mt-16">
          <p className="eyebrow text-colab-pod">Vista rápida · coberturas</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Pedir desde el shop CAÚA</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {coberturasConvergence.slice(0, 6).map((sku) => (
              <article key={sku.id} className="rd-sku">
                <div className="flex justify-between gap-2">
                  <strong>{sku.cacaoPct}</strong>
                  <small>{sku.format}</small>
                </div>
                <h3>{sku.title}</h3>
                <p>{sku.role}</p>
                <p className="rd-sku-nodes">{sku.nodes.join(" × ")}</p>
                <div className="rd-sku-actions">
                  <TrackedLink
                    href={sku.href}
                    event="caua_shop_clicked"
                    targetName={sku.id}
                    source="rd-hub-sku"
                    external
                  >
                    Shop →
                  </TrackedLink>
                  <TrackedLink
                    href={waAskSku(sku)}
                    event="sponsor_interest"
                    targetName={`wa-${sku.id}`}
                    source="rd-hub-sku"
                    external
                  >
                    WhatsApp →
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <p className="eyebrow text-colab-yellow">NIBS</p>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {nibsConvergence.map((sku) => (
              <article key={sku.id} className="rd-sku">
                <h3>{sku.title}</h3>
                <p>{sku.role}</p>
                <div className="rd-sku-actions">
                  <TrackedLink
                    href={sku.href}
                    event="caua_shop_clicked"
                    targetName={sku.id}
                    source="rd-hub-nibs"
                    external
                  >
                    Shop →
                  </TrackedLink>
                  <TrackedLink
                    href={waAskSku(sku)}
                    event="sponsor_interest"
                    targetName={`wa-${sku.id}`}
                    source="rd-hub-nibs"
                    external
                  >
                    Pedir →
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-12">
          <p className="eyebrow text-colab-yellow">Puntos de contacto</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Shop + WhatsApp + nodos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {shopContactPoints.map((point) => (
              <TrackedLink
                key={point.id}
                href={point.href}
                event={point.event ?? "knowledge_link_clicked"}
                targetName={point.id}
                source="rd-hub-contact"
                external={point.external}
                className="rd-contact"
              >
                <strong>{point.label}</strong>
                <span>{point.sub}</span>
              </TrackedLink>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
