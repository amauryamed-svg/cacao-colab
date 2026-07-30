/**
 * Base de conocimiento del ecosistema Cacao Colab.
 * Cada entrada declara nivel de evidencia. No inventa alianzas firmadas ni
 * denominaciones registradas: distingue marco público, ruta en curso y
 * producto propio de cacaotier.
 */

export type EvidenceLevel =
  | "published_research"
  | "regulation"
  | "public_program"
  | "territorial_process"
  | "commercial_catalog"
  | "cacaotier_product"
  | "colab_route"

export type KnowledgeTopic = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  evidence: EvidenceLevel
  body: string[]
  links: { label: string; href: string; note?: string }[]
  relatedCampus?: string[]
}

export type VarietyProfile = {
  code: string
  aliases?: string[]
  family: string
  originNote: string
  whyItMatters: string
  ecoyumaUrl: string
  evidence: EvidenceLevel
  priority: "primary" | "priority" | "catalog"
}

export const evidenceLabels: Record<EvidenceLevel, string> = {
  published_research: "Investigación publicada",
  regulation: "Marco regulatorio",
  public_program: "Programa / institución pública",
  territorial_process: "Proceso territorial en curso",
  commercial_catalog: "Catálogo comercial externo",
  cacaotier_product: "Producto cacaotier",
  colab_route: "Ruta Cacao Colab",
}

