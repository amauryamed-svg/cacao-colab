import "server-only"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { ARCHITECT_COURSE_SLUG, architectMissions, architectTotalXp } from "@/lib/architect-course"
import { CHOCOLATIER_COURSE_SLUG, chocolatierMissions, chocolatierTotalXp } from "@/lib/chocolatier-course"
import { BENEVOLO_COURSE_SLUG, benevoloMissions, benevoloTotalXp } from "@/lib/benevolo-brand"
import {
  firstTryStats,
  gradeBlurb,
  gradeFromFirstTry,
  gradeLabel,
  nextGradeHint,
  normalizeRigorState,
  type DiplomaGrade,
} from "@/lib/campus-rigor"
import { getRegisteredMicroProgress } from "@/lib/microlearning-server"

export type CourseTrackSnapshot = {
  slug: string
  title: string
  subtitle: string
  href: string
  diplomaPathPrefix: string | null
  missionCount: number
  completedCount: number
  percent: number
  xp: number
  xpTotal: number
  hearts: number | null
  streak: number | null
  firstTry: number
  grade: DiplomaGrade | null
  gradeLabel: string | null
  gradeBlurb: string | null
  nextHint: string | null
  diplomaCode: string | null
  diplomaHref: string | null
  completedAt: string | null
  status: "not_started" | "in_progress" | "certified"
  /** Canje MD que marcó entitlement digital en campus_progress.state */
  mdUnlocked: boolean
}

function trackFromRigor(input: {
  slug: string
  title: string
  subtitle: string
  href: string
  diplomaPathPrefix: string | null
  missionCount: number
  xpTotal: number
  state: unknown
  xpColumn: number
  completedAt: string | null
}): CourseTrackSnapshot {
  const rigor = normalizeRigorState(input.state)
  const completedCount = rigor.completed.length
  const xp = Math.max(rigor.xp, input.xpColumn)
  const { firstTry } = firstTryStats(rigor, input.missionCount)
  const certified = completedCount >= input.missionCount || Boolean(input.completedAt)
  const grade = certified || completedCount > 0 ? gradeFromFirstTry(firstTry, input.missionCount) : null
  const diplomaCode = rigor.diplomaCode ?? null
  const stateObj =
    input.state && typeof input.state === "object" ? (input.state as Record<string, unknown>) : {}
  return {
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    href: input.href,
    diplomaPathPrefix: input.diplomaPathPrefix,
    missionCount: input.missionCount,
    completedCount,
    percent: Math.round((completedCount / Math.max(input.missionCount, 1)) * 100),
    xp,
    xpTotal: input.xpTotal,
    hearts: rigor.hearts,
    streak: rigor.streak,
    firstTry,
    grade,
    gradeLabel: grade ? gradeLabel(grade) : null,
    gradeBlurb: grade ? gradeBlurb(grade) : null,
    nextHint: nextGradeHint(firstTry, input.missionCount),
    diplomaCode,
    diplomaHref:
      diplomaCode && input.diplomaPathPrefix
        ? `${input.diplomaPathPrefix}/${diplomaCode}`
        : null,
    completedAt: input.completedAt,
    status: certified ? "certified" : completedCount > 0 ? "in_progress" : "not_started",
    mdUnlocked: stateObj.md_unlocked === true,
  }
}

export async function loadCourseTracks(userId: string): Promise<{
  masters: CourseTrackSnapshot[]
  micro: {
    completedCount: number
    totalLessons: number
    percent: number
    href: string
  } | null
}> {
  const supabase = await createSupabaseServerClient()
  const [{ data: rows }, micro] = await Promise.all([
    supabase
      .from("campus_progress")
      .select("course_slug,state,xp_total,completed_at")
      .eq("profile_id", userId)
      .in("course_slug", [ARCHITECT_COURSE_SLUG, CHOCOLATIER_COURSE_SLUG, BENEVOLO_COURSE_SLUG]),
    getRegisteredMicroProgress(),
  ])

  const bySlug = new Map((rows ?? []).map((row) => [row.course_slug, row]))

  const architectRow = bySlug.get(ARCHITECT_COURSE_SLUG)
  const chocolatierRow = bySlug.get(CHOCOLATIER_COURSE_SLUG)
  const benevoloRow = bySlug.get(BENEVOLO_COURSE_SLUG)

  const masters: CourseTrackSnapshot[] = [
    trackFromRigor({
      slug: ARCHITECT_COURSE_SLUG,
      title: "Master Cacaotier",
      subtitle: "Arquitecto de Fermentación · 6 misiones · diploma digital",
      href: "/campus/arquitecto-fermentacion",
      diplomaPathPrefix: "/credencial/arquitecto-fermentacion",
      missionCount: architectMissions.length,
      xpTotal: architectTotalXp,
      state: architectRow?.state ?? {},
      xpColumn: architectRow?.xp_total ?? 0,
      completedAt: architectRow?.completed_at ?? null,
    }),
    trackFromRigor({
      slug: CHOCOLATIER_COURSE_SLUG,
      title: "Master Chocolatier",
      subtitle: "Barra 70 % · lente CoEx / Awards · diploma digital",
      href: "/campus/maestro-chocolatier",
      diplomaPathPrefix: "/credencial/maestro-chocolatier",
      missionCount: chocolatierMissions.length,
      xpTotal: chocolatierTotalXp,
      state: chocolatierRow?.state ?? {},
      xpColumn: chocolatierRow?.xp_total ?? 0,
      completedAt: chocolatierRow?.completed_at ?? null,
    }),
    trackFromRigor({
      slug: BENEVOLO_COURSE_SLUG,
      title: "Benevolo (capstone)",
      subtitle: "Marca acelerada · duja FEAR 5 · credencial Colab",
      href: "/campus/benevolo",
      diplomaPathPrefix: "/credencial/benevolo",
      missionCount: benevoloMissions.length,
      xpTotal: benevoloTotalXp,
      state: benevoloRow?.state ?? {},
      xpColumn: benevoloRow?.xp_total ?? 0,
      completedAt: benevoloRow?.completed_at ?? null,
    }),
  ]

  return {
    masters,
    micro: micro
      ? {
          completedCount: micro.completedCount,
          totalLessons: micro.totalLessons,
          percent: Math.round((micro.completedCount / Math.max(micro.totalLessons, 1)) * 100),
          href: "/aprende",
        }
      : null,
  }
}
