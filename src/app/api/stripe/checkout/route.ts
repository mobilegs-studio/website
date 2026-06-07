import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

// Maakt een Stripe Checkout Session voor een product en geeft de redirect-URL terug.
// Body: { slug: string, locale: string }
export async function POST(request: Request) {
  const { slug, locale = "nl" } = await request.json();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: product } = await supabase
    .from("products")
    .select("id, slug, kind, stripe_price_id")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!product?.stripe_price_id) {
    return NextResponse.json({ error: "product_not_found" }, { status: 404 });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  const session = await getStripe().checkout.sessions.create({
    mode: product.kind === "subscription" ? "subscription" : "payment",
    line_items: [{ price: product.stripe_price_id, quantity: 1 }],
    success_url: `${siteUrl}/${locale}/account?status=success`,
    cancel_url: `${siteUrl}/${locale}/account?status=cancelled`,
    client_reference_id: user.id,
    customer_email: user.email,
    metadata: {
      user_id: user.id,
      product_id: product.id,
      product_slug: product.slug,
    },
    ...(product.kind === "subscription"
      ? { subscription_data: { metadata: { user_id: user.id } } }
      : {}),
  });

  return NextResponse.json({ url: session.url });
}