/** Variedades prioritarias para siembra + fermentación de precisión. */
export const priorityVarieties: VarietyProfile[] = [
  {
    code: "FEAR 5",
    aliases: ["FEAR-5", "Federación Arauquita 5", "Arauquita 5"],
    family: "Trinitario comercial · Fedecacao",
    originNote:
      "Clon regional asociado a Arauca/Arauquita. Fue el material del estudio Santander et al. (2025) en biorreactor: Fine-Flavor bajo fermentación controlada.",
    whyItMatters:
      "Es la variedad que cacaotier promueve como puente entre genética de finca, bioproceso y producto Benevolo. Compite en calidad cuando la fermentación, el secado y la trazabilidad se hacen bien.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/45-plantula-de-cacao-fear-05.html",
    evidence: "commercial_catalog",
    priority: "primary",
  },
  {
    code: "TCS 19",
    aliases: ["TCS-19", "TSS 19"],
    family: "Clon regional · catálogo Ecoyuma",
    originNote:
      "Listada en Ecoyuma como plántula injertada TCS-19. En campo a veces se menciona como TSS 19; el SKU comercial verificado usa TCS.",
    whyItMatters:
      "Prioridad de renovación genética junto a FEAR 5 para diversificar lotes y comparar perfiles sensoriales bajo el mismo protocolo de fermentación.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/44-plantula-de-cacao-tcs-19.html",
    evidence: "commercial_catalog",
    priority: "priority",
  },
  {
    code: "TCS 06",
    aliases: ["TCS-06", "TSS 6", "TCS-6"],
    family: "Clon regional · catálogo Ecoyuma",
    originNote:
      "Listada en Ecoyuma como plántula injertada TCS-06. Alias de campo TSS 6; el catálogo usa TCS.",
    whyItMatters:
      "Segunda prioridad de comparación genética para labranzas que quieren contrastar rendimiento, sanidad y potencial Fine-Flavor con FEAR 5.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/42-plantula-de-cacao-tcs-06.html",
    evidence: "commercial_catalog",
    priority: "priority",
  },
]

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    slug: "eudr-deforestacion",
    title: "EUDR · cacao libre de deforestación",
    eyebrow: "Mercado europeo · diligencia debida",
    summary:
      "El Reglamento (UE) 2023/1115 exige que el cacao y el chocolate puestos en la UE sean legales, trazables y no asociados a deforestación posterior al 31 de diciembre de 2020.",
    evidence: "regulation",
    body: [
      "Aplica a grano, manteca, polvo y chocolate. La obligación formal cae sobre operadores en la UE, pero la cadena colombiana debe entregar geolocalización de parcela, legalidad y evidencias de riesgo nulo o despreciable.",
      "Las fechas de aplicación se han aplazado: el relato operativo vigente apunta a grandes operadores desde el 30 de diciembre de 2026 y a micro/pequeños desde el 30 de junio de 2027. Verifica siempre el texto oficial y las guías actualizadas antes de comprometer un embarque.",
      "En Colombia, FEDECACAO, EFI, Swisscontact, la Delegación de la UE y otros actores públicos/privados han publicado herramientas de apoyo a la diligencia debida. Son guías: no sustituyen la declaración del operador europeo.",
      "Para Cacao Colab, EUDR se traduce en práctica de finca: polígono de la labranza, prueba de tenencia/legalidad, bitácora de lote y vínculo con el campus de fermentación. Sin parcela georreferenciada no hay narrativa Fine-Flavor vendible a Europa.",
    ],
    links: [
      {
        label: "Reglamento (UE) 2023/1115 · EUR-Lex",
        href: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1115",
        note: "Texto legal",
      },
      {
        label: "FEDECACAO · herramienta de legalidad EUDR cacao",
        href: "https://www.fedecacao.com.co/post/el-subsector-cacaotero-cuenta-con-herramientas-de-legalidad-para-exportar-bajo-los-requisitos-del-e",
        note: "Orientación nacional",
      },
      {
        label: "EFI Legality Navigator",
        href: "https://legalitynavigator.efi.int/",
        note: "Marco legal por país / commodity",
      },
      {
        label: "UPRA · preparación Colombia EUDR",
        href: "https://upra.gov.co/es-co/sala-de-prensa/noticias/colombia-se-prepara-para-cumplir-con-el-reglamento-eudr-11152023",
        note: "Contexto institucional",
      },
    ],
    relatedCampus: ["/aprende/cacaotier", "/campus/arquitecto-fermentacion"],
  },
  {
    slug: "organico-ue-swisscontact-fao",
    title: "Ruta orgánica, UE, Swisscontact y FAO",
    eyebrow: "Certificación · cooperación · mercados",
    summary:
      "Lo orgánico y lo libre de deforestación no son lo mismo. La certificación orgánica abre un segmento; EUDR aplica a todo el cacao que entre a la UE. Swisscontact, FAO y programas de la UE aparecen como actores de acompañamiento técnico en Colombia.",
    evidence: "public_program",
    body: [
      "Un lote orgánico certificado sigue necesitando diligencia debida EUDR si viaja a Europa. La certificación no reemplaza geolocalización ni legalidad de la parcela.",
      "Swisscontact ha participado, junto a EFI y FEDECACAO, en el armado de herramientas de legalidad para cacao bajo EUDR. Eso no implica un contrato operativo automático con Cacao Colab: es un marco de referencia del ecosistema.",
      "FAO y alianzas de desarrollo (incluida la presencia en directorios de ferias como Chocoshow) conectan paz, territorios y productos con identidad. Úsalos como puertas de cooperación, no como sello ya ganado por el Colab.",
      "La ruta práctica Colab: 1) sanear parcela y trazabilidad, 2) decidir si orgánico aporta margen real, 3) alinear fermentación/secado con el claim, 4) traducir evidencia a empaque y a comprador.",
    ],
    links: [
      {
        label: "Swisscontact Colombia",
        href: "https://www.swisscontact.org/es/paises/colombia",
        note: "Cooperación técnica",
      },
      {
        label: "FAO Colombia",
        href: "https://www.fao.org/colombia/es/",
        note: "Agenda agroalimentaria",
      },
      {
        label: "Delegación UE en Colombia",
        href: "https://www.eeas.europa.eu/delegations/colombia_es",
        note: "Programas de bosques, clima y cadenas",
      },
    ],
    relatedCampus: ["/aprende", "/marketplace"],
  },
  {
    slug: "denominacion-origen",
    title: "Denominación de origen e indicaciones geográficas",
    eyebrow: "Arauca · Orinoquía · SIC",
    summary:
      "El cacao araucano busca denominación de origen; el trámite ante la Superintendencia de Industria y Comercio sigue en disputa política y técnica (origen exclusivo vs. Orinoquía compartida). No está consolidado como DO registrada en este hub.",
    evidence: "territorial_process",
    body: [
      "Una denominación de origen o indicación geográfica protege un vínculo entre calidad/reputación y territorio. En Colombia se tramita ante la SIC con evidencia histórica, genética, ambiental y de uso.",
      "Arauca ha insistido en un origen exclusivo («cacao araucano»). Otras propuestas hablan de Orinoquía. Hasta que exista registro firme, el Colab habla de origen declarado y trazable, no de DO ya otorgada.",
      "FEAR 5 y otros clones regionales alimentan el argumento de tipicidad, pero la genética sola no basta: hace falta pliego, mapa, gobernanza y control de uso de la marca colectiva.",
      "Mientras tanto, la ventaja competitiva se construye con lote georreferenciado, fermentación documentada y storytelling honesto — exactamente la promesa de cacaotier + Benevolo.",
    ],
    links: [
      {
        label: "SIC · Propiedad industrial (DO / IG)",
        href: "https://www.sic.gov.co/",
        note: "Autoridad registral",
      },
      {
        label: "Gobernación de Arauca · agenda cacaotera",
        href: "https://arauca.gov.co/",
        note: "Proceso territorial",
      },
    ],
    relatedCampus: ["/aprende/cacaotier", "/conocimiento/fear5-ecoyuma"],
  },
  {
    slug: "cacao-of-excellence",
    title: "Cacao of Excellence · Roma y la calidad internacional",
    eyebrow: "COEX · Bioversity / CIAT · Escobar",
    summary:
      "Cacao of Excellence es el programa de referencia mundial para evaluar y premiar cacaos de origen. Su laboratorio de calidad está ligado a la Alliance of Bioversity International and CIAT; Sebastián Escobar Parra ha liderado trabajo de fermentación, flavour science y calidad en esa órbita.",
    evidence: "public_program",
    body: [
      "COEX no «certifica fincas» como un sello orgánico: selecciona y evalúa muestras bajo protocolos sensoriales e instrumentales exigentes, con sede histórica asociada a Roma/Italia y eventos internacionales.",
      "Sebastián Escobar Parra (fermentación, bioprocesos, flavour chemistry) conecta la tradición investigativa colombiana —incluidos trabajos sobre calidad intermedia a 120 h y cadenas de valor— con la plataforma global de calidad. El campus cacaotier cita su línea cuando habla de biomarcadores y ventanas temporales.",
      "Para marcas del Colab, la lección operativa es: prepara muestra ciega, documenta genotipo/fermentación/secado, y trata un premio o shortlist como evidencia puntual, no como DO ni como permiso de exportar a la UE.",
      "La traducción Colab: lo que un paper o un panel COEX mide en laboratorio, Benevolo y las marcas colaboradoras deben poder explicar en una barra, una ficha de lote y una conversación con el consumidor.",
    ],
    links: [
      {
        label: "Cacao of Excellence",
        href: "https://www.cacaofexcellence.org/",
        note: "Programa oficial",
      },
      {
        label: "Alliance Bioversity–CIAT · Escobar",
        href: "https://alliancebioversityciat.org/who-we-are/sebastian-escobar-parra",
        note: "Perfil institucional",
      },
    ],
    relatedCampus: ["/aprende/cacaotier", "/campus/arquitecto-fermentacion", "/benevolo"],
  },
  {
    slug: "fear5-ecoyuma",
    title: "FEAR 5, TCS y vivero Ecoyuma",
    eyebrow: "Genética · plántulas · labranza",
    summary:
      "Ecoyuma (tienda.ecoyuma.com.co) ofrece plántulas injertadas de cacao. FEAR 5 es la prioridad de cacaotier; TCS 19 y TCS 06 completan la canasta de renovación genética (a veces llamadas TSS en campo).",
    evidence: "commercial_catalog",
    body: [
      "Sin material vegetal sano no hay Fine-Flavor repetible. El Colab enlaza el vivero con el campus: compras la plántula, registras la labranza y aprendes a fermentar el lote.",
      "FEAR 5 (Trinitario comercial Fedecacao) es el genotipo del paper de biorreactor y el corazón de Benevolo. TCS 19 y TCS 06 permiten comparar sanidad, rendimiento y perfil bajo el mismo protocolo.",
      "Ecoyuma es un catálogo externo. Precios, stock y logística los define la tienda; Cacao Colab no inventa disponibilidad. Verifica siempre el producto en tienda.ecoyuma.com.co antes de planear siembra.",
      "La ruta recomendada: FEAR 5 como eje → TCS 19 / TCS 06 como contraste → bitácora Gotchi/campus → fermentación controlada → producto o pre-order Benevolo.",
    ],
    links: [
      {
        label: "Ecoyuma · plántulas de cacao",
        href: "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao",
        note: "Catálogo",
      },
      {
        label: "Plántula FEAR-5",
        href: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/45-plantula-de-cacao-fear-05.html",
        note: "Prioridad cacaotier",
      },
      {
        label: "Plántula TCS-19",
        href: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/44-plantula-de-cacao-tcs-19.html",
      },
      {
        label: "Plántula TCS-06",
        href: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/42-plantula-de-cacao-tcs-06.html",
      },
    ],
    relatedCampus: ["/juega", "/aprende/cacaotier", "/benevolo"],
  },
  {
    slug: "benevolo-traduccion",
    title: "Benevolo · del paper a la mesa",
    eyebrow: "Salida práctica de cacaotier",
    summary:
      "Benevolo Cacao es la barra de leche con marañón y cacao FEAR 5 fermentado de forma controlada: la traducción comestible de diez años de ruta y del conocimiento de bioproceso.",
    evidence: "cacaotier_product",
    body: [
      "El Colab no termina en un PDF. Benevolo demuestra que un clon, un protocolo de fermentación y una tendencia de mercado (leche + marañón + Fine-Flavor) pueden encontrarse en un producto que la gente compra.",
      "Es la punta de lanza para marcas colaboradoras: si una marca entra a la ruta cacaotier, puede subir calidad, innovación y narrativa sin perder identidad.",
      "La preventa / pre-order es el mecanismo honesto mientras se cierra producción. No se simula un checkout inventado: se captura interés real y se informa alcance.",
    ],
    links: [
      { label: "Abrir Benevolo", href: "/benevolo", note: "Producto + pre-order" },
      { label: "Campus fermentación", href: "/aprende/cacaotier" },
    ],
    relatedCampus: ["/benevolo", "/marketplace"],
  },
]

