'use client'

import { useEffect } from 'react'

export default function UTMCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utms: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const val = params.get(key)
      if (val) utms[key] = val
    }
    if (Object.keys(utms).length > 0) {
      sessionStorage.setItem('colab_utms', JSON.stringify(utms))
    }
  }, [])

  return null
}
