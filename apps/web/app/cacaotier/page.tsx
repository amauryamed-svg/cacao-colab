import { redirect } from "next/navigation"

/**
 * Redireccionador corto → Master Cacaotier.
 * También está en `next.config` (/cacaotier). Esta página preserva ?utm_*
 * si el redirect de config no aplica.
 */
export default async function CacaotierAliasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string" && value) params.set(key, value)
    else if (Array.isArray(value) && value[0]) params.set(key, value[0])
  }
  const qs = params.toString()
  redirect(`/aprende/cacaotier${qs ? `?${qs}` : ""}`)
}
