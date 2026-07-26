import * as Sentry from "@sentry/nextjs";

// Sentry — instrumentación de cliente (browser). Ver instrumentation.ts
// para el lado servidor. Mismo estado: sin DSN hasta que exista el
// proyecto Sentry real.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
