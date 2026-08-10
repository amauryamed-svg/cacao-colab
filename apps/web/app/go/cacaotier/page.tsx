import { redirect } from "next/navigation"

/** Alias marketing `/go/cacaotier` → `/aprende/cacaotier` (preserva UTM). */
export default async function GoCacaotierAliasPage({
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
