"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Webapps",
    description:
      "Maatwerk webapplicaties die processen automatiseren en je bedrijf schaalbaar maken. Van dashboard tot klantportaal.",
    href: "/diensten#webapps",
  },
  {
    number: "02",
    title: "Native apps",
    description:
      "iOS en Android apps die je klanten een native ervaring bieden. Snel, intuïtief en gebouwd om te schalen.",
    href: "/diensten#native-apps",
  },
  {
    number: "03",
    title: "AI tooling",
    description:
      "Slimme tools die repetitief werk automatiseren. Gebouwd op de nieuwste AI-modellen, toegepast op jouw bedrijf.",
    href: "/diensten#ai-tooling",
  },
  {
    number: "04",
    title: "Dashboarding",
    description:
      "Inzicht in je cijfers zonder gedoe. We bouwen dashboards die jouw data omzetten naar overzicht en betere beslissingen.",
    href: "/diensten#dashboarding",
  },
  {
    number: "05",
    title: "Websites",
    description:
      "Snelle, professionele websites die converteren. Van landingspagina tot volledige marketing site.",
    href: "/diensten#websites",
  },
];

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: easeOut },
  }),
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-40 pb-32 sm:pt-52 sm:pb-40 text-center min-h-[90vh] overflow-hidden">
        {/* Accent glow */}
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
          Mobile Growth Studio
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-[clamp(3rem,9vw,7rem)] leading-[1.05] tracking-tight max-w-4xl"
        >
          Apps & tools die je{" "}
          <span className="italic text-(--color-accent)">bedrijf</span> slimmer
          maken.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-base sm:text-lg text-(--color-muted-light) max-w-lg leading-relaxed"
        >
          We bouwen webapps, native apps en AI tooling voor Nederlandse MKB-ers
          en ZZP-ers — zonder poespas, met resultaat.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-12 flex items-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Neem contact op
          </Link>
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-sm text-(--color-muted-light) hover:text-(--color-foreground) transition-colors"
          >
            Bekijk diensten
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
            Wat we bouwen
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
                href={service.href}
                className="group block p-8 sm:p-10 h-full bg-(--color-background) hover:bg-(--color-surface) transition-colors duration-200"
              >
                <span className="text-[10px] text-(--color-muted) tracking-[0.2em] font-mono uppercase">
                  {service.number}
                </span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight group-hover:text-(--color-accent) transition-colors duration-200">
                  {service.title}
                </h2>
                <p className="mt-3 text-(--color-muted-light) leading-relaxed text-sm">
                  {service.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-xs text-(--color-muted) group-hover:text-(--color-accent) transition-colors duration-200">
                  Meer info
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
              Klaar om te beginnen?
            </p>
            <p className="mt-2 text-(--color-muted-light) text-sm">
              Vertel ons wat je wilt bouwen. We reageren binnen 24 uur.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Neem contact op
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
