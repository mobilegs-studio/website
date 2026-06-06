"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import { getTranslations } from "@/i18n/translations";
import { serviceIcons } from "@/components/service-icons";
import ConnectionGraphic from "@/components/connection-graphic";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
            >
              <Link
                href={`/${locale}/diensten#${service.id}`}
                className="group relative flex flex-col h-full rounded-2xl card-depth p-8 overflow-hidden"
              >
                {/* hover glow */}
                <div
                  className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300"
                  style={{ background: "rgba(91,95,232,0.25)" }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.25)] text-(--color-accent-light)">
                    {serviceIcons[service.id]}
                  </span>
                  <span className="text-[10px] text-(--color-muted) tracking-[0.2em] font-mono uppercase">
                    {service.number}
                  </span>
                </div>
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
            </motion.div>
          ))}

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

          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-14">
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
            <p className="font-display text-3xl sm:text-4xl leading-tight">
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
