import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

// Vernieuwt de Supabase-sessie en hangt de bijgewerkte auth-cookies aan de
// response die de bestaande i18n-middleware al heeft opgebouwd.
export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
