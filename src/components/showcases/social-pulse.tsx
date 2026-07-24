"use client";

// SocialPulse — fictief social-media-dashboard voor een consumentenmerk.
// Showcase-component: alle data is demodata en wordt deterministisch
// gegenereerd (geen Math.random/Date.now tijdens render), zodat server en
// client exact hetzelfde renderen. Grafieken zijn handgemaakt in SVG/divs.

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

/* ---------------------------------- data ---------------------------------- */

type PlatformId = "instagram" | "tiktok" | "youtube" | "linkedin";
type Selection = "all" | PlatformId;

type Platform = {
  id: PlatformId;
  label: string;
  color: string;
  base: number; // volgers aan het begin van de reeks
  growth: number; // gemiddelde aanwas per meetpunt
  reachFactor: number; // bereik t.o.v. volgers
  engagement: number; // engagement-rate in %
  posts: number; // posts deze maand
  seed: number;
};

// Kleuren bewust ingehouden: indigo/periwinkle dominant, amber en muted
// alleen als onderscheid tussen de dunne lijnen in de "Alle"-weergave.
const PLATFORMS: Platform[] = [
  { id: "instagram", label: "Instagram", color: "#5B5FE8", base: 46800, growth: 240, reachFactor: 6.1, engagement: 4.8, posts: 18, seed: 11 },
  { id: "tiktok", label: "TikTok", color: "#9BA3F2", base: 28900, growth: 520, reachFactor: 9.4, engagement: 6.3, posts: 22, seed: 23 },
  { id: "youtube", label: "YouTube", color: "#E0B978", base: 11800, growth: 95, reachFactor: 4.0, engagement: 2.9, posts: 6, seed: 37 },
  { id: "linkedin", label: "LinkedIn", color: "#8a8a96", base: 8400, growth: 60, reachFactor: 2.7, engagement: 3.4, posts: 9, seed: 51 },
];

const SEL_SEED: Record<Selection, number> = { all: 7, instagram: 11, tiktok: 23, youtube: 37, linkedin: 51 };

const CHART_POINTS = 16;
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Tijdsloten voor de heatmap (8 dagdelen tussen 6:00 en 24:00).
const SLOTS = ["06:00", "08:00", "10:00", "12:00", "15:00", "17:00", "19:00", "21:00"];

/* ---------------------------------- copy ---------------------------------- */

