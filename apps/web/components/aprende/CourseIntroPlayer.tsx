"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import SquirrelSVG from "@/components/brand/SquirrelSVG"
import type { CourseVideo } from "@/lib/course-videos"
import { trackColabEvent } from "@/lib/analytics"
import { playDualitaSfx } from "@/lib/campus-gamify"

type Props = {
  video: CourseVideo
  source: string
  className?: string
  autoPlay?: boolean
}

/**
 * Intro edutainment con cover atractivo (PNG + Dualita).
 * Nunca deja el escenario vacío: poster → play → MP4 / composición.
 */
export default function CourseIntroPlayer({
  video,
  source,
  className = "",
  autoPlay = false,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mode, setMode] = useState<"video" | "composition" | "checking">("checking")
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(autoPlay)
  const [scale, setScale] = useState(0.4)
  const poster = video.poster ?? "/atmosphere/coex-home.jpg"
  const dualitaLine =
    video.dualitaLine ?? "Dualita te presenta esta ruta — oficio con emoción de chocolate."

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
    if (!node || !playing) return
    const update = () => setScale(Math.min(1, node.clientWidth / 1920))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [mode, playing])

  function markPlayed() {
    if (started) return
    setStarted(true)
    trackColabEvent("video_intro_played", { target: video.id, source })
  }

  function startPlayback() {
    playDualitaSfx("select")
    setPlaying(true)
    markPlayed()
    window.setTimeout(() => {
      const el = videoRef.current
      if (el) void el.play().catch(() => {})
    }, 40)
  }

  const showCover = !playing && !autoPlay

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

      <div ref={stageRef} className="course-intro-stage">
        {showCover && (
          <button
            type="button"
            className="course-intro-cover"
            onClick={startPlayback}
            aria-label={`Reproducir intro: ${video.title}`}
          >
            <Image
              src={poster}
              alt=""
              fill
              className="course-intro-cover-img"
              sizes="(max-width: 768px) 100vw, 720px"
              priority={source.includes("hero")}
            />
            <span className="course-intro-cover-shade" aria-hidden />

            <span className="course-intro-dualita">
              <SquirrelSVG size={72} expression="happy" />
              <span className="course-intro-dualita-copy">
                <strong>Dualita</strong>
                <em>{dualitaLine}</em>
              </span>
            </span>

            <span className="course-intro-play">
              <span className="course-intro-play-btn" aria-hidden />
              <span className="course-intro-play-label">
                Ver intro · {video.durationLabel}
              </span>
            </span>

            {video.packLabel && (
              <span className="course-intro-pack">{video.packLabel}</span>
            )}
          </button>
        )}

        {!showCover && mode === "checking" && (
          <div className="course-intro-fallback">Preparando intro…</div>
        )}

        {!showCover && mode === "video" && (
          <video
            ref={videoRef}
            className="course-intro-video"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            autoPlay
            onPlay={markPlayed}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}

        {!showCover && mode === "composition" && (
          <div className="course-intro-composition" style={{ height: 1080 * scale }}>
            <iframe
              title={video.title}
              src={video.compositionPath}
              className="course-intro-frame"
              style={{ transform: `scale(${scale})` }}
              loading="lazy"
            />
            <p className="course-intro-note">
              Intro Dualita en vivo · encode MP4 con{" "}
              <code>pnpm --filter @cacao-colab/video render:all</code>
            </p>
          </div>
        )}
      </div>
    </figure>
  )
}
