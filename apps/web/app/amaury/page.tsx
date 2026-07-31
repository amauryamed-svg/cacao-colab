import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { amauryProfile } from "@/lib/amaury-profile"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "Amaury Amed · Cacaotier & Chocolatier",
  description:
    "Perfil de Amaury Amed en Cacao Colab: Cacaotier & Chocolatier, fundador cacaotier. LinkedIn, Instagram y puerta abierta a Barry Callebaut · Chocolate Academy.",
  openGraph: {
    title: "Amaury Amed · Cacaotier & Chocolatier · Cacao Colab",
    description: amauryProfile.lede,
    url: "/amaury",
    locale: "es_CO",
    type: "profile",
  },
}

const craft = shotById("broken")
const origin = shotById("coex-home")

export default function AmauryProfilePage() {
  const p = amauryProfile

  return (
    <div className="amaury-profile bg-[#100c09] text-colab-cream min-h-screen">
      {/* HERO — una composición: marca + headline + lede + CTAs + plano visual */}
      <header className="amaury-hero">
        {origin && (
          <Image
            src={origin.src}
            alt={origin.alt}
            fill
            priority
            className="amaury-hero__photo"
            sizes="100vw"
          />
        )}
        <div className="amaury-hero__veil" aria-hidden />
        <div className="amaury-hero__content">
          <p className="amaury-hero__brand">cacaotier</p>
          <h1 className="amaury-hero__name">
            Amaury
            <br />
            <em>Amed</em>
          </h1>
          <p className="amaury-hero__title">{p.title}</p>
          <p className="amaury-hero__lede">{p.headline}</p>
          <div className="amaury-hero__ctas">
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="amaury-cta amaury-cta--primary">
              LinkedIn →
            </a>
            <a href={p.instagram} target="_blank" rel="noopener noreferrer" className="amaury-cta amaury-cta--ghost">
              Instagram @amaury.amed
            </a>
            <a href={`mailto:${p.email}`} className="amaury-cta amaury-cta--ghost">
              Escribirme
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Quién soy */}
        <section className="amaury-section amaury-section--intro">
          <p className="eyebrow text-colab-yellow">{p.roleLine}</p>
          <h2 className="amaury-section__h">
            El cacao necesita traductores.
            <br />
            <span>Yo soy uno.</span>
          </h2>
          <p className="amaury-section__body">{p.lede}</p>
          <p className="amaury-section__meta">{p.location}</p>
        </section>

        {/* Tres verticales — no cards de dashboard; franjas tipográficas */}
        <section className="amaury-pillars" aria-label="Cacaotier, Chocolatier, Colab">
          {p.pillars.map((pillar, index) => (
            <article key={pillar.kicker} className="amaury-pillar" style={{ animationDelay: `${0.08 * index}s` }}>
              <span>{pillar.kicker}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </section>

        {/* Callebaut — oportunidad */}
        <section className="amaury-callebaut">
          {craft && (
            <div className="amaury-callebaut__media">
              <Image src={craft.src} alt={craft.alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 48vw" />
            </div>
          )}
          <div className="amaury-callebaut__copy">
            <p className="eyebrow text-[#E8C9A0]">{p.callebaut.eyebrow}</p>
            <h2 className="amaury-section__h amaury-section__h--tight">{p.callebaut.title}</h2>
            <p className="amaury-section__body">{p.callebaut.body}</p>
            <p className="amaury-callebaut__ask">{p.callebaut.ask}</p>
            <div className="amaury-hero__ctas mt-8">
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="amaury-cta amaury-cta--primary">
                Conectar en LinkedIn
              </a>
              <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" className="amaury-cta amaury-cta--ghost">
                WhatsApp directo
              </a>
            </div>
          </div>
        </section>

        {/* Prueba / trayectoria */}
        <section className="amaury-section amaury-section--proof">
          <p className="eyebrow text-colab-yellow">Trayectoria que respalda el oficio</p>
          <h2 className="amaury-section__h">
            De la cocina al sistema.
            <br />
            <span>Sin soltar el cacao.</span>
          </h2>
          <ul className="amaury-proof">
            {p.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="amaury-links">
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/amauryamed
            </a>
            <a href={p.instagram} target="_blank" rel="noopener noreferrer">
              instagram.com/amaury.amed
            </a>
            <a href={p.brandSite} target="_blank" rel="noopener noreferrer">
              cauacolombia.co
            </a>
            <Link href="/aprende/cacaotier">Master Cacaotier →</Link>
            <Link href="/aprende/chocolatier">Master Chocolatier →</Link>
            <Link href="/">Entrar al Colab →</Link>
          </div>
        </section>
      </main>
    </div>
  )
}
