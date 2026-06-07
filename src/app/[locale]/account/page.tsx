import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAuthStrings } from "@/i18n/auth";
import BuyButton from "@/components/buy-button";

// Vereist een ingelogde sessie — niet prerenderen tijdens build.
export const dynamic = "force-dynamic";

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
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

  // Catalogus + toegang per product (has_access draait als de ingelogde user).
  const { data: products } = await supabase
    .from("products")
    .select("id, slug, title, kind, file_path")
    .eq("active", true)
    .order("created_at");

  const items = await Promise.all(
    (products ?? []).map(async (p) => {
      const { data: owned } = await supabase.rpc("has_access", {
        p_product_id: p.id,
      });
      return { ...p, owned: owned === true };
    })
  );

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

      {status === "success" && (
        <p className="mt-8 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm">
          {t.purchaseSuccess}
        </p>
      )}
      {status === "cancelled" && (
        <p className="mt-8 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm text-(--color-muted-light)">
          {t.purchaseCancelled}
        </p>
      )}

      <section className="mt-16">
        <h2 className="text-lg font-semibold tracking-tight">
          {t.downloadsTitle}
        </h2>

        {items.length === 0 ? (
          <p className="mt-3 text-sm text-(--color-muted-light)">
            {t.downloadsEmpty}
          </p>
        ) : (
          <ul className="mt-5 flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-4"
              >
                <span className="text-sm font-medium">{item.title}</span>
                {item.owned ? (
                  <span className="inline-flex items-center gap-2 text-sm text-(--color-accent-light)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {t.owned}
                  </span>
                ) : (
                  <BuyButton slug={item.slug} locale={locale} label={t.buyCta} />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
