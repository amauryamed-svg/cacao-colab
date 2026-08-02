// v2-pivot: seed/fallback local de la tabla `territories`
// (supabase/migrations/0001_organizations_territories.sql), tipada como
// `Territory` en @cacao-colab/types. Ver docs/07-MODELO-DATOS.md.
export type Territory = {
  id: string
  name: string
  city: string
  nodeName: string
  flavorProfile: string
  accentColor: string
  mapX: number
  mapY: number
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
  {
    id: "santander",
    name: "Santander",
    city: "Landázuri",
    nodeName: "Zurych",
    flavorProfile:
      "Nodo de transformación bean-to-bar. Sin clones tipificados por la marca en el Colab; FEAR 5 es referencia didáctica/comercial del laboratorio.",
    accentColor: "#F2C830",
    mapX: 212,
    mapY: 129,
  },
  {
    id: "cundinamarca",
    name: "Cundinamarca",
    city: "Arbeláez",
    nodeName: "La Querencia",
    flavorProfile:
      "Nodo regional Arbeláez. Sin tipificación de clones publicada aquí; el laboratorio usa FEAR 5 solo como eje didáctico.",
    accentColor: "#DC775F",
    mapX: 206,
    mapY: 177,
  },
  {
    id: "huila",
    name: "Huila",
    city: "Paicol",
    nodeName: "La Lomita",
    flavorProfile:
      "Nodo de finca y trazabilidad en Paicol. Sin clones tipificados por el nodo; no atribuir genética inventada.",
    accentColor: "#86B66B",
    mapX: 190,
    mapY: 217,
  },
  {
    id: "arauca",
    name: "Arauca",
    city: "Tame",
    nodeName: "Quara Cacao",
    flavorProfile:
      "Nodo Tame · Arauca con FEAR 5 declarado para Benevolo R&D y el paper de fermentación (modelo araucano).",
    accentColor: "#E3A12B",
    mapX: 278,
    mapY: 137,
  },
  {
    id: "meta",
    name: "Meta",
    city: "Guamal",
    nodeName: "Chocolover",
    flavorProfile:
      "Nodo Guamal · Meta. Contexto territorial: oro CoEx Ámsterdam 2024 (WORKAKAO / Agroguamal) con FEAR 5 + FSV 41 — sin tipificación atribuida a Chocolover.",
    accentColor: "#48A784",
    mapX: 242,
    mapY: 195,
  },
  {
    id: "bogota",
    name: "Bogotá D.C.",
    city: "Bogotá",
    nodeName: "cacaotier",
    flavorProfile: "Epicentro builder y educativo: Amaury Amed, Hellen Bareño y Oscar Gamboa.",
    accentColor: "#F2C830",
    mapX: 216,
    mapY: 170,
  },
]
