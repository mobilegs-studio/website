import Link from "next/link";
import { getTranslations } from "@/i18n/translations";

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
      <h1 className="font-display text-5xl sm:text-6xl leading-tight max-w-2xl">
        {c.heading}
      </h1>
      <p className="mt-8 text-lg text-(--color-muted) max-w-xl leading-relaxed">
        {c.placeholder}
      </p>
      <Link
        href={`/${locale}/contact`}
        className="mt-10 inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity w-fit"
      >
        {c.cta}
      </Link>
    </main>
  );
}
