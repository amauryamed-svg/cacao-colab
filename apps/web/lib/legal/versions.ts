/** Versiones de políticas — incrementar al publicar cambios materiales. */
export const LEGAL_POLICY_VERSION = "2026-07-31"
export const TERMS_VERSION = "2026-08-24"
export const COOKIE_POLICY_VERSION = "2026-07-31"
export const DATA_PROCESSING_VERSION = "2026-07-31"

export const LEGAL_CONTROLLER = {
  name: "Cacao Colab (cacaotier)",
  operator: "Amaury Amed",
  email: "amauryamed@gmail.com",
  whatsapp: "+57 310 222 7848",
  site: "https://cacaocolab.org",
  jurisdictionPrimary: "Colombia",
  dpoContact: "amauryamed@gmail.com",
} as const

export const CONSENT_COOKIE = "colab_auth_consent"
export const COOKIE_PREFS_COOKIE = "colab_cookie_consent"
