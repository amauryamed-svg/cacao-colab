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
      <circle cx="40" cy="40" r="36.6" stroke="currentColor" strokeWidth="1.15" />
      {/* C abierta, itálica, entrada y salida en punta */}
      <path
        stroke="currentColor"
        strokeWidth="2.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M55.4 23.2C47.2 15.6 30.4 15.2 23.2 26.6C16.6 37.2 17.4 53.6 28.2 61.4C36.4 67.4 50.6 66.2 56.8 57.8"
      />
      {/* Espina de la B, levemente itálica */}
      <path
        stroke="currentColor"
        strokeWidth="2.45"
        strokeLinecap="round"
        d="M34.8 20.6C34.2 33.8 34.6 47.4 35.6 61.2"
      />
      {/* Bowls de la B: un solo gesto, la C abraza la B */}
      <path
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M34.9 22.8C48.6 18.8 61.2 23.4 59.8 32.6C58.6 39.8 47.2 42.2 35.2 39.6C51.4 38.4 63.2 44.6 60.4 54.8C57.8 64.2 45.2 66.4 35.4 58.6"
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
