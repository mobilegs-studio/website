"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Translations } from "@/i18n/translations";

type T = Translations["solutions"];

// Kant-en-klare producten: FitTrack (echte screenshots uit de iOS-app) en
// GymBook (werkende kopie van het echte boekingsscherm, demo-data).
export default function ReadySolutions({ t, locale }: { t: T; locale: string }) {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs tracking-[0.2em] uppercase text-(--color-muted)">{t.label}</span>
        <span className="flex-1 h-px bg-(--color-border)" />
      </div>
      <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight leading-[1.08] max-w-3xl">
        {t.heading}
      </h2>
      <p className="mt-5 text-(--color-muted-light) max-w-2xl leading-relaxed">{t.subtext}</p>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <ProductCard t={t} locale={locale} id="fittrack" visualLabel={t.realScreens}>
          <FitTrackVisual />
        </ProductCard>
        <ProductCard t={t} locale={locale} id="gymbook" visualLabel={t.liveDemo}>
          <GymBookBooking t={t.booking} />
        </ProductCard>
      </div>
    </section>
  );
}

function ProductCard({
  t,
  locale,
  id,
  visualLabel,
  children,
}: {
  t: T;
  locale: string;
  id: "fittrack" | "gymbook";
  visualLabel: string;
  children: React.ReactNode;
}) {
  const p = t.products[id];
  return (
    <article className="flex flex-col rounded-2xl card-depth overflow-hidden">
      {/* Visual */}
      <div className="relative h-[450px] border-b border-(--color-border) bg-(--color-background) overflow-clip">
        {children}
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-sm">
          {visualLabel}
        </span>
      </div>

      {/* Tekst */}
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {t.ready}
          </span>
          {["iOS", "Android", "Web"].map((pl) => (
            <span key={pl} className="rounded-full border border-(--color-border) px-2.5 py-1 text-[10px] text-(--color-muted-light)">
              {pl}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-1 text-(--color-muted-light)">{p.tagline}</p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {p.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-(--color-muted-light)">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-xl border border-[rgba(var(--warm-rgb),0.25)] bg-[rgba(var(--warm-rgb),0.06)] px-4 py-3 text-sm text-(--color-foreground)">
          {t.custom}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="mt-6 w-fit inline-flex items-center gap-2 bg-(--color-accent) text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
        >
          {t.cta}
        </Link>
      </div>
    </article>
  );
}

/* ---------- FitTrack: drie echte screenshots in telefoonframes ---------- */

const shots = [
  { src: "/products/fittrack/calendar.jpg", alt: "FitTrack calendar" },
  { src: "/products/fittrack/program.jpg", alt: "FitTrack training program" },
  { src: "/products/fittrack/food.jpg", alt: "FitTrack meal plan" },
];

export function FitTrackVisual() {
  const [front, setFront] = useState(1);
  return (
    <div className="absolute inset-0 flex items-end justify-center pt-14">
      {shots.map((s, i) => {
        const pos = i - front; // -1 links, 0 midden, 1 rechts (wrapt rond)
        const rel = ((pos + 4) % 3) - 1;
        return (
          <motion.button
            key={s.src}
            type="button"
            aria-label={s.alt}
            onClick={() => setFront(i)}
            animate={{
              x: `${rel * 62}%`,
              scale: rel === 0 ? 1 : 0.84,
              opacity: rel === 0 ? 1 : 0.55,
              zIndex: rel === 0 ? 2 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[-60px] w-[170px] sm:w-[190px] origin-bottom rounded-[28px] border-[5px] border-[#1c1c1f] bg-black shadow-2xl overflow-hidden cursor-pointer"
          >
            <Image src={s.src} alt={s.alt} width={600} height={1304} className="w-full h-auto" />
          </motion.button>
        );
      })}
    </div>
  );
}

/* ---------- GymBook: werkende kopie van het boekingsscherm ---------- */

// Kleuren uit GymBook's eigen dark theme (components/ui.tsx).
const gb = {
  bg: "#0E1013",
  card: "#181B20",
  text: "#F1F3F5",
  muted: "#9AA3AE",
  border: "#2A2F36",
  accent: "#4C8DFF",
  good: "#3FB950",
  chip: "#232830",
};

const slotsByDay = [
  ["07:00", "08:00", "12:30", "17:00", "18:00"],
  ["09:00", "10:00", "16:30", "19:00"],
  ["07:30", "11:00", "13:00", "18:30", "19:30"],
];

export function GymBookBooking({ t }: { t: T["booking"] }) {
  const [type, setType] = useState(0);
  const [trainer, setTrainer] = useState(0);
  const [day, setDay] = useState(0);
  const [booked, setBooked] = useState<string | null>(null);
  const slots = slotsByDay[(day + trainer) % slotsByDay.length];

  return (
    <div className="absolute inset-0 flex items-start justify-center pt-12">
      <div
        className="relative w-[300px] h-[440px] rounded-[34px] border-[5px] border-[#1c1c1f] shadow-2xl overflow-hidden"
        style={{ background: gb.bg, color: gb.text }}
      >
        <div className="px-3 pt-4 pb-3 flex flex-col gap-2.5 text-left">
          <div className="text-[15px] font-bold px-1">GymBook</div>
          <Card>
            <H>{t.sessionType}</H>
            <Chips options={t.types} value={type} onChange={() => setBooked(null)} set={setType} />
            <H>{t.trainer}</H>
            <Chips options={t.trainers} value={trainer} onChange={() => setBooked(null)} set={setTrainer} />
            <H>{t.day}</H>
            <Chips options={t.days} value={day} onChange={() => setBooked(null)} set={setDay} />
          </Card>
          <Card>
            <H>{t.freeTimes}</H>
            <div className="flex flex-wrap gap-1.5">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setBooked(s)}
                  className="rounded-[8px] px-2.5 py-1.5 text-[11px] font-semibold transition-colors"
                  style={{
                    background: booked === s ? gb.accent : gb.chip,
                    color: gb.text,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {booked && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-[8px] px-2.5 py-1.5 text-[11px] font-semibold"
                  style={{ color: gb.good, background: "rgba(63,185,80,0.12)" }}
                >
                  {booked} · {t.bookedOk}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-2 rounded-[14px] p-3"
      style={{ background: gb.card, border: `0.5px solid ${gb.border}` }}
    >
      {children}
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] font-semibold">{children}</div>;
}

function Chips({
  options,
  value,
  set,
  onChange,
}: {
  options: readonly string[];
  value: number;
  set: (i: number) => void;
  onChange: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => {
            set(i);
            onChange();
          }}
          className="rounded-full px-2.5 py-1 text-[10.5px] transition-colors"
          style={{
            background: value === i ? gb.accent : gb.chip,
            color: gb.text,
            fontWeight: value === i ? 600 : 400,
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
