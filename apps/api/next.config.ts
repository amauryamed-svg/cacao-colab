import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Ver el mismo comentario en apps/web/next.config.ts — necesario para
    // que Turbopack compile packages/* consumidos vía transpilePackages.
    root: path.join(__dirname, "../.."),
  },
  transpilePackages: [
    "@cacao-colab/types",
    "@cacao-colab/supabase-client",
    "@cacao-colab/hubspot-client",
    "@cacao-colab/stripe-client",
  ],
};

export default withSentryConfig(nextConfig, {
  silent: true,
  disableLogger: true,
});
