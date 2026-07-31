"use server"

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { redirect } from "next/navigation"

export type CampusAuthResult = { ok: true } | { ok: false; error: string }

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "/aprende")
  const allowed = ["/aprende", "/campus", "/juega", "/sembrar", "/cuenta"]
  return allowed.some((prefix) => next.startsWith(prefix)) ? next : "/aprende"
}

export async function requestCampusMagicLink(formData: FormData): Promise<CampusAuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const next = safeNext(formData.get("next"))
  if (!email || !email.includes("@")) return { ok: false, error: "Ingresa un email válido." }

  try {
    const supabase = await createSupabaseServerClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
        shouldCreateUser: true,
      },
    })
    return error ? { ok: false, error: error.message } : { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "No fue posible iniciar el acceso." }
  }
}

async function startOAuth(provider: "google" | "apple", formData: FormData) {
  const next = safeNext(formData.get("next"))
  const supabase = await createSupabaseServerClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}` },
  })
  if (error || !data.url) redirect(`/cuenta/entrar?error=oauth_${provider}`)
  redirect(data.url)
}

export async function signInWithGoogle(formData: FormData) {
  await startOAuth("google", formData)
}

export async function signInWithApple(formData: FormData) {
  await startOAuth("apple", formData)
}
