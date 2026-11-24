import Link from "next/link";
import { getTranslations } from "@/i18n/translations";

// Afsluitend blok onder een pagina: één duidelijke actie (gratis call van
// 30 min) met een bericht sturen als alternatief.
export default function CallCta({ locale }: { locale: string }) {
  const h = getTranslations(locale).home;
  return (
    <section className="mt-24 flex flex-col items-start justify-between gap-8 rounded-3xl border border-[rgba(var(--accent-rgb),0.35)] p-7 sm:flex-row sm:items-center sm:p-10">
      <div>
        <p className="font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{h.ctaHeading}</p>
        <p className="mt-2 max-w-md text-sm text-(--color-muted-light)">{h.ctaSubtext}</p>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
        <Link
          href={`/${locale}/gesprek`}
          className="inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {h.cta}
        </Link>
        <span className="text-xs text-(--color-muted)">{h.ctaTrust}</span>
        <Link href={`/${locale}/contact`} className="text-sm text-(--color-muted-light) underline underline-offset-4 hover:text-(--color-foreground)">
          {h.ctaAlt}
        </Link>
      </div>
    </section>
  );
}
