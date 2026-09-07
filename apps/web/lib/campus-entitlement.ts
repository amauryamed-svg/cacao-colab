/**
 * Entitlements de Master guardados en campus_progress.state.
 * - md_unlocked: canje Mazorcas Doradas (beneficio digital)
 * - shopify_unlocked: orden pagada en cacao-colab.myshopify.com
 */
export function hasMasterEntitlement(state: unknown): boolean {
  if (!state || typeof state !== "object") return false
  const s = state as Record<string, unknown>
  return s.md_unlocked === true || s.shopify_unlocked === true
}

export function hasMasterMissionProgress(state: unknown): boolean {
  if (!state || typeof state !== "object") return false
  const completed = (state as { completed?: unknown }).completed
  return Array.isArray(completed) && completed.length > 0
}

/** Abre el campus si hay rango, entitlement (MD/Shopify) o progreso ya empezado. */
export function canEnterMasterCampus(input: {
  rankUnlocked: boolean
  state: unknown
}) {
  return (
    input.rankUnlocked ||
    hasMasterEntitlement(input.state) ||
    hasMasterMissionProgress(input.state)
  )
}
