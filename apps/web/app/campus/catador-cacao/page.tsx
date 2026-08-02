import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import CatadorCoursePlayer from "@/components/campus/CatadorCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { resolveMasterAccess } from "@/lib/campus-access"

export const metadata = {
  title: "Master Catador de Cacao · Campus",
  description:
    "Certificación edutainment: rueda Fine-Flavor Colab, lente CoEx, panel ciego y set Colombia 10.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function CatadorCampusPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/campus/catador-cacao")

  const [{ data: saved }, { data: wallet }] = await Promise.all([
    supabase
      .from("campus_progress")
      .select("state,xp_total")
      .eq("profile_id", user.id)
      .eq("course_slug", CATADOR_COURSE_SLUG)
      .maybeSingle(),
    supabase.from("mazorca_wallets").select("lifetime_earned").eq("profile_id", user.id).maybeSingle(),
  ])

  const access = resolveMasterAccess(wallet?.lifetime_earned ?? 0, CATADOR_COURSE_SLUG)
  const hasProgress =
    saved?.state &&
    typeof saved.state === "object" &&
    Array.isArray((saved.state as { completed?: unknown }).completed) &&
    ((saved.state as { completed: unknown[] }).completed.length > 0)
  if (!access.unlocked && !hasProgress) {
    return <MasterAccessGate title="Master Catador de Cacao" access={access} />
  }

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <CatadorCoursePlayer learnerName={learnerName} initialState={saved?.state} />
}
