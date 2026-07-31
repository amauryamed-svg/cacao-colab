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
 * Sandbox de Resend: sin dominio propio verificado para Cacao Colab
 * (cauaculture.co queda fuera a propósito, es de otro producto CAÚA),
 * `onboarding@resend.dev` solo entrega al email dueño de la cuenta Resend.
 * Cambiar a un remitente real (ej. seguimiento@cacaocolab.co) en cuanto
 * exista un dominio verificado — ver docs/22-EMAIL-SEGUIMIENTO-CONSISTENCIA.md.
 */
export const FOLLOWUP_FROM = "Cacao Colab <onboarding@resend.dev>"
