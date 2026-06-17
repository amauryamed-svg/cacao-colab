type Props = { children: React.ReactNode; className?: string }

export default function SectionKicker({ children, className = "" }: Props) {
  return (
    <p
      className={`text-[10px] font-bold tracking-[3px] uppercase text-colab-yellow font-sans ${className}`}
    >
      {children}
    </p>
  )
}
