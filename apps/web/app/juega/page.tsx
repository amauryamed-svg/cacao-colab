import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import CacaoGotchiLab from "@/components/gamify/CacaoGotchiLab"
import AtmospherePlane from "@/components/atmosphere/AtmospherePlane"
import FloatingPods from "@/components/atmosphere/FloatingPods"
import { shotById } from "@/lib/atmosphere"

export const metadata: Metadata = {
  title: "Sembrar · modelo araucano × Ecoyuma",
  description:
    "Laboratorio de siembra del modelo araucano (FEAR 5 · FTA 2 · FSA 13), catálogo Ecoyuma, bitácoras, cartografía social y fermentación con evidencia — sin inventar DO ni stock.",
}

const gameLoops = [
  { icon: "◌", title: "Modelo araucano", body: "FEAR 5 · Tame 2 · Saravena 13: tipicidad cerca del debate DO." },
  { icon: "◎", title: "Ecoyuma", body: "FEAR 5, TCS 19 y TCS 06: catálogo externo, sin stock inventado." },
  { icon: "▣", title: "Bitácora + mapa", body: "Observa, fecha y traza parcelas, agua y vecinos." },
  { icon: "↗", title: "Cosecha MD", body: "Al cerrar fermentación recolectas más Mazorcas Doradas." },
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
          <p className="eyebrow text-colab-yellow">Sembrar · modelo araucano × Ecoyuma × Colab</p>
          <div className="grid lg:grid-cols-[1fr_.62fr] gap-10 items-end mt-4">
            <div>
              <h1 className="display-title text-colab-cream">
                Siembra el cacao
                <br />
                <em>araucano con criterio.</em>
              </h1>
              <p className="text-colab-cream/55 max-w-2xl mt-7 leading-relaxed">
                Laboratorio del modelo araucano (FEAR 5 · FTA 2 · FSA 13), cercano al debate de
                denominación de origen frente a «Cacao de la Orinoquía». Catálogo Ecoyuma para
                comprar FEAR 5 y contrastar con TCS — sin inventar stock ni DO. Bitácora, cartografía
                y cosecha con más Mazorcas al fermentar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3">
              <Link
                href="/conocimiento/denominacion-origen"
                className="bg-colab-yellow text-colab-forest rounded-full px-6 py-3 text-xs font-bold text-center"
              >
                DO Arauca vs Orinoquía →
              </Link>
              <Link
                href="/conocimiento/fear5-ecoyuma"
                className="border border-white/20 text-colab-cream rounded-full px-6 py-3 text-xs font-bold text-center"
              >
                FEAR 5 · Ecoyuma
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
