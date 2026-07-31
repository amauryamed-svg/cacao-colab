/**
 * Dominio canónico del Colab — comprado 2026-07-31: cacaocolab.org
 * Override en runtime con NEXT_PUBLIC_SITE_URL (Vercel / local).
 */
export const CANONICAL_HOST = "cacaocolab.org"
export const CANONICAL_SITE_URL = `https://${CANONICAL_HOST}`

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")
  return CANONICAL_SITE_URL
}
