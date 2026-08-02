import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import ArchitectCoursePlayer from "@/components/campus/ArchitectCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { resolveMasterAccess } from "@/lib/campus-access"

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
  const hasProgress =
    saved?.state &&
    typeof saved.state === "object" &&
    Array.isArray((saved.state as { completed?: unknown }).completed) &&
    ((saved.state as { completed: unknown[] }).completed.length > 0)
  // Rango abre el Master; quien ya empezó no queda fuera por el cambio de modelo.
  if (!access.unlocked && !hasProgress) {
    return <MasterAccessGate title="Arquitecto de Fermentación" access={access} />
  }

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <ArchitectCoursePlayer learnerName={learnerName} initialState={saved?.state ?? null} />
}
