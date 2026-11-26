import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SetgridShell from "@/components/setgrid/shell";
import SetgridSupportForm from "@/components/setgrid/support-form";
import { SETGRID_LANGS, getSetgridContent, isSetgridLang } from "@/content/setgrid";

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return SETGRID_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const t = getSetgridContent(lang);
  return {
    title: `${t.support.title} — Setgrid`,
    description: t.support.intro,
    alternates: { canonical: `/setgrid/${lang}/support` },
  };
}

export default async function SetgridSupportPage({ params }: Params) {
  const { lang } = await params;
  if (!isSetgridLang(lang)) notFound();
  const t = getSetgridContent(lang);

  return (
    <SetgridShell lang={lang} page="support">
      <section className="py-10 md:py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.support.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--sg-muted)]">{t.support.intro}</p>
        <div className="mt-8 max-w-2xl">
          <SetgridSupportForm lang={lang} t={t.support} />
        </div>
        <p className="mt-6 text-sm text-[var(--sg-muted)]">
          info@mobilegrowthstudio.com
        </p>
      </section>
    </SetgridShell>
  );
}
