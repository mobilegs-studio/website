import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAuthStrings } from "@/i18n/auth";

// Vereist een ingelogde sessie — niet prerenderen tijdens build.
export const dynamic = "force-dynamic";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getAuthStrings(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect(`/${locale}/login`);
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-3xl mx-auto w-full">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="font-sans font-bold tracking-tight text-4xl sm:text-5xl leading-tight">
            {t.accountTitle}
          </h1>
          <p className="mt-3 text-sm text-(--color-muted)">
            {t.signedInAs} {user.email}
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="shrink-0 inline-flex items-center rounded-full border border-(--color-border) px-5 py-2.5 text-sm font-semibold hover:bg-(--color-surface) transition-colors"
          >
            {t.signOut}
          </button>
        </form>
      </div>

      {/* Downloads — gevuld in Fase 4 (entitlement-check + signed URLs) */}
      <section className="mt-16">
        <h2 className="text-lg font-semibold tracking-tight">
          {t.downloadsTitle}
        </h2>
        <p className="mt-3 text-sm text-(--color-muted-light)">
          {t.downloadsEmpty}
        </p>
      </section>

      {/* Abonnement — gevuld in Fase 3/5 (Stripe-status) */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          {t.subscriptionTitle}
        </h2>
        <p className="mt-3 text-sm text-(--color-muted-light)">
          {t.subscriptionNone}
        </p>
      </section>
    </main>
  );
}
