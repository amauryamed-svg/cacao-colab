import { redirect } from "next/navigation"
import CatadorCoursePlayer from "@/components/campus/CatadorCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { CATADOR_COURSE_SLUG } from "@/lib/catador-course"
import { loadMasterCampusSession } from "@/lib/campus-session"

export const metadata = {
  title: "Master Catador de Cacao · Campus",
  description:
    "Certificación edutainment abierta en freemium: rueda Fine-Flavor Colab, lente CoEx, panel ciego y set Colombia 10.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function CatadorCampusPage() {
  const session = await loadMasterCampusSession(CATADOR_COURSE_SLUG)
  if (!session.user) redirect("/cuenta/entrar?next=/campus/catador-cacao")
  if (!session.canEnter) {
    return <MasterAccessGate title="Master Catador de Cacao" access={session.access} courseSlug="catador-cacao" />
  }
  return <CatadorCoursePlayer learnerName={session.learnerName} initialState={session.saved?.state} />
}
