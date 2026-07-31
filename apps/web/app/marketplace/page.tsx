import type { Metadata } from "next"
import SectionKicker from "@/components/ui/SectionKicker"
import BrandNetwork from "@/components/marketplace/BrandNetwork"
import DirectoryCard from "@/components/marketplace/DirectoryCard"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import { founderBrands, collaboratorBrands, comingSoonSlots } from "@/lib/brands"
import { directoryCandidates } from "@/lib/directory-candidates"
import { territories } from "@/lib/territories"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "Ecosistema regional · Cacao Colab",
  description: "Nodos de cacao conectados desde cinco regiones de Colombia con cacaotier como epicentro builder.",
}

const WA_MARCA =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20postular%20mi%20marca%20de%20cacao%20al%20marketplace."

export default function MarketplacePage() {
  return (
    <div className="bg-colab-cream min-h-screen">
      <div className="page-hero-photo py-16 md:py-20">
        <AtmospherePlane src={shotById("temper").src} alt="" overlay="forest" priority />
        <FloatingPods variant="stage" />
        <div className="page-hero-photo-inner max-w-6xl mx-auto px-4 sm:px-6">
          <SectionKicker className="mb-4">Mapa vivo · Cacao Colab</SectionKicker>
          <h1
            className="font-serif font-black text-colab-cream leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Tu territorio
            <br />
            <span className="text-colab-yellow">no está solo.</span>
          </h1>
          <p className="text-colab-cream/65 font-sans mt-4 max-w-lg">
            Agricultores, chocolateros, amantes y marcas de cacao conectados por conocimiento,
            evidencia y oportunidades. Conservas tu identidad; construimos capacidad juntos.
          </p>
        </div>
      </div>

      {/* red de nodos — territorios · círculo fundador · colaboradoras + próximamente */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <BrandNetwork
          founders={founderBrands}
          collaborators={collaboratorBrands}
          comingSoonSlots={comingSoonSlots}
          territories={territories}
        />

        <section className="mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">
            <div>
              <SectionKicker className="mb-3 text-colab-green">Encuentra tu entrada</SectionKicker>
              <h2 className="font-serif font-bold text-colab-ink" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                El Colab te habla claro.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-colab-ink/50 max-w-md">
              No todos llegan por la misma necesidad. Elige qué quieres construir y entra por la ruta correcta.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: "♧", title: "Soy agricultor", body: "Quiero mejorar mi lote, documentar calidad y conectar con compradores.", cta: "Entrar al laboratorio", href: "/aprende/cacaotier", color: "#86B66B" },
              { icon: "◆", title: "Soy chocolatier", body: "Quiero encontrar origen, dominar transformación y crear mejores aplicaciones.", cta: "Ver la ruta profesional", href: "/aprende", color: "#B9583B" },
              { icon: "♡", title: "Amo el cacao", body: "Quiero aprender, sembrar, catar y conocer a quienes hacen posible cada chocolate.", cta: "Abrir Sembrar", href: "/juega", color: "#E3A12B" },
              { icon: "↗", title: "Tengo una marca", body: "Quiero abrir un nodo, pautar con transparencia y aportar valor a la comunidad.", cta: "Pautar o postular", href: WA_MARCA, color: "#3D7A2C", external: true },
            ].map((audience) => (
              <article key={audience.title} className="audience-card" style={{ "--audience-color": audience.color } as React.CSSProperties}>
                <span className="audience-icon">{audience.icon}</span>
                <h3>{audience.title}</h3>
                <p>{audience.body}</p>
                <a href={audience.href} target={audience.external ? "_blank" : undefined} rel={audience.external ? "noopener noreferrer" : undefined}>
                  {audience.cta} →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-colab-forest rounded-3xl p-7 md:p-10 grid lg:grid-cols-[.7fr_1.3fr] gap-10">
          <div>
            <SectionKicker className="mb-3">Ownership claro</SectionKicker>
            <h2 className="font-serif text-3xl font-bold text-colab-cream">Tres builders.<br />Un círculo abierto.</h2>
            <p className="text-xs leading-relaxed text-colab-cream/45 mt-4">
              cacaotier y sus Masterclasses son creación de Amaury Amed. Cacao Colab se construye con capacidades complementarias y no reclama propiedad sobre las marcas regionales.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { initials: "AA", name: "Amaury Amed", role: "Product Manager · Builder fundador", focus: "Spec, cacaotier y go-to-market" },
              { initials: "HB", name: "Hellen Bareño", role: "Frontend Lead · Builder fundadora", focus: "Web, móvil y experiencia Dualita" },
              { initials: "OG", name: "Oscar Gamboa", role: "Backend Lead · Builder fundador", focus: "API, Supabase y operación" },
            ].map((builder) => (
              <article key={builder.initials} className="builder-card">
                <span>{builder.initials}</span>
                <h3>{builder.name}</h3>
                <strong>{builder.role}</strong>
                <p>{builder.focus}</p>
              </article>
            ))}
          </div>
        </section>

        {/* directorio — candidatas, no confirmadas, no forman parte del marketplace */}
        <div className="mt-16 border-t border-colab-ink/10 pt-12">
          <SectionKicker className="mb-3 text-colab-ink/40">Radar abierto</SectionKicker>
          <h2 className="font-serif font-bold text-colab-ink mb-3" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)" }}>
            Más marcas para descubrir.
          </h2>
          <p className="text-colab-ink/55 font-sans max-w-2xl mb-8 text-sm leading-relaxed">
            Este directorio es exploratorio. No implica membresía, alianza ni propiedad: identifica actores que podrían aportar al ecosistema y mantiene explícito su estado de contacto.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {directoryCandidates.map((c) => (
              <DirectoryCard key={c.id} candidate={c} />
            ))}
          </div>
        </div>

        {/* criteria */}
        <div className="mt-16 border-t border-colab-ink/10 pt-12">
          <SectionKicker className="mb-4 text-colab-ink/40">Acuerdo de participación</SectionKicker>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Identidad propia", desc: "Tu marca y tu conocimiento siguen siendo tuyos. El Colab amplifica sin absorber." },
              { n: "02", title: "Evidencia", desc: "Origen, procesos y claims deben poder explicarse y verificarse." },
              { n: "03", title: "Reciprocidad", desc: "Cada nodo aprende, comparte o abre una oportunidad real para la red." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-xl p-6">
                <p className="font-serif font-black text-colab-yellow text-4xl leading-none mb-2">{n}</p>
                <h3 className="font-bold text-colab-ink font-sans mb-1">{title}</h3>
                <p className="text-sm text-colab-ink/60 font-sans leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* cta */}
        <div className="mt-12 text-center">
          <a
            href={WA_MARCA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-colab-forest text-colab-cream font-bold text-sm px-8 py-4 rounded-full hover:opacity-90 transition-opacity font-sans"
          >
            Postular mi marca →
          </a>
        </div>
      </div>
    </div>
  )
}
