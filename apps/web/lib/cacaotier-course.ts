export type FermentationMethod = {
  id: "precision" | "hybrid" | "wood"
  shortName: string
  name: string
  evidence: "published" | "pilot"
  vessel: string
  /** Qué pregunta responde esta duración (no un setpoint universal). */
  duration: string
  mixing: string
  color: string
  temperatures: number[]
  ph: number[]
  checkpoints: string[]
  outcome: string
  /** Ventanas temporales publicadas o propuestas para esta ruta. */
  windows: {
    proposedOptimum: string
    metabolomicPeak: string
    sensoryComparable: string
    inferiorRisk: string
  }
}

export const fermentationHours = [0, 24, 48, 72, 96, 120, 144, 168, 192]

/**
 * Distinción crítica del paper (Santander et al. 2025):
 * - 72 h Tc-pH = óptimo metabolómico propuesto (precursores/péptidos).
 * - 120 h = punto en el que se elaboró y evaluó el chocolate de biorreactor
 *   y se construyeron las redes péptido–volátil–sensorial (Fig. 6).
 * No son el mismo tipo de evidencia.
 */
export const fermentationMethods: FermentationMethod[] = [
  {
    id: "precision",
    shortName: "45° precisión",
    name: "Biorreactor isotérmico 45 °C · Tc-pH",
    evidence: "published",
    vessel: "Acero inoxidable · 4,5 kg en el estudio",
    duration: "Óptimo propuesto 72 h · chocolate evaluado a 120 h",
    mixing: "2 ciclos/día · 10 min · 60 rpm",
    color: "#F4C542",
    temperatures: [45, 45, 45, 45, 45, 45],
    ph: [6.5, 5.8, 4.8, 4.5, 4.35, 4.3],
    windows: {
      proposedOptimum: "72 h",
      metabolomicPeak: "72–120 h",
      sensoryComparable: "120 h",
      inferiorRisk: "96–120 h en biorreactor (marcadores de calidad inferior)",
    },
    checkpoints: [
      "Arranque térmico inmediato; pH espontáneo, sin ácido añadido (Tc-pH).",
      "Los marcadores de calidad superior peakan entre 72–120 h; el óptimo metabolómico propuesto es 72 h.",
      "A 120 h se elaboró el chocolate y se correlacionaron péptidos, volátiles y atributos (Fig. 6).",
      "Acidificación rápida (~pH 4,6 en 48–72 h) se asoció con amargor y astringencia; el descenso más lento favoreció frutal/nuez.",
    ],
    outcome:
      "Mayor abundancia de péptidos tipo FASKDQPLNA / FGVPSKL y asociación con perfil frutal, nuez, floral y especiado entre las condiciones ensayadas.",
  },
  {
    id: "hybrid",
    shortName: "Híbrido día 2",
    name: "Cantina o tanque cervecero adaptado",
    evidence: "pilot",
    vessel: "Inoxidable alimentario · escala por validar",
    duration: "Piloto: comparar 72, 96 y 120 h",
    mixing: "Volteo/agitación suave validada por carga",
    color: "#FF7A59",
    temperatures: [28, 34, 40, 43, 45, 45],
    ph: [6.6, 6.2, 5.6, 5.0, 4.65, 4.5],
    windows: {
      proposedOptimum: "48–72 h si se acerca a pH controlado; validar en finca",
      metabolomicPeak: "Por validar (no publicado)",
      sensoryComparable: "120 h como ancla comparable al paper",
      inferiorRisk: "Acidificación inicial forzada + 45 °C puede empujar amargor",
    },
    checkpoints: [
      "Días 0–2: permitir la sucesión microbiana y registrar el ascenso natural.",
      "Desde 48 h: usar chaqueta térmica para acercarse gradualmente a 45 °C.",
      "En biorreactores con pH controlado el paper propuso 48–72 h; no copies esa dosificación sin protocolo.",
      "Compara cortes a 72, 96 y 120 h con prueba física, sensorial y, si puedes, metabolómica.",
    ],
    outcome: "Línea puente propuesta para transferencia tecnológica; no fue un tratamiento del paper.",
  },
  {
    id: "wood",
    shortName: "Cajón finca",
    name: "Fermentación estándar en cajón · Sg-pH",
    evidence: "published",
    vessel: "Madera · control de 60 kg en el estudio",
    duration: "Óptimo propuesto 96–120 h · riesgo 144–192 h",
    mixing: "Desde 96 h · 2 volteos/día en el estudio",
    color: "#86B66B",
    temperatures: [26, 29, 34, 40, 45, 47, 47, 45, 43],
    ph: [6.7, 6.65, 6.6, 5.4, 4.5, 4.55, 5.0, 5.05, 5.0],
    windows: {
      proposedOptimum: "96–120 h",
      metabolomicPeak: "72–96 h (picos de intensidad)",
      sensoryComparable: "96 h (Llano et al. 2025: fruta/nuez máximos regionales)",
      inferiorRisk: "144–192 h: marcadores de calidad inferior y sobrefermentación",
    },
    checkpoints: [
      "Primeras 48 h por debajo de 35 °C y con poca caída del pH interno.",
      "Hacia 96 h: el estudio observó aproximadamente 45 °C y pH 4,5.",
      "Picos de marcadores superiores entre 72–96 h; óptimo propuesto de proceso 96–120 h.",
      "Entre 144–192 h se intensifican biomarcadores de calidad inferior y señales de sobrefermentación.",
    ],
    outcome: "Referencia de finca robusta, con mayor heterogeneidad espacial y riesgo claro al prolongar más allá de 144 h.",
  },
]

