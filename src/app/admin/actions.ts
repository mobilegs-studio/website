"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { checkIsAdmin } from "@/lib/auth";

type SaveResult = { ok: true } | { ok: false; error: string };

// Slaat de cases-content voor één taal op als override in site_content.
export async function saveCasesContent(
  locale: string,
  data: unknown
): Promise<SaveResult> {
  if (!["nl", "en", "de"].includes(locale)) {
    return { ok: false, error: "Ongeldige taal." };
  }

  const isAdmin = await checkIsAdmin();
  if (!isAdmin) return { ok: false, error: "Geen toegang." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("site_content").upsert(
    {
      section: "cases",
      locale,
      data,
      updated_at: new Date().toISOString(),
      updated_by: user?.id ?? null,
    },
    { onConflict: "section,locale" }
  );

  if (error) return { ok: false, error: error.message };

  // Ververs de publieke portfolio-pagina en de admin-editor.
  revalidatePath(`/${locale}/portfolio`);
  revalidatePath("/admin/cases");

  return { ok: true };
}
