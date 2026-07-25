import { NextRequest, NextResponse } from 'next/server'
import { upsertContact, TIPO_LABEL, INTERES_LABEL } from '@cacao-colab/hubspot-client'

const COOKIE_NAME = 'colab_onboarded'
const COOKIE_OPTS = 'Path=/; Max-Age=31536000; SameSite=Lax'

function withOnboardedCookie(res: NextResponse) {
  res.headers.set('Set-Cookie', `${COOKIE_NAME}=done; ${COOKIE_OPTS}`)
  return res
}

// Renombrado de HUBSPOT_TOKEN → HUBSPOT_ACCESS_TOKEN en v2 para alinear con el resto del
// ecosistema Caúa (caua-io). Actualizar la env var en Vercel al desplegar (ver docs/06-ARQUITECTURA.md).
const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN

export async function POST(req: NextRequest) {
  if (!HS_TOKEN) {
    return NextResponse.json({ ok: false, error: 'HUBSPOT_ACCESS_TOKEN not set' }, { status: 500 })
  }

  const body = await req.json()
  const { nombre, operacion, tipo, interes, ciudad, email, whatsapp,
          utm_source, utm_medium, utm_campaign } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'email requerido' }, { status: 400 })
  }

  const result = await upsertContact(HS_TOKEN, {
    firstname: nombre || '',
    email,
    company: operacion || '',
    city: ciudad || '',
    mobilephone: whatsapp || '',
    jobtitle: [TIPO_LABEL[tipo] || tipo, INTERES_LABEL[interes] || interes].filter(Boolean).join(' · '),
    lifecyclestage: 'lead',
    hs_lead_status: 'NEW',
    ...(utm_source && { hs_analytics_source: 'OTHER_CAMPAIGNS', hs_analytics_source_data_1: utm_source }),
    ...(utm_campaign && { hs_analytics_source_data_2: utm_campaign }),
    ...(utm_medium && { hs_analytics_last_referrer: utm_medium }),
  })

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
  }

  return withOnboardedCookie(NextResponse.json({ ok: true, action: result.action }))
}
