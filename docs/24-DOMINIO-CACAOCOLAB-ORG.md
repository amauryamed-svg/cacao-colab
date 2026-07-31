# Dominio cacaocolab.org · DNS · Vercel · Resend

> Comprado: 2026-07-31 (Amaury)  
> Canónico: **https://cacaocolab.org**  
> Dueños: Amaury (registrar + DNS) · Oscar (env Vercel / Supabase) · Hellen (QA links)

---

## 1. Qué cambia en el producto

| Antes | Ahora |
|-------|--------|
| `*.vercel.app` como URL pública | `https://cacaocolab.org` |
| Resend sandbox `onboarding@resend.dev` | `seguimiento@cacaocolab.org` (tras verificar dominio) |
| Auth callback en vercel.app | `https://cacaocolab.org/auth/callback` |

Código: `apps/web/lib/site.ts`, `apps/web/lib/resend.ts`, defaults de `NEXT_PUBLIC_SITE_URL`.

---

## 2. Vercel — conectar el dominio

1. Vercel → proyecto **cacao-colab** (o `cacao-colab-web`) → **Settings → Domains**.
2. Add: `cacaocolab.org` y `www.cacaocolab.org`.
3. En el registrar del dominio (donde compraste `.org`), crea los registros que Vercel indique. Típico:

| Tipo | Nombre | Valor |
|------|--------|--------|
| A | `@` | `76.76.21.21` (o el que muestre Vercel) |
| CNAME | `www` | `cname.vercel-dns.com` (o el que muestre Vercel) |

4. Marca `cacaocolab.org` como **Primary**. Redirect `www` → apex (opción en Domains).
5. Env vars (Production + Preview si aplica):

```bash
NEXT_PUBLIC_SITE_URL=https://cacaocolab.org
RESEND_FROM=Cacao Colab <seguimiento@cacaocolab.org>
```

6. Redeploy tras guardar env.

---

## 3. Resend — verificar dominio (desbloquea nurture a usuarios)

1. [resend.com/domains](https://resend.com/domains) → **Add Domain** → `cacaocolab.org`.
2. Pegar en el DNS del registrar los registros que Resend muestre (SPF, DKIM; DMARC recomendado):

| Tipo | Nombre (ejemplo) | Valor |
|------|------------------|--------|
| TXT | `@` o `send` | `v=spf1 include:amazonses.com ~all` (el exacto lo da Resend) |
| TXT | `resend._domainkey` | (DKIM largo de Resend) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:amauryamed@gmail.com` (ajustar) |

3. Click **Verify** en Resend. Estado → **Verified**.
4. Confirmar en Vercel `RESEND_FROM=Cacao Colab <seguimiento@cacaocolab.org>` y `RESEND_API_KEY` (rotar si se expuso).
5. Probar: disparar cron o envío de prueba a un buzón externo (no solo la cuenta sandbox).

Código ya usa:

```ts
// apps/web/lib/resend.ts
FOLLOWUP_FROM = process.env.RESEND_FROM ?? "Cacao Colab <seguimiento@cacaocolab.org>"
```

Hasta que el dominio esté Verified, Resend rechazará envíos con ese FROM — no pongas `RESEND_FROM` en Vercel hasta verificar, o deja el fallback sandbox solo en Preview.

**Recomendación:** tras Verify, setea `RESEND_FROM` en Production. Si el cron falla antes de Verify, temporalmente:

`RESEND_FROM=Cacao Colab <onboarding@resend.dev>`

---

## 4. Supabase Auth — redirect URLs

Dashboard Supabase → Authentication → URL Configuration:

| Campo | Valor |
|-------|--------|
| Site URL | `https://cacaocolab.org` |
| Redirect URLs | `https://cacaocolab.org/**`, `https://cacaocolab.org/auth/callback`, previews Vercel si se usan |

También en `supabase/config.toml` (`site_url` + `additional_redirect_urls`) para entornos locales/CLI.

Google / Apple OAuth: agregar `https://cacaocolab.org/auth/callback` en cada consola de proveedor.

---

## 5. Checklist Amaury (orden)

- [ ] DNS apex + www apuntando a Vercel (Domains verde)
- [ ] `NEXT_PUBLIC_SITE_URL=https://cacaocolab.org` en Vercel
- [ ] Resend: dominio `cacaocolab.org` **Verified**
- [ ] `RESEND_FROM=Cacao Colab <seguimiento@cacaocolab.org>` en Vercel Production
- [ ] Rotar `RESEND_API_KEY` si sigue la key expuesta
- [ ] Supabase Site URL + Redirect URLs
- [ ] OAuth Google/Apple callback actualizado
- [ ] Probar: abrir https://cacaocolab.org/amauryamed
- [ ] Probar: magic link llega y vuelve a `/auth/callback`
- [ ] Probar: correo de seguimiento a un email externo (no sandbox)
- [ ] App Store privacy URL → `https://cacaocolab.org/legal/privacidad`

---

## 6. URLs públicas a compartir

| Uso | URL |
|-----|-----|
| Home | https://cacaocolab.org |
| Perfil Amaury | https://cacaocolab.org/amauryamed |
| Privacidad | https://cacaocolab.org/legal/privacidad |
| Campus | https://cacaocolab.org/aprende |

Los `*.vercel.app` siguen sirviendo el deploy; el dominio custom es el canónico de marca.
