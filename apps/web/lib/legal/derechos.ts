import type { LegalDocument } from "./types"
import { LEGAL_CONTROLLER, LEGAL_POLICY_VERSION } from "./versions"

export const derechosDoc: LegalDocument = {
  slug: "derechos",
  title: "Ejercicio de derechos (DSAR / Habeas Data)",
  summary:
    "Cómo solicitar acceso, borrado, portabilidad, oposición u opt-out de venta/compartición (UE, EE.UU., Colombia).",
  updated: LEGAL_POLICY_VERSION,
  version: LEGAL_POLICY_VERSION,
  sections: [
    {
      id: "como",
      title: "1. Cómo presentar una solicitud",
      paragraphs: [
        `Escribe a ${LEGAL_CONTROLLER.email} desde el email de tu cuenta (o indica otro medio de verificación). Asunto según tu región:`,
      ],
      bullets: [
        "“GDPR Request” — acceso, rectificación, borrado, limitación, portabilidad, oposición, retiro de consentimiento.",
        "“CCPA Request” o “US Privacy Request” — know / delete / correct / opt-out of sale-share (no vendemos datos).",
        "“Habeas Data” — Colombia Ley 1581.",
        "“Marketing opt-out” — dejar de recibir nurturing no transaccional.",
      ],
    },
    {
      id: "incluye",
      title: "2. Qué incluir",
      paragraphs: [],
      bullets: [
        "Nombre completo y email de la cuenta Colab.",
        "País / estado de residencia.",
        "Tipo de derecho que ejerces.",
        "Si actúas como agente autorizado (EE.UU.): mandato o autorización firmada.",
      ],
    },
    {
      id: "plazos",
      title: "3. Plazos orientativos",
      paragraphs: [
        "UE/UK: normalmente 1 mes (prorrogable según GDPR). California/CPRA: generalmente 45 días (prorrogable). Colombia: términos de la Ley 1581 / SIC para consultas y reclamos. Te confirmaremos recepción y podremos pedir datos adicionales solo para verificar identidad.",
      ],
    },
    {
      id: "limites",
      title: "4. Límites",
      paragraphs: [
        "Podemos denegar o limitar solicitudes cuando la ley lo permita (p. ej. obligación de conservación, seguridad de terceros, solicitudes manifiestamente infundadas o excesivas). Explicaremos el motivo.",
      ],
    },
    {
      id: "autoridades",
      title: "5. Autoridades",
      paragraphs: [
        "UE: autoridad de control de tu país. UK: ICO. Colombia: Superintendencia de Industria y Comercio. California: Office of the Attorney General / CPPA según el caso.",
      ],
    },
  ],
}
