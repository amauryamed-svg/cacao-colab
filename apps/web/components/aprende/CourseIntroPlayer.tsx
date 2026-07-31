"use client"

import { useEffect, useRef, useState } from "react"
import type { CourseVideo } from "@/lib/course-videos"
import { trackColabEvent } from "@/lib/analytics"

type Props = {
  video: CourseVideo
  source: string
  className?: string
  autoPlay?: boolean
}

/**
 * Player de intros edutainment.
 * Prefiere MP4 HyperFrames; si aún no hay encode, muestra la composición HTML seekable.
 */
export default function CourseIntroPlayer({ video, source, className = "", autoPlay = false }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<"video" | "composition" | "checking">("checking")
  const [started, setStarted] = useState(false)
  const [scale, setScale] = useState(0.4)

  useEffect(() => {
    let cancelled = false
    async function probe() {
      try {
        const res = await fetch(video.src, { method: "HEAD" })
        if (!cancelled) setMode(res.ok ? "video" : "composition")
      } catch {
        if (!cancelled) setMode("composition")
      }
    }
    probe()
    return () => {
      cancelled = true
    }
  }, [video.src])

  useEffect(() => {
    const node = stageRef.current
    if (!node) return
    const update = () => setScale(Math.min(1, node.clientWidth / 1920))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [mode])

  function markPlayed() {
    if (started) return
    setStarted(true)
    trackColabEvent("video_intro_played", { target: video.id, source })
  }

  return (
    <figure className={`course-intro-player ${className}`}>
      <div className="course-intro-meta">
        <p className="eyebrow text-colab-yellow">{video.eyebrow}</p>
        <div className="flex items-end justify-between gap-4 mt-2">
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-colab-cream leading-tight">
              {video.title}
            </h3>
            <p className="text-sm text-colab-cream/50 mt-2 max-w-xl leading-relaxed">{video.summary}</p>
          </div>
          <span className="course-chip shrink-0">{video.durationLabel}</span>
        </div>
      </div>

      <div ref={stageRef} className="course-intro-stage" onClick={markPlayed}>
        {mode === "checking" && (
          <div className="course-intro-fallback">Preparando intro…</div>
        )}

        {mode === "video" && (
          <video
            className="course-intro-video"
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            autoPlay={autoPlay}
            onPlay={markPlayed}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}

        {mode === "composition" && (
          <div className="course-intro-composition" style={{ height: 1080 * scale }}>
            <iframe
              title={video.title}
              src={video.compositionPath}
              className="course-intro-frame"
              style={{ transform: `scale(${scale})` }}
              loading="lazy"
            />
            <p className="course-intro-note">
              Composición HyperFrames en vivo · encode MP4 con{" "}
              <code>pnpm --filter @cacao-colab/video render:all</code>
            </p>
          </div>
        )}
      </div>
    </figure>
  )
}
