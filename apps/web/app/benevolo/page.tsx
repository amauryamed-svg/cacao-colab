import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import TrackedLink from "@/components/analytics/TrackedLink"
import { benevoloProduct, priorityVarieties } from "@/lib/knowledge-base"

export const metadata: Metadata = {
  title: "Chocolate Benevolo · marca acelerada cacaotier",
  description:
    "Bars. · categoría Duja de Marañón sugar free. FEAR 5 Quara × Zurych. Marca acelerada separada del Master Chocolatier 70 %.",
}

export default function BenevoloPage() {
  const fear5 = priorityVarieties.find((item) => item.code === "FEAR 5")

  return (
    <div className="bg-[#140e0a] min-h-screen text-colab-cream">
      <header className="benevolo-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-0">
          <Link href="/rd" className="eyebrow text-[#E8C9A0]/40 hover:text-[#FF6A3D]">
            ← R&D Colab
          </Link>
          <p className="eyebrow text-[#FF6A3D] mt-4">R&D · Bars. · Duja de Marañón sugar free</p>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-end mt-6">
            <div className="pb-10 md:pb-16">
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#E8C9A0]">{benevoloProduct.domain}</p>
              <h1
                className="font-serif font-black leading-[0.88] mt-4"
                style={{ fontSize: "clamp(3.2rem, 9vw, 6.5rem)", letterSpacing: "-0.05em" }}
              >
                Chocolate<br />
                <em className="text-[#FF6A3D] not-italic">Benevolo</em>
              </h1>
              <p className="mt-5 text-sm font-bold text-[#E8C9A0]">{benevoloProduct.accentLine}</p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
                {benevoloProduct.tagline} {benevoloProduct.format}. Vive en el laboratorio R&D junto a
                coberturas CAÚA × Zurych.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <TrackedLink
                  href={benevoloProduct.preorderWhatsapp}
                  event="benevolo_interest"
                  targetName="benevolo-preorder"
                  source="benevolo-hero"
                  external
                  className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Preordenar Bars. →
                </TrackedLink>
                <Link
                  href="/campus/benevolo"
                  className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold text-white/80"
                >
                  Track Dualita Benevolo →
                </Link>
                <Link
                  href="/rd/coberturas"
                  className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold text-white/80"
                >
                  Coberturas CAÚA × Zurych →
                </Link>
              </div>
            </div>
            <div className="benevolo-packshot">
              <Image
                src={benevoloProduct.heroImage}
                alt="Chocolate Benevolo Bars. · Duja de Marañón sugar free · FEAR 5"
                width={1536}
                height={1024}
                priority
                className="w-full h-auto"
              />
            </div>
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

        <section className="mt-16 grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-start">
          <div>
            <p className="eyebrow text-[#FF6A3D]">Categoría · Duja de Marañón sugar free</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 leading-tight">
              El paper del FEAR 5<br />llegó a la mesa.
            </h2>
            <p className="text-white/55 leading-relaxed mt-5">{benevoloProduct.description}</p>
            <p className="text-white/40 leading-relaxed mt-4 text-sm">
              Quara ancla el FEAR 5 en Arauca. Zurych aporta transformación. Benevolo es la marca
              acelerada Bars. en categoría Duja de Marañón sugar free — hermana del Master
              Chocolatier 70 %, no su capstone.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {benevoloProduct.formula.map((item) => (
              <article key={item.label} className="benevolo-claim">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="eyebrow text-[#E8C9A0]">Alianza de nodos</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Quién hace posible Bars.</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-7">
            {benevoloProduct.alliances.map((ally) => (
              <Link key={ally.name} href={ally.href} className="benevolo-ally">
                <span>{ally.place}</span>
                <strong>{ally.name}</strong>
                <p>{ally.role}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-2 gap-5">
          <div className="benevolo-panel">
            <p className="eyebrow text-[#E8C9A0]">Listo para preorden</p>
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
        </section>

        <section className="mt-16 border-t border-white/10 pt-12 grid md:grid-cols-3 gap-6">
          <article>
            <p className="eyebrow text-[#FF6A3D]">01 · Mazorca</p>
            <h3 className="font-serif text-2xl font-bold mt-3">FEAR 5 en Arauca</h3>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              Quara Cacao es el nodo del Colab en Tame. Desde ahí se conecta el FEAR 5 con la
              fermentación y con Benevolo.
            </p>
            {fear5 && (
              <TrackedLink
                href={fear5.ecoyumaUrl}
                event="ecoyuma_link_clicked"
                targetName="FEAR 5"
                source="benevolo-route"
                external
                className="inline-block mt-5 text-sm font-bold text-[#FF6A3D]"
              >
                Plántula FEAR-5 en Ecoyuma →
              </TrackedLink>
            )}
          </article>
          <article>
            <p className="eyebrow text-[#FF6A3D]">02 · Aceleración</p>
            <h3 className="font-serif text-2xl font-bold mt-3">Track Dualita Benevolo</h3>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              Tres misiones: tendencia × territorio, formulación duja, preorden y colectivo. Diploma
              digital compartible. El 70 % CoEx vive en Master Chocolatier.
            </p>
            <Link href="/campus/benevolo" className="inline-block mt-5 text-sm font-bold text-[#FF6A3D]">
              Abrir aceleración →
            </Link>
          </article>
          <article>
            <p className="eyebrow text-[#FF6A3D]">03 · Preorden</p>
            <h3 className="font-serif text-2xl font-bold mt-3">Aspiracional máximo</h3>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              Reserva Bars. y ayúdanos a dimensionar el primer lote real. Sin stock inventado.
            </p>
            <TrackedLink
              href={benevoloProduct.preorderWhatsapp}
              event="benevolo_interest"
              targetName="benevolo-preorder"
              source="benevolo-route"
              external
              className="inline-block mt-5 text-sm font-bold text-[#FF6A3D]"
            >
              Quiero preordenar →
            </TrackedLink>
          </article>
        </section>
      </main>
    </div>
  )
}
