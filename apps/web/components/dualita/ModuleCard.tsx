'use client'

import { Check } from "lucide-react"
import { type Module } from "@/lib/dualita"
import { useColabProgress } from "@/lib/hooks/useColabProgress"

type Props = { module: Module; track: "mooc" | "micro" }

export default function ModuleCard({ module, track }: Props) {
  const { completed } = useColabProgress()
  const isMooc = track === "mooc"
  const isDone = track === "micro" && !!module.slug && !!completed[module.slug]
  const accentBg = isDone ? "bg-colab-pod" : isMooc ? "bg-colab-yellow" : "bg-colab-green"
  const accentText = isDone ? "text-white" : isMooc ? "text-colab-forest" : "text-white"
  const borderColor = isDone ? "border-colab-pod/40" : isMooc ? "border-colab-yellow/25" : "border-colab-green/25"

  return (
    <div className={`rounded-xl border ${borderColor} bg-white/5 p-4 flex gap-3`}>
      <div
        className={`shrink-0 w-8 h-8 rounded-full ${accentBg} ${accentText} flex items-center justify-center text-xs font-bold font-sans`}
      >
        {isDone ? <Check size={16} /> : module.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold font-sans text-colab-cream leading-tight">{module.title}</p>
          {isDone ? (
            <span className="shrink-0 text-[9px] font-bold tracking-wider uppercase bg-colab-pod/20 text-colab-pod px-2 py-0.5 rounded-full font-sans">
              Completado
            </span>
          ) : module.status === "coming-soon" && (
            <span className="shrink-0 text-[9px] font-bold tracking-wider uppercase bg-white/10 text-white/50 px-2 py-0.5 rounded-full font-sans">
              Pronto
            </span>
          )}
        </div>
        <p className="text-[10px] font-sans text-white/40 mt-0.5">{module.duration}</p>
        <ul className="mt-2 space-y-0.5">
          {module.topics.map((t) => (
            <li key={t} className="text-[11px] font-sans text-white/55 flex gap-1.5">
              <span className={isMooc ? "text-colab-yellow/60" : "text-colab-pod/70"}>·</span>
              {t}
            </li>
          ))}
        </ul>
        {module.status === "available" && module.url && (
          <a
            href={module.url}
            className="mt-2 text-[10px] font-bold font-sans text-colab-yellow hover:underline block"
          >
            Empezar →
          </a>
        )}
      </div>
    </div>
  )
}
