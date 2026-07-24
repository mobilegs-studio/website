"use client";

// AppInsights — fictief "App-groei dashboard" voor een app-uitgever.
// Puur demo-materiaal: alle cijfers zijn verzonnen en deterministisch
// gegenereerd (SSR-veilig, geen Math.random of Date.now tijdens render).
// De platform-toggle (iOS / Android / Beide) genereert alle data opnieuw
// met een eigen seed per platform; "Beide" is de optelsom van iOS + Android.

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Platform = "ios" | "android" | "both";

const PLATFORMS: Platform[] = ["ios", "android", "both"];

// Alle zichtbare teksten per taal. Nederlands is de primaire stem.
const COPY = {
  nl: {
    title: "App-groei dashboard",
    client: "app-uitgever",
    live: "live demo",
    platformAria: "Kies platform",
    platforms: { ios: "iOS", android: "Android", both: "Beide" } as Record<Platform, string>,
    kpiDownloads: "Downloads",
    kpiActive: "Actieve gebruikers",
    kpiConversion: "Conversie naar betaald",
    kpiRating: "App-rating",
    vsPrev: "vs vorige maand",
    funnelTitle: "Conversie-funnel",
    funnelSub: "Van install naar betaald abonnement · deze maand",
    steps: ["Installs", "Registraties", "Trial gestart", "Betaald abonnement"],
    ofPrevious: "van vorige stap",
    retentionTitle: "Retentie per cohort",
    retentionSub: "Actieve gebruikers per week na install",
    cohort: "Cohort",
    week: "week",
    weekShort: "W",
    months: ["mrt", "apr", "mei", "jun", "jul", "aug"],
    ratingsTitle: "Ratingverdeling",
    countriesTitle: "Top landen",
    countries: ["Nederland", "Duitsland", "Frankrijk", "Verenigd Koninkrijk", "Spanje"],
    share: "aandeel downloads",
  },
  en: {
    title: "App growth dashboard",
    client: "app publisher",
    live: "live demo",
    platformAria: "Choose platform",
    platforms: { ios: "iOS", android: "Android", both: "Both" } as Record<Platform, string>,
    kpiDownloads: "Downloads",
    kpiActive: "Active users",
    kpiConversion: "Paid conversion",
    kpiRating: "App rating",
    vsPrev: "vs last month",
    funnelTitle: "Conversion funnel",
    funnelSub: "From install to paid subscription · this month",
    steps: ["Installs", "Sign-ups", "Trial started", "Paid subscription"],
    ofPrevious: "of previous step",
    retentionTitle: "Retention by cohort",
    retentionSub: "Active users per week after install",
    cohort: "Cohort",
    week: "week",
    weekShort: "W",
    months: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    ratingsTitle: "Rating distribution",
    countriesTitle: "Top countries",
    countries: ["Netherlands", "Germany", "France", "United Kingdom", "Spain"],
    share: "share of downloads",
  },
  de: {
    title: "App-Wachstums-Dashboard",
    client: "App-Publisher",
    live: "Live-Demo",
    platformAria: "Plattform wählen",
    platforms: { ios: "iOS", android: "Android", both: "Beide" } as Record<Platform, string>,
    kpiDownloads: "Downloads",
    kpiActive: "Aktive Nutzer",
    kpiConversion: "Bezahlt-Konversion",
    kpiRating: "App-Bewertung",
    vsPrev: "vs. Vormonat",
    funnelTitle: "Conversion-Funnel",
    funnelSub: "Vom Install zum bezahlten Abo · dieser Monat",
    steps: ["Installs", "Registrierungen", "Trial gestartet", "Bezahltes Abo"],
    ofPrevious: "des vorherigen Schritts",
    retentionTitle: "Retention pro Kohorte",
    retentionSub: "Aktive Nutzer pro Woche nach Install",
    cohort: "Kohorte",
    week: "Woche",
    weekShort: "W",
    months: ["Mär", "Apr", "Mai", "Jun", "Jul", "Aug"],
    ratingsTitle: "Bewertungsverteilung",
    countriesTitle: "Top-Länder",
    countries: ["Niederlande", "Deutschland", "Frankreich", "Vereinigtes Königreich", "Spanien"],
    share: "Anteil Downloads",
  },
};

