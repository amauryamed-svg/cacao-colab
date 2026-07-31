import Image from "next/image"

type Props = {
  src: string
  alt?: string
  className?: string
  priority?: boolean
  overlay?: "cocoa" | "forest" | "coral" | "soft"
}

const overlays = {
  cocoa:
    "linear-gradient(115deg, rgba(20,14,10,.88) 0%, rgba(26,18,12,.55) 42%, rgba(20,14,10,.72) 100%)",
  forest:
    "linear-gradient(120deg, rgba(16,29,11,.9) 0%, rgba(26,46,16,.55) 45%, rgba(16,29,11,.78) 100%)",
  coral:
    "linear-gradient(125deg, rgba(20,14,10,.9) 0%, rgba(255,106,61,.18) 50%, rgba(20,14,10,.75) 100%)",
  soft:
    "linear-gradient(180deg, rgba(16,29,11,.35) 0%, rgba(16,29,11,.75) 100%)",
}

/** Plano fotográfico full-bleed con veladura de marca — estilo Bars. */
export default function AtmospherePlane({
  src,
  alt = "",
  className = "",
  priority,
  overlay = "cocoa",
}: Props) {
  return (
    <div className={`atmosphere-plane ${className}`} aria-hidden={alt ? undefined : true}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="atmosphere-plane-img"
      />
      <div className="atmosphere-plane-veil" style={{ background: overlays[overlay] }} />
      <div className="atmosphere-plane-grain" />
    </div>
  )
}
