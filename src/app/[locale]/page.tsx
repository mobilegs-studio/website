"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { use, useEffect, useState } from "react";
import { getTranslations } from "@/i18n/translations";
import { serviceIcons } from "@/components/service-icons";
import ConnectionGraphic from "@/components/connection-graphic";
import SitePreview from "@/components/site-preview";
import DummyDashboard from "@/components/dummy-dashboard";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: easeOut },
  }),
};

type ServiceExample = {
  label: string;
  href?: string;
  image?: string;
  imgW?: number;
  imgH?: number;
};

// Voorbeelden van geleverd werk per dienst. AI tooling & Dashboarding zijn
// placeholders tot er echte cases zijn; Websites toont al opgeleverd werk.
const serviceExamples: Record<string, ServiceExample[]> = {
  "ai-tooling": [
    { label: "AI-offertegenerator" },
    { label: "Document-classificatie pipeline" },
    { label: "Support-chatbot op maat" },
  ],
  dashboarding: [
    { label: "Realtime sales-dashboard" },
    { label: "KPI-cockpit voor directie" },
    { label: "Marketing-attributie overzicht" },
  ],
  websites: [
    {
      label: "OREQ",
      href: "https://oreq.nl",
      image: "/cases/oreq-full.jpg",
      imgW: 1024,
      imgH: 5555,
    },
    {
      label: "By Eric Sweder",
      href: "https://ericsweder.com",
      image: "/cases/ericsweder-full.jpg",
      imgW: 1024,
      imgH: 7109,
    },
  ],
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
  const [openCard, setOpenCard] = useState<string | null>(null);
  const activeService = services.find((s) => s.id === openCard) ?? null;
  const activeExamples = openCard ? serviceExamples[openCard] : undefined;
  const activeFeatured =
    openCard === "ai-tooling" || openCard === "dashboarding";

  // Sluit met Escape en zet body-scroll vast zolang de modal open is.
  useEffect(() => {
    if (!openCard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCard(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openCard]);

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-40 pb-24 sm:pt-52 sm:pb-28 text-center overflow-hidden">
        {/* Cool indigo glow — top center (tech anchor) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,95,232,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Warm amber glow — bottom left (one human note) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 45% at 10% 100%, rgba(224,185,120,0.12) 0%, transparent 60%)",
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
          className={`font-sans font-extrabold text-[clamp(2.75rem,8vw,6rem)] leading-[1.05] tracking-tight ${
            locale === "en" ? "max-w-6xl" : "max-w-4xl"
          }`}
        >
          {h.headline1}{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          >
            {h.headlineAccent}
          </span>{" "}
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
            className="inline-flex items-center gap-2 bg-(--color-accent) text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            {h.cta}
          </Link>
          <Link
            href={`/${locale}/diensten`}
            className="inline-flex items-center gap-2 border border-(--color-border) text-(--color-foreground) font-semibold px-7 py-3.5 rounded-full hover:border-(--color-muted) hover:bg-(--color-surface) transition-colors text-sm"
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

        {/* Connection hero banner */}
        <div className="relative z-10 w-full mt-20 sm:mt-24">
          <ConnectionGraphic t={h.connectionGraphic} />
        </div>
      </section>

      {/* Services */}
      <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const featured =
              service.id === "ai-tooling" || service.id === "dashboarding";
            const examples = serviceExamples[service.id];
            const expandable = !!examples;

            const glow = (
              <div
                className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl transition-opacity duration-300 ${
                  featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ background: "rgba(91,95,232,0.25)" }}
              />
            );
            const topRow = (
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.25)] text-(--color-accent-light)">
                  {serviceIcons[service.id]}
                </span>
                {featured ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.3)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-accent-light)">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                    {h.featuredLabel}
                  </span>
                ) : (
                  <span className="text-[10px] text-(--color-muted) tracking-[0.2em] font-mono uppercase">
                    {service.number}
                  </span>
                )}
              </div>
            );
            const titleAndBullets = (
              <>
                <h2 className="relative mt-6 text-2xl font-semibold tracking-tight group-hover:text-(--color-accent-light) transition-colors duration-200">
                  {service.title}
                </h2>
                <ul className="relative mt-5 flex flex-col gap-2.5">
                  {service.items.slice(0, 3).map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2.5 text-sm text-(--color-muted-light)"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </>
            );

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
              >
                {expandable ? (
                  <button
                    type="button"
                    onClick={() => setOpenCard(service.id)}
                    className={`group relative flex flex-col h-full w-full text-left rounded-2xl card-depth p-8 overflow-hidden cursor-pointer ${
                      featured
                        ? "border-[rgba(var(--accent-rgb),0.55)] shadow-[0_16px_50px_-18px_rgba(var(--accent-rgb),0.5)]"
                        : ""
                    }`}
                  >
                    {glow}
                    {topRow}
                    {titleAndBullets}
                    <span className="relative mt-8 inline-flex items-center gap-1.5 text-xs text-(--color-accent-light)">
                      {h.viewExamples}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                        <path
                          d="M2.5 6h7M6 2.5l3.5 3.5L6 9.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <Link
                    href={`/${locale}/diensten#${service.id}`}
                    className="group relative flex flex-col h-full rounded-2xl card-depth p-8 overflow-hidden"
                  >
                    {glow}
                    {topRow}
                    {titleAndBullets}
                    <span className="relative mt-8 inline-flex items-center gap-1.5 text-xs text-(--color-muted) group-hover:text-(--color-accent-light) transition-colors duration-200">
                      {h.moreInfo}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
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
                )}
              </motion.div>
            );
          })}

          {/* 6th tile — fills the grid, invites custom requests.
              Uses the signature brand gradient: indigo rising into amber. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.4, duration: 0.5, ease: easeOut }}
          >
            <Link
              href={`/${locale}/contact`}
              className="group relative flex flex-col justify-between h-full rounded-2xl p-8 text-white overflow-hidden shadow-[0_16px_50px_-12px_rgba(91,95,232,0.45)] hover:shadow-[0_24px_60px_-12px_rgba(91,95,232,0.6)] transition-shadow"
              style={{
                background:
                  "linear-gradient(155deg, #5B5FE8 0%, #7C7FED 50%, #E0B978 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.5) 0%, transparent 45%)",
                }}
              />
              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {h.ctaTileTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {h.ctaTileText}
                </p>
              </div>
              <span className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold">
                {h.ctaTileLink}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Focus-dienst modal — bijna-fullscreen, sluit via kruisje of backdrop */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop — klik sluit */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setOpenCard(null)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeService.title}
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)"
            >
              {/* Sluitknop rechtsboven — blijft floaten, scrollt niet mee */}
              <button
                type="button"
                onClick={() => setOpenCard(null)}
                aria-label={h.closeLabel}
                className="absolute top-5 right-5 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full border border-(--color-border) bg-(--color-surface)/80 backdrop-blur-sm text-(--color-muted-light) hover:text-(--color-foreground) hover:border-(--color-muted) hover:bg-(--color-surface-hover) transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Scrollend gebied; de panel zelf scrollt niet zodat de X vast blijft */}
              <div className="overflow-y-auto p-8 sm:p-12">
              {/* Decoratieve glow */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-60"
                style={{ background: "rgba(91,95,232,0.25)" }}
              />

              {/* Header */}
              <div className="relative flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.25)] text-(--color-accent-light)">
                  {serviceIcons[activeService.id]}
                </span>
                {activeFeatured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.3)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-(--color-accent-light)">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                    {h.featuredLabel}
                  </span>
                )}
              </div>

              <p className="relative mt-6 text-sm uppercase tracking-[0.18em] text-(--color-accent-light)">
                {activeService.tagline}
              </p>
              <h2 className="relative mt-3 font-sans font-bold tracking-tight text-3xl sm:text-5xl leading-tight">
                {activeService.title}
              </h2>
              <p className="relative mt-6 max-w-2xl text-base sm:text-lg text-(--color-muted-light) leading-relaxed">
                {activeService.description}
              </p>

              {/* Wat we leveren — volledige lijst */}
              <ul className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.items.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-background)/40 px-4 py-3 text-sm text-(--color-foreground)"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Dashboarding: interactief dummy-dashboard */}
              {activeService.id === "dashboarding" && (
                <div className="relative mt-12">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-(--color-muted) mb-4">
                    {h.examplesTitle}
                  </p>
                  <DummyDashboard />
                </div>
              )}

              {/* Overige diensten: carousel met voorbeelden */}
              {activeExamples && activeService.id !== "dashboarding" && (
                <div className="relative mt-12">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-(--color-muted) mb-4">
                    {h.examplesTitle}
                  </p>
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1">
                    {activeExamples.map((ex) => {
                      const media = ex.image ? (
                        // Live ingebedde site met screenshot-fallback
                        <SitePreview
                          image={ex.image}
                          alt={ex.label}
                          imgW={ex.imgW}
                          imgH={ex.imgH}
                        />
                      ) : (
                        // Placeholder tot er een echte case is
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-(--color-border) bg-[linear-gradient(150deg,rgba(91,95,232,0.28)_0%,rgba(124,127,237,0.12)_45%,rgba(224,185,120,0.14)_100%)]">
                          <div
                            className="absolute inset-0 opacity-40"
                            style={{
                              background:
                                "radial-gradient(circle at 75% 15%, rgba(255,255,255,0.35) 0%, transparent 45%)",
                            }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-(--color-foreground)/70">
                            {serviceIcons[activeService.id]}
                          </span>
                          <span className="absolute top-3 right-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/80">
                            {h.examplesSoon}
                          </span>
                        </div>
                      );
                      const tile = (
                        <>
                          {media}
                          <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-(--color-foreground)">
                            {ex.label}
                            {ex.href && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-(--color-accent-light)">
                                <path
                                  d="M3.5 8.5l5-5M4.5 3.5h4v4"
                                  stroke="currentColor"
                                  strokeWidth="1.3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </p>
                        </>
                      );
                      return ex.href ? (
                        <a
                          key={ex.label}
                          href={ex.href}
                          target="_blank"
                          rel="noopener"
                          className="group/ex shrink-0 w-72 snap-start"
                        >
                          {tile}
                        </a>
                      ) : (
                        <div key={ex.label} className="shrink-0 w-72 snap-start">
                          {tile}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="relative mt-10">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 bg-(--color-accent) text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  {h.cta}
                </Link>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Differentiator — AI in het hart van het proces */}
      <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="relative overflow-hidden rounded-3xl border border-[rgba(var(--accent-rgb),0.35)] p-8 sm:p-14"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-50"
            style={{ background: "rgba(91,95,232,0.22)" }}
          />
          <div className="relative">
            <span className="text-xs tracking-[0.22em] uppercase text-(--color-accent-light)">
              {h.differentiator.label}
            </span>
            <h2 className="mt-5 font-sans font-bold tracking-tight text-3xl sm:text-5xl leading-tight max-w-3xl">
              {h.differentiator.heading}
            </h2>
            <p className="mt-6 text-base sm:text-lg text-(--color-muted-light) max-w-3xl leading-relaxed">
              {h.differentiator.body}
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {h.differentiator.points.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-(--color-border) bg-(--color-background)/40 p-6"
                >
                  <p className="text-base font-semibold tracking-tight text-(--color-accent-light)">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm text-(--color-muted-light) leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works — contrast band */}
      <section className="bg-(--color-surface) border-y border-(--color-border) px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-(--color-muted)">
              {h.processLabel}
            </span>
            <span className="flex-1 h-px bg-(--color-border)" />
          </motion.div>

          <h2 className="font-sans font-bold tracking-tight text-3xl sm:text-4xl leading-tight mb-14">
            {h.processHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {h.processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: easeOut }}
                className="rounded-2xl card-depth p-7"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.25)] font-mono text-sm text-(--color-accent-light)">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-(--color-muted-light) leading-relaxed text-sm">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        >
          <div>
            <p className="font-sans font-bold tracking-tight text-3xl sm:text-4xl leading-tight">
              {h.ctaHeading}
            </p>
            <p className="mt-2 text-(--color-muted-light) text-sm">
              {h.ctaSubtext}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="shrink-0 inline-flex items-center gap-2 bg-(--color-accent) text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            {h.cta}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