// Deterministische pseudo-random op basis van een integer-seed,
// zodat server en client exact dezelfde cijfers renderen.
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type PlatformData = {
  downloads: number;
  active: number;
  conversion: number; // % installs -> betaald
  rating: number;
  deltas: { downloads: number; active: number; conversion: number; rating: number };
  funnel: number[]; // 4 stappen, aflopend
  retention: number[][]; // 6 cohorten x 6 weken, in %
  ratingDist: number[]; // 5 waarden (5★ .. 1★), in %
  countries: number[]; // 5 aandelen, in %
};

// Ruwe dataset voor één platform, volledig bepaald door de seed.
function rawData(s: number): PlatformData {
  const downloads = Math.round(21000 + seeded(s + 1) * 17000);
  const active = Math.round(downloads * (2.4 + seeded(s + 2) * 1.1));

  // Funnel: elke stap is een fractie van de vorige.
  const registrations = Math.round(downloads * (0.52 + seeded(s + 11) * 0.1));
  const trials = Math.round(registrations * (0.24 + seeded(s + 12) * 0.08));
  const paid = Math.round(trials * (0.32 + seeded(s + 13) * 0.1));
  const funnel = [downloads, registrations, trials, paid];
  const conversion = (paid / downloads) * 100;

  const rating = 4.1 + seeded(s + 4) * 0.7;

  const deltas = {
    downloads: Math.round((seeded(s + 61) * 26 - 8) * 10) / 10,
    active: Math.round((seeded(s + 62) * 22 - 7) * 10) / 10,
    conversion: Math.round((seeded(s + 63) * 18 - 8) * 10) / 10,
    rating: Math.round((seeded(s + 64) * 0.3 - 0.1) * 10) / 10,
  };

  // Retentie-cohorts: startwaarde per cohort, daarna wekelijkse afname.
  const retention: number[][] = [];
  for (let r = 0; r < 6; r++) {
    const row: number[] = [];
    const start = 52 + seeded(s + 30 + r) * 14;
    for (let c = 0; c < 6; c++) {
      const decay = Math.pow(0.82 - seeded(s + 40 + r * 6 + c) * 0.06, c);
      row.push(Math.round(start * decay));
    }
    retention.push(row);
  }

  // Ratingverdeling (5★ eerst) en landen-aandelen: basis + jitter, dan normaliseren.
  const distBase = [57, 23, 9, 6, 5].map((v, i) => v * (0.85 + seeded(s + 70 + i) * 0.3));
  const distSum = distBase.reduce((a, b) => a + b, 0);
  const ratingDist = distBase.map((v) => Math.round((v / distSum) * 100));

  const countryBase = [33, 21, 17, 15, 14].map((v, i) => v * (0.85 + seeded(s + 80 + i) * 0.3));
  const countrySum = countryBase.reduce((a, b) => a + b, 0);
  const countries = countryBase.map((v) => Math.round((v / countrySum) * 100));

  return { downloads, active, conversion, rating, deltas, funnel, retention, ratingDist, countries };
}

// "Beide" = optelsom van iOS + Android, met gewogen gemiddelden waar optellen niet klopt.
function combineData(a: PlatformData, b: PlatformData): PlatformData {
  const w = a.downloads / (a.downloads + b.downloads);
  const wavg = (x: number, y: number) => x * w + y * (1 - w);

  const funnel = a.funnel.map((v, i) => v + (b.funnel[i] ?? 0));
  const downloads = a.downloads + b.downloads;
  const paid = funnel[3] ?? 0;

  return {
    downloads,
    active: a.active + b.active,
    conversion: (paid / downloads) * 100,
    rating: wavg(a.rating, b.rating),
    deltas: {
      downloads: Math.round(wavg(a.deltas.downloads, b.deltas.downloads) * 10) / 10,
      active: Math.round(wavg(a.deltas.active, b.deltas.active) * 10) / 10,
      conversion: Math.round(wavg(a.deltas.conversion, b.deltas.conversion) * 10) / 10,
      rating: Math.round(wavg(a.deltas.rating, b.deltas.rating) * 10) / 10,
    },
    funnel,
    retention: a.retention.map((row, r) =>
      row.map((v, c) => Math.round(wavg(v, b.retention[r]?.[c] ?? v)))
    ),
    ratingDist: a.ratingDist.map((v, i) => Math.round(wavg(v, b.ratingDist[i] ?? v))),
    countries: a.countries.map((v, i) => Math.round(wavg(v, b.countries[i] ?? v))),
  };
}

