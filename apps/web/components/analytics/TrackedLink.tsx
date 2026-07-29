"use client"

import Link from "next/link"
import type { ColabAnalyticsEvent } from "@/lib/analytics"
import { trackColabEvent } from "@/lib/analytics"

type Props = {
  href: string
  event: ColabAnalyticsEvent
  targetName: string
  source: string
  className?: string
  children: React.ReactNode
  external?: boolean
}

export default function TrackedLink({ href, event, targetName, source, className, children, external }: Props) {
  const onClick = () => trackColabEvent(event, { target: targetName, source })
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{children}</a>
  }
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>
}
