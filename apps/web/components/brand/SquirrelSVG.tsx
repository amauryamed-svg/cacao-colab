export type SquirrelExpression =
  | "neutral"
  | "happy"
  | "oops"
  | "proud"
  | "curious"
  | "wink"

type Props = {
  size?: number
  className?: string
  expression?: SquirrelExpression
}

/**
 * Dualita — forma definitiva.
 * Cola en S sobre el lomo, cuerpo cohesivo, mazorca al pecho.
 * Fuente estática: /brand/squirrel-cacao.svg (+ PNG para thumbs).
 */
export default function SquirrelSVG({
  size = 80,
  className = "",
  expression = "neutral",
}: Props) {
  const eye =
    expression === "wink" ? (
      <path
        d="M 69,40 Q 74,44 79,40"
        stroke="#1A2E10"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    ) : expression === "happy" || expression === "proud" ? (
      <path
        d="M 69,41 Q 74,35 79,41"
        stroke="#1A2E10"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />
    ) : (
      <g>
        <circle cx="74" cy="40" r={expression === "oops" ? 5.6 : 5} fill="#1A2E10" />
        <circle cx="72.2" cy="38.4" r="1.8" fill="#fff" opacity="0.95" />
        <circle cx="76.2" cy="39.2" r="0.9" fill="#fff" opacity="0.55" />
      </g>
    )

  const mouth =
    expression === "oops" ? (
      <ellipse cx="94" cy="60" rx="3.4" ry="3" fill="#8A4808" opacity="0.85" />
    ) : expression === "happy" || expression === "proud" || expression === "wink" ? (
      <path
        d="M 89,57 Q 94,66 100,57"
        stroke="#8A4808"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    ) : expression === "curious" ? (
      <path
        d="M 90,58 Q 94,60 98,57"
        stroke="#8A4808"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M 90,58 Q 94,62 98,58"
        stroke="#8A4808"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    )

  const blush =
    expression === "happy" || expression === "proud" || expression === "wink" ? (
      <>
        <ellipse cx="62" cy="52" rx="4.4" ry="2.7" fill="#FF8A5B" opacity="0.55" />
        <ellipse cx="88" cy="50" rx="3.6" ry="2.2" fill="#FF8A5B" opacity="0.42" />
      </>
    ) : null

  const brow =
    expression === "curious" ? (
      <path
        d="M 66,32 Q 73,28 80,33"
        stroke="#A05E10"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    ) : expression === "oops" ? (
      <path
        d="M 66,33 Q 74,29 80,34"
        stroke="#A05E10"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    ) : null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={`squirrel-svg expr-${expression} ${className}`.trim()}
      aria-hidden="true"
    >
      <g className="squirrel-tail">
        <path
          d="M48 102 C12 96 -2 68 10 40 C20 18 48 14 54 38 C58 54 48 68 50 82 C52 92 52 100 48 102 Z"
          fill="#C8A010"
        />
        <path
          d="M48 99 C16 93 4 67 15 42 C24 22 48 20 52 40 C56 54 48 68 50 80 C52 90 52 97 48 99 Z"
          fill="#F2C830"
        />
        <path
          d="M46 92 C20 86 12 64 22 44 C30 28 48 28 50 44 C52 56 46 68 48 80 Z"
          fill="#F7DE50"
          opacity="0.38"
        />
        <ellipse
          cx="28"
          cy="36"
          rx="9"
          ry="7"
          fill="#F9EC70"
          opacity="0.42"
          transform="rotate(-28 28 36)"
        />
      </g>

      <g className="squirrel-body">
        <ellipse cx="46" cy="108" rx="11" ry="8" fill="#C8A010" />
        <ellipse cx="46" cy="107" rx="9" ry="6.5" fill="#F2C830" />
        <path
          d="M38 110 Q42 114 46 110 Q50 114 54 110"
          stroke="#A05E10"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
          fill="none"
        />
        <ellipse cx="58" cy="88" rx="22" ry="24" fill="#F2C830" />
        <ellipse cx="62" cy="90" rx="12" ry="14" fill="#F9EE78" opacity="0.35" />
        <ellipse cx="54" cy="96" rx="10" ry="8" fill="#C8A010" opacity="0.35" />
      </g>

      <g className="squirrel-head">
        <circle cx="68" cy="46" r="21" fill="#F2C830" />
        <ellipse cx="84" cy="54" rx="11" ry="8.5" fill="#F2C830" />
        <ellipse cx="72" cy="52" rx="8" ry="6" fill="#F9EE78" opacity="0.28" />
        <path d="M52 30 Q48 8 62 6 Q74 6 70 30 Z" fill="#F2C830" />
        <path d="M54 28 Q51 12 62 11 Q71 11 68 28 Z" fill="#C88A0A" opacity="0.5" />
        {brow}
        {eye}
        {blush}
        <ellipse cx="94" cy="53" rx="3.4" ry="2.6" fill="#A05E10" />
        {mouth}
      </g>

      <g className="squirrel-arms">
        <path
          d="M62 74 Q76 72 90 78"
          stroke="#F2C830"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 88 Q74 90 90 88"
          stroke="#F2C830"
          strokeWidth="8.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="90" cy="78" r="4.2" fill="#F2C830" />
        <circle cx="90" cy="88" r="4" fill="#F2C830" />
      </g>

      <g className="squirrel-pod" style={{ transformOrigin: "103px 82px" }}>
        <ellipse cx="104" cy="82" rx="13" ry="19" fill="#184C10" />
        <ellipse cx="103" cy="81" rx="12" ry="17.5" fill="#2D6A1E" />
        <ellipse cx="103" cy="81" rx="10" ry="14.5" fill="#3D7A2C" />
        <ellipse cx="97" cy="74" rx="4" ry="8" fill="#5FAF44" opacity="0.34" />
        <path d="M103 64 Q88 81 103 98" stroke="#1E5014" strokeWidth="1.5" fill="none" opacity="0.72" />
        <path d="M103 64 Q92 81 103 98" stroke="#1E5014" strokeWidth="1.15" fill="none" opacity="0.5" />
        <path d="M103 64 Q98 81 103 98" stroke="#4A9A34" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M103 64 Q108 81 103 98" stroke="#4A9A34" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M103 64 Q114 81 103 98" stroke="#1E5014" strokeWidth="1.15" fill="none" opacity="0.5" />
        <path d="M103 64 Q118 81 103 98" stroke="#1E5014" strokeWidth="1.5" fill="none" opacity="0.72" />
        <rect x="100.5" y="58" width="5" height="8" rx="2.5" fill="#154010" />
        <path d="M103 59 Q114 46 116 52 Q110 60 103 59 Z" fill="#3D7A2C" />
        <path d="M103 60 Q94 48 91 53 Q96 62 103 60 Z" fill="#4E8C38" opacity="0.85" />
      </g>

      {expression === "proud" && (
        <g className="squirrel-sparkles" opacity="0.9">
          <circle cx="50" cy="18" r="2" fill="#F2C830" />
          <circle cx="90" cy="14" r="1.5" fill="#F7DE50" />
          <circle cx="44" cy="56" r="1.4" fill="#FFFFFF" opacity="0.7" />
        </g>
      )}
    </svg>
  )
}
