import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import ArchitectCoursePlayer from "@/components/campus/ArchitectCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { resolveMasterAccess } from "@/lib/campus-access"
import { canEnterMasterCampus } from "@/lib/campus-entitlement"

export const metadata = {
  title: "Arquitecto de Fermentación · Master Cacaotier",
  description:
    "Certificación edutainment: fermentación trazable con vidas, rachas, calificación y diploma digital.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function ArchitectCoursePage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/campus/arquitecto-fermentacion")

  const [{ data: saved }, { data: wallet }] = await Promise.all([
    supabase
      .from("campus_progress")
      .select("state,xp_total")
      .eq("profile_id", user.id)
      .eq("course_slug", ARCHITECT_COURSE_SLUG)
      .maybeSingle(),
    supabase.from("mazorca_wallets").select("lifetime_earned").eq("profile_id", user.id).maybeSingle(),
  ])

  const access = resolveMasterAccess(wallet?.lifetime_earned ?? 0, ARCHITECT_COURSE_SLUG)
  if (!canEnterMasterCampus({ rankUnlocked: access.unlocked, state: saved?.state })) {
    return (
      <MasterAccessGate
        title="Arquitecto de Fermentación"
        access={access}
        courseSlug="arquitecto-fermentacion"
      />
    )
  }

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <ArchitectCoursePlayer learnerName={learnerName} initialState={saved?.state ?? null} />
}
