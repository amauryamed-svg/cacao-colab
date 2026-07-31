import MazorcaSVG from "./MazorcaSVG"

/** 2–3 motions intencionales: flotar mazorcas ambientadas al Colab */
export default function FloatingPods({ variant = "hero" }: { variant?: "hero" | "stage" }) {
  return (
    <div className={`floating-pods floating-pods--${variant}`} aria-hidden>
      <span className="floating-pod floating-pod--a">
        <MazorcaSVG tone="yellow" size={variant === "hero" ? 72 : 48} />
      </span>
      <span className="floating-pod floating-pod--b">
        <MazorcaSVG tone="coral" size={variant === "hero" ? 56 : 40} />
      </span>
      <span className="floating-pod floating-pod--c">
        <MazorcaSVG tone="cocoa" size={variant === "hero" ? 64 : 44} />
      </span>
    </div>
  )
}
