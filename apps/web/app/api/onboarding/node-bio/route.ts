import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { parseDataUrl } from "@/lib/nodo/images"
import { slugifyNode, uniqueSlug } from "@/lib/nodo/slug"
import type { NodeKind } from "@/lib/nodo/types"
import { mapNodeBioRow } from "@/lib/nodo/map"

const KINDS = new Set<NodeKind>(["finca", "marca", "transformacion", "horeca", "otra"])

async function uploadOrKeep(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  dataUrl: string | null | undefined,
  path: string,
): Promise<string | null> {
  if (!dataUrl) return null
  if (dataUrl.startsWith("http://") || dataUrl.startsWith("https://")) return dataUrl.slice(0, 2000)
  const parsed = parseDataUrl(dataUrl)
  if (!parsed) return dataUrl.startsWith("data:image/") && dataUrl.length < 520_000 ? dataUrl : null
  try {
    const ext = parsed.mime.split("/")[1] ?? "jpg"
    const fullPath = `${path}.${ext}`
    const { error } = await admin.storage.from("node-media").upload(fullPath, parsed.buffer, {
      contentType: parsed.mime,
      upsert: true,
    })
    if (error) return dataUrl.length < 520_000 ? dataUrl : null
    const { data } = admin.storage.from("node-media").getPublicUrl(fullPath)
    return data.publicUrl
  } catch {
    return dataUrl.length < 520_000 ? dataUrl : null
  }
}

async function findExistingBio(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  profileId: string | null,
  email: string,
) {
  if (profileId) {
    const { data } = await admin
      .from("node_bios")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    if (data) return data
  }

  const exact = await admin
    .from("node_bios")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  let data = !exact.error ? exact.data : null
  if (!data) {
    const escaped = email.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_")
    const loose = await admin
      .from("node_bios")
      .select("*")
      .ilike("email", escaped)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    if (!loose.error) data = loose.data
  }

  if (data?.profile_id && profileId && data.profile_id !== profileId) return null
  return data ?? null
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 })

  const kind = String(body.kind ?? "") as NodeKind
  const displayName = String(body.displayName ?? "").trim()
  const orgName = String(body.orgName ?? "").trim()
  const intro = String(body.intro ?? "").trim()
  const email = String(body.email ?? "").trim().toLowerCase()
  const privacyOk = body.privacy_accepted === true || body.privacy_accepted === "true"

  if (!KINDS.has(kind)) return NextResponse.json({ ok: false, error: "Tipo de nodo inválido" }, { status: 400 })
  if (displayName.length < 2) return NextResponse.json({ ok: false, error: "Nombre requerido" }, { status: 400 })
  if (orgName.length < 2) return NextResponse.json({ ok: false, error: "Nombre de finca/marca requerido" }, { status: 400 })
  if (intro.length < 40) return NextResponse.json({ ok: false, error: "La intro debe tener al menos 40 caracteres" }, { status: 400 })
  if (!email.includes("@")) return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 })
  if (!privacyOk) {
    return NextResponse.json({ ok: false, error: "Opt-in de privacidad requerido" }, { status: 400 })
  }

  try {
    const session = await createSupabaseServerClient()
    const {
      data: { user },
    } = await session.auth.getUser()
    const profileId = user?.id ?? null

    const admin = createSupabaseAdminClient()
    const existing = await findExistingBio(admin, profileId, email)

    const mediaSlug = existing?.slug ?? uniqueSlug(slugifyNode(orgName, String(body.city ?? "")), Math.random().toString(36).slice(2, 6))
    const avatarUrl = await uploadOrKeep(admin, body.avatarDataUrl, `${mediaSlug}/avatar`)
    const productImageUrl = await uploadOrKeep(admin, body.productDataUrl, `${mediaSlug}/product`)

    const payload = {
      status: "published" as const,
      kind,
      display_name: displayName.slice(0, 120),
      org_name: orgName.slice(0, 160),
      city: body.city ? String(body.city).slice(0, 120) : null,
      territory: body.territory ? String(body.territory).slice(0, 120) : null,
      intro: intro.slice(0, 2000),
      product_caption: body.productCaption ? String(body.productCaption).slice(0, 200) : null,
      email,
      whatsapp: body.whatsapp ? String(body.whatsapp).slice(0, 40) : null,
      instagram: body.instagram ? String(body.instagram).replace(/^@/, "").slice(0, 80) : null,
      website: body.website ? String(body.website).slice(0, 300) : null,
      published_at: new Date().toISOString(),
      ...(profileId ? { profile_id: profileId } : {}),
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      ...(productImageUrl ? { product_image_url: productImageUrl } : {}),
    }

    let data = null as Awaited<ReturnType<typeof findExistingBio>>
    let error: { message: string } | null = null

    if (existing) {
      const updated = await admin.from("node_bios").update(payload).eq("id", existing.id).select("*").single()
      data = updated.data
      error = updated.error
    } else {
      const inserted = await admin
        .from("node_bios")
        .insert({
          slug: mediaSlug,
          ...payload,
        })
        .select("*")
        .single()
      data = inserted.data
      error = inserted.error
    }

    if (error || !data) {
      return NextResponse.json(
        { ok: false, error: error?.message ?? "No se pudo guardar la bio. ¿Aplicaste la migración node_bios?" },
        { status: 503 },
      )
    }

    // Best-effort CRM note
    try {
      const { data: contact } = await admin
        .from("crm_contacts")
        .upsert(
          {
            email,
            full_name: displayName,
            phone: body.whatsapp ? String(body.whatsapp) : null,
            company: orgName,
            city: body.city ? String(body.city) : null,
            lifecycle_stage: "lead",
          },
          { onConflict: "email" },
        )
        .select("id")
        .single()
      if (contact?.id) {
        await admin.from("crm_activities").insert({
          crm_contact_id: contact.id,
          type: "note",
          metadata: {
            kind: existing ? "node_bio_updated" : "node_bio_created",
            slug: data.slug,
            org_name: orgName,
            node_kind: kind,
          },
        })
      }
    } catch {
      // CRM opcional
    }

    const bio = mapNodeBioRow(data as Parameters<typeof mapNodeBioRow>[0])
    return NextResponse.json({
      ok: true,
      slug: bio.slug,
      sharePath: `/nodo/${bio.slug}`,
      bio,
      updated: Boolean(existing),
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error de servidor",
      },
      { status: 500 },
    )
  }
}
