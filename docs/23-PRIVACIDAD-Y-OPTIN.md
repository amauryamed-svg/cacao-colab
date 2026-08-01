# Privacidad, tratamiento de datos y opt-in

> Última actualización: 2026-07-31  
> Dueños: Amaury (responsable / copy legal) · Oscar (migración + sync) · Hellen (UI opt-in)

---

## 1. URLs públicas (App Stores + footer)

| Documento | URL |
|-----------|-----|
| Índice | `/legal` |
| Política de Privacidad | `/legal/privacidad` |
| Términos de Uso | `/legal/terminos` |
| Tratamiento de datos (habeas data) | `/legal/tratamiento-datos` |
| Cookies | `/legal/cookies` |
| Ejercicio de derechos (DSAR) | `/legal/derechos` |

Prod: `https://cacaocolab.org/legal/privacidad` (usar esta URL en Apple / Google Play). Mientras DNS propaga, el deploy también responde en `*.vercel.app`.

Fuente de copy: `apps/web/lib/legal/*`. Versión vigente: `LEGAL_POLICY_VERSION` en `versions.ts`.

---

## 2. Legislaciones cubiertas (diseño)

- **UE/EEE/UK:** GDPR / UK GDPR, ePrivacy (cookies no esenciales con opt-in).
- **EE.UU.:** CCPA/CPRA + mención a leyes estatales equivalentes; **no venta** de datos; respeto señal **GPC**.
- **Colombia:** Ley 1581 / Decreto 1377 (autorización + habeas data).
- **Menores:** COPPA (13+) / GDPR art. 8.

> Plantilla operativa del producto. Revisión por abogado de Amaury antes de claims regulatorios fuertes o expansión a nuevos mercados.

---

## 3. Opt-in al crear usuario

Ruta real de cuenta: `/cuenta/entrar` (solo magic link / OTP por email).

1. Casilla **obligatoria** (no pre-marcada): Privacidad + Tratamiento + Términos.
2. Casilla **opcional**: marketing / nurturing.
3. Server actions rechazan sin opt-in (`parseConsentForm`).
4. Consentimiento se guarda en cookie `colab_auth_consent` + `user_metadata` (OTP) y se persiste en:
   - `profiles.privacy_accepted_at`, `terms_accepted_at`, versiones, `marketing_opt_in`
   - tabla auditoría `privacy_consents`
5. Trigger `handle_new_marketplace_user` rellena desde `raw_user_meta_data` cuando hay signup nuevo.
6. `/auth/callback` llama `persistUserConsent`.

Onboarding `/unete` (lead, no auth): mismo opt-in obligatorio antes de HubSpot; evento `lead_onboarding_opt_in`.

---

## 4. Cookies

Banner global: esenciales vs aceptar todas. Analítica (`trackColabEvent`) solo con consentimiento o se bloquea si hay GPC.

Migración SQL: `supabase/migrations/20260731220000_privacy_consent.sql`.

---

## 5. Checklist Amaury

- [ ] Aplicar migración en Supabase prod
- [ ] Pegar URL de privacidad en App Store Connect / Play Console
- [ ] Revisión legal externa (opcional pero recomendada)
- [ ] Mapear marketing opt-in a subscription HubSpot (sin inventar props hasta confirmar portal)
