import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import ArchitectCoursePlayer from "@/components/campus/ArchitectCoursePlayer"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"

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

  const { data: saved } = await supabase
    .from("campus_progress")
    .select("state,xp_total")
    .eq("profile_id", user.id)
    .eq("course_slug", ARCHITECT_COURSE_SLUG)
    .maybeSingle()

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <ArchitectCoursePlayer learnerName={learnerName} initialState={saved?.state ?? null} />
}
