import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', 'colab_onboarded=skipped; Path=/; Max-Age=31536000; SameSite=Lax')
  return res
}
