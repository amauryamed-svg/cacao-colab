import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'colab_onboarded'
const COOKIE_OPTS = 'Path=/; Max-Age=31536000; SameSite=Lax'

function withOnboardedCookie(res: NextResponse) {
  res.headers.set('Set-Cookie', `${COOKIE_NAME}=done; ${COOKIE_OPTS}`)
  return res
}

const HS_TOKEN = process.env.HUBSPOT_TOKEN
const HS_BASE  = 'https://api.hubapi.com/crm/v3/objects/contacts'

const TIPO_LABEL: Record<string, string> = {
  restaurante: 'Restaurante',
  hotel:       'Hotel & Glamping',
  cafeteria:   'Cafetería & Bar de cacao',
  pasteleria:  'Pastelería & Chocolatería',
  otra:        'Otra operación',
}

const INTERES_LABEL: Record<string, string> = {
  productos:   'Productos CAÚA',
  aprendizaje: 'Aprendizaje Dualita',
  marca:       'Marketplace — postular marca',
  todo:        'Todo el ecosistema',
}

export async function POST(req: NextRequest) {
  if (!HS_TOKEN) {
    return NextResponse.json({ ok: false, error: 'HUBSPOT_TOKEN not set' }, { status: 500 })
  }

  const body = await req.json()
  const { nombre, operacion, tipo, interes, ciudad, email, whatsapp } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'email requerido' }, { status: 400 })
  }

  const properties: Record<string, string> = {
    firstname:      nombre   || '',
    email:          email,
    company:        operacion || '',
    city:           ciudad   || '',
    mobilephone:    whatsapp || '',
    jobtitle:       [TIPO_LABEL[tipo] || tipo, INTERES_LABEL[interes] || interes].filter(Boolean).join(' · '),
    lifecyclestage: 'lead',
    hs_lead_status: 'NEW',
  }

  // try upsert (create or update by email)
  const createRes = await fetch(HS_BASE, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${HS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  })

  // 409 = contact already exists → patch by email search then update
  if (createRes.status === 409) {
    const searchRes = await fetch(`${HS_BASE}/search`, {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${HS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        properties: ['email'],
        limit: 1,
      }),
    })
    const searchData = await searchRes.json()
    const contactId  = searchData?.results?.[0]?.id

    if (contactId) {
      await fetch(`${HS_BASE}/${contactId}`, {
        method:  'PATCH',
        headers: {
          Authorization:  `Bearer ${HS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      })
    }

    return withOnboardedCookie(NextResponse.json({ ok: true, action: 'updated' }))
  }

  if (!createRes.ok) {
    const err = await createRes.text()
    return NextResponse.json({ ok: false, error: err }, { status: createRes.status })
  }

  return withOnboardedCookie(NextResponse.json({ ok: true, action: 'created' }))
}
