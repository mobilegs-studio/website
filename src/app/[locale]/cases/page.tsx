import Link from "next/link";
import { getTranslations } from "@/i18n/translations";
import CasesCarousel from "@/components/cases-carousel";

export default async function Cases({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const c = t.cases;

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
        {c.label}
      </p>
      <h1 className="font-sans font-bold tracking-tight text-5xl sm:text-6xl leading-tight max-w-2xl">
        {c.heading}
      </h1>
      <p className="mt-8 text-lg text-(--color-muted-light) max-w-xl leading-relaxed">
        {c.intro}
      </p>

      <div className="mt-16">
        <CasesCarousel
          stories={c.stories}
          projectLabel={c.projectLabel}
          resultLabel={c.resultLabel}
        />
      </div>

      <div className="mt-20 border-t border-(--color-border) pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="font-sans font-bold tracking-tight text-2xl sm:text-3xl">{c.ctaHeading}</p>
        <Link
          href={`/${locale}/contact`}
          className="shrink-0 inline-flex items-center gap-2 bg-(--color-accent) text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
        >
          {c.cta}
        </Link>
      </div>
    </main>
  );
}
