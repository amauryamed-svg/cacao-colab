import "server-only"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import type { Json } from "@cacao-colab/supabase-client/database.types"

export async function awardMazorcas(input: {
  profileId: string
  amount: number
  category: "learning" | "care" | "community" | "verified_purchase" | "adjustment"
  reasonCode: string
  idempotencyKey: string
  sourceType?: string
  sourceId?: string
  metadata?: Json
  dailyCap?: number
}) {
  const admin = createSupabaseAdminClient()
  const amount = Math.max(1, Math.round(input.amount))

  if (input.dailyCap) {
    const since = new Date()
    since.setUTCHours(0, 0, 0, 0)
    const { data } = await admin
      .from("mazorca_ledger")
      .select("amount")
      .eq("profile_id", input.profileId)
      .eq("category", input.category)
      .gte("created_at", since.toISOString())
    const earnedToday = (data ?? []).reduce((total, entry) => total + Math.max(0, entry.amount), 0)
    if (earnedToday >= input.dailyCap) return { awarded: 0, capped: true }
  }

  const { error } = await admin.from("mazorca_ledger").insert({
    profile_id: input.profileId,
    amount,
    category: input.category,
    reason_code: input.reasonCode,
    idempotency_key: input.idempotencyKey,
    source_type: input.sourceType ?? null,
    source_id: input.sourceId ?? null,
    metadata: input.metadata ?? {},
  })
  if (error?.code === "23505") return { awarded: 0, duplicate: true }
  if (error) throw error
  return { awarded: amount }
}
