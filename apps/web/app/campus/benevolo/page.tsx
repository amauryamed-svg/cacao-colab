import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import BenevoloCoursePlayer from "@/components/campus/BenevoloCoursePlayer"
import { BENEVOLO_COURSE_SLUG } from "@/lib/benevolo-brand"

export const metadata = {
  title: "Benevolo · Aceleración de marca",
  description: "Track Dualita de Chocolate Benevolo: tendencia, duja FEAR 5 y preorden.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function BenevoloCampusPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/cuenta/entrar?next=/campus/benevolo")

  const { data: saved } = await supabase
    .from("campus_progress")
    .select("state,xp_total")
    .eq("profile_id", user.id)
    .eq("course_slug", BENEVOLO_COURSE_SLUG)
    .maybeSingle()

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <BenevoloCoursePlayer learnerName={learnerName} initialState={saved?.state} />
}
