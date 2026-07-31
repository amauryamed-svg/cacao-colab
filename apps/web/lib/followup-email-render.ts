import "server-only"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export type FollowupEmailKey = "day1" | "day7" | "day14"

/**
 * Misma fuente que se pega a mano en HubSpot (Marketing → Email → Source) —
 * un solo archivo, dos destinos. Ver emails/seguimiento/README.md.
 */
const TEMPLATE_FILE: Record<FollowupEmailKey, string> = {
  day1: "01-bienvenida-semilla.html",
  day7: "07-consistencia-mazorcas.html",
  day14: "14-maestria-repeticion.html",
}

export const FOLLOWUP_SUBJECT: Record<FollowupEmailKey, string> = {
  day1: "Primer surco · estudiar + practicar",
  day7: "MD recolectadas · rango · tip Sembrar",
  day14: "Ritual 3+3 · maestría por repetición",
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * Reemplazo literal de `{{ contact.KEY }}` — mismo formato de token que
 * usa HubSpot, para que sea el mismo archivo .html en los dos canales.
 */
export function renderFollowupTemplate(emailKey: FollowupEmailKey, data: Record<string, string>): string {
  const path = join(process.cwd(), "..", "..", "emails", "seguimiento", TEMPLATE_FILE[emailKey])
  const raw = readFileSync(path, "utf8")
  return raw.replace(/\{\{\s*contact\.([a-z0-9_]+)\s*\}\}/gi, (match, key: string) => {
    const value = data[key]
    return value === undefined ? match : escapeHtml(value)
  })
}
