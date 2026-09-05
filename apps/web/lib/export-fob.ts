/**
 * Cotizador FOB · Cacao Colab (propietario)
 *
 * Herramienta de exportación / internacionalización portada del criterio
 * operativo CAÚA Cloud → Colab. Cotiza salida FOB Cartagena + flete marítimo
 * y landed estimado hacia USA, UE y Asia (China · Japón).
 *
 * Precios base Fine-Flavor anclados a rangos de mercado observados 2025–2026
 * (specialty premium sobre commodity). No es contrato ni proforma: es
 * orientación comercial para nodos y compradores. Confirmar lote por WhatsApp.
 */

export type FobProductId =
  | "beans-ff"
  | "nibs"
  | "liquor"
  | "cobertura-70"
  | "cobertura-100"

export type FobDestinationId = "usa" | "eu" | "china" | "japan"

export type FobProduct = {
  id: FobProductId
  label: string
  hsHint: string
  unit: "kg"
  /** USD / kg FOB planta / bodega origen (antes de inland + docs) */
  exWorksUsdPerKg: number
  minOrderKg: number
  nodeHint: string
}

export type FobDestination = {
  id: FobDestinationId
  region: "USA" | "UE" | "Asia"
  label: string
  port: string
  /** Días de tránsito marítimo típico Cartagena → destino */
  transitDays: [number, number]
  /** Ocean freight USD / kg (20' FCL amortizado ~16 t netas cacao) */
  oceanUsdPerKg: number
  /** Derechos / aranceles indicativos (ad valorem sobre CIF) */
  dutyAdValorem: number
  /** IVA / GST / sales tax tipificado en destino (referencia) */
  vatAdValorem: number
  notes: string
  tradeFrame: string
}

/** Productos Fine-Flavor Colab × nodos (ex-works indicativo USD/kg). */
export const fobProducts: FobProduct[] = [
  {
    id: "beans-ff",
    label: "Grano Fine-Flavor · fermentado",
    hsHint: "HS 1801",
    unit: "kg",
    exWorksUsdPerKg: 9.2,
    minOrderKg: 500,
    nodeHint: "Arauca · Cundinamarca · Meta · Santander",
  },
  {
    id: "nibs",
    label: "Nibs tostados",
    hsHint: "HS 1801 / 1806",
    unit: "kg",
    exWorksUsdPerKg: 14.5,
    minOrderKg: 100,
    nodeHint: "CAÚA · Quara · Zurych",
  },
  {
    id: "liquor",
    label: "Licor / masa de cacao",
    hsHint: "HS 1803",
    unit: "kg",
    exWorksUsdPerKg: 12.8,
    minOrderKg: 200,
    nodeHint: "Transformación Colab × Zurych",
  },
  {
    id: "cobertura-70",
    label: "Cobertura 70 % · panela",
    hsHint: "HS 1806",
    unit: "kg",
    exWorksUsdPerKg: 16.4,
    minOrderKg: 100,
    nodeHint: "CAÚA Santander × Zurych",
  },
  {
    id: "cobertura-100",
    label: "Cobertura 100 %",
    hsHint: "HS 1806",
    unit: "kg",
    exWorksUsdPerKg: 18.9,
    minOrderKg: 100,
    nodeHint: "CAÚA Santander × Zurych",
  },
]

export const fobDestinations: FobDestination[] = [
  {
    id: "usa",
    region: "USA",
    label: "Estados Unidos",
    port: "Miami / New York",
    transitDays: [7, 12],
    oceanUsdPerKg: 0.22,
    dutyAdValorem: 0,
    vatAdValorem: 0,
    notes: "TLC Colombia–USA: cacao/chocolate elegible 0 % con certificado de origen. FDA prior notice.",
    tradeFrame: "TLC CO–USA",
  },
  {
    id: "eu",
    region: "UE",
    label: "Unión Europea",
    port: "Rotterdam / Amberes",
    transitDays: [16, 24],
    oceanUsdPerKg: 0.28,
    dutyAdValorem: 0,
    vatAdValorem: 0.07,
    notes: "Acuerdo CO–UE: arancel 0 % con origen. EUDR + cadmio. IVA país de importación (ej. DE 7 % alimentos).",
    tradeFrame: "Acuerdo CO–UE · EUDR",
  },
  {
    id: "china",
    region: "Asia",
    label: "China",
    port: "Shanghái",
    transitDays: [28, 38],
    oceanUsdPerKg: 0.35,
    dutyAdValorem: 0.08,
    vatAdValorem: 0.13,
    notes: "Arancel MFN cacao/chocolate ~8 % (verificar partida). IVA 13 %. Registro importador + etiquetado.",
    tradeFrame: "MFN · aduana PRC",
  },
  {
    id: "japan",
    region: "Asia",
    label: "Japón",
    port: "Yokohama / Tokio",
    transitDays: [30, 40],
    oceanUsdPerKg: 0.38,
    dutyAdValorem: 0.05,
    vatAdValorem: 0.1,
    notes: "Arancel tipificado cacao/chocolate ~5 % según partida. Consumption tax 10 %. JAS / higiene.",
    tradeFrame: "MFN · Japón",
  },
]

