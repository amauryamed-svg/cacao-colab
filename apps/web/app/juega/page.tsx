import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import CacaoGotchiLab from "@/components/gamify/CacaoGotchiLab"

export const metadata: Metadata = {
  title: "Cacao Gotchi · Laboratorio virtual",
  description: "Cuida una labranza virtual, aprende siembra y cosecha y gana Mazorcas Doradas tomando decisiones.",
}

const gameLoops = [
  { icon: "◌", title: "Cuida", body: "Agua, sombra, suelo y vitalidad cambian con tus decisiones." },
  { icon: "◎", title: "Observa", body: "Registrar antes de intervenir aumenta tu conocimiento del lote." },
  { icon: "◆", title: "Cosecha", body: "La madurez desbloquea un lote trazable para el laboratorio." },
  { icon: "↗", title: "Conecta", body: "Comparte evidencia y abre oportunidades dentro del Colab." },
]

export const dynamic = "force-dynamic"

export default async function JuegaPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/juega")

  const { data: saved } = await supabase
    .from("gotchi_runs")
    .select("state")
    .eq("profile_id", user.id)
    .eq("slot", 1)
    .maybeSingle()

  return (
    <div className="min-h-screen bg-colab-forest">
      <header className="game-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="eyebrow text-colab-yellow">Laboratorio virtual · versión alpha</p>
          <div className="grid lg:grid-cols-[1fr_.62fr] gap-10 items-end mt-4">
            <div>
              <h1 className="display-title text-colab-cream">Cuida el cacao.<br /><em>Entrena tu criterio.</em></h1>
              <p className="text-colab-cream/55 max-w-2xl mt-7 leading-relaxed">
                Cacao Gotchi convierte siembra, cuidado y cosecha en una campaña generacional.
                Tu labranza evoluciona por hora; el conocimiento y las Mazorcas Doradas reconocen decisiones trazables.
              </p>
            </div>
            <div className="flex lg:justify-end gap-3">
              <Link href="/aprende/cacaotier" className="bg-colab-yellow text-colab-forest rounded-full px-6 py-3 text-xs font-bold">
                Ir a Master Cacaotier →
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
              <div className="flex justify-between"><span className="text-2xl text-colab-yellow">{loop.icon}</span><small className="text-colab-cream/20">0{index + 1}</small></div>
              <h2 className="font-serif text-xl font-bold text-colab-cream mt-8">{loop.title}</h2>
              <p className="text-xs leading-relaxed text-colab-cream/45 mt-2">{loop.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 bg-colab-yellow rounded-3xl p-8 md:p-12 grid lg:grid-cols-[1fr_.75fr] gap-8 items-center">
          <div>
            <p className="eyebrow text-colab-forest/55">Del juego al lote real</p>
            <h2 className="font-serif text-4xl font-black text-colab-forest mt-3">Tu próxima misión ocurre en campo.</h2>
          </div>
          <p className="text-sm leading-relaxed text-colab-forest/65">
            El campus intenta sincronizar cada decisión con tu cuenta y conserva una copia local para resiliencia.
            El crecimiento horario es una simulación comprimida; no representa una predicción agronómica.
          </p>
        </section>
      </main>
    </div>
  )
}
