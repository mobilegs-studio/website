"use client";

// Website-demo: voor/na-schuif van een (fictieve) bakkerij-site, met
// scores eronder. Sleep de hendel of gebruik de pijltjestoetsen.

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Copy = {
  before: string;
  after: string;
  drag: string;
  metrics: { label: string; before: string; after: string }[];
  old: { welcome: string; nav: string[]; intro: string; hours: string; visitors: string };
  neu: { nav: string[]; headline: string; sub: string; cta: string; open: string; reviews: string; products: { name: string; price: string }[] };
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    before: "Voor",
    after: "Na",
    drag: "Sleep om te vergelijken",
    metrics: [
      { label: "Snelheid", before: "54", after: "98" },
      { label: "SEO", before: "61", after: "100" },
      { label: "Laadtijd", before: "4,8 s", after: "0,9 s" },
      { label: "Mobiel", before: "Nee", after: "Ja" },
      { label: "In AI-zoek", before: "Nee", after: "Ja" },
    ],
    old: {
      welcome: "Welkom op de website van Bakkerij Van Dam!!",
      nav: ["Home", "Over ons", "Producten", "Gastenboek", "Contact"],
      intro: "Wij zijn een familiebedrijf sinds 1962. Klik hieronder voor onze producten. Deze site is het best te bekijken met Internet Explorer.",
      hours: "Openingstijden: ma-vr 7.00-18.00, za 7.00-16.00",
      visitors: "U bent bezoeker nr. 004213",
    },
    neu: {
      nav: ["Assortiment", "Bestellen", "Over ons"],
      headline: "Elke ochtend vers uit de oven.",
      sub: "Desem, gebak en taarten. Vandaag bestellen, morgen ophalen.",
      cta: "Bestel voor morgen",
      open: "Nu open · tot 18:00",
      reviews: "4,9 ★ · 312 reviews",
      products: [
        { name: "Desembrood", price: "€ 4,25" },
        { name: "Croissant", price: "€ 1,60" },
        { name: "Appeltaart", price: "€ 18,50" },
      ],
    },
  },
  en: {
    before: "Before",
    after: "After",
    drag: "Drag to compare",
    metrics: [
      { label: "Speed", before: "54", after: "98" },
      { label: "SEO", before: "61", after: "100" },
      { label: "Load time", before: "4.8 s", after: "0.9 s" },
      { label: "Mobile", before: "No", after: "Yes" },
      { label: "In AI search", before: "No", after: "Yes" },
    ],
    old: {
      welcome: "Welcome to the website of Van Dam Bakery!!",
      nav: ["Home", "About us", "Products", "Guestbook", "Contact"],
      intro: "We have been a family business since 1962. Click below for our products. This site is best viewed in Internet Explorer.",
      hours: "Opening hours: Mon-Fri 7.00-18.00, Sat 7.00-16.00",
      visitors: "You are visitor no. 004213",
    },
    neu: {
      nav: ["Range", "Order", "About"],
      headline: "Fresh from the oven, every morning.",
      sub: "Sourdough, pastries and cakes. Order today, pick up tomorrow.",
      cta: "Order for tomorrow",
      open: "Open now · until 18:00",
      reviews: "4.9 ★ · 312 reviews",
      products: [
        { name: "Sourdough", price: "€ 4.25" },
        { name: "Croissant", price: "€ 1.60" },
        { name: "Apple pie", price: "€ 18.50" },
      ],
    },
  },
  de: {
    before: "Vorher",
    after: "Nachher",
    drag: "Ziehen zum Vergleichen",
    metrics: [
      { label: "Speed", before: "54", after: "98" },
      { label: "SEO", before: "61", after: "100" },
      { label: "Ladezeit", before: "4,8 s", after: "0,9 s" },
      { label: "Mobil", before: "Nein", after: "Ja" },
      { label: "In KI-Suche", before: "Nein", after: "Ja" },
    ],
    old: {
      welcome: "Willkommen auf der Website der Bäckerei Van Dam!!",
      nav: ["Home", "Über uns", "Produkte", "Gästebuch", "Kontakt"],
      intro: "Wir sind ein Familienbetrieb seit 1962. Klicken Sie unten für unsere Produkte. Diese Seite ist am besten mit dem Internet Explorer zu sehen.",
      hours: "Öffnungszeiten: Mo-Fr 7.00-18.00, Sa 7.00-16.00",
      visitors: "Sie sind Besucher Nr. 004213",
    },
    neu: {
      nav: ["Sortiment", "Bestellen", "Über uns"],
      headline: "Jeden Morgen frisch aus dem Ofen.",
      sub: "Sauerteig, Gebäck und Torten. Heute bestellen, morgen abholen.",
      cta: "Für morgen bestellen",
      open: "Jetzt geöffnet · bis 18:00",
      reviews: "4,9 ★ · 312 Bewertungen",
      products: [
        { name: "Sauerteigbrot", price: "4,25 €" },
        { name: "Croissant", price: "1,60 €" },
        { name: "Apfelkuchen", price: "18,50 €" },
      ],
    },
  },
};

