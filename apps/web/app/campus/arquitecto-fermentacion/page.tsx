import { redirect } from "next/navigation"
import ArchitectCoursePlayer from "@/components/campus/ArchitectCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { ARCHITECT_COURSE_SLUG } from "@/lib/architect-course"
import { loadMasterCampusSession } from "@/lib/campus-session"

export const metadata = {
  title: "Arquitecto de Fermentación · Master Cacaotier",
  description:
    "Certificación edutainment abierta en freemium: fermentación trazable con vidas, rachas, calificación y diploma digital.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function ArchitectCoursePage() {
  const session = await loadMasterCampusSession(ARCHITECT_COURSE_SLUG)
  if (!session.user) redirect("/cuenta/entrar?next=/campus/arquitecto-fermentacion")
  if (!session.canEnter) {
    return <MasterAccessGate title="Arquitecto de Fermentación" access={session.access} courseSlug="arquitecto-fermentacion" />
  }
  return <ArchitectCoursePlayer learnerName={session.learnerName} initialState={session.saved?.state ?? null} />
}
