import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Beveiligde download: checkt login + toegang, en geeft dan een kortlevende
// signed URL naar het bestand in de privé 'downloads'-bucket.
// GET /api/download?slug=<product-slug>
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "missing_slug" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: product } = await supabase
    .from("products")
    .select("id, file_path")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!product?.file_path) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Toegangscheck draait als de ingelogde gebruiker (RLS + has_access).
  const { data: access } = await supabase.rpc("has_access", {
    p_product_id: product.id,
  });
  if (access !== true) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // Signed URL met de service-role (omzeilt storage-RLS), 60s geldig, forceert download.
  const admin = createAdminClient();
  const { data: signed, error } = await admin.storage
    .from("downloads")
    .createSignedUrl(product.file_path, 60, { download: true });

  if (error || !signed) {
    return NextResponse.json({ error: "signing_failed" }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}
