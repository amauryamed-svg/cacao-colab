import { type AnchorHTMLAttributes } from "react"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "outline" | "ghost"
}

export default function Button({ variant = "primary", className = "", children, ...rest }: Props) {
  const base = "inline-block font-bold text-sm font-sans rounded-full px-6 py-3 transition-all"
  const variants = {
    primary: "bg-colab-yellow text-colab-forest hover:bg-colab-amber",
    outline: "border-2 border-colab-yellow text-colab-yellow hover:bg-colab-yellow hover:text-colab-forest",
    ghost:   "text-colab-yellow underline hover:opacity-75",
  }

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}
