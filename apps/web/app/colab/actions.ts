"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { FORUM_EMOJIS, type ForumEmoji, type ForumPostKind } from "@/lib/colab-foro"

export type ForumFeedItem = {
  id: string
  kind: ForumPostKind
  title: string
  body: string
  courseSlug: string | null
  grade: string | null
  createdAt: string
  authorName: string
  authorId: string
  reactions: Record<string, number>
  mine: string[]
}

type ActionResult = { ok: true; id?: string } | { ok: false; error: string }

export async function loadForumFeed(limit = 40): Promise<ForumFeedItem[]> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: posts, error } = await supabase
    .from("colab_forum_posts")
    .select("id,kind,title,body,course_slug,grade,created_at,profile_id")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error || !posts?.length) return []

  const profileIds = [...new Set(posts.map((p) => p.profile_id))]
  const ids = posts.map((p) => p.id)

  const [{ data: profiles }, { data: reactions }] = await Promise.all([
    supabase.from("profiles").select("id,full_name").in("id", profileIds),
    supabase.from("colab_forum_reactions").select("post_id,profile_id,emoji").in("post_id", ids),
  ])

  const nameById = new Map((profiles ?? []).map((p) => [p.id, p.full_name?.trim() || "Nodo Colab"]))

  return posts.map((post) => {
    const postReactions = (reactions ?? []).filter((r) => r.post_id === post.id)
    const counts: Record<string, number> = {}
    const mine: string[] = []
    for (const reaction of postReactions) {
      counts[reaction.emoji] = (counts[reaction.emoji] ?? 0) + 1
      if (reaction.profile_id === user.id) mine.push(reaction.emoji)
    }

    return {
      id: post.id,
      kind: post.kind as ForumPostKind,
      title: post.title,
      body: post.body,
      courseSlug: post.course_slug,
      grade: post.grade,
      createdAt: post.created_at,
      authorName: nameById.get(post.profile_id) ?? "Nodo Colab",
      authorId: post.profile_id,
      reactions: counts,
      mine,
    }
  })
}

export async function createForumPost(input: {
  kind: ForumPostKind
  title: string
  body: string
  courseSlug?: string | null
  grade?: string | null
}): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "Debes iniciar sesión" }

  const title = input.title.trim().slice(0, 160)
  const body = input.body.trim().slice(0, 4000)
  if (title.length < 4) return { ok: false, error: "Título muy corto" }
  if (body.length < 12) return { ok: false, error: "Escribe un poco más para la comunidad" }

  let kind: ForumPostKind = input.kind
  if (kind === "announcement") {
    const { data: team } = await supabase
      .from("team_members")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()
    if (!team && user.email) {
      const { data: byEmail } = await supabase
        .from("team_members")
        .select("id")
        .eq("email", user.email)
        .maybeSingle()
      if (!byEmail) kind = "sync"
    } else if (!team) {
      kind = "sync"
    }
  }

  const { data, error } = await supabase
    .from("colab_forum_posts")
    .insert({
      profile_id: user.id,
      kind,
      title,
      body,
      course_slug: input.courseSlug?.slice(0, 80) ?? null,
      grade: input.grade?.slice(0, 40) ?? null,
    })
    .select("id")
    .single()

  if (error || !data) {
    return {
      ok: false,
      error: error?.message?.includes("colab_forum")
        ? "Aplica la migración del foro en Supabase"
        : (error?.message ?? "No se pudo publicar"),
    }
  }

  revalidatePath("/colab")
  return { ok: true, id: data.id }
}

export async function toggleForumReaction(postId: string, emoji: ForumEmoji): Promise<ActionResult> {
  if (!FORUM_EMOJIS.includes(emoji)) return { ok: false, error: "Emoji no permitido" }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "Debes iniciar sesión" }

  const { data: existing } = await supabase
    .from("colab_forum_reactions")
    .select("id")
    .eq("post_id", postId)
    .eq("profile_id", user.id)
    .eq("emoji", emoji)
    .maybeSingle()

  if (existing?.id) {
    const { error } = await supabase.from("colab_forum_reactions").delete().eq("id", existing.id)
    if (error) return { ok: false, error: error.message }
  } else {
    const { error } = await supabase.from("colab_forum_reactions").insert({
      post_id: postId,
      profile_id: user.id,
      emoji,
    })
    if (error) {
      return {
        ok: false,
        error: error.message?.includes("colab_forum")
          ? "Aplica la migración del foro en Supabase"
          : error.message,
      }
    }
  }

  revalidatePath("/colab")
  return { ok: true }
}

/** Anuncio semilla si el feed está vacío (best-effort). */
export async function ensureForumSeed(): Promise<void> {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { count } = await supabase
      .from("colab_forum_posts")
      .select("id", { count: "exact", head: true })

    if ((count ?? 0) > 0) return

    await supabase.from("colab_forum_posts").insert({
      profile_id: user.id,
      kind: "sync",
      title: "Bienvenida al foro interno del Colab",
      body: "Aquí compartimos avances de maestría, anuncios y sincronicidades. Reacciona con 🍫 y practica lo aprendido en Sembrar. El diploma certifica rigor — la comunidad lo celebra.",
      course_slug: null,
      grade: null,
    })
  } catch {
    // migración pendiente
  }
}
