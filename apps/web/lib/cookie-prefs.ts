import { COOKIE_PREFS_COOKIE } from "@/lib/legal/versions"

export type CookiePrefs = {
  essential: true
  analytics: boolean
  version: string
  at: string
}

export function readCookiePrefsClient(): CookiePrefs | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_PREFS_COOKIE}=([^;]*)`))
  if (!match?.[1]) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as CookiePrefs
    if (parsed.essential !== true) return null
    return parsed
  } catch {
    return null
  }
}

export function writeCookiePrefsClient(prefs: CookiePrefs) {
  const value = encodeURIComponent(JSON.stringify(prefs))
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `${COOKIE_PREFS_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`
}

export function hasAnalyticsConsentClient(): boolean {
  const prefs = readCookiePrefsClient()
  if (!prefs) return false
  return prefs.analytics === true
}

/** GPC / Do Not Sell signal — treat as opt-out of non-essential tracking. */
export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false
  return Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl)
}
