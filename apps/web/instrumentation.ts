import * as Sentry from "@sentry/nextjs";

// Sentry — instrumentación de servidor (Node + Edge runtime).
// Sin DSN todavía (pendiente crear proyecto Sentry, ver docs/06-ARQUITECTURA.md
// §6). Con SENTRY_DSN vacío el SDK no envía nada pero queda cableado: en
// cuanto Amaury cree el proyecto y agregue la env var en Vercel, funciona
// sin tocar código.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.2,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      enabled: Boolean(process.env.SENTRY_DSN),
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.2,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      enabled: Boolean(process.env.SENTRY_DSN),
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
