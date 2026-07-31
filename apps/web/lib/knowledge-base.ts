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
    title: "Cacao of Excellence · Awards, lab y calidad global",
    eyebrow: "CoEx · Awards · Training & Lab · Research",
    summary:
      "Cacao of Excellence mejora la calidad del cacao y el reconocimiento de mercado: Awards (Best 50), entrenamiento y laboratorio R&D, investigación y recursos. El Colab usa su lente sensorial en Master Chocolatier sin atribuir medallas a Benevolo.",
    evidence: "public_program",
    body: [
      "Sitio oficial: cacaoofexcellence.org. Su misión es desbloquear el potencial de la calidad para mejorar medios de vida, biodiversidad y cadenas equitativas — Awards, training, lab y estándares compartidos.",
      "No «certifica fincas» como un sello orgánico: celebra muestras excepcionales (Best 50 desde 2009), forma capacidad en evaluación sensorial en el CoEx R&D Lab y publica investigación/recursos sobre flavour y mercados.",
      "Sebastián Escobar Parra (fermentación, bioprocesos, flavour chemistry) conecta la tradición investigativa colombiana con esa órbita de calidad. El campus cacaotier cita su línea en biomarcadores y ventanas temporales.",
      "Lección operativa para el Colab: muestra ciega, genotipo/fermentación/secado documentados, tipicidad sin defectos. Un premio o shortlist es evidencia puntual — no DO ni permiso EUDR. Master Chocolatier entrena el lente; Benevolo no reclama la medalla.",
    ],
    links: [
      {
        label: "Cacao of Excellence",
        href: "https://www.cacaoofexcellence.org/",
        note: "Programa oficial",
      },
      {
        label: "Mission & Vision",
        href: "https://www.cacaoofexcellence.org/about/",
        note: "Pilares CoEx",
      },
      {
        label: "Alliance Bioversity–CIAT · Escobar",
        href: "https://alliancebioversityciat.org/who-we-are/sebastian-escobar-parra",
        note: "Perfil institucional",
      },
      {
        label: "Master Chocolatier",
        href: "/aprende/chocolatier",
        note: "Lente CoEx en campus",
      },
    ],
    relatedCampus: ["/aprende/chocolatier", "/aprende/cacaotier", "/benevolo"],
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
      "La ruta recomendada: FEAR 5 como eje → TCS 19 / TCS 06 como contraste → Sembrar (bitácora, cartografía, agroforestería) → fermentación controlada → producto o pre-order Benevolo.",
      "Sembrar entrena al agricultor que recién empieza: planeación de finca idónea, cartografía social (parcelas, agua, vecinos) y modelos de agroforestería comunitaria — sin inventar stock Ecoyuma.",
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
      { label: "Abrir Sembrar", href: "/juega", note: "Laboratorio de siembra" },
      { label: "Únete al Colab", href: "/unete", note: "Colectivo generacional" },
    ],
    relatedCampus: ["/juega", "/sembrar", "/aprende/cacaotier", "/benevolo"],
  },
  {
    slug: "benevolo-traduccion",
    title: "Chocolate Benevolo · output Master Chocolatier",
    eyebrow: "Bean-to-bar · lente COEX · Aceleración Colab",
    summary:
      "Chocolate Benevolo es la marca acelerada cacaotier (separada del Master Chocolatier 70 %): duja de marañón FEAR 5 Quara × Zurych, tendencias y preorden.",
    evidence: "cacaotier_product",
    body: [
      "Benevolo no lleva tilde: se lee igual en español y en italiano. Chocolate Benevolo le pone las tildes a la e — acentúa la marca con un producto que se desea preordenar.",
      "Ya no es el capstone del Master Chocolatier. El Master entrena barra 70 % estilo CoEx/Awards; Benevolo acelera una SKU tendencia (gianduja/marañón) con el mismo criterio de origen.",
      "Cacao FEAR 5 del nodo Quara (Tame · Arauca). Zurych aporta cultura de transformación. Track Dualita en /campus/benevolo con diploma compartible.",
      "Fórmula: duja de marañón local, leche en polvo orgánica, alulosa y stevia. Neto 80 g. Preventa honesta mientras se cierra el primer lote.",
    ],
    links: [
      { label: "Preordenar Chocolate Benevolo", href: "/benevolo", note: "Marca acelerada" },
      { label: "Track Dualita Benevolo", href: "/campus/benevolo", note: "Aceleración" },
      { label: "Master Chocolatier 70 %", href: "/aprende/chocolatier", note: "Ruta hermana" },
      { label: "Zurych", href: "https://chocolatezurych.com", note: "Aliado de transformación" },
      { label: "Cacao of Excellence", href: "/conocimiento/cacao-of-excellence" },
    ],
    relatedCampus: ["/benevolo", "/campus/benevolo", "/aprende/chocolatier", "/marketplace"],
  },
]

