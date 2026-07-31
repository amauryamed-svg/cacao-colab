import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import path from "node:path";

// Dominio canónico: cacaocolab.org (docs/24-DOMINIO-CACAOCOLAB-ORG.md).
// El redirect ciego a caua.cloud/colab/* de Spec v1 permanece retirado (D11).
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/amaury", destination: "/amauryamed", permanent: false },
      { source: "/perfil/amaury", destination: "/amauryamed", permanent: false },
    ]
  },
  turbopack: {
    // Raíz del monorepo (no solo apps/web) — necesario para que Turbopack
    // pueda ver y compilar packages/* consumidos vía transpilePackages,
    // que viven fuera de apps/web pero se importan desde acá.
    root: path.join(__dirname, "../.."),
  },
  // El cron de seguimiento (apps/web/lib/followup-email-render.ts) lee los
  // HTML de emails/seguimiento/ en runtime con fs — viven fuera de apps/web
  // (misma fuente que se pega a mano en HubSpot), así que hay que forzar
  // que el output tracing de Vercel los incluya en el bundle de esa función,
  // porque una ruta armada con path.join no siempre se detecta sola.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  outputFileTracingIncludes: {
    "/api/cron/followup-emails/route": ["../../emails/seguimiento/*.html"],
  },
  // Los paquetes internos del monorepo se transpilan desde TS fuente,
  // no se prebuildean — más simple para Oscar/Hellen mientras el monorepo
  // es joven.
  transpilePackages: [
    "@cacao-colab/types",
    "@cacao-colab/ui-tokens",
    "@cacao-colab/supabase-client",
    "@cacao-colab/hubspot-client",
    "@cacao-colab/ai-companion",
  ],
};

export default withSentryConfig(nextConfig, {
  silent: true,
  disableLogger: true,
  // Sin credenciales de Sentry todavía — SENTRY_AUTH_TOKEN/org/project
  // pendientes (ver docs/06-ARQUITECTURA.md). El SDK queda instalado y
  // configurado en modo no-op hasta que exista el proyecto Sentry real.
});
