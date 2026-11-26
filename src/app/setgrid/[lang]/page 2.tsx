import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SetgridShell from "@/components/setgrid/shell";
import SetgridSupportForm from "@/components/setgrid/support-form";
import {
  SETGRID_LANGS,
  SETGRID_SHOTS,
  getSetgridContent,
  isSetgridLang,
} from "@/content/setgrid";

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return SETGRID_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const t = getSetgridContent(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/setgrid/${lang}`,
      languages: Object.fromEntries(
        SETGRID_LANGS.map((l) => [l, `/setgrid/${l}`])
      ),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/setgrid/${lang}`,
      images: [`/setgrid/shots/${lang}/1-workout.jpg`],
    },
  };
}

export default async function SetgridPage({ params }: Params) {
  const { lang } = await params;
  if (!isSetgridLang(lang)) notFound();
  const t = getSetgridContent(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <SetgridShell lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="grid items-center gap-10 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--sg-accent)]">
            {t.hero.badge}
          </p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl">
            {t.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--sg-muted)]">
            {t.hero.sub}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={`/setgrid/${lang}/support`} className="sg-btn sg-btn-primary">
              {t.hero.ctaSupport}
            </Link>
            <a href="#features" className="sg-btn sg-btn-ghost">
              {t.hero.ctaFeatures}
            </a>
          </div>
          <p className="mt-4 text-sm text-[var(--sg-muted)]">{t.hero.note}</p>
        </div>

        <div className="flex justify-center gap-4 md:justify-end">
          {["1-workout", "5-food"].map((shot, index) => (
            <div
              key={shot}
              className={`sg-phone w-[46%] max-w-[230px] ${
                index === 1 ? "mt-10 hidden sm:block" : ""
              }`}
            >
              <Image
                src={`/setgrid/shots/${lang}/${shot}.jpg`}
                alt=""
                width={800}
                height={1422}
                priority={index === 0}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features + screenshots */}
      <section id="features" className="scroll-mt-16 py-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t.featuresTitle}
        </h2>

        <div className="mt-8 grid gap-10">
          {t.features.map((feature, index) => (
            <article
              key={feature.title}
              className={`grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr] ${
                index % 2 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="sg-phone mx-auto w-full max-w-[260px]">
                <Image
                  src={`/setgrid/shots/${lang}/${SETGRID_SHOTS[index]}.jpg`}
                  alt={feature.title}
                  width={800}
                  height={1422}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[var(--sg-muted)]">{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Q&A */}
      <section id="faq" className="scroll-mt-16 py-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t.faqTitle}
        </h2>
        <div className="mt-6 grid gap-3">
          {t.faq.map((item) => (
            <details key={item.q} className="sg-card px-5 py-4">
              <summary className="flex items-center justify-between gap-4 font-medium">
                {item.q}
                <span className="sg-chev text-[var(--sg-accent)] transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[var(--sg-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Support */}
      <section id="support" className="scroll-mt-16 py-10">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t.support.title}
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--sg-muted)]">{t.support.intro}</p>
        <div className="mt-6 max-w-2xl">
          <SetgridSupportForm lang={lang} t={t.support} />
        </div>
      </section>
    </SetgridShell>
  );
}
