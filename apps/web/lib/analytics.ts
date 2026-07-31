import { hasAnalyticsConsentClient, hasGlobalPrivacyControl } from "@/lib/cookie-prefs"

export type ColabAnalyticsEvent =
  | "page_view"
  | "onboarding_started"
  | "onboarding_submitted"
  | "account_registered"
  | "microlearning_link_clicked"
  | "mooc_link_clicked"
  | "lesson_completed"
  | "sponsor_interest"
  | "knowledge_link_clicked"
  | "ecoyuma_link_clicked"
  | "caua_shop_clicked"
  | "zurych_shop_clicked"
  | "benevolo_interest"
  | "video_intro_played"

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
}

function analyticsAllowed() {
  if (hasGlobalPrivacyControl()) return false
  return hasAnalyticsConsentClient()
}

export function getAnalyticsIdentity() {
  let visitorId = localStorage.getItem("colab_visitor_id")
  if (!visitorId) {
    visitorId = id("v")
    localStorage.setItem("colab_visitor_id", visitorId)
  }
  let sessionId = sessionStorage.getItem("colab_session_id")
  if (!sessionId) {
    sessionId = id("s")
    sessionStorage.setItem("colab_session_id", sessionId)
  }
  let utms = {}
  try {
    utms = JSON.parse(sessionStorage.getItem("colab_utms") ?? "{}")
  } catch {
    utms = {}
  }
  return { visitorId, sessionId, utms }
}

export function trackColabEvent(
  event: ColabAnalyticsEvent,
  details: { target?: string; source?: string; pathname?: string } = {},
) {
  try {
    if (!analyticsAllowed()) return
    const identity = getAnalyticsIdentity()
    const payload = JSON.stringify({
      event,
      ...identity,
      ...details,
      pathname: details.pathname ?? window.location.pathname,
      referrer: document.referrer,
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/track", new Blob([payload], { type: "application/json" }))
    } else {
      void fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      })
    }
  } catch {
    // Analytics es opcional.
  }
}
