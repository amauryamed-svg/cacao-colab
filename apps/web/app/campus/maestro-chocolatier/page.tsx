import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import ChocolatierCoursePlayer from "@/components/campus/ChocolatierCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"
import { resolveMasterAccess } from "@/lib/campus-access"
import { canEnterMasterCampus } from "@/lib/campus-entitlement"

export const metadata = {
  title: "Master Chocolatier · Campus",
  description:
    "Campaña Dualita barra 70 % con lente CoEx/Awards, vidas, rachas y diploma digital.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function MaestroChocolatierCampusPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/campus/maestro-chocolatier")

  const [{ data: saved }, { data: wallet }] = await Promise.all([
    supabase
      .from("campus_progress")
      .select("state,xp_total")
      .eq("profile_id", user.id)
      .eq("course_slug", CHOCOLATIER_COURSE_SLUG)
      .maybeSingle(),
    supabase.from("mazorca_wallets").select("lifetime_earned").eq("profile_id", user.id).maybeSingle(),
  ])

  const access = resolveMasterAccess(wallet?.lifetime_earned ?? 0, CHOCOLATIER_COURSE_SLUG)
  if (!canEnterMasterCampus({ rankUnlocked: access.unlocked, state: saved?.state })) {
    return (
      <MasterAccessGate title="Master Chocolatier" access={access} courseSlug="maestro-chocolatier" />
    )
  }

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <ChocolatierCoursePlayer learnerName={learnerName} initialState={saved?.state} />
}
