export type Territory = {
  id: string
  name: string
  flavorProfile: string
  accentColor: string
}

/**
 * Perfiles de sabor por región — copiados verbatim de
 * ~/caua-io/lib/cotizador/data/regions.ts (fuente real, no inventada).
 * Deliberadamente sin nombres de Guardianes individuales — ver
 * lib/lessons.ts y la nota de cumplimiento ahí (D15 / A7, 2026-07-15):
 * solo 3 de 5 Guardianes están "Activo" hoy y no se nombran públicamente
 * hasta que la compensación esté liquidada. Esto es territorio, no gente.
 */
export const territories: Territory[] = [
  { id: "huila", name: "Huila", flavorProfile: "Floral, frutal, acidez brillante. Notas de mora y maracuyá.", accentColor: "#87AA27" },
  { id: "santander", name: "Santander", flavorProfile: "Nuez, almendra, caramelo seco. Alta manteca.", accentColor: "#C8A010" },
  { id: "meta", name: "Meta", flavorProfile: "Terroso, tabaco fino, especias. Fermentación profunda.", accentColor: "#3D7A2C" },
  { id: "arauca", name: "Arauca", flavorProfile: "Tropical, mango, cítrico suave. Bioactividad alta.", accentColor: "#F2C830" },
  { id: "cundinamarca", name: "Cundinamarca", flavorProfile: "Chocolate limpio, avellana, acidez media equilibrada.", accentColor: "#E8E0DA" },
]
