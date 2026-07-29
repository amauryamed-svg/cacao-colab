import type { Metadata } from "next"
import Link from "next/link"
import CampusLoginForm from "@/components/campus/CampusLoginForm"
import { signInWithApple, signInWithGoogle } from "./actions"

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
          <Link href="/" className="font-serif text-xl font-bold text-colab-cream">cacaotier</Link>
          <div className="mt-auto">
            <p className="eyebrow text-colab-yellow">Campus registrado</p>
            <h1 className="font-serif text-5xl font-black text-colab-cream leading-[.95] mt-4">
              Tu criterio<br />también se cultiva.
            </h1>
            <p className="text-sm leading-relaxed text-colab-cream/50 mt-5 max-w-sm">
              Guarda XP, racha, Cacao Gotchi y progreso del Arquitecto de Fermentación en una identidad única.
            </p>
          </div>
        </section>
        <section className="campus-auth-form">
          <div>
            <p className="eyebrow text-colab-green">{query.intent === "team" ? "Acceso de builders" : "Crear cuenta o entrar"}</p>
            <h2 className="font-serif text-3xl font-bold text-colab-forest mt-2">
              {query.intent === "team" ? "Panel superadministrador" : "Continúa tu campaña"}
            </h2>
            <p className="text-xs text-colab-forest/50 mt-3">
              Una sola identidad. Los permisos internos se asignan únicamente a emails mapeados en team_members.
            </p>
          </div>

          {query.error && (
            <p className="rounded-lg bg-red-50 text-red-700 text-xs p-3">
              No fue posible completar ese acceso. Verifica que el proveedor esté habilitado en Supabase.
            </p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <form action={signInWithGoogle}>
              <input type="hidden" name="next" value={next} />
              <button className="campus-oauth-button" type="submit"><strong>G</strong> Google</button>
            </form>
            <form action={signInWithApple}>
              <input type="hidden" name="next" value={next} />
              <button className="campus-oauth-button" type="submit"><strong>●</strong> Apple</button>
            </form>
          </div>

          <div className="auth-divider"><span>o usa tu email</span></div>
          <CampusLoginForm next={next} />

          <p className="text-[10px] leading-relaxed text-colab-forest/40">
            Google y Apple requieren habilitación del proveedor en Supabase. Al continuar aceptas guardar tu
            progreso educativo. El portal privado de los tres builders conserva su magic link independiente.
          </p>
        </section>
      </div>
    </div>
  )
}
