import type { NextConfig } from "next";

/**
 * "Headless": solo route handlers de /api/v1/*, sin páginas de UI. Deploy independiente de
 * apps/web para que Oscar pueda shippear un fix de webhook sin depender de un merge de Hellen
 * en el blog/marketing. Ver docs/06-ARQUITECTURA.md.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
