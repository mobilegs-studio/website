import Link from "next/link";
import { getTranslations } from "@/i18n/translations";

export default async function Over({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const a = t.about;

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
        {a.label}
      </p>
      <h1 className="font-sans font-bold tracking-tight text-5xl sm:text-6xl leading-tight max-w-2xl">
        {a.heading}
      </h1>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-(--color-border) pt-16">
        <div className="flex flex-col gap-6 text-(--color-muted) leading-relaxed">
          {a.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <div className="border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {a.locationLabel}
            </p>
            <p className="font-medium">{a.locationValue}</p>
          </div>
          <div className="border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {a.availabilityLabel}
            </p>
            <p className="font-medium">
              {a.availabilityValue}{" "}
              <span className="inline-block w-2 h-2 rounded-full bg-(--color-accent) ml-1 align-middle" />
            </p>
          </div>
          <div className="border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {a.contactLabel}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="font-medium hover:text-(--color-accent) transition-colors"
            >
              {a.contactCta}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
