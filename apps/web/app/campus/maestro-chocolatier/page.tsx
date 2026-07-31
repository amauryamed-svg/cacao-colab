import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import ChocolatierCoursePlayer from "@/components/campus/ChocolatierCoursePlayer"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"

export const metadata = {
  title: "Master Chocolatier · Campus",
  description:
    "Campaña Dualita bean-to-bar con lente CoEx. Capstone: Chocolate Benevolo FEAR 5.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function MaestroChocolatierCampusPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/campus/maestro-chocolatier")

  const { data: saved } = await supabase
    .from("campus_progress")
    .select("state,xp_total")
    .eq("profile_id", user.id)
    .eq("course_slug", CHOCOLATIER_COURSE_SLUG)
    .maybeSingle()

  const rawState = saved?.state as { completed?: unknown; xp?: unknown } | null
  const initialState = rawState
    ? {
        completed: Array.isArray(rawState.completed)
          ? rawState.completed.filter((value): value is string => typeof value === "string")
          : [],
        xp: typeof rawState.xp === "number" ? rawState.xp : (saved?.xp_total ?? 0),
      }
    : null
  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <ChocolatierCoursePlayer learnerName={learnerName} initialState={initialState} />
}
