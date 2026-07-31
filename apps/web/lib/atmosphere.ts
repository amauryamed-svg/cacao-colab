/**
 * Catálogo visual del universo Colab — fotos ambientadas + ilustraciones
 * ligadas a nodos/marcas. Hellen: UI. Oscar: no tocar paths sin migrar usages.
 */

export type AtmosphereShot = {
  id: string
  src: string
  alt: string
  mood: "desire" | "craft" | "origin" | "ritual"
  nodes: string[]
}

export const atmosphereShots: AtmosphereShot[] = [
  {
    id: "broken",
    src: "/atmosphere/chocolate-broken.jpg",
    alt: "Chocolate oscuro partido — brillo de temperado y borde crujiente",
    mood: "desire",
    nodes: ["Benevolo", "Zurych", "CAÚA"],
  },
  {
    id: "shards",
    src: "/atmosphere/chocolate-shards.jpg",
    alt: "Trozos de chocolate sobre cacao en polvo",
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
    id: "powder",
    src: "/atmosphere/cacao-powder.jpg",
    alt: "Ritual de cacao — granos tostados y vapor",
    mood: "origin",
    nodes: ["Quara", "CAÚA", "Sembrar"],
  },
  {
    id: "bars-fear5",
    src: "/benevolo/bars-fear5.png",
    alt: "Chocolate Benevolo Bars. FEAR 5 · duja de marañón",
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
