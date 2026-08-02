/**
 * Nodos de aprendizaje Sembrar / marketplace.
 *
 * Regla: no correlacionar una marca/nodo con clones que esa marca no ha
 * tipificado. FEAR 5 mantiene protagonismo didáctico (comercial + paper).
 * FSV 41 se contextualiza con el oro CoEx Ámsterdam 2024 (Guamal · Meta /
 * WORKAKAO) sin atribuir la medalla ni la tipificación a Chocolover.
 */

export type LearningNodeGenetics = {
  territoryId: string
  nodeName: string
  city: string
  /** Clones que el nodo/marca ha declarado o tipificado en el Colab. */
  tipifiedByNode: string[]
  /** Referencias didácticas del laboratorio — no son claim de la marca. */
  didacticFocus: string
  blurb: string
  /** Código sugerido al elegir el nodo (opcional). */
  suggestGenotype?: "FEAR 5" | "FSV 41"
}

export const learningNodeGenetics: LearningNodeGenetics[] = [
  {
    territoryId: "santander",
    nodeName: "Zurych",
    city: "Landázuri",
    tipifiedByNode: [],
    didacticFocus: "FEAR 5 como referencia comercial/paper del laboratorio — no tipificado por Zurych",
    blurb:
      "Nodo de transformación bean-to-bar. Zurych no tipifica clones en este hub: el genotipo del laboratorio es escenario didáctico. FEAR 5 conserva protagonismo por ser el más comercial y el del paper; el cacao de Benevolo se declara desde Quara, no como tipificación de Zurych.",
  },
  {
    territoryId: "cundinamarca",
    nodeName: "La Querencia",
    city: "Arbeláez",
    tipifiedByNode: [],
    didacticFocus: "FEAR 5 didáctico · sin tipificación de clones por el nodo",
    blurb:
      "Nodo regional en Arbeláez. La Querencia aún no tipifica clones en el Colab: no le atribuyas FEAR 5 ni otros materiales. Usa FEAR 5 solo como eje didáctico (comercial + paper) y confirma material real en finca / Ecoyuma.",
  },
  {
    territoryId: "huila",
    nodeName: "La Lomita",
    city: "Paicol",
    tipifiedByNode: [],
    didacticFocus: "FEAR 5 didáctico · sin tipificación de clones por el nodo",
    blurb:
      "Nodo de finca y trazabilidad en Paicol. La Lomita no tiene clones tipificados publicados aquí. FEAR 5 puede usarse como referencia de protocolo, no como genética «de La Lomita».",
  },
  {
    territoryId: "arauca",
    nodeName: "Quara Cacao",
    city: "Tame",
    tipifiedByNode: ["FEAR 5"],
    didacticFocus: "FEAR 5 declarado para Benevolo R&D · modelo araucano",
    blurb:
      "Nodo en Tame · Arauca. Aquí sí declaramos FEAR 5 como material de origen para Chocolate Benevolo y el paper de fermentación. FTA 2 / FSA 13 entran como contexto del modelo araucano, no como tipificación adicional inventada del nodo.",
    suggestGenotype: "FEAR 5",
  },
  {
    territoryId: "meta",
    nodeName: "Chocolover",
    city: "Guamal",
    tipifiedByNode: [],
    didacticFocus: "FSV 41 + FEAR 5 · contexto territorial CoEx (no tipificación de Chocolover)",
    blurb:
      "Nodo en Guamal · Meta. Chocolover no tipifica clones en este hub. El territorio Meta sí aporta contexto: la muestra WORKAKAO / Agroguamal obtuvo oro en Cacao of Excellence (Ámsterdam, feb. 2024) con FEAR 5 y Fedecacao San Vicente 41 (FSV 41). Destaca FSV 41 en el laboratorio sin atribuir la medalla a la marca.",
    suggestGenotype: "FSV 41",
  },
]

export function geneticsForTerritory(territoryId: string) {
  return learningNodeGenetics.find((n) => n.territoryId === territoryId) ?? null
}
