import { BENEVOLO_INSTAGRAM_HANDLE } from "@/lib/benevolo-launch"

type Frame = {
  kicker: string
  wordmark?: string
  display: string
  quote?: string
  support: string
}

export default function BenevoloIgFrame({
  frame,
  variant = "feed",
}: {
  frame: Frame
  variant?: "feed" | "story"
}) {
  return (
    <div className={`benevolo-ig-frame ${variant}`}>
      <header>
        <span>{frame.kicker}</span>
        <em>@{BENEVOLO_INSTAGRAM_HANDLE}</em>
      </header>
      <div>
        {frame.wordmark ? <p className="benevolo-ig-wordmark">{frame.wordmark}</p> : null}
        <h3>{frame.display}</h3>
        {frame.quote ? <p>{frame.quote}</p> : null}
      </div>
      <footer>
        <span>{frame.support}</span>
        <em>cacaocolab.org/benevolo/noviembre</em>
      </footer>
    </div>
  )
}
