import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { communityRanks, nextRank, resolveRank } from "@/lib/loyalty"

export const metadata = { title: "Mazorcas Doradas · Mi wallet", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"

const reasonLabels: Record<string, string> = {
  campus_mission_complete: "Misión Master Cacaotier",
  gotchi_care: "Cuidado de la labranza",
  gotchi_harvest_fermented: "Cosecha y fermentación completadas",
  lesson_completed: "Microlearning completado",
}

export default async function MazorcasPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/cuenta/mazorcas")

  const [{ data: wallet, error: walletError }, { data: ledger }] = await Promise.all([
    supabase.from("mazorca_wallets").select("*").eq("profile_id", user.id).maybeSingle(),
    supabase.from("mazorca_ledger").select("*").eq("profile_id", user.id).order("created_at", { ascending: false }).limit(30),
  ])
  const balance = wallet?.balance ?? 0
  const lifetime = wallet?.lifetime_earned ?? 0
  const rank = resolveRank(lifetime)
  const upcoming = nextRank(lifetime)
  const progress = upcoming
    ? Math.round(((lifetime - rank.threshold) / (upcoming.threshold - rank.threshold)) * 100)
    : 100

  return (
    <div className="min-h-screen bg-[#101d0b] px-4 py-14">
      <main className="max-w-6xl mx-auto">
        <Link href="/cuenta" className="eyebrow text-colab-cream/40">← Mi cuenta</Link>
        <div className="loyalty-hero mt-8">
          <div>
            <p className="eyebrow text-colab-yellow">Wallet de fidelidad · Cacao Colab</p>
            <h1>Mazorcas<br /><em>Doradas</em></h1>
            <p>Aprende, cuida y aporta a la comunidad. Los puntos no son dinero ni se ganan reclutando personas.</p>
          </div>
          <div className="golden-balance">
            <span>Saldo disponible</span>
            <strong>{balance.toLocaleString("es-CO")}</strong>
            <small>MD · {lifetime.toLocaleString("es-CO")} históricas</small>
          </div>
        </div>

        {walletError && (
          <div className="loyalty-config-warning">
            El wallet está listo en código, pero la migración 0014 aún no está aplicada. Se muestra saldo cero sin inventar movimientos.
          </div>
        )}

        <section className="grid lg:grid-cols-[.7fr_1.3fr] gap-4 mt-5">
          <article className="rank-card">
            <span className="rank-icon">{rank.icon}</span>
            <p className="eyebrow text-colab-yellow">Rango comunitario</p>
            <h2>{rank.name}</h2>
            <p>{rank.benefit}</p>
            <div className="rank-progress"><i style={{ width: `${progress}%` }} /></div>
            <small>{upcoming ? `${upcoming.threshold - lifetime} MD para ${upcoming.name}` : "Rango máximo alcanzado"}</small>
          </article>
          <article className="loyalty-ledger">
            <div className="flex items-center justify-between">
              <div><p className="eyebrow text-colab-green">Ledger auditable</p><h2>Movimientos recientes</h2></div>
              <Link href="/marketplace/beneficios">Ver beneficios →</Link>
            </div>
            {ledger?.length ? (
              <ul>
                {ledger.map((entry) => (
                  <li key={entry.id}>
                    <span className={entry.amount > 0 ? "credit" : "debit"}>{entry.amount > 0 ? "+" : ""}{entry.amount}</span>
                    <span><strong>{reasonLabels[entry.reason_code] ?? entry.reason_code}</strong><small>{entry.category} · {new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(entry.created_at))}</small></span>
                  </li>
                ))}
              </ul>
            ) : <div className="loyalty-empty">Completa una misión o cuida tu labranza para ganar tus primeras Mazorcas Doradas.</div>}
          </article>
        </section>

        <section className="rank-road mt-5">
          {communityRanks.map((item) => (
            <div key={item.slug} className={lifetime >= item.threshold ? "reached" : ""}>
              <span>{item.icon}</span><strong>{item.name}</strong><small>{item.threshold} MD</small>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
