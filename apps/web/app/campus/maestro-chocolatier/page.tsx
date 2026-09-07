import { redirect } from "next/navigation"
import ChocolatierCoursePlayer from "@/components/campus/ChocolatierCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { CHOCOLATIER_COURSE_SLUG } from "@/lib/chocolatier-course"
import { loadMasterCampusSession } from "@/lib/campus-session"

export const metadata = {
  title: "Master Chocolatier · Campus",
  description:
    "Campaña Dualita barra 70 % abierta en freemium: lente CoEx/Awards, vidas, rachas y diploma digital.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function MaestroChocolatierCampusPage() {
  const session = await loadMasterCampusSession(CHOCOLATIER_COURSE_SLUG)
  if (!session.user) redirect("/cuenta/entrar?next=/campus/maestro-chocolatier")
  if (!session.canEnter) {
    return <MasterAccessGate title="Master Chocolatier" access={session.access} courseSlug="maestro-chocolatier" />
  }
  return <ChocolatierCoursePlayer learnerName={session.learnerName} initialState={session.saved?.state} />
}
