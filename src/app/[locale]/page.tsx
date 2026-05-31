"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import { getTranslations } from "@/i18n/translations";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const serviceIcons: Record<string, React.ReactNode> = {
  // Webapps — browser window
  webapps: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </svg>
  ),
  // Native apps — phone
  "native-apps": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </svg>
  ),
  // AI tooling — spark / node
  "ai-tooling": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  // Dashboarding — bar chart
  dashboarding: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="5" />
      <rect x="13" y="8" width="3" height="9" />
      <rect x="19" y="5" width="0.01" height="0.01" />
      <path d="M19 5v12" />
    </svg>
  ),
  // Websites — globe
  websites: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  ),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: easeOut },
  }),
};

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = getTranslations(locale);
  const h = t.home;
  const services = t.services.items;

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-40 pb-32 sm:pt-52 sm:pb-40 text-center min-h-[90vh] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,255,0,0.07) 0%, transparent 70%)",
          }}
        />

        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xs tracking-[0.25em] uppercase text-(--color-muted-light) mb-8"
        >
          {h.label}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-[clamp(3rem,9vw,7rem)] leading-[1.05] tracking-tight max-w-4xl"
        >
          {h.headline1}{" "}
          <span className="italic text-(--color-accent)">{h.headlineAccent}</span>{" "}
          {h.headline2}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-base sm:text-lg text-(--color-muted-light) max-w-lg leading-relaxed"
        >
          {h.subtext}
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 flex items-center gap-4"
        >
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            {h.cta}
          </Link>
          <Link
            href={`/${locale}/diensten`}
            className="inline-flex items-center gap-2 text-sm text-(--color-muted-light) hover:text-(--color-foreground) transition-colors"
          >
            {h.viewServices}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Services */}
      <section className="px-6 pb-40 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-(--color-muted)">
            {h.whatWeBuild}
          </span>
          <span className="flex-1 h-px bg-(--color-border)" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-(--color-border)">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: easeOut }}
              className="border-r border-b border-(--color-border)"
            >
              <Link
                href={`/${locale}/diensten#${service.id}`}
                className="group block p-8 sm:p-10 h-full bg-(--color-background) hover:bg-(--color-surface) transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-(--color-accent)">
                    {serviceIcons[service.id]}
                  </span>
                  <span className="text-[10px] text-(--color-muted) tracking-[0.2em] font-mono uppercase">
                    {service.number}
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight group-hover:text-(--color-accent) transition-colors duration-200">
                  {service.title}
                </h2>
                <p className="mt-3 text-(--color-muted-light) leading-relaxed text-sm">
                  {service.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-xs text-(--color-muted) group-hover:text-(--color-accent) transition-colors duration-200">
                  {h.moreInfo}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-(--color-border) px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        >
          <div>
            <p className="font-display text-3xl sm:text-4xl leading-tight">
              {h.ctaHeading}
            </p>
            <p className="mt-2 text-(--color-muted-light) text-sm">
              {h.ctaSubtext}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="shrink-0 inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            {h.cta}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
