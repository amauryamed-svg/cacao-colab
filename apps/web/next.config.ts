import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import path from "node:path";

// v2-pivot (2026-07-26): el 308 ciego hacia caua.cloud/colab/* de la Spec v1
// queda retirado — ver docs/00-SPEC.md D11. El deploy sirve directo en su
// propio *.vercel.app hasta que se decida un dominio propio (cacaocolab.co
// u otro). No hay redirects configurados a propósito.
const nextConfig: NextConfig = {
  turbopack: {
    // Raíz del monorepo (no solo apps/web) — necesario para que Turbopack
    // pueda ver y compilar packages/* consumidos vía transpilePackages,
    // que viven fuera de apps/web pero se importan desde acá.
    root: path.join(__dirname, "../.."),
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
