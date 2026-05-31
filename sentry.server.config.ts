import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Pas aan naar wens; 1.0 = alle transacties tracen.
  tracesSampleRate: 1.0,
  // Zet op true tijdens lokaal debuggen van Sentry zelf.
  debug: false,
  enabled: process.env.NODE_ENV === "production",
});
