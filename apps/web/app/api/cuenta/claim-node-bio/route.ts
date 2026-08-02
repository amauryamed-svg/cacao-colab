import { NextRequest, NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { mapNodeBioRow } from "@/lib/nodo/map"

function parseSlug(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase()
  if (!trimmed) return null
  try {
    if (trimmed.includes("nodo/") || trimmed.startsWith("http")) {
      const url = trimmed.startsWith("http")
        ? new URL(trimmed)
        : new URL(trimmed, "https://cacaocolab.org")
      const parts = url.pathname.split("/").filter(Boolean)
      const idx = parts.indexOf("nodo")
      const slug = idx >= 0 ? parts[idx + 1] : parts.at(-1)
      return slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null
    }
  } catch {
    // fall through
  }
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed) ? trimmed : null
}

/**
 * Vincula una bio publicada (creada con otro email) a la sesión actual.
 * Requiere el email con el que se publicó originalmente.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 })

  const slug = parseSlug(String(body.slug ?? ""))
  const creationEmail = String(body.creationEmail ?? "").trim().toLowerCase()

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "Indica el slug o enlace de tu nodo (ej. cacaotier-bogota-0ecm)" },
      { status: 400 },
    )
  }
  if (!creationEmail.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Indica el email con el que publicaste la bio" },
      { status: 400 },
    )
  }

  try {
    const session = await createSupabaseServerClient()
    const {
      data: { user },
    } = await session.auth.getUser()
    if (!user?.id || !user.email) {
      return NextResponse.json({ ok: false, error: "Debes iniciar sesión" }, { status: 401 })
    }

    const sessionEmail = user.email.trim().toLowerCase()
    const admin = createSupabaseAdminClient()

    const { data: bio, error } = await admin
      .from("node_bios")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()

    if (error || !bio) {
      return NextResponse.json({ ok: false, error: "No encontramos ese nodo publicado" }, { status: 404 })
    }

    if (bio.profile_id && bio.profile_id !== user.id) {
      return NextResponse.json(
        { ok: false, error: "Esa bio ya está vinculada a otra cuenta" },
        { status: 409 },
      )
    }

    const bioEmail = String(bio.email ?? "").trim().toLowerCase()
    if (bioEmail !== creationEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "El email no coincide con el usado al publicar esa bio. Revisa el correo del formulario original.",
        },
        { status: 403 },
      )
    }

    const { data: updated, error: updateError } = await admin
      .from("node_bios")
      .update({
        profile_id: user.id,
        email: sessionEmail,
      })
      .eq("id", bio.id)
      .select("*")
      .single()

    if (updateError || !updated) {
      return NextResponse.json(
        {
          ok: false,
          error:
            updateError?.message?.includes("profile_id")
              ? "Falta aplicar la migración profile_id en Supabase"
              : (updateError?.message ?? "No se pudo vincular la bio"),
        },
        { status: 503 },
      )
    }

    return NextResponse.json({
      ok: true,
      slug: updated.slug,
      sharePath: `/nodo/${updated.slug}`,
      bio: mapNodeBioRow(updated as Parameters<typeof mapNodeBioRow>[0]),
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Error de servidor" },
      { status: 500 },
    )
  }
}
