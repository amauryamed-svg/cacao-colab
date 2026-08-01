import type { LegalDocument } from "./types"
import { LEGAL_CONTROLLER, TERMS_VERSION } from "./versions"

export const terminosDoc: LegalDocument = {
  slug: "terminos",
  title: "Términos de Uso",
  summary:
    "Condiciones del servicio Cacao Colab / cacaotier: cuenta, campus, Sembrar, marketplace y conducta.",
  updated: TERMS_VERSION,
  version: TERMS_VERSION,
  sections: [
    {
      id: "aceptacion",
      title: "1. Aceptación",
      paragraphs: [
        `Al crear una cuenta o usar ${LEGAL_CONTROLLER.site} aceptas estos Términos y la Política de Privacidad. Si no estás de acuerdo, no uses el servicio.`,
        "El opt-in marcado en el registro es la aceptación expresa de este contrato de uso de la plataforma digital.",
      ],
    },
    {
      id: "servicio",
      title: "2. Descripción del servicio",
      paragraphs: [
        "Cacao Colab ofrece formación (Dualita, Masters), herramientas de práctica (Sembrar), gamificación (Mazorcas Doradas), contenidos de conocimiento, vitrina de marketplace y canales de comunidad. Algunas funciones pueden estar en beta o requerir membresía futura.",
      ],
    },
    {
      id: "cuenta",
      title: "3. Cuenta y elegibilidad",
      paragraphs: [
        "Debes proporcionar información veraz y mantener la seguridad de tu acceso (magic link / código por email). Eres responsable de la actividad bajo tu cuenta. Debes tener capacidad legal para contratar; si actúas por una organización, declaras estar autorizado.",
      ],
    },
    {
      id: "contenido",
      title: "4. Contenido del usuario y licencia",
      paragraphs: [
        "Conservas derechos sobre el contenido que subas (bitácoras, perfiles). Nos otorgas licencia mundial no exclusiva para alojarlo y mostrarlo en el Colab con el fin de prestar el servicio. No publiques contenido ilegal, difamatorio, que infrinja PI de terceros o que ponga en riesgo la seguridad alimentaria con afirmaciones engañosas.",
      ],
    },
    {
      id: "pi",
      title: "5. Propiedad intelectual del Colab",
      paragraphs: [
        "Marca cacaotier, copy, curricula, software, ilustraciones y diseño pertenecen a sus titulares. No copies ni redistribuyas materiales de formación fuera de los usos permitidos en la plataforma sin autorización escrita.",
      ],
    },
    {
      id: "mazorcas",
      title: "6. Mazorcas Doradas y beneficios",
      paragraphs: [
        "Las Mazorcas Doradas son un sistema de lealtad interno. No son dinero, criptomoneda ni valor negociable fuera del catálogo vigente. Podemos ajustar reglas, caducidad o canjes con aviso razonable. Ver documentación de lealtad del Colab.",
      ],
    },
    {
      id: "terceros",
      title: "7. Enlaces y terceros",
      paragraphs: [
        "El Colab puede enlazar a cauacolombia.co, chocolatezurych.com, CoEx, Ecoyuma u otros. Sus términos y privacidad rigen esas experiencias. No controlamos sitios de terceros.",
      ],
    },
    {
      id: "disclaimer",
      title: "8. Aviso educativo y de producto",
      paragraphs: [
        "El contenido es educativo y de aceleración industrial del cacao. No sustituye asesoría legal, sanitaria, nutricional o regulatoria profesional. Decisiones de fermentación, inocuidad o comercialización son responsabilidad del usuario y de su operación.",
      ],
    },
    {
      id: "disponibilidad",
      title: "9. Disponibilidad y cambios",
      paragraphs: [
        "Procuramos alta disponibilidad pero no garantizamos operación ininterrumpida. Podemos modificar, suspender o discontinuar funciones. Actualizaremos estos Términos cuando haya cambios materiales (versión vigente en /legal/terminos).",
      ],
    },
    {
      id: "suspension",
      title: "10. Suspensión y terminación",
      paragraphs: [
        "Podemos suspender cuentas por abuso, fraude, incumplimiento o riesgo de seguridad. Puedes solicitar cierre escribiendo a soporte/privacidad; aplicará la política de borrado de datos.",
      ],
    },
    {
      id: "responsabilidad",
      title: "11. Limitación de responsabilidad",
      paragraphs: [
        "En la máxima medida permitida por la ley aplicable, el Colab y sus operadores no serán responsables de daños indirectos, lucro cesante o pérdida de datos derivados del uso o la imposibilidad de uso del servicio. Nada en estos términos limita derechos imperativos del consumidor en tu jurisdicción (incl. UE).",
      ],
    },
    {
      id: "ley",
      title: "12. Ley aplicable y disputas",
      paragraphs: [
        `Ley principal de interpretación: República de Colombia, sin perjuicio de derechos imperativos del consumidor en tu país de residencia (UE/EE.UU./otros). Foro preferente: tribunales de Colombia, salvo que una norma de protección al consumidor imponga otro fuero. Contacto amistoso previo: ${LEGAL_CONTROLLER.email}.`,
      ],
    },
    {
      id: "contacto",
      title: "13. Contacto",
      paragraphs: [`${LEGAL_CONTROLLER.email} · ${LEGAL_CONTROLLER.whatsapp}`],
    },
  ],
}
