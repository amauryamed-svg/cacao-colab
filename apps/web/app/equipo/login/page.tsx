import { redirect } from "next/navigation"

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
  redirect("/cuenta/entrar?next=/equipo&intent=team")
}
