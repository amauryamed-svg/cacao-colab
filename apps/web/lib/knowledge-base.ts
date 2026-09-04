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
    aliases: ["FEAR-5", "Federación Arauquita 5", "Arauquita 5", "Fedecacao Arauquita 5"],
    family: "Modelo araucano · Trinitario · Fedecacao",
    originNote:
      "Clon regional de Arauquita (Arauca), seleccionado ~2002. Eje del modelo araucano con FTA 2 y FSA 13. Material del estudio Santander et al. (2025) en biorreactor y del paper de fermentación Colab.",
    whyItMatters:
      "Puente entre genética de finca, bioproceso y Benevolo. Plántula verificable en Ecoyuma; tipicidad defendible ante panel cuando fermentación y trazabilidad se hacen bien.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/cacao-injertado-regional/45-plantula-de-cacao-fear-05.html",
    evidence: "commercial_catalog",
    priority: "primary",
  },
  {
    code: "FTA 2",
    aliases: ["FTA-2", "Fedecacao Tame 2", "Tame 2"],
    family: "Modelo araucano · Fedecacao Tame",
    originNote:
      "Clon Fedecacao Tame 2. Con FEAR 5 y FSA 13 integra el modelo araucano citado por Fedecacao en Arauquita (galardones Salón du Chocolat París 2010–2011).",
    whyItMatters:
      "Completa el arreglo clonal araucano. Sembrar lo promueve como material de tipicidad territorial; Cacao Colab no inventa stock de vivero.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao",
    evidence: "territorial_process",
    priority: "priority",
  },
  {
    code: "FSA 13",
    aliases: ["FSA-13", "Fedecacao Saravena 13", "Saravena 13"],
    family: "Modelo araucano · Fedecacao Saravena",
    originNote:
      "Clon Fedecacao Saravena 13. Tercer genotipo del modelo araucano junto a FEAR 5 y FTA 2; recurrente en descripciones de calidad de Arauca.",
    whyItMatters:
      "Evita leer tipicidad como monoclon. En Sembrar se etiqueta aparte; no mezclar en un solo lote de fermentación si quieres atribuir perfil.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao",
    evidence: "territorial_process",
    priority: "priority",
  },
  {
    code: "FSV 41",
    aliases: ["FSV-41", "Fedecacao San Vicente 41", "San Vicente 41"],
    family: "Referencia CoEx · Fedecacao San Vicente",
    originNote:
      "Clon Fedecacao San Vicente 41. Presente, junto a FEAR 5, en la muestra oro Cacao of Excellence (Ámsterdam, feb. 2024) de WORKAKAO / Agroguamal · Guamal Meta. No atribuir tipificación a Chocolover ni a otros nodos Colab sin declaración.",
    whyItMatters:
      "Complementa el protagonismo de FEAR 5 (comercial + paper) con un clon de referencia CoEx ligado al territorio Meta. Sembrar lo ofrece como escenario didáctico, no como genética inventada de marca.",
    ecoyumaUrl: "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao",
    evidence: "public_program",
    priority: "priority",
  },
  {
    code: "TCS 19",
    aliases: ["TCS-19", "TSS 19"],
    family: "Clon regional · catálogo Ecoyuma",
    originNote:
      "Listada en Ecoyuma como plántula injertada TCS-19. En campo a veces se menciona como TSS 19; el SKU comercial verificado usa TCS.",
    whyItMatters:
      "Contraste frente al modelo araucano: diversifica lotes y compara perfiles bajo el mismo protocolo de fermentación.",
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
      "Segunda línea de comparación genética para ensayos de tipicidad frente a FEAR 5 / modelo araucano.",
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
      "El cacao araucano busca denominación de origen; Fedecacao tramitó «Cacao de la Orinoquía» ante la SIC mientras Arauca defiende un origen exclusivo. No está consolidado como DO registrada en este hub.",
    evidence: "territorial_process",
    body: [
      "Una denominación de origen o indicación geográfica protege un vínculo entre calidad/reputación y territorio. En Colombia se tramita ante la SIC con evidencia histórica, genética, ambiental y de uso.",
      "El modelo araucano documentado por Fedecacao integra FEAR 5 (Arauquita), FTA 2 (Tame) y FSA 13 (Saravena) — materiales con reconocimiento en Salón du Chocolat París (2010–2011) y presencia reiterada en muestras de calidad.",
      "Fedecacao impulsó el reconocimiento de «Cacao de la Orinoquía de Colombia» (incluye herramientas de trazabilidad en docacao.org). Productores y la Gobernación de Arauca han rechazado diluir la identidad en una DO compartida con Meta/Casanare y piden «cacao araucano» exclusivo.",
      "Hasta que exista registro firme y gobernanza clara, el Colab habla de origen declarado y trazable — no de DO ya otorgada. Genética sola no basta: pliego, mapa, control de uso y fermentación documentada.",
      "Sembrar entrena ese criterio: etiquetar el clon del modelo araucano, contrastar con Ecoyuma (TCS) bajo el mismo protocolo, y cerrar lote con evidencia Cacaotier + Benevolo.",
    ],
    links: [
      {
        label: "SIC · Propiedad industrial (DO / IG)",
        href: "https://www.sic.gov.co/",
        note: "Autoridad registral",
      },
      {
        label: "Fedecacao · Arauquita / modelo araucano",
        href: "https://www.fedecacao.com.co/post/desde-arauca-elchocolatenosune-arauquita",
        note: "Fuente gremial",
      },
      {
        label: "docacao.org · trazabilidad Orinoquía",
        href: "https://docacao.org/",
        note: "Sistema Fedecacao (no implica DO consolidada aquí)",
      },
      {
        label: "Gobernación de Arauca",
        href: "https://arauca.gov.co/",
        note: "Agenda territorial",
      },
      { label: "Abrir Sembrar", href: "/juega", note: "Laboratorio modelo araucano" },
    ],
    relatedCampus: ["/juega", "/aprende/cacaotier", "/conocimiento/fear5-ecoyuma"],
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
      "Contexto Colombia 2024: la muestra WORKAKAO / Agroguamal (Guamal · Meta) obtuvo oro en Ámsterdam con clones Fedecacao FEAR 5 y FSV 41. En Sembrar eso informa el laboratorio del nodo Meta sin atribuir tipificación a Chocolover.",
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
    relatedCampus: ["/aprende/chocolatier", "/aprende/cacaotier", "/aprende/catador", "/benevolo"],
  },
  {
    slug: "rueda-fine-flavor",
    title: "Rueda Fine-Flavor Colab · CoEx × Callebaut",
    eyebrow: "Sensorial · catación · léxico",
    summary:
      "Rueda de entrenamiento propia del Colab: puente entre fermentación de excelencia (Cacaotier), evaluación de cacao (CoEx) y chocolate aplicado (Callebaut). Nombra la complejidad que la tostión bean-to-bar debe respetar.",
    evidence: "colab_route",
    body: [
      "Camino a la excelencia (visión Cacaotier): fermentación controlada diseña precursores (péptidos → volátiles → floral/nuez/frutal); la rueda traduce esa química en radios defendibles; la tostión es el puente de respeto bean-to-bar que revela tipicidad sin maquillar poscosecha.",
      "CoEx publica rueda, glosario y formulario (Excel/impreso) para evaluar cacao en masa o chocolate con atributos core, complementary y off-flavours en escala 0–10, más Global Quality. Es el marco de referencia mundial de tipicidad de muestra.",
      "Callebaut / Chocolate Academy forma en chocolate y aplicaciones: el vocabulario sirve al oficio (cobertura, ganache, barra). Master Chocolatier usa ese puente de uso — incluida la tostión como revelador, no como corrector.",
      "La Rueda Fine-Flavor Colab no copia IP: es lente pedagógica que une ambos. Incluye tipicidad como radio puente y marca defectos como descalificantes. El software de evaluación CoEx sigue siendo el oficial del programa; el Catador Colab entrena el hábito con ficha digital propia.",
      "Correlación con Master Cacaotier: FGVPSKL / GINDYRL → floral y nuez; FASKDQPLNA → especiado/frutal; perder la ventana Tc-pH empuja off-flavours que ninguna curva de tostión convierte en Fine-Flavor.",
      "Set Catación Colombia 10: flight físico/preventa con guía profesional alineada a esta rueda — contextos CoEx/Salón documentados, sin medallas inventadas del Colab.",
    ],
    links: [
      {
        label: "Master Cacaotier · fermentación → rueda",
        href: "/aprende/cacaotier#camino-excelencia",
        note: "Origen de la complejidad",
      },
      {
        label: "CoEx · protocolos de calidad",
        href: "https://www.cacaoofexcellence.org/rd-laboratory-and-training/quality-evaluation-protocols",
      },
      {
        label: "Chocolate Academy",
        href: "https://www.chocolate-academy.com/",
      },
      { label: "Master Catador", href: "/aprende/catador", note: "Campus" },
      { label: "Master Chocolatier · tostión", href: "/aprende/chocolatier", note: "Puente bean-to-bar" },
      { label: "Set Catación 10", href: "/rd/set-catacion", note: "Drop" },
    ],
    relatedCampus: [
      "/aprende/cacaotier",
      "/aprende/catador",
      "/aprende/chocolatier",
      "/rd/set-catacion",
    ],
  },
  {
    slug: "fear5-ecoyuma",
    title: "Modelo araucano, FEAR 5 y vivero Ecoyuma",
    eyebrow: "Genética · plántulas · labranza",
    summary:
      "Sembrar promueve el modelo araucano (FEAR 5 · FTA 2 · FSA 13). Ecoyuma ofrece plántulas injertadas: FEAR 5 es el eje comprable; TCS 19 y TCS 06 contrastan tipicidad (alias de campo TSS).",
    evidence: "commercial_catalog",
    body: [
      "Sin material vegetal sano no hay Fine-Flavor repetible. El Colab enlaza genética Fedecacao, vivero Ecoyuma y campus: eliges el clon, registras la labranza y fermentas el lote.",
      "Modelo araucano: FEAR 5 (Arauquita), FTA 2 (Tame) y FSA 13 (Saravena). FEAR 5 es además el material del paper de biorreactor y el corazón de Benevolo.",
      "Ecoyuma es catálogo externo. Precios, stock y logística los define la tienda; Cacao Colab no inventa disponibilidad de FEAR 5 / TCS ni de FTA 2 / FSA 13.",
      "Ruta recomendada: modelo araucano como eje → TCS 19 / TCS 06 como contraste Ecoyuma → Sembrar (bitácora, cartografía, agroforestería) → fermentación controlada → Benevolo.",
      "La disputa DO (cacao araucano vs Cacao de la Orinoquía) se documenta en /conocimiento/denominacion-origen — Sembrar no otorga DO.",
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
    slug: "cadmio-suelo-fermentacion",
    title: "Cadmio, acidez del suelo y fermentación",
    eyebrow: "Metales · cuidado · poscosecha",
    summary:
      "El Cd del suelo puede pasar al grano; suelos más ácidos suelen aumentar biodisponibilidad. En fermentación controlada (~45 °C), parte del Cd migra del nib a la testa descartada en tostión/descascarillado. Sembrar lo enseña como conciencia, no como medición de laboratorio.",
    evidence: "published_research",
    body: [
      "En cacao latinoamericano el cadmio es un tema de mercado y salud pública. La planta puede absorber Cd del suelo; la acidez (pH bajo) suele aumentar la fracción biodisponible. Cobertura viva, nutrición equilibrada y pH cercano a 6–6.5 forman parte del cuidado preventivo en finca.",
      "Sembrar simula un índice didáctico de riesgo relativo a partir de pH, cobertura, nutrición y biodiversidad. No sustituye análisis de suelo ni de grano: sirve para crear conciencia y conectar el hito de cuidado perfecto (hora 100 · métricas al 100 %) con decisiones de labranza a 10 años.",
      "En poscosecha, la fermentación a temperatura alta y relativamente constante (~45 °C) junto con la acidificación del nib favorece la transferencia de Cd del nib hacia la testa (cascarilla). Esa cascarilla se elimina en tostión y descascarillado (winnowing). El paper de biorreactor FEAR 5 enseña perfiles isotérmicos: temperatura constante ≈ control reproducible.",
      "Esto no es promesa de «cero cadmio». Es una palanca postcosecha sobre el Cd que ya viene del suelo, documentada en literatura (Sci. Rep. 2024; Food Res. Int. 2019) y alineada con el oficio que enseña Master Cacaotier.",
      "Ruta Colab: cuidar suelo en Sembrar → cosechar con criterio (hito 100/100) → fermentar con evidencia → leer tipicidad sin inventar genética ni DO.",
    ],
    links: [
      {
        label: "Sci. Rep. 2024 · Cd nib→testa (T alta + acidificación)",
        href: "https://doi.org/10.1038/s41598-024-62609-8",
        note: "DOI",
      },
      {
        label: "Food Res. Int. 2019 · distribución de Cd en fermentación",
        href: "https://doi.org/10.1016/j.foodres.2019.108743",
        note: "DOI",
      },
      { label: "Abrir Sembrar", href: "/juega", note: "Cuidado + plan 10 años" },
      { label: "Master Cacaotier", href: "/aprende/cacaotier", note: "Temperatura y pH" },
      { label: "Modelo araucano · FEAR 5", href: "/conocimiento/fear5-ecoyuma" },
    ],
    relatedCampus: ["/juega", "/aprende/cacaotier", "/conocimiento/fear5-ecoyuma"],
  },
  {
    slug: "benevolo-traduccion",
    title: "Chocolate Benevolo · R&D Colab",
    eyebrow: "R&D · marca acelerada · Aceleración Colab",
    summary:
      "Chocolate Benevolo vive en R&D: marca acelerada cacaotier (separada del Master Chocolatier 70 %) con duja FEAR 5 La Querencia × Zurych, junto a coberturas CAÚA.",
    evidence: "cacaotier_product",
    body: [
      "Benevolo no lleva tilde: se lee igual en español y en italiano. Chocolate Benevolo le pone las tildes a la e — acentúa la marca con un producto que se desea preordenar.",
      "Vive en /rd junto a la convergencia de coberturas CAÚA × Zurych. El Master entrena barra 70 % CoEx/Awards; Benevolo acelera una SKU tendencia (gianduja/marañón).",
      "Cacao FEAR 5 cultivado en La Querencia (Arbeláez · Cundinamarca), finca de los hermanos Rafael y Liubha. Zurych aporta cultura de transformación. Track Dualita en /campus/benevolo con diploma compartible.",
      "Fórmula: duja de marañón local, leche en polvo orgánica, alulosa y stevia. Neto 80 g. Preventa honesta mientras se cierra el primer lote.",
    ],
    links: [
      { label: "Hub R&D Colab", href: "/rd", note: "Benevolo + coberturas" },
      { label: "Preordenar Chocolate Benevolo", href: "/benevolo", note: "Marca acelerada" },
      { label: "Coberturas CAÚA × Zurych", href: "/rd/coberturas", note: "Pedidos por WhatsApp" },
      { label: "Track Dualita Benevolo", href: "/campus/benevolo", note: "Aceleración" },
      { label: "Master Chocolatier 70 %", href: "/aprende/chocolatier", note: "Ruta hermana" },
      { label: "Zurych", href: "https://www.instagram.com/tiendazurych/", note: "Aliado de transformación" },
    ],
    relatedCampus: ["/rd", "/benevolo", "/campus/benevolo", "/aprende/chocolatier", "/marketplace"],
  },
]

