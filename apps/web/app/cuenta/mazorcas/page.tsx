import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  courseSlugFromPayload,
  resolveBenefitUse,
  serviceFromPayload,
  slugFromPayload,
} from "@/lib/benefit-use"
import { communityRanks, mdBuyPacks, nextRank, resolveRank, scorecardConfig } from "@/lib/loyalty"
import BuyPackButtons from "@/components/loyalty/BuyPackButtons"
import ScorecardPanel from "@/components/loyalty/ScorecardPanel"

export const metadata = { title: "Mazorcas Doradas · Mi wallet", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"

const reasonLabels: Record<string, string> = {
  campus_mission_complete: "Misión Master Cacaotier",
  campus_course_complete: "Curso Arquitecto de Fermentación completado",
  gotchi_care: "Cuidado de la labranza",
  gotchi_harvest_open: "Cosecha Sembrar · apertura de lote",
  gotchi_harvest_fermented: "Cosecha Sembrar · fermentación cerrada",
  gotchi_perfect_care: "Hito cuidado perfecto · 100 h / 100 %",
  gotchi_decade_plan: "Plan labranza comparativa · 10 años",
  lesson_completed: "Microlearning completado",
  benefit_redemption: "Canje de beneficio",
  scorecard_settlement: "Bono scorecard de productividad",
  pack_purchase: "Pack de Mazorcas Doradas",
}

export default async function MazorcasPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/cuenta/mazorcas")

  const [{ data: wallet, error: walletError }, { data: ledger }, { data: redemptionRows }] =
    await Promise.all([
      supabase.from("mazorca_wallets").select("*").eq("profile_id", user.id).maybeSingle(),
      supabase
        .from("mazorca_ledger")
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30),
      supabase
        .from("benefit_redemptions")
        .select(
          "id,status,cost_md,created_at,fulfillment_payload,benefit_catalog_items(title,slug,metadata)",
        )
        .eq("profile_id", user.id)
        .neq("status", "cancelled")
        .order("created_at", { ascending: false })
        .limit(12),
    ])
  const balance = wallet?.balance ?? 0
  const lifetime = wallet?.lifetime_earned ?? 0
  const rank = resolveRank(lifetime)
  const upcoming = nextRank(lifetime)
  const progress = upcoming
    ? Math.round(((lifetime - rank.threshold) / (upcoming.threshold - rank.threshold)) * 100)
    : 100

  const redemptions = (redemptionRows ?? []).map((row) => {
    const catalog = Array.isArray(row.benefit_catalog_items)
      ? row.benefit_catalog_items[0]
      : row.benefit_catalog_items
    const catalogMeta = (catalog?.metadata ?? {}) as { course_slug?: string; service?: string }
    const courseSlug =
      courseSlugFromPayload(row.fulfillment_payload) ?? catalogMeta.course_slug ?? null
    const service = serviceFromPayload(row.fulfillment_payload) ?? catalogMeta.service ?? null
    const slug =
      slugFromPayload(row.fulfillment_payload) ??
      (typeof catalog?.slug === "string" ? catalog.slug : "")
    const title =
      typeof catalog?.title === "string" && catalog.title
        ? catalog.title
        : slug || "Beneficio Colab"
    return {
      id: row.id,
      title,
      costMd: row.cost_md,
      status: row.status,
      createdAt: row.created_at,
      use: resolveBenefitUse({ courseSlug, service, slug }),
    }
  })

  return (
    <div className="min-h-screen bg-[#101d0b] px-4 py-14">
      <main className="max-w-6xl mx-auto">
        <Link href="/cuenta" className="eyebrow text-colab-cream/40">← Mi cuenta</Link>
        <div className="loyalty-hero mt-8">
          <div>
            <p className="eyebrow text-colab-yellow">Wallet · fintech gamificada de cacao</p>
            <h1>Mazorcas<br /><em>Doradas</em></h1>
            <p>
              La actividad propia da un empujón con topes diarios; los packs financian canjes con costo real.
              El XP apalanca un bono semanal modesto de productividad. Sin multinivel ni conversión a efectivo.
            </p>
          </div>
          <div className="golden-balance">
            <span>Saldo disponible</span>
            <strong>{balance.toLocaleString("es-CO")}</strong>
            <small>MD · {lifetime.toLocaleString("es-CO")} históricas (sin packs)</small>
          </div>
        </div>

        {walletError && (
          <div className="loyalty-config-warning">
            El wallet está listo en código, pero la migración de fidelidad aún no está aplicada. Se muestra saldo cero sin inventar movimientos.
          </div>
        )}

        <section className="economy-flow mt-5">
          <article>
            <span>1</span>
            <h3>Ganar</h3>
            <p>MD modestas por misión/cuidado, con tope diario (learning 20 · care 10).</p>
          </article>
          <article>
            <span>2</span>
            <h3>Comprar</h3>
            <p>Packs financian sinks; no inflan el rango ni sustituyen el oficio.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Apalancar</h3>
            <p>XP y maestría multiplican un bono scorecard semanal con techo bajo.</p>
          </article>
          <article>
            <span>4</span>
            <h3>Canjear</h3>
            <p>
              Aceleraciones y mentoría en{" "}
              <Link href="/marketplace/beneficios">beneficios</Link> — el grind no cubre el catálogo.
            </p>
          </article>
        </section>

        {redemptions.length > 0 && (
          <section className="loyalty-canjes mt-5" aria-labelledby="loyalty-canjes-title">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="eyebrow text-colab-yellow">Canjes activos</p>
                <h2 id="loyalty-canjes-title">Cómo aprovechar lo que canjeaste</h2>
              </div>
              <Link href="/cuenta">Ir a Mi cuenta →</Link>
            </div>
            <ul>
              {redemptions.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      −{item.costMd.toLocaleString("es-CO")} MD · {item.status === "issued" ? "emitido" : item.status} ·{" "}
                      {new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(
                        new Date(item.createdAt),
                      )}
                    </small>
                    {item.use && <p>{item.use.howTo}</p>}
                  </div>
                  {item.use && (
                    <Link href={item.use.href} className="loyalty-canjes-cta">
                      {item.use.cta} →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="grid lg:grid-cols-[.7fr_1.3fr] gap-4 mt-5">
          <article className="rank-card">
            <span className="rank-icon">{rank.icon}</span>
            <p className="eyebrow text-colab-yellow">Rango comunitario</p>
            <h2>{rank.name}</h2>
            <p>{rank.benefit}</p>
            <div className="rank-progress"><i style={{ width: `${progress}%` }} /></div>
            <small>{upcoming ? `${upcoming.threshold - lifetime} MD para ${upcoming.name}` : "Rango máximo alcanzado"}</small>
            <p className="rank-ceiling">
              Techo scorecard: {scorecardConfig.weeklyCeilingByRank[rank.slug]} MD / semana
            </p>
          </article>
          <article className="loyalty-ledger">
            <div className="flex items-center justify-between">
              <div><p className="eyebrow text-colab-green">Ledger auditable</p><h2>Movimientos recientes</h2></div>
              <Link href="/marketplace/beneficios">Ver beneficios →</Link>
            </div>
            {ledger?.length ? (
              <ul>
                {ledger.map((entry) => {
                  const meta = (entry.metadata ?? {}) as {
                    title?: unknown
                    slug?: unknown
                    course_slug?: unknown
                  }
                  const metaTitle = typeof meta.title === "string" ? meta.title : null
                  const label =
                    entry.reason_code === "benefit_redemption" && metaTitle
                      ? `Canje · ${metaTitle}`
                      : (reasonLabels[entry.reason_code] ?? entry.reason_code)
                  const use =
                    entry.reason_code === "benefit_redemption"
                      ? resolveBenefitUse({
                          slug: typeof meta.slug === "string" ? meta.slug : null,
                          courseSlug:
                            typeof meta.course_slug === "string" ? meta.course_slug : null,
                        })
                      : null
                  return (
                    <li key={entry.id}>
                      <span className={entry.amount > 0 ? "credit" : "debit"}>
                        {entry.amount > 0 ? "+" : ""}
                        {entry.amount}
                      </span>
                      <span>
                        <strong>{label}</strong>
                        <small>
                          {entry.category} ·{" "}
                          {new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(
                            new Date(entry.created_at),
                          )}
                          {use ? (
                            <>
                              {" · "}
                              <Link href={use.href}>{use.cta}</Link>
                            </>
                          ) : null}
                        </small>
                      </span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="loyalty-empty">
                Completa una misión o cuida tu labranza para ganar tus primeras Mazorcas Doradas.
              </div>
            )}
          </article>
        </section>

        <div id="scorecard" className="mt-5">
          <ScorecardPanel />
        </div>

        <div className="mt-5">
          <BuyPackButtons packs={mdBuyPacks} />
        </div>

        <section className="rank-road mt-5">
          {communityRanks.map((item) => (
            <div key={item.slug} className={lifetime >= item.threshold ? "reached" : ""}>
              <span>{item.icon}</span><strong>{item.name}</strong><small>{item.threshold} MD</small>
            </div>
          ))}
        </section>

        <section className="anti-pyramid-note economy-anti mt-8">
          <strong>Bonificación por productividad, no por red.</strong>
          <p>
            El scorecard mide tu equilibrio BSC (aprendizaje, cuidado, comunidad, comercio verificado).
            El rol solo cambia pesos. El XP apalanca hasta ×{scorecardConfig.xpLeverageMax}. No hay downline,
            ni comisión por invitados, ni conversión a efectivo.
          </p>
        </section>
      </main>
    </div>
  )
}
