export type ColabAnalyticsEvent =
  | "page_view"
  | "onboarding_started"
  | "onboarding_submitted"
  | "account_registered"
  | "microlearning_link_clicked"
  | "mooc_link_clicked"
  | "lesson_completed"
  | "sponsor_interest"

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
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
      void fetch("/api/analytics/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true })
    }
  } catch {
    // Analytics es opcional.
  }
}