export const benevoloProduct = {
  brand: "Chocolate Benevolo",
  wordmark: "Benevolo",
  owner: "master-chocolatier",
  domain: "ChocolateBenevolo.co",
  category: "Duja de Marañón sugar free",
  format: "Bars. · Duja de Marañón sugar free · Neto 80 g",
  tagline: "Duja de Marañón sugar free. FEAR 5 de La Querencia, Arbeláez.",
  accentLine: "Benevolo sin tilde. Chocolate Benevolo le pone las tildes a la e.",
  description:
    "Marca acelerada cacaotier: Bars. en categoría Duja de Marañón sugar free — duja de marañón colombiano salado inspirada en la gianduja, cacao FEAR 5 de La Querencia (Arbeláez · Cundinamarca), leche en polvo orgánica, alulosa y stevia. Hermana del Master Chocolatier 70 % — tendencia + oficio + preventa.",
  alliances: [
    { name: "Zurych", role: "Transformación y oficio de chocolatería", place: "Landázuri · Santander", href: "https://www.instagram.com/tiendazurych/" },
    { name: "CAÚA", role: "Coberturas y nibs · shop convergente", place: "Santander · pedidos por WhatsApp", href: "/rd/coberturas" },
    { name: "La Querencia", role: "Nodo FEAR 5 · finca de Rafael y Liubha", place: "Arbeláez · Cundinamarca", href: "/marketplace" },
    { name: "Track Benevolo", role: "Aceleración Dualita", place: "Campus", href: "/campus/benevolo" },
  ],
  formula: [
    { label: "Cacao", value: "FEAR 5 · La Querencia / Arbeláez · fermentación controlada 45°C · 72h" },
    { label: "Categoría", value: "Duja de Marañón sugar free" },
    { label: "Leche", value: "Leche en polvo orgánica" },
    { label: "Dulzor", value: "Alulosa + stevia · sin azúcar añadida" },
  ],
  claims: [
    { label: "Categoría", value: "Duja de Marañón sugar free" },
    { label: "Genética", value: "FEAR 5 · La Querencia · Arbeláez, Cundinamarca" },
    { label: "Formato", value: "Bars. · 80 g" },
    { label: "Casa", value: "R&D Colab · marca acelerada" },
  ],
  heroImage: "/benevolo/bars-fear5.png",
  status: "preorder" as const,
  whatIsReady: [
    "Identidad Chocolate Benevolo y empaque Bars. (categoría Duja de Marañón sugar free)",
    "Track Dualita Benevolo (marca acelerada separada del Master 70 %)",
    "Alianza Zurych × La Querencia (nodo FEAR 5)",
    "Fórmula: FEAR 5, duja de marañón, leche orgánica, alulosa, stevia",
    "Canal de preorden / preventa + diploma compartible",
  ],
  whatIsNotReady: [
    "Checkout automático con inventario confirmado",
    "Medalla COEX atribuida a esta SKU (usamos el lente, no el premio)",
    "Certificación orgánica del producto terminado completa",
  ],
  preorderWhatsapp:
    "https://wa.me/573102227848?text=Hola%20Chocolate%20Benevolo%2C%20quiero%20preordenar%20Bars.%20Duja%20de%20Mara%C3%B1%C3%B3n%20sugar%20free%20FEAR%205%20La%20Querencia%20(80g).",
}