function buildData(platform: Platform): PlatformData {
  const ios = rawData(11);
  const android = rawData(47);
  if (platform === "ios") return ios;
  if (platform === "android") return android;
  return combineData(ios, android);
}

// Kleine amber ster voor de rating-KPI en de ratingverdeling.
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="#E0B978" className={className} aria-hidden="true">
      <path d="M10 1.6l2.47 5.26 5.53.72-4.06 3.92 1.05 5.6L10 14.4l-4.99 2.7 1.05-5.6L2 7.58l5.53-.72L10 1.6z" />
    </svg>
  );
}

// Teller die van 0 naar de eindwaarde animeert zodra hij in beeld komt.
// Bij een platform-wissel animeert hij van de huidige naar de nieuwe waarde.
function CountUp({
  value,
  format,
  className = "",
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const current = useRef(0);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration: 0.8,
      ease: EASE,
      onUpdate: (v) => {
        current.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {format(display)}
    </span>
  );
}

// Delta-chip: periwinkle bij groei, amber bij daling.
function DeltaChip({ delta, text }: { delta: number; text: string }) {
  const up = delta >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
        up
          ? "bg-[rgba(91,95,232,0.14)] text-(--color-accent-light)"
          : "bg-[rgba(224,185,120,0.12)] text-(--color-warm)"
      }`}
    >
      <span aria-hidden="true" className="text-[8px]">
        {up ? "▲" : "▼"}
      </span>
      <span className="font-mono">{text}</span>
    </span>
  );
}

// Kaart die zachtjes invliegt zodra hij in beeld komt (met stagger via delay).
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

// Gradients per funnel-stap: indigo dominant, alleen de betaal-stap eindigt in amber.
const FUNNEL_GRADIENTS = [
  "linear-gradient(90deg,#3F44C9,#5B5FE8)",
  "linear-gradient(90deg,#3F44C9,#5B5FE8 70%,#7C82EE)",
  "linear-gradient(90deg,#5B5FE8,#9BA3F2)",
  "linear-gradient(90deg,#5B5FE8,#9BA3F2 55%,#E0B978)",
];

const CARD =
  "rounded-xl border border-(--color-border) bg-(--color-surface) [background-image:linear-gradient(180deg,rgba(255,255,255,0.03),transparent_45%)]";

export default function AppInsights({ locale }: { locale: string }) {
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const tag = locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US";

  const reduced = useReducedMotion();
  const [platform, setPlatform] = useState<Platform>("both");
  const [cell, setCell] = useState<{ r: number; c: number } | null>(null);

  const data = useMemo(() => buildData(platform), [platform]);

  // Eén in-view trigger voor de funnel-onthulling.
  const mainRef = useRef<HTMLDivElement>(null);
  const mainInView = useInView(mainRef, { once: true, margin: "-40px" });
  const revealed = mainInView || !!reduced;

  const fmtInt = (n: number) => Math.round(n).toLocaleString(tag);
  const fmt1 = (n: number) =>
    n.toLocaleString(tag, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const kpis = [
    {
      label: copy.kpiDownloads,
      value: <CountUp value={data.downloads} format={fmtInt} />,
      delta: data.deltas.downloads,
      deltaText: `${fmt1(Math.abs(data.deltas.downloads))}%`,
    },
    {
      label: copy.kpiActive,
      value: <CountUp value={data.active} format={fmtInt} />,
      delta: data.deltas.active,
      deltaText: `${fmt1(Math.abs(data.deltas.active))}%`,
    },
    {
      label: copy.kpiConversion,
      value: (
        <>
          <CountUp value={data.conversion} format={fmt1} />
          <span className="font-mono text-sm text-(--color-muted-light)">%</span>
        </>
      ),
      delta: data.deltas.conversion,
      deltaText: `${fmt1(Math.abs(data.deltas.conversion))}%`,
    },
    {
      label: copy.kpiRating,
      value: (
        <>
          <CountUp value={data.rating} format={fmt1} />
          <Star className="h-3.5 w-3.5" />
        </>
      ),
      delta: data.deltas.rating,
      deltaText: fmt1(Math.abs(data.deltas.rating)),
    },
  ];

  const maxDist = Math.max(...data.ratingDist, 1);
  const maxCountry = Math.max(...data.countries, 1);

  // Positie van de heatmap-tooltip: links/rechts verankerd bij randkolommen.
  const tooltipStyle = (r: number, c: number): CSSProperties => {
    const style: CSSProperties = { top: `calc(${(r / 6) * 100}% - 6px)` };
    if (c <= 1) {
      style.left = `${(c / 6) * 100}%`;
      style.transform = "translateY(-100%)";
    } else if (c >= 4) {
      style.right = `${((5 - c) / 6) * 100}%`;
      style.transform = "translateY(-100%)";
    } else {
      style.left = `${((c + 0.5) / 6) * 100}%`;
      style.transform = "translate(-50%, -100%)";
    }
    return style;
  };

  return (
    <div className="w-full bg-[#0b0a12] p-4 sm:p-6">
      {/* Topbalk: live-dot + titel + klantbadge + platform-toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-accent-light) opacity-50 motion-reduce:animate-none"
              style={{ animationDuration: "2.2s" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-accent-light)" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">
            {copy.live}
          </span>
          <h3 className="text-sm font-semibold text-white/90 sm:text-base">{copy.title}</h3>
          <span className="rounded-full border border-(--color-border) bg-(--color-surface) px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-(--color-muted-light)">
            {copy.client}
          </span>
        </div>
        <div
          role="group"
          aria-label={copy.platformAria}
          className="inline-flex rounded-full border border-(--color-border) bg-(--color-surface) p-1"
        >
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={platform === p}
              onClick={() => setPlatform(p)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                platform === p
                  ? "bg-[rgba(91,95,232,0.18)] text-(--color-accent-light)"
                  : "text-(--color-muted) hover:text-(--color-muted-light)"
              }`}
            >
              {copy.platforms[p]}
            </button>
          ))}
        </div>
      </div>

      {/* KPI-rij */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.06} className={`${CARD} p-4`}>
            <p className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">
              {k.label}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xl tracking-tight text-white sm:text-2xl">
              {k.value}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <DeltaChip delta={k.delta} text={k.deltaText} />
              <span className="text-[10px] text-(--color-muted)">{copy.vsPrev}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Hoofdgebied: funnel (2/3) + retentie-heatmap (1/3) */}
      <div ref={mainRef} className="mt-3 grid gap-3 lg:grid-cols-3">
        {/* Conversie-funnel */}
        <Reveal delay={0.1} className={`${CARD} p-4 sm:p-5 lg:col-span-2`}>
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-xs font-semibold text-white/90">{copy.funnelTitle}</h4>
            <p className="text-[10px] text-(--color-muted)">{copy.funnelSub}</p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {data.funnel.map((count, i) => {
              const prev = i === 0 ? count : data.funnel[i - 1] ?? count;
              const pctOfPrev = (count / prev) * 100;
              const widthPct = Math.max(7, (count / (data.funnel[0] ?? 1)) * 100);
              return (
                <div key={copy.steps[i]} className="group relative">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-(--color-muted-light)">{copy.steps[i]}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-sm text-white/90">{fmtInt(count)}</span>
                      <span className="w-14 text-right font-mono text-[10px] text-(--color-muted)">
                        {fmt1(pctOfPrev)}%
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-7 overflow-hidden rounded-lg bg-white/[0.03]">
                    <motion.div
                      className="h-full rounded-lg"
                      style={{
                        backgroundImage: FUNNEL_GRADIENTS[i],
                        boxShadow: "0 0 14px rgba(91,95,232,0.25)",
                      }}
                      initial={false}
                      animate={{ width: revealed ? `${widthPct}%` : "0%" }}
                      transition={{
                        duration: reduced ? 0 : 0.9,
                        ease: EASE,
                        delay: reduced ? 0 : i * 0.08,
                      }}
                    />
                  </div>
                  {/* Tooltip per stap */}
                  <div className="pointer-events-none absolute -top-1 left-0 z-10 -translate-y-full rounded-md border border-(--color-border) bg-(--color-surface-hover) px-2.5 py-1.5 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                    <p className="text-[10px] whitespace-nowrap text-(--color-muted-light)">
                      <span className="font-semibold text-white/90">{copy.steps[i]}</span>
                      <span> · </span>
                      <span className="font-mono">{fmtInt(count)}</span>
                      <span> · </span>
                      <span className="font-mono text-(--color-accent-light)">
                        {fmt1(pctOfPrev)}%
                      </span>
                      {i > 0 ? <span> {copy.ofPrevious}</span> : null}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Retentie-cohorts */}
        <Reveal delay={0.16} className={`${CARD} p-4 sm:p-5`}>
          <h4 className="text-xs font-semibold text-white/90">{copy.retentionTitle}</h4>
          <p className="mt-0.5 text-[10px] text-(--color-muted)">{copy.retentionSub}</p>
          <div className="mt-4 flex gap-2">
            {/* Maandlabels per cohort */}
            <div className="flex w-8 flex-col gap-1 pt-5">
              {copy.months.map((m) => (
                <span
                  key={m}
                  className="flex h-6 items-center font-mono text-[10px] text-(--color-muted)"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="flex-1">
              {/* Weeknummers */}
              <div className="mb-1 grid h-4 grid-cols-6 gap-1">
                {[1, 2, 3, 4, 5, 6].map((w) => (
                  <span
                    key={w}
                    className="text-center font-mono text-[10px] text-(--color-muted)"
                  >
                    {copy.weekShort}
                    {w}
                  </span>
                ))}
              </div>
              {/* 6x6 cellen, opacity geschaald op retentie-% */}
              <div className="relative grid grid-cols-6 gap-1" onMouseLeave={() => setCell(null)}>
                {data.retention.map((row, r) =>
                  row.map((v, c) => (
                    <div
                      key={`${r}-${c}`}
                      onMouseEnter={() => setCell({ r, c })}
                      aria-label={`${copy.cohort} ${copy.months[r]} · ${copy.week} ${c + 1} · ${v}%`}
                      className="h-6 rounded-[4px] transition-transform duration-150 hover:scale-[1.08] hover:ring-1 hover:ring-(--color-accent-light)"
                      style={{
                        backgroundColor: `rgba(91,95,232,${Math.min(1, 0.06 + (v / 70) * 0.9).toFixed(3)})`,
                      }}
                    />
                  ))
                )}
                {cell ? (
                  <div
                    className="pointer-events-none absolute z-10 rounded-md border border-(--color-border) bg-(--color-surface-hover) px-2 py-1 shadow-lg"
                    style={tooltipStyle(cell.r, cell.c)}
                  >
                    <p className="text-[10px] whitespace-nowrap text-(--color-muted-light)">
                      {copy.cohort} {copy.months[cell.r]} · {copy.week} {cell.c + 1} ·{" "}
                      <span className="font-mono text-(--color-accent-light)">
                        {data.retention[cell.r]?.[cell.c]}%
                      </span>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Onderste strook: ratingverdeling + top landen */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Reveal delay={0.22} className={`${CARD} p-4 sm:p-5`}>
          <h4 className="text-xs font-semibold text-white/90">{copy.ratingsTitle}</h4>
          <div className="mt-3 flex flex-col gap-2.5">
            {data.ratingDist.map((pct, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex w-7 items-center gap-0.5 font-mono text-[11px] text-(--color-muted-light)">
                  {5 - i}
                  <Star className="h-2.5 w-2.5 opacity-80" />
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#3F44C9,#9BA3F2)] transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: `${(pct / maxDist) * 100}%` }}
                  />
                </div>
                <span className="w-9 text-right font-mono text-[10px] text-(--color-muted)">
                  {fmtInt(pct)}%
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.28} className={`${CARD} p-4 sm:p-5`}>
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-xs font-semibold text-white/90">{copy.countriesTitle}</h4>
            <p className="text-[10px] text-(--color-muted)">{copy.share}</p>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {data.countries.map((pct, i) => (
              <div key={copy.countries[i]} className="flex items-center gap-2">
                <span className="w-28 truncate text-[11px] text-(--color-muted-light)">
                  {copy.countries[i]}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#3F44C9,#5B5FE8_70%,#9BA3F2)] transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: `${(pct / maxCountry) * 100}%` }}
                  />
                </div>
                <span className="w-9 text-right font-mono text-[10px] text-(--color-muted)">
                  {fmtInt(pct)}%
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