export type SuperiorBiomarker = {
  id: string
  note: string
  family: string
  /** Volátiles / compuestos con correlación publicada o de red. */
  volatiles: string[]
  /** Ventajas sensoriales concretas (sabor/aroma). */
  sensory: string[]
  /** Por qué eleva apreciación en mercados de alta sibarita. */
  marketEdge: string
  accent: string
}

/**
 * Péptidos/metabolitos asociados a atributos de calidad superior (Tc-pH).
 * Correlaciones péptido–volátil–sensorial: Santander et al. 2025 Fig. 6 (chocolate 120 h)
 * y marcadores de tiempo Llano et al. 2025 (Arauca).
 */
export const superiorBiomarkers: SuperiorBiomarker[] = [
  {
    id: "FASKDQPLNA",
    family: "Vicilina · aa 476–",
    note: "Derivado de vicilina (aa 476–); correlaciona con acetato de etilo, heptan-2-ol, notas especiadas/vegetales.",
    volatiles: ["Acetato de etilo", "Heptan-2-ol"],
    sensory: ["Especiado limpio", "Vegetal fresco", "Frutal esterificado"],
    marketEdge:
      "El ester frutal y el alcohol verde dan complejidad que paneles europeos y japoneses leen como cacao «vivo», no plano.",
    accent: "#F2C830",
  },
  {
    id: "FASKDQPL",
    family: "Familia ASKDQPL / KDQPL",
    note: "Misma familia que ASKDQPL / KDQPL (Caligiani, Marseglia); perfil similar a FASKDQPLNA.",
    volatiles: ["Acetato de etilo", "Alcoholes C7"],
    sensory: ["Especiado suave", "Cuerpo aromático", "Continuidad con FASKDQPLNA"],
    marketEdge:
      "Refuerza la firma de precursión controlada: el lote habla el mismo dialecto aromático que los péptidos de referencia Fine Flavor.",
    accent: "#E8B84A",
  },
  {
    id: "FGVPSKL",
    family: "Precursor de sabor · Scalone 2019",
    note: "Precursor de sabor (Scalone 2019); correlaciona con linalol, furfural, 2-acetilpirrol, 2-fenilacetaldehído.",
    volatiles: ["Linalol", "Furfural", "2-Acetilpirrol", "2-Fenilacetaldehído"],
    sensory: ["Floral", "Caramelo / tostado suave", "Nuez", "Miel floral"],
    marketEdge:
      "Puente directo a la sibarita japonesa y europea: floral + nuez + caramelo sin amargor dominante — el perfil que compra bean-to-bar premium.",
    accent: "#86B66B",
  },
  {
    id: "LAIN",
    family: "Marcador de tiempo · Llano 2025",
    note: "Marcador de tiempo de fermentación (Llano 2025); abundante en Tc-pH.",
    volatiles: ["Señal de ventana metabolómica"],
    sensory: ["Madurez de lote", "Equilibrio frutal/nuez"],
    marketEdge:
      "Prueba de proceso: el reloj metabolómico llegó a la ventana correcta. Sin LAIN abundante, el cacao no «cuenta» control.",
    accent: "#F4C542",
  },
  {
    id: "IFVPHYNSKAT",
    family: "Tiempo × calidad superior",
    note: "Vinculado a tiempo de fermentación; correlación positiva con calidad superior.",
    volatiles: ["Red de atributos superiores"],
    sensory: ["Calidad superior global", "Persistencia en taza"],
    marketEdge:
      "Correlación positiva con el score de excelencia: el comprador internacional paga por consistencia, no por suerte de lote.",
    accent: "#A8C97A",
  },
  {
    id: "GINDYRL",
    family: "Red floral · 120 h",
    note: "Asociado a notas florales en las redes de correlación a 120 h.",
    volatiles: ["Volátiles florales (red 120 h)"],
    sensory: ["Floral alto", "Finura aromática", "Ligereza de bouquet"],
    marketEdge:
      "La nota floral es el sello que distingue cacao de excelencia frente a bulk: Japón y Europa la buscan en single-origin.",
    accent: "#DC775F",
  },
  {
    id: "ESYF",
    family: "Discriminante de excelencia",
    note: "Péptido discriminante con correlación positiva a atributos de calidad superior.",
    volatiles: ["Firma discriminante Tc-pH"],
    sensory: ["Limpieza de perfil", "Superioridad discriminante"],
    marketEdge:
      "Separa el lote de precisión del cajón prolongado: es la firma química de «este cacao fue diseñado, no abandonado».",
    accent: "#F2C830",
  },
]

