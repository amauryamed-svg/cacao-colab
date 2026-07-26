import CacaoColabWordmark from "@/components/brand/CacaoColabWordmark"
import LoginForm from "@/components/team/LoginForm"

export const metadata = {
  title: "Equipo · Cacao Colab",
  robots: { index: false, follow: false },
}

/**
 * Login real del portal interno /equipo (Supabase Auth, magic link). Solo
 * es operable en vivo cuando exista el proyecto Supabase real — ver
 * docs/00-SPEC.md, pendientes. El código de auth en sí es completo y
 * funcional, no simulado (ver app/equipo/login/actions.ts).
 */
export default function EquipoLoginPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 px-4 py-16">
      <CacaoColabWordmark size="lg" />
      <div className="text-center max-w-sm">
        <h1 className="font-serif text-2xl text-colab-forest">Portal del equipo</h1>
        <p className="text-sm text-colab-forest/60 font-sans mt-1">
          Acceso para Oscar, Hellen y Amaury.
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
