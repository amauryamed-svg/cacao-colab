import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import ArchitectCoursePlayer from "@/components/campus/ArchitectCoursePlayer"

export const metadata = {
  title: "Arquitecto de Fermentación · Campus",
  description: "Campaña profesional guiada por Dualita para dominar fermentación trazable.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function ArchitectCoursePage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/campus/arquitecto-fermentacion")

  const { data: saved } = await supabase
    .from("campus_progress")
    .select("state,xp_total")
    .eq("profile_id", user.id)
    .eq("course_slug", "arquitecto-fermentacion")
    .maybeSingle()

  const rawState = saved?.state as { completed?: unknown; xp?: unknown } | null
  const initialState = rawState
    ? {
        completed: Array.isArray(rawState.completed)
          ? rawState.completed.filter((value): value is string => typeof value === "string")
          : [],
        xp: typeof rawState.xp === "number" ? rawState.xp : saved?.xp_total ?? 0,
      }
    : null
  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <ArchitectCoursePlayer learnerName={learnerName} initialState={initialState} />
}
