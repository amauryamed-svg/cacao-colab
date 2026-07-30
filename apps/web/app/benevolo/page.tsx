import type { Metadata } from "next"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import { benevoloProduct, priorityVarieties } from "@/lib/knowledge-base"

export const metadata: Metadata = {
  title: "Benevolo Cacao · preventa",
  description:
    "Barra de leche con marañón y cacao FEAR 5 fermentado de forma controlada. Salida práctica de cacaotier.",
}

export default function BenevoloPage() {
  const fear5 = priorityVarieties.find((item) => item.code === "FEAR 5")

  return (
    <div className="bg-[#1a120c] min-h-screen text-colab-cream">
      <header className="benevolo-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="eyebrow text-[#E8C9A0]">cacaotier presenta</p>
          <h1 className="font-serif text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[0.88] tracking-[-0.05em] mt-5">
            Benevolo<br /><em className="text-[#E8C9A0] font-normal">Cacao</em>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-white/55">
            {benevoloProduct.tagline} Una barra que traduce bioproceso, genética FEAR 5 y diez años
            de ruta a un alimento que se puede preordenar hoy.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <TrackedLink
              href={benevoloProduct.preorderWhatsapp}
              event="benevolo_interest"
              targetName="benevolo-preorder"
              source="benevolo-hero"
              external
              className="bg-[#E8C9A0] text-[#1a120c] rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Preordenar por WhatsApp →
            </TrackedLink>
            <Link
              href="/conocimiento"
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold text-white/80"
            >
              Ver la base de conocimiento
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <section className="grid md:grid-cols-4 gap-3">
          {benevoloProduct.claims.map((claim) => (
            <article key={claim.label} className="benevolo-claim">
              <span>{claim.label}</span>
              <strong>{claim.value}</strong>
            </article>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-10 mt-16 items-start">
          <div>
            <p className="eyebrow text-[#E8C9A0]">Por qué existe</p>
            <h2 className="font-serif text-4xl font-bold mt-3">
              El paper no se come.<br />La barra sí.
            </h2>
            <p className="text-white/55 leading-relaxed mt-5">
              {benevoloProduct.description}
            </p>
            <p className="text-white/45 leading-relaxed mt-4 text-sm">
              Las marcas colaboradoras del Colab pueden entrar a esta misma ruta: subir calidad,
              innovar con evidencia y correlacionar tendencias reales del mercado sin diluir su origen.
            </p>
          </div>
          <div className="space-y-4">
            <div className="benevolo-panel">
              <p className="eyebrow text-[#E8C9A0]">Listo ahora</p>
              <ul>
                {benevoloProduct.whatIsReady.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="benevolo-panel muted">
              <p className="eyebrow text-white/35">Aún no afirmamos</p>
              <ul>
                {benevoloProduct.whatIsNotReady.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-12 grid md:grid-cols-3 gap-6">
          <article>
            <p className="eyebrow text-[#E8C9A0]">01 · Semilla</p>
            <h3 className="font-serif text-2xl font-bold mt-3">FEAR 5 en vivero</h3>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              Parte desde material vegetal trazable. Ecoyuma publica la plántula FEAR-5 injertada.
            </p>
            {fear5 && (
              <TrackedLink
                href={fear5.ecoyumaUrl}
                event="ecoyuma_link_clicked"
                targetName="FEAR 5"
                source="benevolo-route"
                external
                className="inline-block mt-5 text-sm font-bold text-[#E8C9A0]"
              >
                Comprar plántula →
              </TrackedLink>
            )}
          </article>
          <article>
            <p className="eyebrow text-[#E8C9A0]">02 · Bioproceso</p>
            <h3 className="font-serif text-2xl font-bold mt-3">Fermentación con evidencia</h3>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              Aplica las ventanas metabolómicas y el ancla sensorial del campus Master Cacaotier.
            </p>
            <Link href="/aprende/cacaotier" className="inline-block mt-5 text-sm font-bold text-[#E8C9A0]">
              Entrar al laboratorio →
            </Link>
          </article>
          <article>
            <p className="eyebrow text-[#E8C9A0]">03 · Mesa</p>
            <h3 className="font-serif text-2xl font-bold mt-3">Preventa Benevolo</h3>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              Reserva la barra y ayúdanos a dimensionar el primer lote real. Sin stock inventado.
            </p>
            <TrackedLink
              href={benevoloProduct.preorderWhatsapp}
              event="benevolo_interest"
              targetName="benevolo-preorder"
              source="benevolo-route"
              external
              className="inline-block mt-5 text-sm font-bold text-[#E8C9A0]"
            >
              Quiero preordenar →
            </TrackedLink>
          </article>
        </section>
      </main>
    </div>
  )
}
