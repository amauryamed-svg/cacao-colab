export type NodeKind = "finca" | "marca" | "transformacion" | "horeca" | "otra"

export type NodeBioStatus = "pending" | "published" | "rejected"

export type NodeBio = {
  id: string
  slug: string
  status: NodeBioStatus
  kind: NodeKind
  displayName: string
  orgName: string
  city: string | null
  territory: string | null
  intro: string
  avatarUrl: string | null
  productImageUrl: string | null
  productCaption: string | null
  email: string
  whatsapp: string | null
  instagram: string | null
  website: string | null
  shareToken: string
  createdAt: string
  publishedAt: string | null
}

export const NODE_KIND_LABEL: Record<NodeKind, string> = {
  finca: "Finca / origen",
  marca: "Marca de cacao",
  transformacion: "Transformación bean-to-bar",
  horeca: "Cocina / hospitalidad",
  otra: "Aliado del cacao",
}