/** Metabolitos asociados a sabores extraños, amargor y astringencia. */
export const inferiorBiomarkers = [
  {
    id: "m/z 349.2124",
    note: "Desconocido 15 (Llano 2025); biomarcador de tiempo; prevalente en Sg-pH 144–168 h y en Tc/Tg-pH_C.",
  },
  {
    id: "FET + m/z 206–301",
    note: "Grupo asociado a amargor, astringencia y sabores extraños bajo acidificación inicial o cajón prolongado.",
  },
  {
    id: "m/z 285.1805",
    note: "Calidad intermedia a 120 h (Escobar 2021); correlaciona también con amargor/astringencia.",
  },
] as const

export type PrecursorStage = {
  hour: number
  title: string
  compounds: string
  action: string
  /** Lectura por ruta: qué está pasando a esa hora según el paper. */
  byMethod: Record<FermentationMethod["id"], string>
}

export const precursorStages: PrecursorStage[] = [
  {
    hour: 0,
    title: "Materia prima",
    compounds: "Sacarosa, glucosa, fructosa, catequinas y proteínas de reserva (vicilina y otras).",
    action: "Homogeneiza el lote, registra genotipo, madurez, masa, pulpa (~17 % remoción en el paper) y pH basal interno (~6,3–6,7).",
    byMethod: {
      precision: "Arranca ya a 45 °C. El pH interno empezará a caer de forma espontánea.",
      hybrid: "Deja que la sucesión microbiana arranque sin forzar temperatura ni ácido.",
      wood: "Masa fría y heterogénea: mide centro y periferia desde la hora cero.",
    },
  },
  {
    hour: 24,
    title: "Pulpa en transformación",
    compounds: "Etanol, ácidos orgánicos y consumo progresivo de azúcares de mucílago.",
    action: "Observa drenaje, olor, temperatura del centro y periferia; un único sensor no basta.",
    byMethod: {
      precision: "Con pH controlado, los marcadores superiores pueden empezar a subir ya entre 24–72 h.",
      hybrid: "Registra el ascenso natural; no fuerces 45 °C todavía.",
      wood: "Suele seguir bajo 35 °C; poca caída de pH interno es esperable.",
    },
  },
  {
    hour: 48,
    title: "Entrada de acidez y proteólisis",
    compounds: "Ácido acético, péptidos cortos y aminoácidos libres en formación (muchos péptidos suben desde ~48 h).",
    action: "Evalúa la velocidad de caída del pH. Una acidificación rápida (~4,6 en 48–72 h) se asoció con amargor y astringencia.",
    byMethod: {
      precision: "Si el pH cae demasiado rápido, el lote se inclina a amargor aunque la temperatura sea «correcta».",
      hybrid: "Aquí inicia el control térmico gradual hacia 45 °C. En pH controlado el paper propuso corte 48–72 h.",
      wood: "Todavía puede estar lejos de 45 °C; no compares este punto con un biorreactor isotérmico.",
    },
  },
  {
    hour: 72,
    title: "Ventana metabolómica de precisión",
    compounds:
      "Abundan candidatos superiores: FASKDQPLNA, FASKDQPL, FGVPSKL, LAIN, IFVPHYNSKAT, GINDYRL, ESYF y aminoácidos libres (Asp, Phe, Tyr, Leu…).",
    action:
      "En Tc-pH el paper propone 72 h como óptimo metabolómico. No declares victoria sensorial sin elaborar chocolate de ese corte.",
    byMethod: {
      precision: "Óptimo metabolómico propuesto. Toma muestra trazable; el chocolate publicado, sin embargo, se evaluó a 120 h.",
      hybrid: "Si te acercaste a un régimen de pH controlado, esta es la cola de la ventana 48–72 h.",
      wood: "Empiezan picos de marcadores superiores (72–96 h), pero el proceso de finca suele necesitar más tiempo térmico.",
    },
  },
  {
    hour: 96,
    title: "Compromiso de finca",
    compounds: "En cajón: temperatura ~45 °C y pH ~4,5. En biorreactor: ya conviven precursores superiores con riesgo de marcadores inferiores.",
    action: "Compara corte, olor, pH interno y curva. En cajón empieza la ventana óptima propuesta (96–120 h).",
    byMethod: {
      precision: "Los marcadores inferiores empiezan a intensificarse en biorreactor entre 96–120 h: vigila el equilibrio.",
      hybrid: "Útil como corte intermedio antes del ancla sensorial de 120 h.",
      wood: "Ventana candidata junto con 120 h. Llano et al. (2025) vieron máximos regionales de fruta/nuez cerca de 96 h.",
    },
  },
  {
    hour: 120,
    title: "Ancla sensorial del biorreactor",
    compounds:
      "Redes péptido–volátil–sensorial (Fig. 6): FASKDQPLNA ↔ acetato de etilo/heptan-2-ol; FGVPSKL ↔ linalol/furfural/2-acetilpirrol.",
    action:
      "120 h no es «el óptimo de precursores»: es el punto comparable del chocolate publicado. Úsalo para replicar, luego prueba cortes metabolómicos.",
    byMethod: {
      precision: "Cierra aquí para comparar con el paper. Luego diseña un corte a 72 h con el mismo secado/tostión.",
      hybrid: "Ancla comparable. Documenta si el perfil se parece más a Tc-pH o a cajón.",
      wood: "Fin de la ventana óptima propuesta (96–120 h). Más allá crece el riesgo de defectos.",
    },
  },
  {
    hour: 144,
    title: "Riesgo de calidad inferior",
    compounds:
      "Intensificación de biomarcadores de defectos (p. ej. m/z 349.2124 / Desconocido 15) y volátiles de sobrefermentación, sobre todo en cajón.",
    action: "Activa alarma por olor, pH ascendente y duración. No prolongues «por si acaso».",
    byMethod: {
      precision: "Fuera del rango publicado de chocolate. Solo tiene sentido como experimento declarado.",
      hybrid: "Evita este rango hasta tener línea base a 72–120 h.",
      wood: "Marcadores de calidad inferior se intensifican entre 144–192 h; el pH puede volver hacia ~5.",
    },
  },
  {
    hour: 168,
    title: "Sobrefermentación",
    compounds: "Alta intensidad de metabolitos asociados a amargor, astringencia y sabores extraños en fermentación estándar.",
    action: "Si llegaste aquí sin decisión consciente, el lote ya no es comparable con Fine-Flavor de precisión.",
    byMethod: {
      precision: "No es una condición de referencia del estudio sensorial.",
      hybrid: "Detén y documenta la desviación.",
      wood: "Zona de prevalencia de biomarcadores de atributos de calidad inferior.",
    },
  },
  {
    hour: 192,
    title: "Límite del control publicado",
    compounds: "Fin del muestreo temporal del cajón en el estudio; señales de defecto consolidadas.",
    action: "Usa este punto solo para enseñar qué se pierde al alargar, no como meta de proceso.",
    byMethod: {
      precision: "Fuera de alcance del chocolate Tc-pH publicado.",
      hybrid: "Fuera de alcance del piloto recomendado.",
      wood: "Referencia de exceso: demuestra por qué el óptimo propuesto cierra a 96–120 h.",
    },
  },
]

