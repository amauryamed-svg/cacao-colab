/** Ilustración ambientada · mazorca / pod Colab */
type Props = {
  className?: string
  tone?: "yellow" | "coral" | "pod" | "cocoa"
  size?: number
}

const tones = {
  yellow: { skin: "#F2C830", ridge: "#C8A010", glow: "rgba(242,200,48,.45)" },
  coral: { skin: "#FF6A3D", ridge: "#E8C9A0", glow: "rgba(255,106,61,.4)" },
  pod: { skin: "#87AA27", ridge: "#3D7A2C", glow: "rgba(135,170,39,.4)" },
  cocoa: { skin: "#8B5A2B", ridge: "#E8C9A0", glow: "rgba(232,201,160,.35)" },
}

export default function MazorcaSVG({ className, tone = "yellow", size = 64 }: Props) {
  const t = tones[tone]
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <ellipse cx="40" cy="88" rx="18" ry="4" fill={t.glow} />
      <path
        d="M40 8c14 6 22 28 22 48 0 18-8 30-22 34C26 86 18 74 18 56 18 36 26 14 40 8Z"
        fill={t.skin}
      />
      <path
        d="M40 14c8 5 14 22 14 42 0 14-5 24-14 28"
        stroke={t.ridge}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity=".55"
      />
      <path
        d="M32 22c2 8 2 20 0 36M48 24c-1.5 8-1.5 18 0 34M28 36c4 2 20 2 24 0M26 50c5 2 22 2 28 0M28 64c4 1.5 18 1.5 24 0"
        stroke={t.ridge}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".45"
      />
      <circle cx="40" cy="12" r="3" fill={t.ridge} opacity=".7" />
    </svg>
  )
}