export const benevoloProduct = {
  brand: "Chocolate Benevolo",
  wordmark: "Benevolo",
  owner: "master-chocolatier",
  domain: "ChocolateBenevolo.co",
  format: "Chocolatina de leche con frutos secos · Neto 80 g",
  tagline: "Duja de marañón. FEAR 5 de Quara. Se lee igual en español y en italiano.",
  accentLine: "Benevolo sin tilde. Chocolate Benevolo le pone las tildes a la e.",
  description:
    "Marca acelerada cacaotier: chocolatina de leche con duja de marañón inspirada en la gianduja, cacao FEAR 5 del nodo Quara (Tame · Arauca), leche en polvo orgánica, alulosa y stevia. Hermana del Master Chocolatier 70 % — tendencia + oficio + preventa.",
  alliances: [
    { name: "Zurych", role: "Cultura bean-to-bar y transformación", place: "Landázuri · Santander", href: "https://chocolatezurych.com" },
    { name: "Quara Cacao", role: "Nodo FEAR 5 · origen Arauca", place: "Tame · Arauca", href: "/marketplace" },
    { name: "Master Chocolatier 70 %", role: "Ruta hermana de excelencia", place: "Campus cacaotier", href: "/aprende/chocolatier" },
    { name: "Track Benevolo", role: "Aceleración Dualita", place: "Campus", href: "/campus/benevolo" },
  ],
  formula: [
    { label: "Cacao", value: "FEAR 5 · Quara / Arauca · fermentación controlada" },
    { label: "Duja", value: "Marañón local · inspiración gianduja" },
    { label: "Leche", value: "Leche en polvo orgánica" },
    { label: "Dulzor", value: "Alulosa + stevia" },
  ],
  claims: [
    { label: "Genética", value: "FEAR 5 · Quara · Arauca" },
    { label: "Alianza", value: "Zurych × Quara Cacao" },
    { label: "Formato", value: "Bars. · 80 g" },
    { label: "Salida", value: "Master Chocolatier · COEX lens" },
  ],
  heroImage: "/benevolo/bars-fear5.png",
  status: "preorder" as const,
  whatIsReady: [
    "Identidad Chocolate Benevolo y empaque aspiracional",
    "Track Dualita Benevolo (marca acelerada separada del Master 70 %)",
    "Alianza Zurych × Quara (nodo FEAR 5)",
    "Fórmula: FEAR 5, duja de marañón, leche orgánica, alulosa, stevia",
    "Canal de preorden / preventa + diploma compartible",
  ],
  whatIsNotReady: [
    "Checkout automático con inventario confirmado",
    "Medalla COEX atribuida a esta SKU (usamos el lente, no el premio)",
    "Certificación orgánica del producto terminado completa",
  ],
  preorderWhatsapp:
    "https://wa.me/573102227848?text=Hola%20Chocolate%20Benevolo%2C%20quiero%20preordenar%20Bars.%20FEAR%205%20Quara%20con%20duja%20de%20mara%C3%B1%C3%B3n%20(80g).",
}

export const ecosystemSpearhead = {
  title: "La confluencia real de Cacao Colab",
  body: "Conocimiento avanzado (papers, EUDR, COEX, genética) → práctica de finca (Ecoyuma, labranza, fermentación) → producto que la gente come (Benevolo y marcas colaboradoras). Sin esa traducción no hay valor agregado; solo discurso.",
  steps: [
    { n: "01", title: "Sembrar con criterio", href: "/juega", cta: "Sembrar · Ecoyuma" },
    { n: "02", title: "Fermentar con evidencia", href: "/aprende/cacaotier", cta: "Campus cacaotier" },
    { n: "03", title: "Cumplir el mercado", href: "/conocimiento/eudr-deforestacion", cta: "EUDR y orgánico" },
    { n: "04", title: "Formular a la mesa", href: "/aprende/chocolatier", cta: "Master Chocolatier · Benevolo" },
  ],
}

export function getKnowledgeTopic(slug: string) {
  return knowledgeTopics.find((topic) => topic.slug === slug) ?? null
}

export const knowledgeSlugs = knowledgeTopics.map((topic) => topic.slug)
