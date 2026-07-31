import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { signOutCampus } from "./actions"
import { resolveRank } from "@/lib/loyalty"
import { getRegisteredMicroProgress } from "@/lib/microlearning-server"

export const metadata = { title: "Mi cuenta · Campus cacaotier", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"

export default async function CuentaPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/cuenta")

  await supabase.rpc("claim_team_membership")
  const { data: teamMember } = await supabase
    .from("team_members")
    .select("access_level")
    .eq("user_id", user.id)
    .maybeSingle()
  if (teamMember?.access_level === "superadmin") redirect("/equipo")

  const displayName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"
  const { data: wallet } = await supabase
    .from("mazorca_wallets")
    .select("balance,lifetime_earned")
    .eq("profile_id", user.id)
    .maybeSingle()
  const rank = resolveRank(wallet?.lifetime_earned ?? 0)
  const micro = await getRegisteredMicroProgress()

  return (
    <div className="min-h-[80vh] bg-colab-cream px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow text-colab-green">Identidad de aprendizaje</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-3">
          <div>
            <h1 className="font-serif text-5xl font-black text-colab-forest">Hola, {displayName}.</h1>
            <p className="text-sm text-colab-forest/50 mt-3">{user.email}</p>
          </div>
          <form action={signOutCampus}>
            <button className="text-xs font-bold text-colab-forest/45 hover:text-colab-forest">Cerrar sesión</button>
          </form>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {[
            { title: "Mazorcas Doradas", body: `${wallet?.balance ?? 0} MD · rango ${rank.name}.`, href: "/cuenta/mazorcas", cta: "Ver wallet y beneficios" },
            { title: "Arquitecto de Fermentación", body: "Seis misiones con Dualita y 700 XP.", href: "/campus/arquitecto-fermentacion", cta: "Continuar curso" },
            { title: "Master Chocolatier", body: "Barra 70 % · vidas · rachas · diploma LinkedIn.", href: "/campus/maestro-chocolatier", cta: "Continuar campaña" },
            { title: "Benevolo", body: "Marca acelerada · duja FEAR 5 · tendencia.", href: "/campus/benevolo", cta: "Acelerar marca" },
            { title: "Sembrar", body: "Plántulas Ecoyuma, bitácora y finca idónea.", href: "/juega", cta: "Ir a Sembrar" },
            {
              title: "Campus Dualita",
              body: micro
                ? `Microlearning CAÚA: ${micro.completedCount}/${micro.totalLessons} módulos guardados.`
                : "MOOC, cacao funcional y Masterclasses.",
              href: "/aprende",
              cta: "Ver rutas",
            },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="bg-white rounded-2xl border border-colab-forest/10 p-6 hover:-translate-y-1 transition-transform">
              <h2 className="font-serif text-xl font-bold text-colab-forest">{item.title}</h2>
              <p className="text-xs leading-relaxed text-colab-forest/50 mt-3">{item.body}</p>
              <strong className="block text-xs text-colab-green mt-8">{item.cta} →</strong>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
