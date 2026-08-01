# Magic link · único acceso de registro (sin Google / Apple)

> Última actualización: 2026-08-01  
> Para Amaury (ops) y agentes (Claude/Cursor): el registro público es **solo email**.

---

## 1. Decisión de producto

| Canal | Estado |
|---|---|
| Magic link / OTP por email | **Activo** — `/cuenta/entrar` y `/unete` |
| Google OAuth | **No** — sin cuentas de desarrollador; botones retirados |
| Apple OAuth | **No** — idem |

Spec: **D26** (actualizado). Código no debe reintroducir `signInWithOAuth` hasta que existan credenciales y decisión explícita.

---

## 2. Flujos

### A. `/cuenta/entrar`

1. Opt-in Privacidad + Términos (marketing opcional).
2. `signInWithOtp` con `shouldCreateUser: true`.
3. `emailRedirectTo` = `{getSiteUrl()}/auth/callback?next=…`
4. Usuario abre el enlace **en el mismo navegador** (PKCE) **o** pega el código OTP en la UI.

### B. `/unete` (onboarding)

Tras HubSpot/CRM, best-effort `signInWithOtp` (mismo redirect). Si el correo falla, el lead igual queda registrado.

### C. Callback `/auth/callback`

- `?code=` → `exchangeCodeForSession` (PKCE)
- `?token_hash=&type=` → `verifyOtp` (fallback del template de email)
- Luego: `persistUserConsent` + `claim_team_membership` → `/equipo` si superadmin, si no `next`

---

## 3. Por qué a veces “falla” (y no es el código)

1. **`NEXT_PUBLIC_SITE_URL` ausente** → antes caía a `localhost:3000`. Ahora `getSiteUrl()` usa `https://cacaocolab.org`.
2. **Redirect URL no allow-list** en Supabase Dashboard → Auth ignora `emailRedirectTo`. Debe coincidir con `supabase/config.toml`.
3. **Enlace abierto en otro dispositivo / in-app browser** → PKCE sin cookie → usar **código OTP** en la pantalla “Revisa tu correo”.
4. **SMTP Resend** aún en `onboarding@resend.dev` → entrega limitada hasta Verify del dominio.
5. **Rate limit** `email_sent` / `max_frequency` → pedir espera de ~1 minuto.

---

## 4. Checklist ops (Amaury)

Dashboard Supabase → Authentication → URL Configuration:

- [x] Site URL: `https://cacaocolab.org` (también en `config.toml`)
- [ ] Redirect URLs live incluyen:
  - `https://cacaocolab.org/**`
  - `https://cacaocolab.org/auth/callback`
  - `https://www.cacaocolab.org/**`
  - previews Vercel si se prueban
- [ ] Providers: **Email enabled**; Google/Apple **disabled**
- [ ] Vercel: `NEXT_PUBLIC_SITE_URL=https://cacaocolab.org`
- [ ] Resend: dominio verificado + SMTP From `…@cacaocolab.org`
- [ ] Probar E2E: `/cuenta/entrar` → correo → callback → `/aprende`
- [ ] Probar E2E: código OTP en el mismo formulario
- [ ] Probar `/unete` → `magicLink: true` en respuesta API

---

## 5. Archivos clave

| Pieza | Ruta |
|---|---|
| UI entrar | `apps/web/components/campus/CampusAuthPanel.tsx` + `CampusLoginForm.tsx` |
| Acciones | `apps/web/app/cuenta/entrar/actions.ts` |
| Callback | `apps/web/app/auth/callback/route.ts` |
| Onboarding OTP | `apps/web/app/api/onboarding/route.ts` |
| Site URL | `apps/web/lib/site.ts` → `getSiteUrl()` |
| Config Auth | `supabase/config.toml` `[auth]` |

---

## 6. Nota para agentes

No busques botones Google/Apple ni `signInWithOAuth`: fueron retirados a propósito.  
No apuntes docs a `apps/web/app/equipo/login/actions.ts` (ya no existe): el login unificado es `/cuenta/entrar`.  
Si el magic link “no llega”, prioriza Site URL + Resend + allow-list antes de reescribir el flujo.
