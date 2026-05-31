import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

// TIJDELIJK — verificatie van Sentry. Verwijderen na de test.
export async function GET() {
  try {
    throw new Error("Sentry verificatie test — mobilegrowthstudio.com");
  } catch (error) {
    Sentry.captureException(error);
    // Forceer verzending voordat de serverless functie bevriest.
    await Sentry.flush(2000);
    return NextResponse.json(
      { captured: true, dsnPresent: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN) },
      { status: 500 }
    );
  }
}
