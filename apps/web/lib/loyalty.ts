export const communityRanks = [
  { slug: "semilla", name: "Semilla", icon: "●", threshold: 0, benefit: "Acceso a retos abiertos" },
  { slug: "brote", name: "Brote", icon: "♧", threshold: 100, benefit: "Bitácoras y rutas de aprendizaje" },
  { slug: "labrador", name: "Labrador del cacao", icon: "♣", threshold: 300, benefit: "Retos territoriales prioritarios" },
  { slug: "guardian", name: "Guardián de origen", icon: "◆", threshold: 700, benefit: "Círculos de comunidad y cata" },
  { slug: "maestro", name: "Maestro Fine-Flavor", icon: "✦", threshold: 1500, benefit: "Beneficios de aliados habilitados" },
  { slug: "legado", name: "Legado Cacaotier", icon: "◉", threshold: 3000, benefit: "Mentoría y transferencia generacional" },
] as const

export const plannedBenefits = [
  {
    brandKey: "cacaotier", brand: "cacaotier", title: "Reto avanzado de Arquitecto",
    cost: 250, rank: "Brote", status: "planned", connector: "Colab nativo",
    description: "Misión digital adicional con Dualita. Activación pendiente de contenido y términos.",
  },
  {
    brandKey: "zurych", brand: "Zurych", title: "Beneficio en ecommerce Zurych",
    cost: 500, rank: "Guardián de origen", status: "planned", connector: "Sin conector",
    description: "Canje por acordar con la marca. No existe cupón ni integración activa todavía.",
  },
  {
    brandKey: "la-querencia", brand: "La Querencia", title: "Experiencia del nodo Arbeláez",
    cost: 450, rank: "Labrador del cacao", status: "planned", connector: "Fulfillment manual",
    description: "Experiencia territorial propuesta; disponibilidad y alcance requieren confirmación del nodo.",
  },
  {
    brandKey: "la-lomita", brand: "La Lomita", title: "Reto de labranza Paicol",
    cost: 350, rank: "Labrador del cacao", status: "planned", connector: "Fulfillment manual",
    description: "Reto comunitario planeado, sujeto a acuerdo y capacidad de acompañamiento.",
  },
  {
    brandKey: "quara", brand: "Quara Cacao", title: "Ruta de origen Tame",
    cost: 450, rank: "Guardián de origen", status: "planned", connector: "Sin conector",
    description: "Beneficio territorial propuesto. No representa inventario ni promesa comercial.",
  },
  {
    brandKey: "chocolover", brand: "Chocolover", title: "Experiencia de chocolate Meta",
    cost: 400, rank: "Labrador del cacao", status: "planned", connector: "Sin conector",
    description: "Activación futura con el nodo Guamal; términos pendientes de aprobación.",
  },
] as const

export function resolveRank(lifetime: number) {
  return [...communityRanks].reverse().find((rank) => lifetime >= rank.threshold) ?? communityRanks[0]
}

export function nextRank(lifetime: number) {
  return communityRanks.find((rank) => rank.threshold > lifetime) ?? null
}
