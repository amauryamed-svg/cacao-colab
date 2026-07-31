import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { buildFollowupAdvice } from "@/lib/followup-advice"
import { loadLearnerFollowupSnapshot } from "@/lib/followup-sync"
import MazorcaSVG from "@/components/atmosphere/MazorcaSVG"

export const metadata: Metadata = {
  title: "Consejo de avance · Mazorcas y Sembrar",
  description:
    "Tu ritmo de Mazorcas Doradas y el estado de Sembrar como brújula: estudiar y practicar en repetición.",
}

export const dynamic = "force-dynamic"

export default async function ConsejoPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/cuenta/consejo")

  const snap = await loadLearnerFollowupSnapshot(user.id)
  if (!snap) {
    return (
      <div className="min-h-screen bg-colab-cream px-4 py-16">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-colab-forest">Aún no hay snapshot</h1>
          <p className="mt-4 text-sm text-colab-forest/60">
            Completa un módulo Dualita o abre Sembrar para generar tu consejo de avance.
          </p>
          <Link href="/aprende" className="inline-block mt-8 text-sm font-bold text-colab-green">
            Ir al campus →
          </Link>
        </div>
      </div>
    )
  }

  const advice = buildFollowupAdvice(snap)

  return (
    <div className="min-h-screen bg-[#140e0a] text-colab-cream">
      <header className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(255,106,61,.2), transparent 40%), radial-gradient(circle at 10% 80%, rgba(242,200,48,.12), transparent 35%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <Link href="/cuenta" className="eyebrow text-colab-champagne/50 hover:text-colab-yellow">
            ← Mi cuenta
          </Link>
          <p className="eyebrow text-colab-coral mt-6">Consejo de avance · consistencia</p>
          <h1 className="font-serif font-black mt-4 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            {advice.headline}
          </h1>
          <p className="mt-5 text-colab-cream/65 max-w-xl leading-relaxed">{advice.principle}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <section className="rounded-2xl border border-[#E8C9A0]/20 bg-white/[.04] p-6 flex gap-4 items-start">
          <MazorcaSVG tone="yellow" size={48} />
          <div>
            <p className="eyebrow text-colab-yellow">Mazorcas Doradas</p>
            <p className="mt-3 text-sm leading-relaxed text-colab-cream/75">{advice.mdSummary}</p>
            <p className="mt-2 text-xs text-colab-champagne/70">
              Rango <strong className="text-colab-coral">{advice.rankName}</strong>
              {advice.rankNext && advice.mdToNext != null
                ? ` · faltan ${advice.mdToNext} MD para ${advice.rankNext}`
                : null}
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-3">
          {[
            { k: "Estudiar", t: advice.studyTip, tone: "yellow" as const },
            { k: "Practicar", t: advice.practiceTip, tone: "coral" as const },
            { k: "Sembrar", t: advice.sembrarTip, tone: "pod" as const },
          ].map((card) => (
            <article
              key={card.k}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-5"
            >
              <div className="flex justify-between items-start">
                <p className="eyebrow text-colab-cream/40">{card.k}</p>
                <MazorcaSVG tone={card.tone} size={28} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-colab-cream/70">{card.t}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl bg-colab-yellow text-colab-forest p-6 md:p-8">
          <p className="eyebrow opacity-55">Ritual corto</p>
          <h2 className="font-serif text-2xl font-black mt-2">Hoy: un módulo + un cuidado</h2>
          <p className="text-sm opacity-70 mt-3 max-w-lg leading-relaxed">
            Dualita {snap.microCompleted}/{snap.microTotal} · Sembrar {snap.sembrar.stageName}
            {snap.sembrar.genotypeCode ? ` · ${snap.sembrar.genotypeCode}` : ""}
            {snap.sembrar.bitacoraCount > 0 ? ` · ${snap.sembrar.bitacoraCount} bitácoras` : ""}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href={snap.microCompleted < snap.microTotal ? "/aprende" : "/aprende/cacaotier"}
              className="bg-colab-forest text-colab-yellow rounded-full px-6 py-3 text-sm font-bold"
            >
              {advice.ctaPrimary.label}
            </Link>
            <Link
              href="/juega"
              className="border border-colab-forest/30 rounded-full px-6 py-3 text-sm font-bold"
            >
              {advice.ctaSecondary.label}
            </Link>
            <Link href="/cuenta/mazorcas" className="text-sm font-bold underline self-center">
              Wallet MD
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
