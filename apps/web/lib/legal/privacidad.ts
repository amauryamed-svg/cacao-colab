import type { LegalDocument } from "./types"
import { LEGAL_CONTROLLER, LEGAL_POLICY_VERSION } from "./versions"

export const privacidadDoc: LegalDocument = {
  slug: "privacidad",
  title: "Política de Privacidad",
  summary:
    "Cómo Cacao Colab trata datos personales bajo estándares modernos de apps (UE GDPR/ePrivacy, EE.UU. CCPA/CPRA y leyes estatales, Colombia Ley 1581 / Decreto 1377).",
  updated: LEGAL_POLICY_VERSION,
  version: LEGAL_POLICY_VERSION,
  sections: [
    {
      id: "responsable",
      title: "1. Responsable del tratamiento",
      paragraphs: [
        `${LEGAL_CONTROLLER.name} es operado por ${LEGAL_CONTROLLER.operator}. Contacto de privacidad / DPO funcional: ${LEGAL_CONTROLLER.dpoContact}. WhatsApp: ${LEGAL_CONTROLLER.whatsapp}. Sitio: ${LEGAL_CONTROLLER.site}.`,
        "Esta política aplica a la web, futuras apps iOS/Android, campus Dualita, Sembrar, marketplace, CRM y comunicaciones asociadas al Colab.",
      ],
    },
    {
      id: "ambito",
      title: "2. Ámbito territorial y legislaciones",
      paragraphs: [
        "Diseñamos el Colab para usuarios en Colombia, Latinoamérica, la Unión Europea / EEE / Reino Unido y Estados Unidos. Aplicamos el régimen más protector que corresponda al residente:",
      ],
      bullets: [
        "UE/EEE/UK: Reglamento (UE) 2016/679 (GDPR), Directiva ePrivacy y, en UK, UK GDPR + Data Protection Act 2018.",
        "EE.UU.: California CCPA/CPRA; y, según residencia, leyes estatales de privacidad (p. ej. Virginia VCDPA, Colorado CPA, Connecticut CTDPA, Utah UCPA y equivalentes posteriores). No vendemos datos personales.",
        "Colombia: Ley 1581 de 2012, Decreto 1377 de 2013 y normas de habeas data / SIC.",
        "Menores: no dirigimos el servicio a menores de 13 años (COPPA, EE.UU.) ni a menores de 16 sin consentimiento parental verificable cuando aplique GDPR art. 8.",
      ],
    },
    {
      id: "datos",
      title: "3. Datos que tratamos",
      paragraphs: ["Según cómo uses el Colab, podemos tratar:"],
      bullets: [
        "Identidad y contacto: nombre, email, teléfono/WhatsApp, ciudad, organización.",
        "Cuenta y autenticación: identificadores de Supabase Auth, proveedores OAuth (Google/Apple), metadatos de sesión.",
        "Progreso educativo: módulos Dualita, XP, rachas, Sembrar (gotchi), Mazorcas Doradas, bitácoras de fermentación.",
        "CRM y marketing con opt-in: motivación, tipo de operación, UTMs, notas de seguimiento, preferencias de correo.",
        "Técnicos: cookies esenciales, preferencias de consentimiento, IP aproximada/logs de seguridad, user-agent, eventos de analítica solo con consentimiento cuando la ley lo exige.",
        "Pagos/marketplace (cuando existan): datos de pedido y facturación vía procesadores; no almacenamos PAN completo de tarjetas en nuestros servidores.",
      ],
    },
    {
      id: "finalidades",
      title: "4. Finalidades y bases legales",
      paragraphs: [
        "Tratamos datos solo para fines legítimos y proporcionados. Bases típicas (GDPR art. 6 / equivalentes):",
      ],
      bullets: [
        "Ejecución de contrato / medidas precontractuales: crear cuenta, campus, Sembrar, beneficios, soporte.",
        "Consentimiento (opt-in): comunicaciones de marketing, cookies no esenciales / analítica, ciertos perfiles comerciales.",
        "Interés legítimo: seguridad, prevención de abuso, mejora del producto (siempre con prueba de equilibrio y opt-out cuando aplique).",
        "Obligación legal: conservación fiscal, respuestas a autoridades competentes.",
        "Colombia: autorización previa, expresa e informada del Titular para tratamientos que la requieran; el opt-in al crear cuenta documenta esa autorización para el uso del servicio.",
      ],
    },
    {
      id: "optin",
      title: "5. Opt-in al crear usuario",
      paragraphs: [
        "No creamos cuenta educativa sin un acto afirmativo: debes marcar que aceptas la Política de Privacidad y los Términos antes de magic link, Google o Apple.",
        "El marketing (emails de nurturing, newsletters) es un consentimiento separado y revocable. Sin ese opt-in no te incluimos en campañas promocionales; sí podemos enviarte mensajes transaccionales del servicio (acceso, seguridad, cambios materiales de políticas).",
        "Registramos versión de política, marca temporal y fuente del consentimiento (cuenta / onboarding / cookies).",
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies y tecnologías similares",
      paragraphs: [
        "Usamos cookies esenciales para sesión, seguridad y recordar tu decisión de privacidad. Las cookies de analítica/medición solo se activan si aceptas esa categoría. Detalle en la Política de Cookies.",
      ],
    },
    {
      id: "encargados",
      title: "7. Encargados y transferencias",
      paragraphs: [
        "Compartimos datos con proveedores que actúan como encargados / service providers bajo contrato (procesamiento según instrucciones, medidas de seguridad, sin venta):",
      ],
      bullets: [
        "Supabase (Auth, base de datos, almacenamiento) — infra cloud.",
        "Vercel (hosting de la aplicación web).",
        "HubSpot (CRM y correos, cuando capturamos leads o sincronizamos progreso con opt-in aplicable).",
        "Sentry (diagnóstico de errores; minimizar PII en eventos).",
        "Proveedores OAuth: Google / Apple (según elijas).",
        "WhatsApp / Meta (si nos escribes por ese canal).",
      ],
    },
    {
      id: "transferencias",
      title: "8. Transferencias internacionales",
      paragraphs: [
        "Tus datos pueden procesarse en países distintos al tuyo (p. ej. EE.UU. o UE). Cuando el GDPR aplique, usamos cláusulas contractuales tipo (SCCs), decisiones de adecuación u otras salvaguardas art. 46, y evaluamos el riesgo del destino.",
        "En Colombia informamos la transferencia internacional y solicitamos autorización cuando la norma lo exige.",
      ],
    },
    {
      id: "retencion",
      title: "9. Conservación",
      paragraphs: [
        "Conservamos datos mientras la cuenta esté activa y el tiempo necesario para las finalidades, plazos legales o resolución de disputas. Tras eliminar la cuenta, borramos o anonimizamos en un plazo razonable (objetivo: ≤ 30 días operativos, salvo bloqueos legales). Logs de seguridad y backups rotan según política del proveedor.",
      ],
    },
    {
      id: "seguridad",
      title: "10. Seguridad",
      paragraphs: [
        "Aplicamos cifrado en tránsito (TLS), control de acceso (RLS en Supabase), privilegios mínimos, y revisión de secretos en entorno. Ningún sistema es 100 % invulnerable; si ocurre un incidente con riesgo alto te lo comunicaremos según GDPR art. 34 / leyes aplicables.",
      ],
    },
    {
      id: "derechos-ue",
      title: "11. Derechos en la Unión Europea / UK",
      paragraphs: ["Puedes ejercer, según corresponda:"],
      bullets: [
        "Acceso, rectificación, supresión (“derecho al olvido”), limitación, portabilidad, oposición.",
        "Retirar el consentimiento en cualquier momento sin afectar la licitud previa.",
        "No ser objeto de decisiones automatizadas con efectos jurídicos significativos sin las garantías del art. 22 GDPR (el Colab no toma decisiones crediticias automatizadas).",
        "Reclamar ante tu autoridad de control (p. ej. AEPD en España u otra del EEE; ICO en UK).",
      ],
    },
    {
      id: "derechos-usa",
      title: "12. Derechos en Estados Unidos (CCPA/CPRA y equivalentes)",
      paragraphs: [
        "Si eres residente de California u otro estado con ley similar, tienes derecho a conocer, acceder, corregir, eliminar y optar por no participar en “venta” o “compartición” para publicidad conductual cruzada. Cacao Colab no vende datos personales ni los comparte para publicidad comportamental de terceros a cambio de contraprestación.",
        "No discriminamos por ejercer derechos. Para ejercerlos escribe a privacidad (email del responsable) con asunto “Privacy Request – US” e indica estado de residencia. Verificaremos identidad de forma razonable.",
        "Agentes autorizados pueden presentar solicitudes con prueba de autorización.",
      ],
    },
    {
      id: "derechos-co",
      title: "13. Derechos en Colombia (habeas data)",
      paragraphs: [
        "Como Titular puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, y revocar la autorización, salvo obligación legal o contractual. Canal: email del responsable, asunto “Habeas Data”. Responderemos en los términos de la Ley 1581 / SIC.",
      ],
    },
    {
      id: "menores",
      title: "14. Menores",
      paragraphs: [
        "El servicio no está dirigido a menores de 13 años. Si detectamos una cuenta de un menor sin el consentimiento parental requerido, la deshabilitaremos y borraremos datos asociados. Padres/tutores: contáctanos para solicitudes COPPA / GDPR art. 8.",
      ],
    },
    {
      id: "cambios",
      title: "15. Cambios a esta política",
      paragraphs: [
        `Publicamos la versión vigente (${LEGAL_POLICY_VERSION}) en /legal/privacidad. Cambios materiales se anuncian en el sitio o por email cuando la ley lo requiera. El uso continuado tras la entrada en vigor, o un nuevo opt-in cuando sea necesario, implica el marco actualizado.`,
      ],
    },
    {
      id: "contacto",
      title: "16. Contacto",
      paragraphs: [
        `Privacidad / derechos: ${LEGAL_CONTROLLER.email}. WhatsApp: ${LEGAL_CONTROLLER.whatsapp}. También puedes usar /legal/derechos.`,
      ],
    },
  ],
}
