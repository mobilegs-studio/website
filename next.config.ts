import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  // Org en project komen uit environment variables (ingesteld in Vercel).
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Onderdruk Sentry build-logs behalve fouten.
  silent: !process.env.CI,
  // Upload van source maps gebeurt alleen als SENTRY_AUTH_TOKEN aanwezig is.
  widenClientFileUpload: true,
  // Verberg source maps in de client bundles.
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  // Tunnelt Sentry-requests via je eigen domein om ad-blockers te omzeilen.
  tunnelRoute: "/monitoring",
});
