import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"
import BenevoloCoursePlayer from "@/components/campus/BenevoloCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { BENEVOLO_COURSE_SLUG } from "@/lib/benevolo-brand"
import { resolveMasterAccess } from "@/lib/campus-access"

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

  const [{ data: saved }, { data: wallet }] = await Promise.all([
    supabase
      .from("campus_progress")
      .select("state,xp_total")
      .eq("profile_id", user.id)
      .eq("course_slug", BENEVOLO_COURSE_SLUG)
      .maybeSingle(),
    supabase.from("mazorca_wallets").select("lifetime_earned").eq("profile_id", user.id).maybeSingle(),
  ])

  const access = resolveMasterAccess(wallet?.lifetime_earned ?? 0, BENEVOLO_COURSE_SLUG)
  const hasProgress =
    saved?.state &&
    typeof saved.state === "object" &&
    Array.isArray((saved.state as { completed?: unknown }).completed) &&
    ((saved.state as { completed: unknown[] }).completed.length > 0)
  if (!access.unlocked && !hasProgress) {
    return <MasterAccessGate title="Benevolo (capstone)" access={access} />
  }

  const learnerName = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner"

  return <BenevoloCoursePlayer learnerName={learnerName} initialState={saved?.state} />
}
