/**
 * Catálogo visual del universo Colab — cultivos Ecoyuma / CoEx + chocolate.
 * Hellen: UI. Oscar: no tocar paths sin migrar usages.
 */

export type AtmosphereShot = {
  id: string
  src: string
  alt: string
  mood: "desire" | "craft" | "origin" | "ritual"
  nodes: string[]
  credit?: string
}

export const atmosphereShots: AtmosphereShot[] = [
  {
    id: "ecoyuma-fear5",
    src: "/atmosphere/ecoyuma-fear5.jpg",
    alt: "Mazorcas FEAR-5 en cultivo — Eco Yuma",
    mood: "origin",
    nodes: ["Ecoyuma", "Quara", "Sembrar", "Master Cacaotier"],
    credit: "Eco Yuma S.A.S.",
  },
  {
    id: "ecoyuma-tcs06",
    src: "/atmosphere/ecoyuma-tcs06.jpg",
    alt: "Plántula / mazorca TCS-06 — Eco Yuma",
    mood: "origin",
    nodes: ["Ecoyuma", "Sembrar"],
    credit: "Eco Yuma S.A.S.",
  },
  {
    id: "coex-home",
    src: "/atmosphere/coex-home.jpg",
    alt: "Mazorca abierta en cosecha — Cacao of Excellence",
    mood: "origin",
    nodes: ["CoEx", "Master Chocolatier", "Campus"],
    credit: "Cacao of Excellence",
  },
  {
    id: "cacao-pods-tree",
    src: "/atmosphere/cacao-pods-tree.jpg",
    alt: "Mazorcas creciendo en el tronco del cacaotero",
    mood: "origin",
    nodes: ["Sembrar", "Zurych", "Quara"],
  },
  {
    id: "cacao-pods-close",
    src: "/atmosphere/cacao-pods-close.jpg",
    alt: "Detalle de mazorcas en el árbol",
    mood: "origin",
    nodes: ["Campus", "Colab"],
  },
  {
    id: "cacao-harvest",
    src: "/atmosphere/cacao-harvest.jpg",
    alt: "Cosecha y apertura de mazorcas en plantación",
    mood: "ritual",
    nodes: ["Sembrar", "Master Cacaotier"],
  },
  {
    id: "cacao-tree-pods",
    src: "/atmosphere/cacao-tree-pods.jpg",
    alt: "Árbol de cacao cargado de mazorcas",
    mood: "origin",
    nodes: ["Ecoyuma", "Campus"],
  },
  {
    id: "cacao-roadside",
    src: "/atmosphere/cacao-roadside.jpg",
    alt: "Mazorcas en cultivo tropical",
    mood: "origin",
    nodes: ["Colab", "Sembrar"],
  },
  {
    id: "broken",
    src: "/atmosphere/chocolate-broken.jpg",
    alt: "Chocolate oscuro partido — brillo de temperado",
    mood: "desire",
    nodes: ["Benevolo", "Zurych", "CAÚA"],
  },
  {
    id: "shards",
    src: "/atmosphere/chocolate-shards.jpg",
    alt: "Trozos de chocolate sobre cacao",
    mood: "desire",
    nodes: ["Zurych", "Benevolo"],
  },
  {
    id: "drizzle",
    src: "/atmosphere/chocolate-drizzle.jpg",
    alt: "Chocolate derritiéndose — fluidez y recompensa",
    mood: "desire",
    nodes: ["Benevolo", "CAÚA"],
  },
  {
    id: "temper",
    src: "/atmosphere/chocolate-temper.jpg",
    alt: "Cuadrados de chocolate oscuro con contraste sensorial",
    mood: "craft",
    nodes: ["Zurych", "Master Chocolatier"],
  },
  {
    id: "stack",
    src: "/atmosphere/chocolate-stack.jpg",
    alt: "Capas de chocolate con drip — abundancia de oficio",
    mood: "ritual",
    nodes: ["CAÚA", "Colab"],
  },
  {
    id: "bars-fear5",
    src: "/benevolo/bars-fear5.png",
    alt: "Chocolate Benevolo Bars. · chocolate de leche con marañón sugar free · FEAR 5",
    mood: "desire",
    nodes: ["Benevolo", "Quara", "Zurych"],
  },
]

export function shotById(id: string) {
  return atmosphereShots.find((s) => s.id === id) ?? atmosphereShots[0]
}

export function shotsForNode(node: string) {
  return atmosphereShots.filter((s) =>
    s.nodes.some((n) => n.toLowerCase().includes(node.toLowerCase())),
  )
}