const COPY = {
  nl: {
    title: "Social media dashboard",
    client: "consumentenmerk",
    live: "live demo",
    all: "Alle",
    kpis: ["Volgers (totaal)", "Bereik (30d)", "Engagement-rate", "Posts deze maand"],
    vsPrev: "vs. vorige periode",
    chartTitle: "Volgersgroei",
    chartSub: "laatste 30 dagen",
    chartSubAll: "laatste 30 dagen · geïndexeerd per platform",
    axisStart: "30 dagen geleden",
    axisEnd: "vandaag",
    day: "dag",
    followersUnit: "volgers",
    topPosts: "Top posts",
    topPostsSub: "op interacties (30d)",
    interactions: "interacties",
    postTitles: [
      "Achter de schermen: zo maken we het",
      "Klantverhaal: van idee naar resultaat",
      "5 tips voor je ochtendroutine",
      "Wist je dat…?",
    ],
    heatTitle: "Beste tijd om te posten",
    heatSub: "engagement per dagdeel (30d)",
    bestSlot: "beste slot",
    engHigh: "hoge engagement",
    engMid: "gemiddelde engagement",
    engLow: "lage engagement",
    days: ["ma", "di", "wo", "do", "vr", "za", "zo"],
  },
  en: {
    title: "Social media dashboard",
    client: "consumer brand",
    live: "live demo",
    all: "All",
    kpis: ["Followers (total)", "Reach (30d)", "Engagement rate", "Posts this month"],
    vsPrev: "vs. previous period",
    chartTitle: "Follower growth",
    chartSub: "last 30 days",
    chartSubAll: "last 30 days · indexed per platform",
    axisStart: "30 days ago",
    axisEnd: "today",
    day: "day",
    followersUnit: "followers",
    topPosts: "Top posts",
    topPostsSub: "by engagement (30d)",
    interactions: "engagements",
    postTitles: [
      "Behind the scenes: how we make it",
      "Customer story: from idea to result",
      "5 tips for your morning routine",
      "Did you know…?",
    ],
    heatTitle: "Best time to post",
    heatSub: "engagement by time slot (30d)",
    bestSlot: "best slot",
    engHigh: "high engagement",
    engMid: "average engagement",
    engLow: "low engagement",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  de: {
    title: "Social-Media-Dashboard",
    client: "Konsumentenmarke",
    live: "Live-Demo",
    all: "Alle",
    kpis: ["Follower (gesamt)", "Reichweite (30 T.)", "Engagement-Rate", "Posts diesen Monat"],
    vsPrev: "ggü. Vorperiode",
    chartTitle: "Follower-Wachstum",
    chartSub: "letzte 30 Tage",
    chartSubAll: "letzte 30 Tage · indexiert je Plattform",
    axisStart: "vor 30 Tagen",
    axisEnd: "heute",
    day: "Tag",
    followersUnit: "Follower",
    topPosts: "Top-Posts",
    topPostsSub: "nach Interaktionen (30 T.)",
    interactions: "Interaktionen",
    postTitles: [
      "Hinter den Kulissen: so entsteht es",
      "Kundenstory: von der Idee zum Ergebnis",
      "5 Tipps für deine Morgenroutine",
      "Wusstest du schon…?",
    ],
    heatTitle: "Beste Zeit zum Posten",
    heatSub: "Engagement je Zeitfenster (30 T.)",
    bestSlot: "bestes Zeitfenster",
    engHigh: "hohes Engagement",
    engMid: "mittleres Engagement",
    engLow: "geringes Engagement",
    days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  },
} as const;

// Unie van de drie talen: door `as const` zijn het verschillende literals.
type Copy = (typeof COPY)[keyof typeof COPY];

/* ----------------------- deterministische generatoren ---------------------- */

// Deterministische pseudo-random op basis van een numerieke seed.
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Volgersreeks per platform: gestage groei met wat organische ruis.
function buildSeries(p: Platform): number[] {
  const values: number[] = [];
  let v = p.base;
  for (let i = 0; i < CHART_POINTS; i++) {
    v += p.growth * (0.55 + 0.9 * seeded(p.seed * 7.3 + i * 3.1));
    values.push(Math.round(v));
  }
  return values;
}

// Reeksen zijn statisch per platform; één keer op module-niveau berekenen.
const SERIES = Object.fromEntries(PLATFORMS.map((p) => [p.id, buildSeries(p)])) as Record<PlatformId, number[]>;

// Delta t.o.v. vorige periode, deterministisch per selectie + KPI-index.
function deltaFor(seed: number, i: number) {
  return Math.round((seeded(seed * 4.3 + i * 9.7) * 26 - 8) * 10) / 10;
}

type Pt = { x: number; y: number };

// Punten in een 0–100 viewBox; elke lijn op eigen schaal (geïndexeerd).
function toPoints(values: number[]): Pt[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => ({
    x: (i / (CHART_POINTS - 1)) * 100,
    y: 92 - ((v - min) / span) * 76,
  }));
}

