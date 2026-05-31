import { NextResponse } from "next/server";

// TIJDELIJK — verificatie van Sentry. Verwijderen na de test.
export function GET() {
  throw new Error("Sentry verificatie test — mobilegrowthstudio.com");
  return NextResponse.json({ ok: true });
}
