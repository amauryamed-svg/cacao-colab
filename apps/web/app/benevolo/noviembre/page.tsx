import type { Metadata } from "next"
import { Bodoni_Moda } from "next/font/google"
import TrackedLink from "@/components/analytics/TrackedLink"
import BenevoloLaunchCountdown from "@/components/benevolo/BenevoloLaunchCountdown"
import { BenevoloShopifyCheckout } from "@/components/commerce/BenevoloShopifyCheckout"
import BenevoloCaptionCopy from "@/components/benevolo/BenevoloCaptionCopy"
import BenevoloIgFrame from "@/components/benevolo/BenevoloIgFrame"
import {
  BENEVOLO_INSTAGRAM_HANDLE,
  BENEVOLO_INSTAGRAM_URL,
  benevolo360,
  benevoloIgFeedPath,
  benevoloIgPngPath,
  benevoloIgStoryPath,
  benevoloInstagram,
  benevoloLaunchCopy,
  benevoloPress,
} from "@/lib/benevolo-launch"

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "900"],
  display: "swap",
  variable: "--font-bodoni-bars",
})

export const metadata: Metadata = {
  title: "Noviembre · Chocolate Benevolo",
  description:
    "Prelanzamiento Benevolo: Bars. en noviembre, preventa ahora. Nota Infonegocios Colombia. Comunidad @chocolate.benevolo.",
  openGraph: {
    title: "Noviembre · Chocolate Benevolo",
    description:
      "Cuenta atrás al lanzamiento previsto para noviembre. Preventa Shopify + Instagram @chocolate.benevolo.",
  },
}

