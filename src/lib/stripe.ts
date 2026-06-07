import Stripe from "stripe";

// Lazy init zodat het ontbreken van de key de build niet breekt — de client
// wordt pas aangemaakt als een route 'm echt gebruikt.
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripeClient;
}