export const ecosystemSpearhead = {
  title: "La confluencia real de Cacao Colab",
  body: "Conocimiento avanzado (papers, EUDR, COEX, genética) → práctica de finca (Ecoyuma, labranza, fermentación) → producto que la gente come (Benevolo y marcas colaboradoras). Sin esa traducción no hay valor agregado; solo discurso.",
  steps: [
    { n: "01", title: "Sembrar con criterio", href: "/juega", cta: "Sembrar · Ecoyuma" },
    { n: "02", title: "Fermentar con evidencia", href: "/aprende/cacaotier", cta: "Campus cacaotier" },
    { n: "03", title: "Catar con método", href: "/aprende/catador", cta: "Master Catador" },
    { n: "04", title: "Cumplir el mercado", href: "/conocimiento/eudr-deforestacion", cta: "EUDR y orgánico" },
    { n: "05", title: "Cuidar Cd y suelo", href: "/conocimiento/cadmio-suelo-fermentacion", cta: "Cadmio · fermentación" },
    { n: "06", title: "Formular a la mesa", href: "/aprende/chocolatier", cta: "Master Chocolatier · Benevolo" },
  ],
}

export function getKnowledgeTopic(slug: string) {
  return knowledgeTopics.find((topic) => topic.slug === slug) ?? null
}

export const knowledgeSlugs = knowledgeTopics.map((topic) => topic.slug)
