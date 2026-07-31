"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import {
  hasGlobalPrivacyControl,
  readCookiePrefsClient,
  writeCookiePrefsClient,
} from "@/lib/cookie-prefs"
import { COOKIE_POLICY_VERSION } from "@/lib/legal/versions"

function subscribe(onStoreChange: () => void) {
  window.addEventListener("colab-cookie-prefs", onStoreChange)
  return () => window.removeEventListener("colab-cookie-prefs", onStoreChange)
}

function getServerSnapshot() {
  return false
}

function getShouldShowBanner() {
  if (readCookiePrefsClient()) return false
  if (hasGlobalPrivacyControl()) return false
  return true
}

export default function CookieConsentBanner() {
  const visible = useSyncExternalStore(subscribe, getShouldShowBanner, getServerSnapshot)

  function save(analytics: boolean) {
    writeCookiePrefsClient({
      essential: true,
      analytics,
      version: COOKIE_POLICY_VERSION,
      at: new Date().toISOString(),
    })
    window.dispatchEvent(new Event("colab-cookie-prefs"))
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Preferencias de cookies">
      <div className="cookie-banner__inner">
        <div>
          <p className="cookie-banner__title">Cookies y privacidad</p>
          <p className="cookie-banner__body">
            Usamos cookies esenciales para la sesión y tu elección de privacidad. La analítica del
            Colab solo se activa si la aceptas (ePrivacy / GDPR).{" "}
            <Link href="/legal/cookies">Política de Cookies</Link>
            {" · "}
            <Link href="/legal/privacidad">Privacidad</Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="cookie-banner__ghost" onClick={() => save(false)}>
            Solo esenciales
          </button>
          <button type="button" className="cookie-banner__primary" onClick={() => save(true)}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
