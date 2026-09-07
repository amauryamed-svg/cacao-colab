import "server-only"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { resolveMasterAccess, type MasterCourseSlug } from "@/lib/campus-access"
import { isSuperadminUser } from "@/lib/team-access"

function hasStarted(state: unknown) {
  return Boolean(
    state &&
      typeof state === "object" &&
      Array.isArray((state as { completed?: unknown }).completed) &&
      ((state as { completed: unknown[] }).completed.length > 0),
  )
}

export async function loadMasterCampusSession(courseSlug: MasterCourseSlug) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { user: null, canEnter: false as const }
  }

  const superadmin = await isSuperadminUser(supabase, user.id)
  const [{ data: saved }, { data: wallet }] = await Promise.all([
    supabase
      .from("campus_progress")
      .select("state,xp_total")
      .eq("profile_id", user.id)
      .eq("course_slug", courseSlug)
      .maybeSingle(),
    supabase.from("mazorca_wallets").select("lifetime_earned").eq("profile_id", user.id).maybeSingle(),
  ])

  const access = resolveMasterAccess(wallet?.lifetime_earned ?? 0, courseSlug, { bypass: superadmin })
  const hasProgress = hasStarted(saved?.state)
  return {
    user,
    access,
    saved,
    hasProgress,
    canEnter: access.unlocked || hasProgress,
    learnerName: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Learner",
    superadmin,
  }
}