// Vloeiend pad via cubic-bezier tussenpunten.
function smoothPath(pts: Pt[]): string {
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const cx = ((p0.x + p1.x) / 2).toFixed(2);
    d += ` C ${cx} ${p0.y.toFixed(2)}, ${cx} ${p1.y.toFixed(2)}, ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }
  return d;
}

function areaPath(pts: Pt[]): string {
  return `${smoothPath(pts)} L 100 100 L 0 100 Z`;
}

// Top posts: per selectie een eigen deterministische ranglijst.
function buildTopPosts(sel: Selection) {
  const seed = SEL_SEED[sel];
  const source =
    sel === "all"
      ? [PLATFORMS[1], PLATFORMS[0], PLATFORMS[2], PLATFORMS[3]]
      : (Array.from({ length: 4 }, () => PLATFORMS.find((p) => p.id === sel) ?? PLATFORMS[0]) as Platform[]);
  return source
    .map((p, i) => ({
      platform: p,
      titleIdx: (i + seed) % 4,
      count: Math.round(p.base * (0.24 - i * 0.045) * (0.8 + 0.4 * seeded(seed * 5.1 + i * 2.7))),
    }))
    .sort((a, b) => b.count - a.count);
}

// Heatmap: avonden en di/do scoren hoger, plus ruis per selectie.
function buildHeat(sel: Selection) {
  const seed = SEL_SEED[sel];
  const slotBoost = [0.3, 0.42, 0.55, 0.68, 0.55, 0.62, 0.95, 0.82];
  const dayBoost = [0.6, 0.9, 0.62, 0.85, 0.7, 0.52, 0.46];
  const cells: number[][] = [];
  let best = { day: 0, slot: 0, v: 0 };
  for (let d = 0; d < 7; d++) {
    const row: number[] = [];
    for (let s = 0; s < 8; s++) {
      const noise = 0.7 + 0.6 * seeded(seed * 3.3 + d * 13.7 + s * 7.1);
      const v = Math.min(1, slotBoost[s] * dayBoost[d] * noise * 1.15);
      row.push(v);
      if (v > best.v) best = { day: d, slot: s, v };
    }
    cells.push(row);
  }
  return { cells, best };
}

/* ------------------------------- subcomponenten ---------------------------- */

// Getal telt op bij eerste weergave (en bij wissel van platform).
// Bij prefers-reduced-motion wordt de waarde direct gezet.
function CountUp({ value, play, format }: { value: number; play: boolean; format: (n: number) => string }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 800);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (value - from) * eased;
      fromRef.current = v;
      setDisplay(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, play, reduced]);

  return <>{format(display)}</>;
}

// Subtiel toplicht op elke kaart (huisstijl).
function TopLight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[rgba(155,163,242,0.28)] to-transparent"
    />
  );
}

/* --------------------------------- component ------------------------------- */

export default function SocialPulse({ locale }: { locale: string }) {
  const copy: Copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const numLocale = locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US";
  const reduced = useReducedMotion();
  const gradId = useId().replace(/:/g, "");

  const [selection, setSelection] = useState<Selection>("all");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [heatHover, setHeatHover] = useState<{ d: number; s: number } | null>(null);

  const kpiRef = useRef<HTMLDivElement>(null);
  const kpiInView = useInView(kpiRef, { once: true, amount: 0.3 });
  const chartRef = useRef<HTMLDivElement>(null);

  const fmtInt = (n: number) => Math.round(n).toLocaleString(numLocale);
  const fmtPct = (n: number) => n.toLocaleString(numLocale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Alles wat van de platform-keuze afhangt, deterministisch afleiden.
  const lines = useMemo(() => {
    const act = selection === "all" ? PLATFORMS : PLATFORMS.filter((p) => p.id === selection);
    return act.map((p) => ({ p, pts: toPoints(SERIES[p.id]) }));
  }, [selection]);

  const kpis = useMemo(() => {
    const seed = SEL_SEED[selection];
    const act = selection === "all" ? PLATFORMS : PLATFORMS.filter((p) => p.id === selection);
    const followers = act.reduce((a, p) => a + SERIES[p.id][CHART_POINTS - 1], 0);
    const reach = act.reduce(
      (a, p) => a + SERIES[p.id][CHART_POINTS - 1] * p.reachFactor * (0.92 + 0.16 * seeded(p.seed * 1.7)),
      0
    );
    const engagement = act.reduce((a, p) => a + p.engagement * SERIES[p.id][CHART_POINTS - 1], 0) / followers;
    const posts = act.reduce((a, p) => a + p.posts, 0);
    return [
      { label: copy.kpis[0], value: followers, decimals: 0 as const, suffix: "", delta: Math.round((1.2 + 5.4 * seeded(seed * 2.1)) * 10) / 10 },
      { label: copy.kpis[1], value: reach, decimals: 0 as const, suffix: "", delta: deltaFor(seed, 1) },
      { label: copy.kpis[2], value: engagement, decimals: 1 as const, suffix: "%", delta: deltaFor(seed, 2) },
      { label: copy.kpis[3], value: posts, decimals: 0 as const, suffix: "", delta: deltaFor(seed, 3) },
    ];
  }, [selection, copy]);

  const topPosts = useMemo(() => buildTopPosts(selection), [selection]);
  const heat = useMemo(() => buildHeat(selection), [selection]);

  const single = selection !== "all" ? lines[0] : null;
  const hoverX = hoverIdx !== null ? (hoverIdx / (CHART_POINTS - 1)) * 100 : 0;
  const tooltipRows =
    hoverIdx !== null
      ? lines.map(({ p }) => ({ p, v: SERIES[p.id][hoverIdx] })).sort((a, b) => b.v - a.v)
      : [];

  // Entree-animatie: gestaffeld, uitgeschakeld bij reduced motion.
  const container: Variants = {
    hidden: {},
    visible: { transition: reduced ? undefined : { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
  const kpiContainer: Variants = {
    hidden: {},
    visible: { transition: reduced ? undefined : { staggerChildren: 0.06 } },
  };

  function selectPlatform(id: Selection) {
    setSelection(id);
    setHoverIdx(null);
    setHeatHover(null);
  }

  function handleChartMove(e: React.MouseEvent) {
    const rect = chartRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rel = (e.clientX - rect.left) / rect.width;
    setHoverIdx(Math.min(CHART_POINTS - 1, Math.max(0, Math.round(rel * (CHART_POINTS - 1)))));
  }

  function heatLevel(v: number) {
    return v >= 0.62 ? copy.engHigh : v >= 0.32 ? copy.engMid : copy.engLow;
  }

  const segments: { id: Selection; label: string }[] = [
    { id: "all", label: copy.all },
    ...PLATFORMS.map((p) => ({ id: p.id as Selection, label: p.label })),
  ];

  return (
    <motion.div
      className="w-full bg-[#0b0a12] p-4 sm:p-6"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* ------------------------------ topbalk ------------------------------ */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <h2 className="text-sm font-semibold tracking-tight text-(--color-foreground)">{copy.title}</h2>
          <span className="inline-flex items-center rounded-full border border-(--color-border) bg-(--color-surface) px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-(--color-muted-light)">
            {copy.client}
          </span>
        </div>
        <div className="ms-auto flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-accent-light) opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-accent)" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">{copy.live}</span>
          </span>
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-(--color-border) bg-(--color-surface) p-1">
            {segments.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={selection === s.id}
                onClick={() => selectPlatform(s.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                  selection === s.id
                    ? "bg-[rgba(91,95,232,0.18)] text-(--color-accent-light)"
                    : "text-(--color-muted) hover:text-(--color-foreground)"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ------------------------------ KPI-rij ------------------------------ */}
      <motion.div ref={kpiRef} variants={kpiContainer} className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <motion.div
            key={k.label}
            variants={item}
            className="relative overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) p-4"
          >
            <TopLight />
            <p className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">{k.label}</p>
            <p className="mt-2 font-mono text-xl font-semibold tracking-tight text-(--color-foreground) sm:text-2xl">
              <CountUp value={k.value} play={kpiInView} format={(n) => (k.decimals === 1 ? fmtPct(n) : fmtInt(n))} />
              {k.suffix}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                  k.delta >= 0
                    ? "bg-[rgba(91,95,232,0.12)] text-(--color-accent-light)"
                    : "bg-[rgba(224,185,120,0.12)] text-(--color-warm)"
                }`}
              >
                {k.delta >= 0 ? "▲" : "▼"} {fmtPct(Math.abs(k.delta))}%
              </span>
              <span className="truncate text-[10px] text-(--color-muted)">{copy.vsPrev}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --------------------- hoofdgrafiek + top posts ---------------------- */}
      <motion.div variants={item} className="mt-3 grid gap-3 lg:grid-cols-3">
        {/* Volgersgroei-lijn */}
        <div className="relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 lg:col-span-2">
          <TopLight />
          {/* zachte gloed rechtsboven */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(91,95,232,0.2) 0%, transparent 70%)" }}
          />
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">{copy.chartTitle}</p>
              <p className="mt-0.5 text-[11px] text-(--color-muted-light)">
                {selection === "all" ? copy.chartSubAll : copy.chartSub}
              </p>
            </div>
            {/* legenda-chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {lines.map(({ p }) => (
                <span
                  key={p.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) bg-(--color-background) px-2 py-0.5 text-[10px] text-(--color-muted-light)"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            key={selection}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div
              ref={chartRef}
              className="relative mt-4 h-52 sm:h-60"
              onMouseMove={handleChartMove}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B5FE8" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#5B5FE8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* rasterlijnen */}
                {[25, 50, 75].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="100"
                    y1={y}
                    y2={y}
                    stroke="#1d1b29"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {single ? (
                  <>
                    {/* vulling + gloed + lijn voor één platform */}
                    <path d={areaPath(single.pts)} fill={`url(#${gradId})`} />
                    <path
                      d={smoothPath(single.pts)}
                      fill="none"
                      stroke={single.p.color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      opacity="0.35"
                      style={{ filter: "blur(5px)" }}
                    />
                    <path
                      d={smoothPath(single.pts)}
                      fill="none"
                      stroke={single.p.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                ) : (
                  lines.map(({ p, pts }) => (
                    <path
                      key={p.id}
                      d={smoothPath(pts)}
                      fill="none"
                      stroke={p.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      opacity="0.7"
                    />
                  ))
                )}
              </svg>

              {/* hoverlaag: hulplijn, punten en tooltip */}
              {hoverIdx !== null && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 w-px bg-[rgba(155,163,242,0.25)]"
                    style={{ left: `${hoverX}%` }}
                  />
                  {lines.map(({ p, pts }) => (
                    <div
                      key={p.id}
                      aria-hidden
                      className="pointer-events-none absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#0b0a12]"
                      style={{ left: `${pts[hoverIdx].x}%`, top: `${pts[hoverIdx].y}%`, borderColor: p.color }}
                    />
                  ))}
                  <div
                    className="pointer-events-none absolute top-2 z-20 min-w-32 rounded-lg border border-(--color-border) bg-(--color-surface-hover) px-2.5 py-2 shadow-xl"
                    style={{ left: `${hoverX}%`, transform: `translateX(-${hoverX}%)` }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-muted)">
                      {copy.day} {Math.round((hoverIdx / (CHART_POINTS - 1)) * 29) + 1} · {copy.followersUnit}
                    </p>
                    {tooltipRows.map((r) => (
                      <div key={r.p.id} className="mt-1 flex items-center gap-2">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: r.p.color }} />
                        <span className="text-[10px] text-(--color-muted-light)">{r.p.label}</span>
                        <span className="ms-auto ps-3 font-mono text-[10px] text-(--color-foreground)">{fmtInt(r.v)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-(--color-muted)">
            <span>{copy.axisStart}</span>
            <span>{copy.axisEnd}</span>
          </div>
        </div>

        {/* Top posts */}
        <div className="relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
          <TopLight />
          <p className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">{copy.topPosts}</p>
          <p className="mt-0.5 text-[11px] text-(--color-muted-light)">{copy.topPostsSub}</p>
          <div className="mt-3 space-y-1">
            {topPosts.map((row, i) => (
              <div
                key={`${row.platform.id}-${row.titleIdx}`}
                className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-border) hover:bg-(--color-surface-hover)"
              >
                <span className="pt-0.5 font-mono text-[11px] text-(--color-muted)">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-(--color-foreground)">{copy.postTitles[row.titleIdx]}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-(--color-border) bg-(--color-background) px-1.5 py-px text-[9px] uppercase tracking-[0.12em] text-(--color-muted-light)">
                    <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: row.platform.color }} />
                    {row.platform.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-(--color-foreground)">{fmtInt(row.count)}</p>
                  <p className="text-[9px] uppercase tracking-[0.12em] text-(--color-muted)">{copy.interactions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ------------------------- heatmap: beste tijd ------------------------ */}
      <motion.div variants={item} className="relative mt-3 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
        <TopLight />
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">{copy.heatTitle}</p>
            <p className="mt-0.5 text-[11px] text-(--color-muted-light)">{copy.heatSub}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(224,185,120,0.35)] bg-[rgba(224,185,120,0.08)] px-2 py-0.5 text-[10px] text-(--color-warm)">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-(--color-warm)" />
            {copy.bestSlot}: {copy.days[heat.best.day]} · {SLOTS[heat.best.slot]}
          </span>
        </div>

        {/* Samenvatting voor schermlezers; de cellen zelf zijn decoratief. */}
        <p className="sr-only">
          {copy.heatTitle}: {copy.days[heat.best.day]} {SLOTS[heat.best.slot]} — {copy.engHigh}
        </p>

        <div className="mt-3" aria-hidden>
          <div className="grid gap-1" style={{ gridTemplateColumns: "2.5rem repeat(8, 1fr)" }}>
            <div />
            {SLOTS.map((s) => (
              <div key={s} className="pb-1 text-center font-mono text-[9px] text-(--color-muted)">
                {s}
              </div>
            ))}
          </div>
          {copy.days.map((day, d) => (
            <div key={day} className="mt-1 grid items-center gap-1" style={{ gridTemplateColumns: "2.5rem repeat(8, 1fr)" }}>
              <div className="pe-2 text-right font-mono text-[9px] text-(--color-muted)">{day}</div>
              {SLOTS.map((slot, s) => {
                const v = heat.cells[d][s];
                const isBest = heat.best.day === d && heat.best.slot === s;
                const hovered = heatHover?.d === d && heatHover?.s === s;
                return (
                  <div key={slot} className="relative">
                    <div
                      className="h-6 rounded-[4px] transition-transform duration-150 hover:scale-[1.06]"
                      style={{
                        background: isBest
                          ? "rgba(224,185,120,0.9)"
                          : `rgba(91,95,232,${(0.05 + v * 0.5).toFixed(3)})`,
                        boxShadow: isBest ? "0 0 14px rgba(224,185,120,0.35)" : undefined,
                      }}
                      onMouseEnter={() => setHeatHover({ d, s })}
                      onMouseLeave={() => setHeatHover(null)}
                    />
                    {hovered && (
                      <div
                        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-(--color-border) bg-(--color-surface-hover) px-2 py-1 font-mono text-[10px] text-(--color-foreground) shadow-xl ${
                          d === 0 ? "top-full mt-1.5" : "bottom-full mb-1.5"
                        }`}
                      >
                        {day} · {slot} · {isBest ? copy.engHigh : heatLevel(v)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
