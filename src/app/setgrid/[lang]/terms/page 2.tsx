import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SetgridShell from "@/components/setgrid/shell";
import { SETGRID_LANGS, getSetgridContent, isSetgridLang } from "@/content/setgrid";

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return SETGRID_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const t = getSetgridContent(lang);
  return {
    title: `${t.terms.title} — Setgrid`,
    description: t.terms.intro,
    alternates: { canonical: `/setgrid/${lang}/terms` },
    robots: { index: true, follow: true },
  };
}

export default async function SetgridTermsPage({ params }: Params) {
  const { lang } = await params;
  if (!isSetgridLang(lang)) notFound();
  const t = getSetgridContent(lang);

  return (
    <SetgridShell lang={lang} page="terms">
      <section className="max-w-3xl py-10 md:py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.terms.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--sg-muted)]">{t.terms.updated}</p>
        <p className="mt-6 text-[var(--sg-muted)]">{t.terms.intro}</p>

        <div className="mt-8 grid gap-6">
          {t.terms.sections.map((section) => (
            <div key={section.h}>
              <h2 className="text-lg font-semibold tracking-tight">{section.h}</h2>
              <p className="mt-2 text-[var(--sg-muted)]">{section.p}</p>
            </div>
          ))}
        </div>
      </section>
    </SetgridShell>
  );
}
