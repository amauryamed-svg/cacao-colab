import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import CacaoGotchiLab from "@/components/gamify/CacaoGotchiLab"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "Sembrar · Ecoyuma × Cacao Colab",
  description:
    "Laboratorio de siembra para quien recién empieza: plántulas Ecoyuma, bitácoras, cartografía social, agroforestería comunitaria y fermentación con evidencia.",
}

const gameLoops = [
  { icon: "◌", title: "Plántula Ecoyuma", body: "FEAR 5, TCS 19 y TCS 06: elige material real del vivero." },
  { icon: "◎", title: "Bitácora", body: "Observa, fecha y decide — el oficio del agricultor con tipicidad." },
  { icon: "▣", title: "Cartografía", body: "Parcelas, agua, sombra y mapa social de la finca." },
  { icon: "↗", title: "Colectivo", body: "Diseña legado y entra al Colab con tu generación." },
]

export const dynamic = "force-dynamic"

export default async function JuegaPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/juega")

  const { data: saved } = await supabase
    .from("gotchi_runs")
    .select("state")
    .eq("profile_id", user.id)
    .eq("slot", 1)
    .maybeSingle()

  return (
    <div className="min-h-screen bg-colab-forest">
      <header className="game-hero relative overflow-hidden">
        <AtmospherePlane src={shotById("ecoyuma-fear5").src} alt={shotById("ecoyuma-fear5").alt} overlay="forest" />
        <FloatingPods variant="stage" />
        <div className="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="eyebrow text-colab-yellow">Sembrar · vivero Ecoyuma × aceleración Colab</p>
          <div className="grid lg:grid-cols-[1fr_.62fr] gap-10 items-end mt-4">
            <div>
              <h1 className="display-title text-colab-cream">
                Siembra el cacao
                <br />
                <em>de tu finca idónea.</em>
              </h1>
              <p className="text-colab-cream/55 max-w-2xl mt-7 leading-relaxed">
                Sembrar es el laboratorio para quien recién empieza: plántulas Ecoyuma, bitácoras de
                campo, planeación, cartografía social y modelos de agroforestería comunitaria. Tu
                labranza evoluciona por hora; el criterio y las Mazorcas reconocen decisiones
                trazables — y te invitan a competir en colectivo con Cacao Colab.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3">
              <Link
                href="/conocimiento/fear5-ecoyuma"
                className="bg-colab-yellow text-colab-forest rounded-full px-6 py-3 text-xs font-bold text-center"
              >
                Plántulas FEAR 5 · Ecoyuma →
              </Link>
              <Link
                href="/aprende/cacaotier"
                className="border border-white/20 text-colab-cream rounded-full px-6 py-3 text-xs font-bold text-center"
              >
                Master Cacaotier
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <CacaoGotchiLab initialRemoteState={saved?.state} />

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-16">
          {gameLoops.map((loop, index) => (
            <article key={loop.title} className="bg-white/[.04] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between">
                <span className="text-2xl text-colab-yellow">{loop.icon}</span>
                <small className="text-colab-cream/20">0{index + 1}</small>
              </div>
              <h2 className="font-serif text-xl font-bold text-colab-cream mt-8">{loop.title}</h2>
              <p className="text-xs leading-relaxed text-colab-cream/45 mt-2">{loop.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 bg-colab-yellow rounded-3xl p-8 md:p-12 grid lg:grid-cols-[1fr_.75fr] gap-8 items-center">
          <div>
            <p className="eyebrow text-colab-forest/55">Del laboratorio al lote real</p>
            <h2 className="font-serif text-4xl font-black text-colab-forest mt-3">
              Tu próxima misión ocurre en campo — y en colectivo.
            </h2>
          </div>
          <div className="text-sm leading-relaxed text-colab-forest/65 space-y-4">
            <p>
              El crecimiento horario es simulación comprimida, no predicción agronómica. Las
              plántulas y precios viven en Ecoyuma; aquí entrenas criterio, bitácora y mapa.
            </p>
            <Link href="/unete" className="inline-block font-bold text-colab-forest underline">
              Únete al colectivo Cacao Colab →
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