export default function RedesignSlider({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.4 });
  const [pos, setPos] = useState(35);
  const dragging = useRef(false);

  // Eenmalige hint: de hendel zwaait kort heen en weer.
  useEffect(() => {
    if (!inView || reduce) return;
    const a = animate(35, [35, 70, 20, 35], { duration: 2.2, ease: "easeInOut", onUpdate: setPos });
    return () => a.stop();
  }, [inView, reduce]);

  const setFromX = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="p-5 sm:p-7">
      <div
        ref={box}
        className="relative h-[380px] select-none overflow-hidden rounded-xl border border-(--color-border) touch-none cursor-ew-resize"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <OldSite c={c.old} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <NewSite c={c.neu} />
        </div>

        {/* Labels */}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {c.before}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-(--color-accent) px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {c.after}
        </span>

        {/* Hendel */}
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]" style={{ left: `${pos}%` }}>
          <button
            type="button"
            role="slider"
            aria-label={c.drag}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
            }}
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-xl"
          >
            ‹ ›
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-(--color-muted)">{c.drag}</p>

      {/* Scores */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {c.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-(--color-border) bg-(--color-background) px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wider text-(--color-muted)">{m.label}</p>
            <p className="mt-1 text-sm">
              <span className="text-red-300/80 line-through decoration-1">{m.before}</span>
              <span className="mx-1.5 text-(--color-muted)">→</span>
              <span className="font-semibold text-emerald-300">{m.after}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OldSite({ c }: { c: Copy["old"] }) {
  return (
    <div className="absolute inset-0 bg-[#efe9d8] p-4 pt-12 text-[#222]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="border-4 border-double border-[#7a5c2e] bg-[#fff8e7] p-3 text-center">
        <p className="text-xl font-bold text-[#8b1a1a] sm:text-2xl">{c.welcome}</p>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-3 bg-[#7a5c2e] px-2 py-1 text-sm">
        {c.nav.map((n) => (
          <span key={n} className="text-[#ffff99] underline">
            {n}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[100px_1fr] gap-3 sm:grid-cols-[140px_1fr]">
        <div className="flex h-24 items-center justify-center border-2 border-[#999] bg-[#ddd] text-[11px] text-[#666]">[foto]</div>
        <p className="text-sm leading-snug">{c.intro}</p>
      </div>
      <table className="mt-3 w-full border border-[#999] text-xs">
        <tbody>
          <tr className="bg-[#ccc]">
            <td className="border border-[#999] px-2 py-1">{c.hours}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-4 text-center text-[11px] text-[#0000ee] underline">{c.visitors}</p>
    </div>
  );
}

function NewSite({ c }: { c: Copy["neu"] }) {
  return (
    <div className="absolute inset-0 bg-[#16110c] p-5 pt-12 text-[#f5efe6]">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold tracking-tight">Van Dam</span>
        <span className="hidden gap-4 text-[#c9bba8] sm:flex">
          {c.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
        <span className="rounded-full bg-[#e0b978] px-3 py-1 text-[11px] font-semibold text-black">{c.cta}</span>
      </div>
      <div className="mx-auto mt-8 max-w-xl text-center">
        <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300">
          ● {c.open}
        </span>
        <p className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">{c.headline}</p>
        <p className="mt-3 text-sm text-[#c9bba8]">{c.sub}</p>
        <p className="mt-3 text-xs text-[#e0b978]">{c.reviews}</p>
      </div>
      <div className="absolute bottom-5 left-5 right-5 hidden grid-cols-3 gap-2 sm:grid">
        {c.products.map((p, i) => (
          <div key={p.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
            <div
              className="h-12 rounded-lg sm:h-16"
              style={{
                background: ["linear-gradient(135deg,#8a5a2b,#c99554)", "linear-gradient(135deg,#c98d3c,#f0c27a)", "linear-gradient(135deg,#7d3b1c,#d08a4c)"][i],
              }}
            />
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="font-semibold">{p.name}</span>
              <span className="text-[#c9bba8]">{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