export const benevoloProduct = {
  brand: "Benevolo Cacao",
  owner: "cacaotier",
  tagline: "Leche, marañón y FEAR 5 fermentado con criterio.",
  description:
    "Barra de chocolate con leche, marañón y cacao FEAR 5 fermentado de forma controlada. Es la salida práctica de cacaotier: convierte papers, curvas de pH y diez años de ruta en un alimento que la gente puede preordenar.",
  claims: [
    { label: "Genética", value: "FEAR 5 · Trinitario comercial" },
    { label: "Proceso", value: "Fermentación controlada documentada" },
    { label: "Fórmula", value: "Leche + marañón + cacao Fine-Flavor" },
    { label: "Intención", value: "Traducir biotech a cocina cotidiana" },
  ],
  status: "preorder" as const,
  whatIsReady: [
    "Narrativa y ficha de producto",
    "Vínculo con el campus de fermentación",
    "Canal de preventa por WhatsApp / cuenta",
  ],
  whatIsNotReady: [
    "Checkout automático con stock confirmado",
    "Claim de DO o premio COEX sobre esta barra",
    "Certificación orgánica automática del SKU",
  ],
  preorderWhatsapp:
    "https://wa.me/573102227848?text=Hola%20Benevolo%20Cacao%2C%20quiero%20preordenar%20la%20barra%20de%20leche%20con%20mara%C3%B1%C3%B3n%20y%20FEAR%205.",
}

export const ecosystemSpearhead = {
  title: "La confluencia real de Cacao Colab",
  body: "Conocimiento avanzado (papers, EUDR, COEX, genética) → práctica de finca (Ecoyuma, labranza, fermentación) → producto que la gente come (Benevolo y marcas colaboradoras). Sin esa traducción no hay valor agregado; solo discurso.",
  steps: [
    { n: "01", title: "Sembrar con criterio", href: "/conocimiento/fear5-ecoyuma", cta: "FEAR 5 · Ecoyuma" },
    { n: "02", title: "Fermentar con evidencia", href: "/aprende/cacaotier", cta: "Campus cacaotier" },
    { n: "03", title: "Cumplir el mercado", href: "/conocimiento/eudr-deforestacion", cta: "EUDR y orgánico" },
    { n: "04", title: "Llevarlo a la mesa", href: "/benevolo", cta: "Preordenar Benevolo" },
  ],
}

export function getKnowledgeTopic(slug: string) {
  return knowledgeTopics.find((topic) => topic.slug === slug) ?? null
}

export const knowledgeSlugs = knowledgeTopics.map((topic) => topic.slug)