export const cacaotierMissions = [
  { number: "01", title: "Leer el lote", duration: "6 min", xp: 80, skill: "Línea base y trazabilidad" },
  { number: "02", title: "Dominar las tres rutas", duration: "8 min", xp: 100, skill: "Diseño experimental" },
  { number: "03", title: "Pilotar temperatura + pH", duration: "9 min", xp: 120, skill: "Curvas y decisiones" },
  { number: "04", title: "Cazar precursores", duration: "7 min", xp: 110, skill: "Metabolitos de aroma" },
  { number: "05", title: "Elegir el punto de corte", duration: "8 min", xp: 130, skill: "Calidad y riesgo" },
  { number: "06", title: "Convertir grano en evidencia", duration: "10 min", xp: 160, skill: "Secado, chocolate y réplica" },
]

export const paperSources = [
  {
    label: "Santander et al. (2025) · LWT 231, 118313",
    href: "https://www.sciencedirect.com/science/article/pii/S0023643825009971",
    note: "FEAR 5, Arauquita; biorreactores 4,5 kg y cajón 60 kg. Óptimos propuestos: 72 h Tc-pH; 48–72 h pH controlado; 96–120 h cajón. Chocolate de biorreactor evaluado a 120 h.",
  },
  {
    label: "Llano et al. (2025) · Food Research International 205, 115978",
    href: "https://doi.org/10.1016/j.foodres.2025.115978",
    note: "180 fincas y materiales mezclados de Arauca; LAIN, IFVPHYNSKAT y Desconocido 15 (m/z 349.212) como marcadores de tiempo. No es FEAR 5 puro.",
  },
]

export function resolvePrecursorStage(hour: number) {
  return [...precursorStages].reverse().find((item) => item.hour <= hour) ?? precursorStages[0]
}
