import type { NodeBio, NodeKind, NodeBioStatus } from "./types"

type Row = {
  id: string
  slug: string
  status: string
  kind: string
  display_name: string
  org_name: string
  city: string | null
  territory: string | null
  intro: string
  avatar_url: string | null
  product_image_url: string | null
  product_caption: string | null
  email: string
  whatsapp: string | null
  instagram: string | null
  website: string | null
  share_token: string
  created_at: string
  published_at: string | null
}

export function mapNodeBioRow(row: Row): NodeBio {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status as NodeBioStatus,
    kind: row.kind as NodeKind,
    displayName: row.display_name,
    orgName: row.org_name,
    city: row.city,
    territory: row.territory,
    intro: row.intro,
    avatarUrl: row.avatar_url,
    productImageUrl: row.product_image_url,
    productCaption: row.product_caption,
    email: row.email,
    whatsapp: row.whatsapp,
    instagram: row.instagram,
    website: row.website,
    shareToken: row.share_token,
    createdAt: row.created_at,
    publishedAt: row.published_at,
  }
}
