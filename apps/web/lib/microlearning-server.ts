import "server-only"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { lessons } from "@/lib/lessons"
import { MICRO_COURSE_SLUG, type RegisteredMicroProgress } from "@/lib/microlearning"

/**
 * Progreso de microlearning guardado en la cuenta. Devuelve null cuando no hay
 * sesión o la tabla no existe todavía, para que la UI caiga al progreso local
 * en vez de mostrar ceros como si el learner no hubiera avanzado.
 */
export async function getRegisteredMicroProgress(): Promise<RegisteredMicroProgress | null> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from("campus_progress")
      .select("state,xp_total")
      .eq("profile_id", user.id)
      .eq("course_slug", MICRO_COURSE_SLUG)
      .maybeSingle()
    if (error || !data) return null

    const state = data.state as { completed?: unknown } | null
    const completed = Array.isArray(state?.completed)
      ? state.completed.filter((slug): slug is string => typeof slug === "string")
      : []
    const known = new Set(lessons.map((lesson) => lesson.slug))

    return {
      completedCount: completed.filter((slug) => known.has(slug)).length,
      totalLessons: lessons.length,
      xp: data.xp_total,
    }
  } catch {
    return null
  }
}
