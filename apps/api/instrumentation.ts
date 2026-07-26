import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.2,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      enabled: Boolean(process.env.SENTRY_DSN),
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
