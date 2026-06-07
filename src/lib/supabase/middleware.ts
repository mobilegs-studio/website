import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

// Vernieuwt de Supabase-sessie en hangt de bijgewerkte auth-cookies aan de
// response die de bestaande i18n-middleware al heeft opgebouwd.
export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase nog niet geconfigureerd (bijv. preview-deploy zonder env-vars):
  // sla de sessie-refresh over zodat de rest van de site gewoon werkt.
  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Belangrijk: roep getUser() aan zodat de tokens vernieuwd worden.
  await supabase.auth.getUser();

  return response;
}