/** Costos fijos de exportación por embarque (USD), amortizados por kg. */
export const fobExportOverhead = {
  inlandToCartagenaUsdPerKg: 0.18,
  docsAndAgencyUsdPerKg: 0.08,
  stuffingUsdPerKg: 0.04,
  insuranceRateOnCif: 0.0035,
  /** Contenedor 20' referencia carga neta cacao (kg) */
  containerNetKg: 16_000,
  oceanBaseUsd20ft: {
    usa: 1_850,
    eu: 2_400,
    china: 3_200,
    japan: 3_450,
  } as Record<FobDestinationId, number>,
}

export type FobQuoteInput = {
  productId: FobProductId
  destinationId: FobDestinationId
  quantityKg: number
}

export type FobQuoteLine = {
  label: string
  usdTotal: number
  usdPerKg: number
}

export type FobQuote = {
  product: FobProduct
  destination: FobDestination
  quantityKg: number
  currency: "USD"
  lines: FobQuoteLine[]
  fobCartagenaUsd: number
  fobPerKg: number
  oceanUsd: number
  insuranceUsd: number
  cifUsd: number
  cifPerKg: number
  dutyUsd: number
  vatUsd: number
  landedUsd: number
  landedPerKg: number
  transitDays: [number, number]
  disclaimer: string
  updatedLabel: string
}

function money(n: number) {
  return Math.round(n * 100) / 100
}

export function buildFobQuote(input: FobQuoteInput): FobQuote {
  const product = fobProducts.find((p) => p.id === input.productId) ?? fobProducts[0]
  const destination =
    fobDestinations.find((d) => d.id === input.destinationId) ?? fobDestinations[0]
  const quantityKg = Math.max(product.minOrderKg, Math.round(input.quantityKg))

  const exWorks = product.exWorksUsdPerKg * quantityKg
  const inland = fobExportOverhead.inlandToCartagenaUsdPerKg * quantityKg
  const docs = fobExportOverhead.docsAndAgencyUsdPerKg * quantityKg
  const stuffing = fobExportOverhead.stuffingUsdPerKg * quantityKg
  const fobCartagenaUsd = money(exWorks + inland + docs + stuffing)
  const fobPerKg = money(fobCartagenaUsd / quantityKg)

  const oceanFromRate = destination.oceanUsdPerKg * quantityKg
  const oceanFromContainer =
    (fobExportOverhead.oceanBaseUsd20ft[destination.id] * quantityKg) /
    fobExportOverhead.containerNetKg
  const oceanUsd = money(Math.max(oceanFromRate, oceanFromContainer))

  const preInsurance = fobCartagenaUsd + oceanUsd
  const insuranceUsd = money(preInsurance * fobExportOverhead.insuranceRateOnCif)
  const cifUsd = money(preInsurance + insuranceUsd)
  const cifPerKg = money(cifUsd / quantityKg)

  const dutyUsd = money(cifUsd * destination.dutyAdValorem)
  const vatBase = cifUsd + dutyUsd
  const vatUsd = money(vatBase * destination.vatAdValorem)
  const landedUsd = money(cifUsd + dutyUsd + vatUsd)
  const landedPerKg = money(landedUsd / quantityKg)

  const lines: FobQuoteLine[] = [
    {
      label: "Ex-works / bodega origen",
      usdTotal: money(exWorks),
      usdPerKg: product.exWorksUsdPerKg,
    },
    {
      label: "Inland a Cartagena",
      usdTotal: money(inland),
      usdPerKg: fobExportOverhead.inlandToCartagenaUsdPerKg,
    },
    {
      label: "Documentos + agencia aduanera",
      usdTotal: money(docs),
      usdPerKg: fobExportOverhead.docsAndAgencyUsdPerKg,
    },
    {
      label: "Estiba / stuffing",
      usdTotal: money(stuffing),
      usdPerKg: fobExportOverhead.stuffingUsdPerKg,
    },
    {
      label: `Flete marítimo → ${destination.port}`,
      usdTotal: oceanUsd,
      usdPerKg: money(oceanUsd / quantityKg),
    },
    {
      label: "Seguro (≈0,35 % CIF)",
      usdTotal: insuranceUsd,
      usdPerKg: money(insuranceUsd / quantityKg),
    },
  ]

  return {
    product,
    destination,
    quantityKg,
    currency: "USD",
    lines,
    fobCartagenaUsd,
    fobPerKg,
    oceanUsd,
    insuranceUsd,
    cifUsd,
    cifPerKg,
    dutyUsd,
    vatUsd,
    landedUsd,
    landedPerKg,
    transitDays: destination.transitDays,
    disclaimer:
      "Cotización indicativa Cacao Colab · Incoterm FOB Cartagena + estimado CIF/landed. No incluye demoras, cold treatment, muestreo, ni márgenes del importador. Confirmar proforma con lote real.",
    updatedLabel: "Tabla Colab · Fine-Flavor Q3 2026 (referencial mercado)",
  }
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n)
}

export const fobWhatsappQuote = (quote: FobQuote) =>
  "https://wa.me/573102227848?text=" +
  encodeURIComponent(
    [
      "Hola Cacao Colab — quiero proforma FOB del cotizador.",
      `${quote.product.label} · ${quote.quantityKg} kg`,
      `Destino: ${quote.destination.label} (${quote.destination.port})`,
      `FOB Cartagena ≈ ${formatUsd(quote.fobCartagenaUsd)} (${formatUsd(quote.fobPerKg)}/kg)`,
      `CIF estimado ≈ ${formatUsd(quote.cifUsd)} · Landed ≈ ${formatUsd(quote.landedUsd)}`,
    ].join("\n"),
  )
