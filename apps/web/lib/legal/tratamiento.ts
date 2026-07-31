import type { LegalDocument } from "./types"
import { DATA_PROCESSING_VERSION, LEGAL_CONTROLLER, LEGAL_POLICY_VERSION } from "./versions"

export const tratamientoDoc: LegalDocument = {
  slug: "tratamiento-datos",
  title: "Política de Tratamiento de Datos Personales",
  summary:
    "Aviso de tratamiento / habeas data: finalidades, autorización, encargados y canales de atención (Colombia + alineación GDPR art. 13-14).",
  updated: DATA_PROCESSING_VERSION,
  version: DATA_PROCESSING_VERSION,
  sections: [
    {
      id: "objeto",
      title: "1. Objeto",
      paragraphs: [
        `Esta Política de Tratamiento complementa la Política de Privacidad (versión ${LEGAL_POLICY_VERSION}) y describe de forma específica el tratamiento de datos personales por ${LEGAL_CONTROLLER.name}, operado por ${LEGAL_CONTROLLER.operator}.`,
        "En Colombia constituye el marco de autorización informada (Ley 1581 de 2012 y Decreto 1377). En la UE cumple la función de información transparente al interesado.",
      ],
    },
    {
      id: "datos-sensibles",
      title: "2. Datos sensibles y de menores",
      paragraphs: [
        "No solicitamos datos sensibles (salud, biometría, ideología, etc.) como requisito del servicio. Si voluntariamente los incluyes en bitácoras u otros campos libres, limítaalos; los trataremos con la máxima restricción y podremos eliminarlos.",
        "No recolectamos conscientemente datos de menores de 13 años. Ver sección de menores en la Política de Privacidad.",
      ],
    },
    {
      id: "autorizacion",
      title: "3. Autorización / opt-in",
      paragraphs: [
        "La autorización para el tratamiento necesario del servicio se obtiene mediante casilla no pre-marcada al crear cuenta (“Acepto Privacidad y Términos”) y, para leads del onboarding, casilla equivalente antes de enviar datos al CRM.",
        "La autorización para fines comerciales / marketing es independiente y opcional. Puedes revocarla en cualquier momento escribiendo a privacidad o desactivando marketing en tu cuenta cuando esté disponible.",
      ],
    },
    {
      id: "finalidades-detalladas",
      title: "4. Finalidades detalladas",
      paragraphs: [],
      bullets: [
        "Prestación del campus, Sembrar, lealtad y marketplace.",
        "Soporte y comunicación transaccional.",
        "CRM interno y HubSpot para acompañamiento comercial solo con base legal válida (consentimiento o interés legítimo acotado).",
        "Seguridad, prevención de fraude y cumplimiento legal.",
        "Analítica de producto con consentimiento de cookies no esenciales.",
        "Mejora de contenidos educativos y de la experiencia Colab (datos agregados o seudonimizados cuando sea posible).",
      ],
    },
    {
      id: "encargados",
      title: "5. Encargados del tratamiento",
      paragraphs: [
        "Supabase, Vercel, HubSpot, Sentry y proveedores OAuth actúan como encargados o controladores conjuntos según el servicio. Firmamos o aceptamos DPAs / términos de procesamiento de datos de esos proveedores. Lista actualizada en la Política de Privacidad §7.",
      ],
    },
    {
      id: "seguridad-medidas",
      title: "6. Medidas de seguridad",
      paragraphs: [
        "Control de acceso por usuario, Row Level Security, secretos en variables de entorno, TLS, principio de mínimo privilegio para builders (Amaury, Hellen, Oscar) y registro de consentimientos con versión de política.",
      ],
    },
    {
      id: "derechos-canal",
      title: "7. Canal de atención al Titular / interesado",
      paragraphs: [
        `Email: ${LEGAL_CONTROLLER.email} — asuntos sugeridos: “Habeas Data”, “GDPR Request”, “CCPA Request”. Plazo de respuesta: según norma aplicable (p. ej. 10–15 días hábiles en Colombia para consultas/reclamos en los términos legales; 30 días en GDPR con posible prórroga; plazos CCPA/CPRA).`,
        "También: formulario orientativo en /legal/derechos.",
      ],
    },
    {
      id: "vigencia",
      title: "8. Vigencia",
      paragraphs: [
        `Versión ${DATA_PROCESSING_VERSION}. Permanece vigente mientras se use el Colab y hasta nueva versión publicada.`,
      ],
    },
  ],
}
