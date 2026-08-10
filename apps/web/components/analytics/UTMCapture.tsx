"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackColabEvent } from "@/lib/analytics"
import { pickUtms, storeUtms, UTM_KEYS } from "@/lib/utm"

export default function UTMCapture() {
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const raw: Record<string, string> = {}
    for (const key of UTM_KEYS) {
      const val = params.get(key)
      if (val) raw[key] = val
    }
    const utms = pickUtms(raw)
    if (Object.keys(utms).length > 0) {
      storeUtms(utms)
    }
    trackColabEvent("page_view", { pathname: pathname ?? window.location.pathname })
  }, [pathname])

  return null
}
