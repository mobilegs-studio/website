import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Stripe verstuurt events hierheen. We verifieren de handtekening en schrijven
// rechten weg met de service-role client (omzeilt RLS).
export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    // Eenmalige aankoop afgerond.
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id ?? session.client_reference_id;
      const productId = session.metadata?.product_id;

      if (session.mode === "payment" && userId && productId) {
        await supabase
          .from("purchases")
          .upsert(
            {
              user_id: userId,
              product_id: productId,
              stripe_checkout_session_id: session.id,
            },
            { onConflict: "user_id,product_id" }
          );
      }
      break;
    }

    // Abonnement aangemaakt/gewijzigd/opgezegd — status synchroniseren.
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.user_id;

      if (userId) {
        await supabase
          .from("subscriptions")
          .upsert(
            {
              user_id: userId,
              stripe_subscription_id: sub.id,
              status: sub.status,
            },
            { onConflict: "stripe_subscription_id" }
          );
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
