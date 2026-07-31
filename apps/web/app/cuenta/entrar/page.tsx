import type { Metadata } from "next"
import Link from "next/link"
import CampusAuthPanel from "@/components/campus/CampusAuthPanel"

export const metadata: Metadata = {
  title: "Entrar al campus",
  description: "Acceso al campus registrado de Cacao Colab.",
  robots: { index: false, follow: false },
}

export default async function CampusLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; intent?: string }>
}) {
  const query = await searchParams
  const next = query.next?.startsWith("/") ? query.next : "/aprende"

  return (
    <div className="min-h-[82vh] bg-[#101d0b] px-4 py-14 flex items-center justify-center">
      <div className="campus-auth-shell">
        <section className="campus-auth-story">
          <Link href="/" className="font-serif text-xl font-bold text-colab-cream">
            cacaotier
          </Link>
          <div className="mt-auto">
            <p className="eyebrow text-colab-yellow">Campus registrado</p>
            <h1 className="font-serif text-5xl font-black text-colab-cream leading-[.95] mt-4">
              Tu criterio
              <br />
              también se cultiva.
            </h1>
            <p className="text-sm leading-relaxed text-colab-cream/50 mt-5 max-w-sm">
              Guarda XP, racha, Sembrar y progreso del Arquitecto de Fermentación en una identidad
              única — con privacidad y opt-in claros.
            </p>
          </div>
        </section>
        <section className="campus-auth-form">
          <CampusAuthPanel next={next} intent={query.intent} error={query.error} />
        </section>
      </div>
    </div>
  )
}