export default function BenevoloNoviembrePage() {
  return (
    <div className={`${bodoni.variable} bg-[#140e0a] min-h-screen text-colab-cream`}>
      <header className="benevolo-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-16">
          <TrackedLink
            href="/benevolo"
            event="benevolo_interest"
            targetName="noviembre-back-product"
            source="noviembre-hero"
            className="eyebrow text-[#E8C9A0]/40 hover:text-[#FF6A3D]"
          >
            ← Chocolate Benevolo
          </TrackedLink>
          <p className="eyebrow text-[#FF6A3D] mt-5">{benevoloLaunchCopy.kicker}</p>
          <h1 className="benevolo-bars-wordmark mt-4">Bars.</h1>
          <p className="mt-2 text-[11px] font-bold tracking-[0.28em] uppercase text-[#E8C9A0]">
            Chocolate Benevolo · {benevoloLaunchCopy.headline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
            {benevoloLaunchCopy.subhead}
          </p>
          <div className="mt-10 max-w-xl">
            <BenevoloLaunchCountdown />
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <TrackedLink
              href="/benevolo#preorden"
              event="benevolo_interest"
              targetName="noviembre-preorden"
              source="noviembre-hero"
              className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Preordenar Bars. →
            </TrackedLink>
            <TrackedLink
              href={BENEVOLO_INSTAGRAM_URL}
              event="benevolo_interest"
              targetName="noviembre-instagram"
              source="noviembre-hero"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold text-white/80"
            >
              @{BENEVOLO_INSTAGRAM_HANDLE}
            </TrackedLink>
            <TrackedLink
              href="#comunidad"
              event="benevolo_interest"
              targetName="noviembre-guion"
              source="noviembre-hero"
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold text-white/80"
            >
              Guion IG →
            </TrackedLink>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <blockquote className="benevolo-quote">
          <p>“{benevoloLaunchCopy.quote}”</p>
          <cite>{benevoloLaunchCopy.quoteAttr}</cite>
        </blockquote>

        <section className="mt-16">
          <p className="eyebrow text-[#E8C9A0]">360 · prelanzamiento</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">
            Producto, comunidad, lote y oficio.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {benevolo360.map((item) => (
              <article key={item.id} className="benevolo-claim">
                <span>{item.kicker}</span>
                <strong>{item.title}</strong>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">{item.body}</p>
                {item.external ? (
                  <TrackedLink
                    href={item.href}
                    event="benevolo_interest"
                    targetName={`noviembre-360-${item.id}`}
                    source="noviembre-360"
                    external
                    className="inline-block mt-4 text-sm font-bold text-[#FF6A3D]"
                  >
                    {item.cta} →
                  </TrackedLink>
                ) : (
                  <TrackedLink
                    href={item.href}
                    event="benevolo_interest"
                    targetName={`noviembre-360-${item.id}`}
                    source="noviembre-360"
                    className="inline-block mt-4 text-sm font-bold text-[#FF6A3D]"
                  >
                    {item.cta} →
                  </TrackedLink>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow text-[#FF6A3D]">Lo que dijo la nota</p>
            <h2 className="font-serif text-3xl font-bold mt-3">Origen, no pretensión.</h2>
            <p className="text-white/55 leading-relaxed mt-5">{benevoloLaunchCopy.fear5}</p>
            <p className="text-white/55 leading-relaxed mt-4">{benevoloLaunchCopy.fermentation}</p>
            <p className="text-white/40 leading-relaxed mt-4 text-sm">{benevoloLaunchCopy.lines.bars}</p>
            <p className="text-white/40 leading-relaxed mt-2 text-sm">{benevoloLaunchCopy.lines.bons}</p>
            <p className="text-white/40 leading-relaxed mt-4 text-sm">{benevoloLaunchCopy.scale}</p>
          </div>
          <aside className="benevolo-press">
            <p className="eyebrow text-[#E8C9A0]">Prensa</p>
            <h3 className="font-serif text-2xl font-bold mt-3">{benevoloPress.outlet}</h3>
            <p className="text-white/55 text-sm leading-relaxed mt-3">{benevoloPress.title}</p>
            <p className="text-white/35 text-xs mt-3">
              Primera apuesta: {benevoloPress.firstMarket}. Ventana: {benevoloPress.launchedWindow}.
            </p>
            <TrackedLink
              href={benevoloPress.url}
              event="knowledge_link_clicked"
              targetName="infonegocios-benevolo"
              source="noviembre-press"
              external
              className="inline-block mt-5 text-sm font-bold text-[#FF6A3D]"
            >
              Leer la nota →
            </TrackedLink>
          </aside>
        </section>

        <section id="comunidad" className="scroll-mt-20 mt-16">
          <p className="eyebrow text-[#FF6A3D]">Comunidad · @{benevoloInstagram.handle}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">
            El 360 sale de la nota.
          </h2>
          <p className="mt-4 max-w-2xl text-white/55 leading-relaxed">
            Misma historia que Infonegocios, en voz de prelanzamiento para Instagram. Link in bio:{" "}
            {benevoloInstagram.linkInBio.replace("https://", "")}. {benevoloInstagram.outletNote}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <TrackedLink
              href={benevoloInstagram.url}
              event="benevolo_interest"
              targetName="noviembre-ig-follow"
              source="noviembre-comunidad"
              external
              className="bg-[#FF6A3D] text-[#140e0a] rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Seguir @{benevoloInstagram.handle} →
            </TrackedLink>
            <TrackedLink
              href={benevoloPress.url}
              event="knowledge_link_clicked"
              targetName="infonegocios-benevolo"
              source="noviembre-comunidad"
              external
              className="border border-white/20 rounded-full px-7 py-3.5 text-sm font-bold text-white/80"
            >
              Abrir Infonegocios
            </TrackedLink>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-10">
            <article className="benevolo-ig-bio">
              <p className="eyebrow text-[#E8C9A0]">Bio</p>
              <pre>{benevoloInstagram.bio}</pre>
            </article>
            <article>
              <p className="eyebrow text-[#E8C9A0]">Highlights</p>
              <ul className="benevolo-ig-highlights mt-4">
                {benevoloInstagram.highlights.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <ol className="benevolo-ig-week mt-10">
            {benevoloInstagram.calendar.map((beat) => {
              const post = benevoloInstagram.posts.find((item) => item.id === beat.postId)
              return (
                <li key={beat.postId}>
                  <span>{beat.when}</span>
                  <strong>{post?.title}</strong>
                  <em>{beat.channel}</em>
                </li>
              )
            })}
          </ol>

          <div className="benevolo-ig-grid mt-10">
            {benevoloInstagram.posts.map((post) => (
              <article key={post.id} id={`ig-${post.id}`} className="benevolo-ig-card">
                <BenevoloIgFrame frame={post.frame} />
                <span className="mt-5">{post.format}</span>
                <strong>{post.title}</strong>
                <p>{post.hook}</p>
                <pre className="benevolo-ig-caption">{post.caption}</pre>
                <BenevoloCaptionCopy text={post.caption} />
                <a
                  href={benevoloIgPngPath(post.id)}
                  download
                  className="inline-block mt-3 mr-4 text-sm font-bold text-[#FF6A3D]"
                >
                  PNG 1:1
                </a>
                <TrackedLink
                  href={benevoloIgFeedPath(post.id)}
                  event="benevolo_interest"
                  targetName={`noviembre-ig-frame-${post.id}`}
                  source="noviembre-comunidad"
                  className="inline-block mt-3 mr-4 text-sm font-bold text-[#FF6A3D]"
                >
                  HTML →
                </TrackedLink>
                {post.id === "noviembre" ? (
                  <>
                    <a
                      href="/benevolo/ig/noviembre-story.png"
                      download
                      className="inline-block mt-3 mr-4 text-sm font-bold text-[#FF6A3D]"
                    >
                      Story PNG
                    </a>
                    <TrackedLink
                      href={benevoloIgStoryPath()}
                      event="benevolo_interest"
                      targetName="noviembre-ig-story"
                      source="noviembre-comunidad"
                      className="inline-block mt-3 text-sm font-bold text-[#FF6A3D]"
                    >
                      Story HTML →
                    </TrackedLink>
                  </>
                ) : null}
              </article>
            ))}
          </div>

          <div className="benevolo-panel muted mt-10">
            <p className="eyebrow text-white/35">Reglas del 360</p>
            <ul>
              {benevoloInstagram.rules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="preorden" className="mt-16">
          <p className="eyebrow text-[#FF6A3D]">Preorden</p>
          <h2 className="font-serif text-3xl font-bold mt-3">Reservar el antojo.</h2>
          <div className="mt-8">
            <BenevoloShopifyCheckout source="noviembre-preorden" />
          </div>
        </section>

        <section className="mt-16 benevolo-panel muted">
          <p className="eyebrow text-white/35">Aún no afirmamos</p>
          <ul>
            {benevoloLaunchCopy.honesty.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
