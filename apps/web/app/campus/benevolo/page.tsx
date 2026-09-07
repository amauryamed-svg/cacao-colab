import { redirect } from "next/navigation"
import BenevoloCoursePlayer from "@/components/campus/BenevoloCoursePlayer"
import MasterAccessGate from "@/components/campus/MasterAccessGate"
import { BENEVOLO_COURSE_SLUG } from "@/lib/benevolo-brand"
import { loadMasterCampusSession } from "@/lib/campus-session"

export const metadata = {
  title: "Benevolo · Aceleración de marca",
  description: "Track Dualita de Chocolate Benevolo, abierto en freemium: tendencia, duja FEAR 5 y preorden.",
  robots: { index: false, follow: false },
}
export const dynamic = "force-dynamic"

export default async function BenevoloCampusPage() {
  const session = await loadMasterCampusSession(BENEVOLO_COURSE_SLUG)
  if (!session.user) redirect("/cuenta/entrar?next=/campus/benevolo")
  if (!session.canEnter) {
    return <MasterAccessGate title="Benevolo (capstone)" access={session.access} />
  }
  return <BenevoloCoursePlayer learnerName={session.learnerName} initialState={session.saved?.state} />
}
