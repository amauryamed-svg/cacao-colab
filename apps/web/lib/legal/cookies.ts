import type { LegalDocument } from "./types"
import { COOKIE_POLICY_VERSION, LEGAL_CONTROLLER } from "./versions"

export const cookiesDoc: LegalDocument = {
  slug: "cookies",
  title: "Política de Cookies",
  summary:
    "Uso de cookies y almacenamiento local alineado con ePrivacy (UE), transparencia CCPA y buenas prácticas de apps modernas.",
  updated: COOKIE_POLICY_VERSION,
  version: COOKIE_POLICY_VERSION,
  sections: [
    {
      id: "que-son",
      title: "1. Qué son las cookies",
      paragraphs: [
        "Las cookies son pequeños archivos o mecanismos similares (localStorage, sessionStorage) que el sitio guarda en tu dispositivo para recordar preferencias, mantener sesión o medir uso.",
      ],
    },
    {
      id: "categorias",
      title: "2. Categorías que usamos",
      paragraphs: [],
      bullets: [
        "Esenciales / estrictamente necesarias: autenticación Supabase, protección CSRF/sesión, recordar tu elección de cookies y el opt-in de cuenta pendiente de completar. Base: interés legítimo / necesidad del servicio (ePrivacy). No requieren opt-in de marketing.",
        "Preferencias: idioma o UI futura (si se activan).",
        "Analítica / medición: visitor_id, session_id, page_view y eventos de producto. Solo con tu consentimiento previo cuando te encuentras en UE/EEE/UK o si eliges “Aceptar todas”. Puedes rechazarlas y el Colab sigue funcionando.",
        "Marketing: no desplegamos píxeles publicitarios de terceros por defecto. Si se añaden en el futuro, pedirán consentimiento separado.",
      ],
    },
    {
      id: "lista",
      title: "3. Cookies y claves principales",
      paragraphs: ["Identificadores orientativos (pueden evolucionar):"],
      bullets: [
        "colab_cookie_consent — preferencias de cookies (esencial).",
        "colab_auth_consent — consentimiento legal pendiente de persistir tras magic link (esencial, corta duración).",
        "colab_onboarded — recordar si completaste o saltaste el gate de bienvenida (preferencia/UX).",
        "Cookies de sesión Supabase Auth — acceso seguro.",
        "localStorage: colab_visitor_id / colab_session_id / colab_utms / progreso local — analítica o UX; la telemetría al servidor respeta tu opt-in de analítica.",
      ],
    },
    {
      id: "gestion",
      title: "4. Cómo gestionarlas",
      paragraphs: [
        "Usa el banner de cookies (primera visita) o vuelve a abrirlo desde el pie /legal/cookies. También puedes borrar cookies desde tu navegador; al hacerlo pediremos de nuevo tu preferencia.",
        "En EE.UU., las señales GPC (Global Privacy Control) se interpretan como opt-out de “venta/compartición” publicitaria; como no vendemos datos, la señal refuerza que no activemos tracking de marketing no esencial.",
      ],
    },
    {
      id: "retencion",
      title: "5. Duración",
      paragraphs: [
        "Las de sesión caducan al cerrar el navegador. Las de consentimiento y onboarding pueden durar hasta 12 meses (o hasta que las borres). Rotamos identificadores analíticos cuando restableces consentimiento.",
      ],
    },
    {
      id: "contacto",
      title: "6. Contacto",
      paragraphs: [
        `${LEGAL_CONTROLLER.email}. Más detalle de tratamiento en /legal/privacidad y /legal/tratamiento-datos.`,
      ],
    },
  ],
}
