import "server-only"
import { Resend } from "resend"

let client: Resend | null = null

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("Falta RESEND_API_KEY — el cron de seguimiento no puede enviar correos.")
  if (!client) client = new Resend(apiKey)
  return client
}

/**
 * Remitente nurture.
 * Tras verificar cacaocolab.org en Resend, setear en Vercel:
 *   RESEND_FROM=Cacao Colab <seguimiento@cacaocolab.org>
 * Sin esa env, se mantiene el sandbox (solo entrega a la cuenta dueña).
 * Ver docs/24-DOMINIO-CACAOCOLAB-ORG.md.
 */
export const FOLLOWUP_FROM =
  process.env.RESEND_FROM?.trim() || "Cacao Colab <onboarding@resend.dev>"

/** Remitente objetivo una vez el dominio esté Verified en Resend. */
export const FOLLOWUP_FROM_PRODUCTION = "Cacao Colab <seguimiento@cacaocolab.org>"
