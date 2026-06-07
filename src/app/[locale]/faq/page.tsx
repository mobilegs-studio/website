import Link from "next/link";
import { FaqJsonLd } from "@/components/json-ld";
import { getTranslations } from "@/i18n/translations";

export default async function Faq({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const f = t.faq;

  return (
    <>
      <FaqJsonLd faqs={f.items as unknown as { question: string; answer: string }[]} />
      <main className="flex flex-1 flex-col px-6 py-32 max-w-3xl mx-auto w-full">
        <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
          {f.label}
        </p>
        <h1 className="font-sans font-bold tracking-tight text-5xl sm:text-6xl leading-tight">
          {f.heading}
        </h1>
        <p className="mt-6 text-(--color-muted-light) leading-relaxed max-w-xl">
          {f.subtext}
        </p>

        <div className="mt-20 flex flex-col divide-y divide-(--color-border)">
          {f.items.map(({ question, answer }, i) => (
            <details
              key={i}
              className="group py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-4 text-base font-medium leading-snug select-none">
                <span>{question}</span>
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-(--color-border) flex items-center justify-center text-(--color-muted) group-open:border-(--color-accent) group-open:text-(--color-accent) transition-colors">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="transition-transform group-open:rotate-45"
                  >
                    <path
                      d="M5 1v8M1 5h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-(--color-muted-light) leading-relaxed text-sm pr-8">
                {answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-20 border-t border-(--color-border) pt-12">
          <p className="font-sans font-bold tracking-tight text-2xl">{f.notFoundHeading}</p>
          <p className="mt-3 text-(--color-muted-light) text-sm">
            {f.notFoundSubtext}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex items-center gap-2 bg-(--color-accent) text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            {f.notFoundCta}
          </Link>
        </div>
      </main>
    </>
  );
}
