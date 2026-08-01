export function slugifyNode(orgName: string, city?: string) {
  const base = [orgName, city]
    .filter(Boolean)
    .join("-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
  return base || "nodo-colab"
}

export function uniqueSlug(base: string, suffix?: string) {
  const s = suffix ? `${base}-${suffix}` : base
  return s.replace(/-+/g, "-").replace(/^-+|-+$/g, "")
}
