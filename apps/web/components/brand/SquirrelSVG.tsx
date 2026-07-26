type Props = { size?: number; className?: string }

export default function SquirrelSVG({ size = 80, className = "" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 118 112"
      width={size}
      height={Math.round(size * 0.95)}
      className={className}
      aria-hidden="true"
    >
      {/* Cola — detrás del cuerpo */}
      <path d="M 36,92 C 4,77 0,43 17,26 C 27,13 50,19 46,40 C 43,53 35,63 39,75 C 42,83 40,89 36,92 Z" fill="#C8A010" />
      <path d="M 36,89 C 8,75 4,44 19,28 C 28,17 48,23 44,42 C 42,53 35,62 39,73 C 42,80 40,86 36,89 Z" fill="#F2C830" />
      <path d="M 35,84 C 12,72 9,46 22,31 C 30,21 46,26 43,43 C 41,52 35,61 39,71 Z" fill="#F7DE50" opacity="0.36" />
      <ellipse cx="24" cy="34" rx="8" ry="6" fill="#F9EC70" opacity="0.38" transform="rotate(-32,24,34)" />
      {/* Cuerpo */}
      <ellipse cx="40" cy="88" rx="8" ry="10" fill="#F2C830" />
      <ellipse cx="56" cy="82" rx="20" ry="22" fill="#F2C830" />
      <ellipse cx="62" cy="83" rx="11" ry="14" fill="#F9EE78" opacity="0.38" />
      {/* Cabeza */}
      <circle cx="65" cy="43" r="19" fill="#F2C830" />
      {/* Hocico */}
      <ellipse cx="80" cy="52" rx="10.5" ry="8" fill="#F2C830" />
      {/* Oreja */}
      <path d="M 50,27 Q 47,9 59,7 Q 71,6 67,27 Z" fill="#F2C830" />
      <path d="M 51.5,26 Q 49,12 59,10 Q 69,9 66,26 Z" fill="#C88A0A" opacity="0.52" />
      {/* Ojo */}
      <circle cx="71" cy="38" r="4.2" fill="#1A2E10" />
      <circle cx="69.5" cy="36.8" r="1.6" fill="white" opacity="0.9" />
      <circle cx="73" cy="37.2" r="0.8" fill="white" opacity="0.5" />
      {/* Nariz */}
      <ellipse cx="90" cy="51" rx="3.2" ry="2.4" fill="#A05E10" />
      {/* Boca */}
      <path d="M 87,55 Q 90,58.5 93,55" stroke="#8A4808" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Brazos hacia la mazorca */}
      <path d="M 66,69 Q 76,68 86,70" stroke="#F2C830" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 67,83 Q 77,83 86,82" stroke="#F2C830" strokeWidth="7.5" fill="none" strokeLinecap="round" />
      {/* Mazorca de cacao */}
      <ellipse cx="101" cy="76" rx="12.5" ry="17" fill="#184C10" />
      <ellipse cx="100" cy="75" rx="12" ry="16" fill="#2D6A1E" />
      <ellipse cx="100" cy="75" rx="10" ry="13.5" fill="#3D7A2C" />
      <ellipse cx="94" cy="70" rx="4" ry="8" fill="#5FAF44" opacity="0.36" />
      <ellipse cx="99" cy="63" rx="4.5" ry="3" fill="#78C858" opacity="0.26" />
      {/* Estrías */}
      <path d="M 100,59 Q 87,75 100,91" stroke="#1E5014" strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M 100,59 Q 90,75 100,91" stroke="#1E5014" strokeWidth="1.1" fill="none" opacity="0.52" />
      <path d="M 100,59 Q 93.5,75 100,91" stroke="#4A9A34" strokeWidth="1" fill="none" opacity="0.38" />
      <path d="M 100,59 Q 97,75 100,91" stroke="#2A5B1E" strokeWidth="0.8" fill="none" opacity="0.28" />
      <path d="M 100,59 Q 103,75 100,91" stroke="#2A5B1E" strokeWidth="0.8" fill="none" opacity="0.28" />
      <path d="M 100,59 Q 106.5,75 100,91" stroke="#4A9A34" strokeWidth="1" fill="none" opacity="0.38" />
      <path d="M 100,59 Q 110,75 100,91" stroke="#1E5014" strokeWidth="1.1" fill="none" opacity="0.52" />
      <path d="M 100,59 Q 113,75 100,91" stroke="#1E5014" strokeWidth="1.4" fill="none" opacity="0.7" />
      {/* Tallo + hojas */}
      <rect x="97.5" y="54" width="5" height="7" rx="2.5" fill="#154010" />
      <path d="M 100,55 Q 109,44 111,50 Q 106,56 100,55 Z" fill="#3D7A2C" />
      <path d="M 100,55 L 106,47" stroke="#2A5B1E" strokeWidth="0.8" fill="none" />
      <path d="M 100,56 Q 93,46 91,50 Q 95,57 100,56 Z" fill="#4E8C38" opacity="0.8" />
    </svg>
  )
}
