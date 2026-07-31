import { cookiesDoc } from "./cookies"
import { derechosDoc } from "./derechos"
import { privacidadDoc } from "./privacidad"
import { terminosDoc } from "./terminos"
import { tratamientoDoc } from "./tratamiento"
import type { LegalDocument } from "./types"

export type { LegalDocument, LegalSection } from "./types"
export {
  COOKIE_POLICY_VERSION,
  COOKIE_PREFS_COOKIE,
  CONSENT_COOKIE,
  DATA_PROCESSING_VERSION,
  LEGAL_CONTROLLER,
  LEGAL_POLICY_VERSION,
  TERMS_VERSION,
} from "./versions"

export const legalDocuments: LegalDocument[] = [
  privacidadDoc,
  terminosDoc,
  tratamientoDoc,
  cookiesDoc,
  derechosDoc,
]

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((doc) => doc.slug === slug)
}
