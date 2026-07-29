export type FermentationMethod = {
  id: "precision" | "hybrid" | "wood"
  shortName: string
  name: string
  evidence: "published" | "pilot"
  vessel: string
  duration: string
  mixing: string
  color: string
  temperatures: number[]
  ph: number[]
  checkpoints: string[]
  outcome: string
}

export const fermentationHours = [0, 24, 48, 72, 96, 120, 144, 168, 192]

export const fermentationMethods: FermentationMethod[] = [
  {
    id: "precision",
    shortName: "45° precisión",
    name: "Biorreactor isotérmico 45 °C",
    evidence: "published",
    vessel: "Acero inoxidable · 4,5 kg en el estudio",
    duration: "120 h",
    mixing: "2 ciclos/día · 10 min · 60 rpm",
    color: "#F4C542",
    temperatures: [45, 45, 45, 45, 45, 45],
    ph: [6.5, 5.8, 4.8, 4.5, 4.35, 4.3],
    checkpoints: [
      "Arranque térmico inmediato; pH espontáneo, sin ácido añadido.",
      "Vigilar transferencia de calor: 45 °C del equipo no garantiza 45 °C en todo el grano.",
      "La ventana metabolómica candidata aparece alrededor de 72 h; el estudio sensorial evaluó 120 h.",
      "Cerrar a 120 h para replicar la muestra de chocolate publicada antes de optimizar.",
    ],
    outcome: "Mayor asociación con perfil frutal y nuez entre las condiciones ensayadas.",
  },
  {
    id: "hybrid",
    shortName: "Híbrido día 2",
    name: "Cantina o tanque cervecero adaptado",
    evidence: "pilot",
    vessel: "Inoxidable alimentario · escala por validar",
    duration: "Objetivo inicial 120 h",
    mixing: "Volteo/agitación suave validada por carga",
    color: "#FF7A59",
    temperatures: [28, 34, 40, 43, 45, 45],
    ph: [6.6, 6.2, 5.6, 5.0, 4.65, 4.5],
    checkpoints: [
      "Días 0–2: permitir la sucesión microbiana y registrar el ascenso natural.",
      "Desde 48 h: usar chaqueta térmica para acercarse gradualmente a 45 °C.",
      "Control de pH significa medir y decidir; no dosificar ácido sin un protocolo validado.",
      "Comparar corte a 96 h y 120 h con prueba física, sensorial y microbiológica.",
    ],
    outcome: "Línea puente propuesta para transferencia tecnológica; no fue un tratamiento del paper.",
  },
  {
    id: "wood",
    shortName: "Cajón finca",
    name: "Fermentación estándar en cajón",
    evidence: "published",
    vessel: "Madera · control de 60 kg en el estudio",
    duration: "120–192 h",
    mixing: "Desde 96 h · 2 volteos/día en el estudio",
    color: "#86B66B",
    temperatures: [26, 29, 34, 40, 45, 47, 47, 45, 43],
    ph: [6.7, 6.65, 6.6, 5.4, 4.5, 4.55, 5.0, 5.05, 5.0],
    checkpoints: [
      "Primeras 48 h por debajo de 35 °C y con poca caída del pH interno.",
      "Hacia 96 h: el estudio observó aproximadamente 45 °C y pH 4,5.",
      "La ventana candidata de precursores fue 96–120 h.",
      "Después de 144 h crecieron señales volátiles asociadas a sobrefermentación.",
    ],
    outcome: "Referencia de finca robusta, con mayor heterogeneidad espacial y riesgo al prolongar el proceso.",
  },
]

export const precursorStages = [
  {
    hour: 0,
    title: "Materia prima",
    compounds: "Sacarosa, glucosa, fructosa, catequinas y proteínas de reserva",
    action: "Homogeneiza el lote, registra genotipo, madurez, masa, pulpa y pH basal.",
  },
  {
    hour: 24,
    title: "Pulpa en transformación",
    compounds: "Etanol, ácidos orgánicos y consumo progresivo de azúcares de mucílago",
    action: "Observa drenaje, olor, temperatura del centro y periferia; evita interpretar un único sensor.",
  },
  {
    hour: 48,
    title: "Entrada de acidez",
    compounds: "Ácido acético, péptidos cortos y aminoácidos libres en formación",
    action: "Evalúa la velocidad de caída del pH; una acidificación demasiado rápida se asoció con amargor.",
  },
  {
    hour: 72,
    title: "Ventana de precisión",
    compounds: "Oligopéptidos candidatos y azúcares reductores, precursores de reacciones de Maillard",
    action: "Toma muestra trazable. Es una ventana metabolómica candidata, no un punto final universal.",
  },
  {
    hour: 96,
    title: "Compromiso finca",
    compounds: "Glucosa cercana a su máximo regional y combinación de precursores fruta/nuez",
    action: "Compara corte, olor, pH interno y curva; en cajón empieza la ventana 96–120 h.",
  },
  {
    hour: 120,
    title: "Cierre comparable",
    compounds: "Perfil precursor consolidado; sacarosa residual baja en el estudio regional",
    action: "Cierra, seca bajo protocolo común y conserva una muestra testigo para chocolate 70 %.",
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
    note: "FEAR 5, Arauquita; biorreactores de 4,5 kg y control en cajón de 60 kg.",
  },
  {
    label: "Llano et al. (2025) · Food Research International 205, 115978",
    href: "https://doi.org/10.1016/j.foodres.2025.115978",
    note: "180 fincas y materiales mezclados de Arauca; dinámica regional de precursores.",
  },
]
