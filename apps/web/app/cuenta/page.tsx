import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { signOutCampus } from "./actions"
import { loadCuentaHome } from "@/lib/cuenta/home"
import { NODE_KIND_LABEL } from "@/lib/nodo/types"

export const metadata = {
  title: "Mi cuenta · Espacio personal Colab",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

const BIO_STATUS: Record<string, string> = {
  pending: "En revisión",
  published: "Publicada",
  rejected: "Necesita ajustes",
}

const ROLE_LABEL: Record<string, string> = {
  farmer: "Cacaocultor",
  chocolatier: "Chocolatier",
  maquilador: "Transformación",
  buyer: "Comprador",
}

export default async function CuentaPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/cuenta")

  await supabase.rpc("claim_team_membership")
  const { data: teamMember } = await supabase
    .from("team_members")
    .select("access_level")
    .eq("user_id", user.id)
    .maybeSingle()
  if (teamMember?.access_level === "superadmin") redirect("/equipo")

  const home = await loadCuentaHome(
    user.id,
    user.email ?? "",
    typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null,
  )

  const manage = [
    {
      title: "Consejo de avance",
      body: "Ritmo de MD + Sembrar: estudiar y practicar en repetición.",
      href: "/cuenta/consejo",
      cta: "Ver mi ritmo",
    },
    {
      title: "Beneficios MD",
      body: "Canjea cursos, aceleraciones y sinks Colab activos.",
      href: "/marketplace/beneficios",
      cta: "Abrir catálogo",
    },
    {
      title: "Campus Dualita",
      body: home.micro
        ? `Microlearning CAÚA: ${home.micro.completedCount}/${home.micro.totalLessons} módulos.`
        : "MOOC, cacao funcional y Masterclasses.",
      href: "/aprende",
      cta: "Continuar aprendizaje",
    },
    {
      title: "Sembrar",
      body: "Plántulas Ecoyuma, bitácora y cuidado de labranza.",
      href: "/juega",
      cta: "Ir a Sembrar",
    },
    {
      title: "Privacidad y opt-in",
      body: "Políticas, cookies y preferencias de comunicación.",
      href: "/legal/privacidad",
      cta: "Revisar legal",
    },
    {
      title: "Manifiesto .org",
      body: "Por qué el Colab es intermediario sin ánimo de lucro.",
      href: "/manifiesto",
      cta: "Leer manifiesto",
    },
  ]

  return (
    <div className="cuenta-hub">
      <div className="cuenta-hub-inner">
        <header className="cuenta-hub-hero">
          <div>
            <p className="eyebrow text-colab-yellow">Mi espacio en el Colab</p>
            <h1>
              Hola, <em>{home.displayName}</em>
            </h1>
            <p className="cuenta-hub-meta">
              {home.email}
              {home.city ? ` · ${home.city}` : ""}
              {home.roles.length
                ? ` · ${home.roles.map((r) => ROLE_LABEL[r] ?? r).join(", ")}`
                : ""}
            </p>
          </div>
          <form action={signOutCampus}>
            <button type="submit" className="cuenta-hub-signout">
              Cerrar sesión
            </button>
          </form>
        </header>

        <section className="cuenta-wallet" aria-labelledby="cuenta-wallet-title">
          <div className="cuenta-wallet-copy">
            <p className="eyebrow text-colab-yellow">Wallet · Mazorcas Doradas</p>
            <h2 id="cuenta-wallet-title">Tu economía interna</h2>
            <p>
              Saldo para canjear cursos y aceleraciones. El rango reconoce productividad propia — no
              reclutamiento.
            </p>
            <div className="cuenta-wallet-actions">
              <Link href="/cuenta/mazorcas" className="cuenta-btn-primary">
                Abrir wallet →
              </Link>
              <Link href="/cuenta/mazorcas#scorecard" className="cuenta-btn-ghost">
                Scorecard
              </Link>
              <Link href="/marketplace/beneficios" className="cuenta-btn-ghost">
                Canjear
              </Link>
            </div>
          </div>
          <div className="cuenta-wallet-balance">
            <span>Saldo disponible</span>
            <strong>{home.wallet.balance.toLocaleString("es-CO")}</strong>
            <small>
              MD · {home.wallet.rankIcon} {home.wallet.rankName}
              {home.wallet.mdToNext != null && home.wallet.nextName
                ? ` · ${home.wallet.mdToNext} para ${home.wallet.nextName}`
                : " · rango máximo"}
            </small>
            {home.redemptionCount > 0 && (
              <em>{home.redemptionCount} canje{home.redemptionCount === 1 ? "" : "s"} registrados</em>
            )}
          </div>
        </section>

        <section className="cuenta-bio" aria-labelledby="cuenta-bio-title">
          <div className="cuenta-bio-head">
            <div>
              <p className="eyebrow text-colab-pod">Personalización · red interna</p>
              <h2 id="cuenta-bio-title">Tu bio de nodo</h2>
              <p>
                Así te encuentran fincas, marcas y aliados en el Colab. Gestiona intro, fotos y
                contacto desde tu cuenta.
              </p>
            </div>
            <Link href="/cuenta/bio" className="cuenta-btn-primary">
              {home.bio ? "Gestionar bio →" : "Crear mi bio →"}
            </Link>
          </div>

          {home.bio ? (
            <article className="cuenta-bio-card">
              <div className="cuenta-bio-visual">
                {home.bio.avatarUrl ? (
                  <Image
                    src={home.bio.avatarUrl}
                    alt=""
                    width={88}
                    height={88}
                    className="cuenta-bio-avatar"
                    unoptimized
                  />
                ) : (
                  <div className="cuenta-bio-avatar-fallback" aria-hidden>
                    {home.bio.displayName.slice(0, 1)}
                  </div>
                )}
                {home.bio.productImageUrl && (
                  <Image
                    src={home.bio.productImageUrl}
                    alt=""
                    width={140}
                    height={88}
                    className="cuenta-bio-product"
                    unoptimized
                  />
                )}
              </div>
              <div className="cuenta-bio-body">
                <span className="cuenta-bio-status">{BIO_STATUS[home.bio.status] ?? home.bio.status}</span>
                <h3>{home.bio.orgName}</h3>
                <p>
                  {home.bio.displayName} · {NODE_KIND_LABEL[home.bio.kind]}
                  {home.bio.city ? ` · ${home.bio.city}` : ""}
                </p>
                <p className="cuenta-bio-intro">{home.bio.intro}</p>
                <div className="cuenta-bio-links">
                  {home.bio.status === "published" && (
                    <Link href={`/nodo/${home.bio.slug}`}>Ver perfil público →</Link>
                  )}
                  <Link href="/cuenta/bio">Editar / actualizar →</Link>
                  <Link href="/nodo">Directorio de nodos →</Link>
                </div>
              </div>
            </article>
          ) : (
            <div className="cuenta-bio-empty">
              <p>
                Aún no tienes bio. Créala para activar tu presencia en la red social interna del
                cacao — finca, marca, transformación u hospitalidad.
              </p>
              <Link href="/cuenta/bio">Empezar bio de nodo →</Link>
            </div>
          )}
        </section>

        <section className="cuenta-manage" aria-labelledby="cuenta-manage-title">
          <p className="eyebrow text-colab-yellow">Gestionar en el Colab</p>
          <h2 id="cuenta-manage-title">Todo tu espacio</h2>
          <p className="cuenta-manage-lede">
            Aprendizaje, práctica, beneficios y políticas — el lugar desde el que administras tu
            vínculo con la comunidad.
          </p>
          <ul className="cuenta-manage-grid">
            {manage.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <strong>{item.cta} →</strong>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="cuenta-learn-strip" aria-label="Continuar rutas">
          <Link href="/campus/arquitecto-fermentacion">Arquitecto de Fermentación</Link>
          <Link href="/campus/maestro-chocolatier">Master Chocolatier</Link>
          <Link href="/campus/benevolo">Benevolo</Link>
          <Link href="/rd">R&D Colab</Link>
        </section>
      </div>
    </div>
  )
}
