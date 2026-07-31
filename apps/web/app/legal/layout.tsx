import type { ReactNode } from "react"

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="legal-shell">
      <div className="legal-shell__atmosphere" aria-hidden />
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">{children}</div>
    </div>
  )
}
