import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Wisselt de auth-code (magic link of OAuth) in voor een sessie en stuurt door.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Mislukt: terug naar home.
  return NextResponse.redirect(`${origin}/`);
}
