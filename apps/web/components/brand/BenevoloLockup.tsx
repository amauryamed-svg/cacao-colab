import { Bodoni_Moda } from "next/font/google"
import type { ElementType } from "react"

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "900"],
  style: ["italic"],
  variable: "--font-bodoni-moda",
  display: "swap",
})

/** Sello CB de la manga Bars.: un trazo calligráfico, no Georgia block. */
export function CbMonogram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="36.2" stroke="currentColor" strokeWidth="1.7" />
      {/* C: media luna itálica que abraza la B */}
      <path
        stroke="currentColor"
        strokeWidth="3.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M57.2 21.8C46.4 12.6 26.8 13.4 19.6 28.4C13.2 42.2 16.8 59.6 31.2 65.6C40.4 69.4 52.8 66.8 58.6 58.2"
      />
      {/* Espina + bowls de la B en un solo gesto script */}
      <path
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M33.8 18.8C33.4 33.2 33.8 47.6 34.8 62.4M33.9 21.4C50.6 16.2 64.4 22.6 62.2 33.2C60.4 41.4 47.6 43.8 34.2 40.2C52.8 38.6 66.2 46.4 62.8 57.2C59.6 67.4 45.2 69.2 34.6 60.4"
      />
    </svg>
  )
}

type Props = {
  compact?: boolean
  className?: string
  as?: ElementType
}

/** Lockup canónico de la manga Bars.: CB fluido + Chocolate + BenevolO (Bodoni). */
export function BenevoloLockup({ compact = false, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag
      className={`benevolo-lockup ${bodoni.variable} ${bodoni.className} ${compact ? "compact" : ""} ${className}`.trim()}
      role="img"
      aria-label="Chocolate Benevolo"
    >
      <CbMonogram className="benevolo-lockup-cb" />
      <span className="benevolo-lockup-type">
        <span className="benevolo-lockup-nom">Chocolate</span>
        <span className="benevolo-lockup-word">
          <span className="cap">B</span>
          <span className="mid">enevol</span>
          <span className="cap">O</span>
        </span>
      </span>
    </Tag>
  )
}
