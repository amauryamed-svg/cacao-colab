/**
 * UTM first-party del Colab → sessionStorage → onboarding → HubSpot.
 * Propiedades de contacto HubSpot (estándar, sin consumir slots custom):
 * - hs_analytics_source
 * - hs_analytics_source_data_1  ← utm_source
 * - hs_analytics_source_data_2  ← utm_campaign · utm_content
 * - hs_analytics_last_referrer  ← utm_medium
 */

import { CANONICAL_SITE_URL } from "@/lib/site"

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

export type UtmKey = (typeof UTM_KEYS)[number]
export type UtmParams = Partial<Record<UtmKey, string>>

export const COLAB_UTM_STORAGE_KEY = "colab_utms"

/** Campaña canónica de la página Master Cacaotier (atlas biomarcadores). */
export const CACAOTIER_UTM_CAMPAIGN = "cacaotier_biomarcadores"
export const CACAOTIER_UTM_TERM = "master_cacaotier"
/** Short link público (redirect → /aprende/cacaotier). */
export const CACAOTIER_SHARE_PATH = "/cacaotier"

export type CacaotierShareChannel =
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "x"
  | "copy"
  | "og_landscape"
  | "og_square"

const CHANNEL_SOURCE: Record<CacaotierShareChannel, string> = {
  whatsapp: "whatsapp",
  instagram: "instagram",
  linkedin: "linkedin",
  x: "x",
  copy: "link_copy",
  og_landscape: "download_og",
  og_square: "download_og",
}

const CHANNEL_CONTENT: Record<CacaotierShareChannel, string> = {
  whatsapp: "share_kit_wa",
  instagram: "share_kit_ig",
  linkedin: "share_kit_li",
  x: "share_kit_x",
  copy: "share_kit_copy",
  og_landscape: "og_1200x630",
  og_square: "og_1080_story",
}

export function sanitizeUtmValue(value: string, max = 80) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\-./]/g, "")
    .slice(0, max)
}

export function pickUtms(input: Record<string, unknown> | UtmParams | null | undefined): UtmParams {
  if (!input) return {}
  const out: UtmParams = {}
  for (const key of UTM_KEYS) {
    const raw = input[key]
    if (typeof raw === "string" && raw.trim()) {
      out[key] = sanitizeUtmValue(raw)
    }
  }
  return out
}

export function readStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {}
  try {
    return pickUtms(JSON.parse(sessionStorage.getItem(COLAB_UTM_STORAGE_KEY) ?? "{}"))
  } catch {
    return {}
  }
}

export function storeUtms(utms: UtmParams) {
  if (typeof window === "undefined") return
  const clean = pickUtms(utms)
  if (Object.keys(clean).length === 0) return
  sessionStorage.setItem(COLAB_UTM_STORAGE_KEY, JSON.stringify(clean))
}

export function buildTrackedUrl(
  pathOrUrl: string,
  utms: UtmParams,
  base = CANONICAL_SITE_URL,
): string {
  const absolute = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${base.replace(/\/$/, "")}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`
  const url = new URL(absolute)
  for (const key of UTM_KEYS) {
    const value = utms[key]
    if (value) url.searchParams.set(key, value)
  }
  return url.toString()
}

/** UTMs listos para compartir Master Cacaotier por canal. */
export function cacaotierShareUtms(channel: CacaotierShareChannel): UtmParams {
  return {
    utm_source: CHANNEL_SOURCE[channel],
    utm_medium: "social",
    utm_campaign: CACAOTIER_UTM_CAMPAIGN,
    utm_content: CHANNEL_CONTENT[channel],
    utm_term: CACAOTIER_UTM_TERM,
  }
}

export function cacaotierShareUrl(
  channel: CacaotierShareChannel,
  path = CACAOTIER_SHARE_PATH,
) {
  return buildTrackedUrl(path, cacaotierShareUtms(channel))
}

/**
 * Mapeo a propiedades de contacto HubSpot ya usadas por /api/onboarding.
 * No crea props custom (el portal CAÚA tiene cupo limitado).
 */
export function hubspotContactUtmProperties(utms: UtmParams): Record<string, string> {
  const clean = pickUtms(utms)
  if (!clean.utm_source && !clean.utm_campaign && !clean.utm_medium && !clean.utm_content) {
    return {}
  }

  const campaignDetail = [clean.utm_campaign, clean.utm_content, clean.utm_term]
    .filter(Boolean)
    .join(" · ")

  return {
    hs_analytics_source: "OTHER_CAMPAIGNS",
    ...(clean.utm_source ? { hs_analytics_source_data_1: clean.utm_source } : {}),
    ...(campaignDetail ? { hs_analytics_source_data_2: campaignDetail } : {}),
    ...(clean.utm_medium ? { hs_analytics_last_referrer: clean.utm_medium } : {}),
  }
}
