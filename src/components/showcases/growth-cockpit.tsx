"use client";

// GrowthCockpit — fictief "Marketing cockpit" voor een internationale scale-up.
// Vlaggenschip-showcase: een cross-channel marketing command center.
// Puur demo-materiaal: alle cijfers zijn verzonnen en deterministisch
// gegenereerd (SSR-veilig, geen Math.random of Date.now tijdens render).
// De periode-toggle (7d / 30d / 90d) genereert alle data opnieuw; de seed
// is per periode vast, dus elke keuze toont altijd exact dezelfde cijfers.

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PeriodKey = "7d" | "30d" | "90d";

const PERIODS: PeriodKey[] = ["7d", "30d", "90d"];

// Basisconfig per periode: eigen seed, aantal chartpunten, spend-niveau en
// hoeveel "golven" (seizoenscycli) er in de hoofdchart zichtbaar zijn.
const PERIOD_CONF: Record<
  PeriodKey,
  { seed: number; points: number; spendBase: number; cycles: number }
> = {
  "7d": { seed: 7, points: 14, spendBase: 18600, cycles: 1.5 },
  "30d": { seed: 30, points: 15, spendBase: 79400, cycles: 2.5 },
  "90d": { seed: 90, points: 14, spendBase: 236800, cycles: 3 },
};

// Fictieve, generieke kanalen. Gewicht = aandeel van de spend,
// roasMin/roasMax = bandbreedte waarbinnen de ROAS per periode jittert.
const CHANNEL_META = [
  { name: "Search", weight: 0.34, roasMin: 3.7, roasMax: 4.5 },
  { name: "Social", weight: 0.24, roasMin: 2.8, roasMax: 3.6 },
  { name: "Video", weight: 0.17, roasMin: 1.9, roasMax: 2.6 },
  { name: "Display", weight: 0.13, roasMin: 2.3, roasMax: 3.1 },
  { name: "Affiliate", weight: 0.12, roasMin: 3.2, roasMax: 4.2 },
];

type Copy = {
  title: string;
  client: string;
  live: string;
  periodAria: string;
  periods: Record<PeriodKey, string>;
  kpiSpend: string;
  kpiRevenue: string;
  kpiRoas: string;
  kpiCpa: string;
  vsPrev: string;
  chartTitle: string;
  legendSpend: string;
  legendRevenue: string;
  day: string;
  week: string;
  aiTitle: string;
  aiChip: string;
  insights: { text: string; meta: string }[];
  channelsTitle: string;
  channelsNote: string;
  colChannel: string;
  colSpend: string;
  colPacing: string;
  colRoas: string;
  colStatus: string;
  statusOk: string;
  statusWarn: string;
};

// Alle zichtbare teksten per taal. Nederlands is de primaire stem.
const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    title: "Marketing cockpit",
    client: "internationale scale-up",
    live: "live demo",
    periodAria: "Kies periode",
    periods: { "7d": "7d", "30d": "30d", "90d": "90d" },
    kpiSpend: "Ad spend",
    kpiRevenue: "Omzet",
    kpiRoas: "ROAS",
    kpiCpa: "CPA",
    vsPrev: "t.o.v. vorige periode",
    chartTitle: "Spend vs Omzet",
    legendSpend: "Spend",
    legendRevenue: "Omzet",
    day: "dag",
    week: "week",
    aiTitle: "AI-inzichten",
    aiChip: "AI",
    insights: [
      {
        text: "Budget automatisch verschoven naar best presterend kanaal (+12% ROAS)",
        meta: "9 min geleden",
      },
      {
        text: "Afwijking gedetecteerd: CPA-stijging op kanaal Video",
        meta: "26 min geleden",
      },
      {
        text: "Weekend-bod verhoogd op basis van conversiepatroon",
        meta: "1 uur geleden",
      },
    ],
    channelsTitle: "Kanalen",
    channelsNote: "AI-bieden actief op 3 van de 5 kanalen",
    colChannel: "Kanaal",
    colSpend: "Spend",
    colPacing: "Pacing",
    colRoas: "ROAS",
    colStatus: "Status",
    statusOk: "op koers",
    statusWarn: "let op",
  },
  en: {
    title: "Marketing cockpit",
    client: "international scale-up",
    live: "live demo",
    periodAria: "Choose period",
    periods: { "7d": "7d", "30d": "30d", "90d": "90d" },
    kpiSpend: "Ad spend",
    kpiRevenue: "Revenue",
    kpiRoas: "ROAS",
    kpiCpa: "CPA",
    vsPrev: "vs previous period",
    chartTitle: "Spend vs revenue",
    legendSpend: "Spend",
    legendRevenue: "Revenue",
    day: "day",
    week: "week",
    aiTitle: "AI insights",
    aiChip: "AI",
    insights: [
      {
        text: "Budget automatically shifted to the best-performing channel (+12% ROAS)",
        meta: "9 min ago",
      },
      {
        text: "Anomaly detected: CPA increase on channel Video",
        meta: "26 min ago",
      },
      {
        text: "Weekend bids raised based on conversion pattern",
        meta: "1 hr ago",
      },
    ],
    channelsTitle: "Channels",
    channelsNote: "AI bidding active on 3 of 5 channels",
    colChannel: "Channel",
    colSpend: "Spend",
    colPacing: "Pacing",
    colRoas: "ROAS",
    colStatus: "Status",
    statusOk: "on track",
    statusWarn: "attention",
  },
  de: {
    title: "Marketing-Cockpit",
    client: "internationales Scale-up",
    live: "Live-Demo",
    periodAria: "Zeitraum wählen",
    periods: { "7d": "7T", "30d": "30T", "90d": "90T" },
    kpiSpend: "Ad-Spend",
    kpiRevenue: "Umsatz",
    kpiRoas: "ROAS",
    kpiCpa: "CPA",
    vsPrev: "ggü. Vorperiode",
    chartTitle: "Spend vs. Umsatz",
    legendSpend: "Spend",
    legendRevenue: "Umsatz",
    day: "Tag",
    week: "Woche",
    aiTitle: "KI-Insights",
    aiChip: "KI",
    insights: [
      {
        text: "Budget automatisch in den stärksten Kanal verschoben (+12 % ROAS)",
        meta: "vor 9 Min.",
      },
      {
        text: "Abweichung erkannt: CPA-Anstieg im Kanal Video",
        meta: "vor 26 Min.",
      },
      {
        text: "Wochenend-Gebote auf Basis des Conversion-Musters erhöht",
        meta: "vor 1 Std.",
      },
    ],
    channelsTitle: "Kanäle",
    channelsNote: "KI-Gebote auf 3 von 5 Kanälen aktiv",
    colChannel: "Kanal",
    colSpend: "Spend",
    colPacing: "Pacing",
    colRoas: "ROAS",
    colStatus: "Status",
    statusOk: "auf Kurs",
    statusWarn: "Achtung",
  },
};

// Deterministische pseudo-random op basis van een integer-seed,
// zodat server en client exact dezelfde cijfers renderen.
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type ChartPoint = {
  spend: number;
  revenue: number;
  x: number; // 0-100 (%)
  ySpend: number; // 0-100 (%)
  yRev: number; // 0-100 (%)
};

type CockpitData = {
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  deltas: { spend: number; revenue: number; roas: number; cpa: number };
  sparks: string[]; // 4 sparkline-puntreeksen, één per KPI
  points: ChartPoint[];
  spendLine: string;
  spendArea: string;
  revLine: string;
  revArea: string;
  gridValues: { y: number; value: number }[];
  channels: { name: string; spend: number; pacing: number; roas: number; warn: boolean }[];
};

// Volledige dataset voor één periode, volledig bepaald door de periode-seed.
function buildData(period: PeriodKey): CockpitData {
  const conf = PERIOD_CONF[period];
  const s = conf.seed;
  const round1 = (v: number) => Math.round(v * 10) / 10;

  // KPI's: basisniveau + jitter, afgerond op nette bedragen.
  const spend = Math.round((conf.spendBase * (0.95 + seeded(s * 3 + 1) * 0.1)) / 100) * 100;
  const roas = Math.round((2.9 + seeded(s * 3 + 2) * 0.9) * 100) / 100;
  const revenue = Math.round((spend * roas) / 100) * 100;
  const cpa = Math.round((18 + seeded(s * 3 + 3) * 7) * 100) / 100;

  const deltas = {
    spend: round1(seeded(s * 5 + 11) * 20 - 8),
    revenue: round1(seeded(s * 5 + 12) * 24 - 6),
    roas: round1(seeded(s * 5 + 13) * 14 - 5),
    cpa: round1(seeded(s * 5 + 14) * 16 - 9),
  };

  // Mini-sparklines: 12 punten in een 100x28 viewBox; de trendrichting
  // volgt de delta van de KPI zodat chip en lijntje hetzelfde vertellen.
  const sparks = [deltas.spend, deltas.revenue, deltas.roas, deltas.cpa].map((delta, k) => {
    const trend = Math.max(-1, Math.min(1, delta / 12));
    const pts: string[] = [];
    for (let i = 0; i < 12; i++) {
      const noise = seeded(s * 100 + k * 17 + i * 3) - 0.5;
      const v = Math.max(0.06, Math.min(0.94, 0.5 + trend * (i / 11 - 0.5) * 0.7 + noise * 0.32));
      pts.push(`${((i / 11) * 100).toFixed(1)},${(3 + (1 - v) * 22).toFixed(1)}`);
    }
    return pts.join(" ");
  });

  // Hoofdchart: spend + omzet per punt, met seizoensgolf, ruis en lichte uptrend.
  const n = conf.points;
  const perPoint = spend / n;
  const raw: { spend: number; revenue: number }[] = [];
  for (let i = 0; i < n; i++) {
    const season = Math.sin((i / (n - 1)) * Math.PI * 2 * conf.cycles + 1.1);
    const noise = seeded(s * 7 + i * 5) - 0.5;
    const sv = Math.max(
      perPoint * 0.45,
      perPoint * (1 + season * 0.15 + noise * 0.24 + (i / n) * 0.12)
    );
    const rv = sv * (roas + (seeded(s * 9 + i * 3) - 0.5) * 0.9);
    raw.push({ spend: Math.round(sv), revenue: Math.round(rv) });
  }

  const maxVal = Math.max(...raw.map((p) => p.revenue)) * 1.1;
  const yFor = (v: number) => 6 + (1 - v / maxVal) * 88;
  const points: ChartPoint[] = raw.map((p, i) => ({
    ...p,
    x: (i / (n - 1)) * 100,
    ySpend: yFor(p.spend),
    yRev: yFor(p.revenue),
  }));

  const line = (key: "ySpend" | "yRev") =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p[key].toFixed(2)}`).join("");
  const spendLine = line("ySpend");
  const revLine = line("yRev");

  // Rasterlijnen op 25/50/75% met de bijbehorende euro-waarde als as-label.
  const gridValues = [25, 50, 75].map((y) => ({ y, value: ((94 - y) / 88) * maxVal }));

  // Kanalen: gewichten jitteren en normaliseren zodat de som ≈ totale spend blijft.
  const wRaw = CHANNEL_META.map((c, ci) => c.weight * (0.88 + seeded(s * 11 + ci * 7) * 0.24));
  const wSum = wRaw.reduce((a, b) => a + b, 0);
  const channels = CHANNEL_META.map((c, ci) => ({
    name: c.name,
    spend: Math.round((spend * (wRaw[ci] ?? c.weight)) / wSum / 100) * 100,
    pacing: Math.round(62 + seeded(s * 13 + ci * 5) * 36),
    roas: round1(c.roasMin + seeded(s * 17 + ci * 3) * (c.roasMax - c.roasMin)),
    // Sluit aan op het AI-inzicht over de CPA-stijging op kanaal Video.
    warn: c.name === "Video",
  }));

  return {
    spend,
    revenue,
    roas,
    cpa,
    deltas,
    sparks,
    points,
    spendLine,
    spendArea: `${spendLine}L100,100L0,100Z`,
    revLine,
    revArea: `${revLine}L100,100L0,100Z`,
    gridValues,
    channels,
  };
}

// Teller die van 0 naar de eindwaarde animeert zodra hij in beeld komt.
// Bij een periode-wissel animeert hij van de huidige naar de nieuwe waarde.
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

// Delta-chip: periwinkle als de beweging gunstig is, amber als hij ongunstig is.
// Voor CPA is dalen juist goed, dus daar is de kleurlogica omgedraaid.
function DeltaChip({
  delta,
  good,
  text,
  srText,
}: {
  delta: number;
  good: boolean;
  text: string;
  srText: string;
}) {
  return (
    <span
      title={srText}
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
        good
          ? "bg-[rgba(91,95,232,0.14)] text-(--color-accent-light)"
          : "bg-[rgba(224,185,120,0.12)] text-(--color-warm)"
      }`}
    >
      <span aria-hidden="true" className="text-[8px]">
        {delta >= 0 ? "▲" : "▼"}
      </span>
      <span className="font-mono">{text}</span>
      <span className="sr-only">{srText}</span>
    </span>
  );
}

// Kaart die zachtjes invliegt zodra hij in beeld komt (stagger via delay).
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

const CARD =
  "rounded-2xl border border-(--color-border) bg-(--color-surface) [background-image:linear-gradient(180deg,rgba(255,255,255,0.03),transparent_45%)]";

const TINY = "text-[10px] uppercase tracking-[0.15em] text-(--color-muted)";

// Gedeeld grid voor de kanalentabel; de pacing-kolom verdwijnt op mobiel.
const ROW_GRID =
  "grid grid-cols-[1.1fr_1fr_0.6fr_20px] items-center gap-3 sm:grid-cols-[1.1fr_1fr_1.6fr_0.6fr_20px]";

export default function GrowthCockpit({ locale }: { locale: string }) {
  const t = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const tag = locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US";

  const [period, setPeriod] = useState<PeriodKey>("30d");
  const [hover, setHover] = useState<number | null>(null);

  const data = useMemo(() => buildData(period), [period]);

  // Unieke gradient-id's zodat meerdere instanties elkaar niet bijten.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gradSpend = `gc-spend-${uid}`;
  const gradRev = `gc-rev-${uid}`;

  const fmtInt = (v: number) => Math.round(v).toLocaleString(tag);
  const fmtEuro = (v: number) => `€ ${fmtInt(v)}`;
  const fmt1 = (v: number) =>
    v.toLocaleString(tag, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt2 = (v: number) =>
    v.toLocaleString(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const compactEuro = (v: number) =>
    v >= 1000 ? `€${(v / 1000).toLocaleString(tag, { maximumFractionDigits: 1 })}k` : `€${Math.round(v)}`;

  // Tooltip-label per chartpunt: 7d in dagdelen, 30d in dagen, 90d in weken.
  const pointLabel = (i: number): string => {
    if (period === "90d") return `${t.week} ${i + 1}`;
    if (period === "30d") return `${t.day} ${(i + 1) * 2}`;
    return `${t.day} ${Math.floor(i / 2) + 1} · ${i % 2 ? "PM" : "AM"}`;
  };

  const kpis = [
    {
      label: t.kpiSpend,
      value: data.spend,
      delta: data.deltas.spend,
      goodWhenDown: false,
      spark: data.sparks[0] ?? "",
      format: fmtEuro,
    },
    {
      label: t.kpiRevenue,
      value: data.revenue,
      delta: data.deltas.revenue,
      goodWhenDown: false,
      spark: data.sparks[1] ?? "",
      format: fmtEuro,
    },
    {
      label: t.kpiRoas,
      value: data.roas,
      delta: data.deltas.roas,
      goodWhenDown: false,
      spark: data.sparks[2] ?? "",
      format: (v: number) => `${fmt1(v)}x`,
    },
    {
      label: t.kpiCpa,
      value: data.cpa,
      delta: data.deltas.cpa,
      goodWhenDown: true,
      spark: data.sparks[3] ?? "",
      format: (v: number) => `€ ${fmt2(v)}`,
    },
  ];

  const n = data.points.length;
  const hoverIdx = hover === null ? null : Math.min(hover, n - 1);
  const hoverPoint = hoverIdx === null ? null : (data.points[hoverIdx] ?? null);
  const axisIdx = [0, Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3), n - 1];

  return (
    <div className="w-full bg-[#0b0a12] p-4 sm:p-6">
      {/* Topbalk: live-dot + titel + klantbadge + periode-toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-accent-light) opacity-50 motion-reduce:animate-none"
              style={{ animationDuration: "2.2s" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-accent-light)" />
          </span>
          <span className={TINY}>{t.live}</span>
          <h3 className="text-sm font-semibold text-white/90 sm:text-base">{t.title}</h3>
          <span className="rounded-full border border-(--color-border) bg-(--color-surface) px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-(--color-muted-light)">
            {t.client}
          </span>
        </div>
        <div
          role="group"
          aria-label={t.periodAria}
          className="inline-flex rounded-full border border-(--color-border) bg-(--color-surface) p-1"
        >
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={period === p}
              onClick={() => {
                setPeriod(p);
                setHover(null);
              }}
              className={`rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors ${
                period === p
                  ? "bg-[rgba(91,95,232,0.18)] text-(--color-accent-light)"
                  : "text-(--color-muted) hover:text-(--color-muted-light)"
              }`}
            >
              {t.periods[p]}
            </button>
          ))}
        </div>
      </div>

      {/* KPI-rij: 4 kaarten met count-up, delta-chip en mini-sparkline */}
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.06} className={`${CARD} p-4`}>
            <div className="flex items-start justify-between gap-2">
              <p className={TINY}>{k.label}</p>
              <DeltaChip
                delta={k.delta}
                good={k.goodWhenDown ? k.delta < 0 : k.delta >= 0}
                text={`${fmt1(Math.abs(k.delta))}%`}
                srText={`${k.delta >= 0 ? "+" : "−"}${fmt1(Math.abs(k.delta))}% ${t.vsPrev}`}
              />
            </div>
            <div className="mt-2 text-xl tracking-tight text-white sm:text-2xl">
              <CountUp value={k.value} format={k.format} />
            </div>
            <svg
              className="mt-3 h-7 w-full"
              viewBox="0 0 100 28"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline
                points={k.spark}
                fill="none"
                stroke="#5B5FE8"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.9"
              />
            </svg>
          </Reveal>
        ))}
      </div>

      {/* Hoofdgebied: gelaagde area-chart (2/3) + AI-inzichten (1/3) */}
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Reveal delay={0.1} className={`${CARD} relative overflow-hidden p-4 sm:p-5 lg:col-span-2`}>
          {/* Zachte indigo-glow als accent, puur decoratief */}
          <div
            className="pointer-events-none absolute -top-24 left-1/4 h-48 w-80 rounded-full bg-[rgba(91,95,232,0.13)] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-xs font-semibold text-white/90">{t.chartTitle}</h4>
              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-1.5 ${TINY}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" aria-hidden="true" />
                  {t.legendSpend}
                </span>
                <span className={`flex items-center gap-1.5 ${TINY}`}>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-(--color-accent-light)"
                    aria-hidden="true"
                  />
                  {t.legendRevenue}
                </span>
              </div>
            </div>

            {/* Chartvlak: SVG rekt mee (preserveAspectRatio none), hover via muispositie */}
            <div
              className="relative mt-4 h-52 cursor-crosshair sm:h-60"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const frac = (e.clientX - rect.left) / rect.width;
                setHover(Math.min(n - 1, Math.max(0, Math.round(frac * (n - 1)))));
              }}
              onMouseLeave={() => setHover(null)}
            >
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={gradSpend} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B5FE8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5B5FE8" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id={gradRev} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9BA3F2" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#9BA3F2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {data.gridValues.map((g) => (
                  <line
                    key={g.y}
                    x1="0"
                    x2="100"
                    y1={g.y}
                    y2={g.y}
                    stroke="#1d1b29"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <line
                  x1="0"
                  x2="100"
                  y1="94"
                  y2="94"
                  stroke="#1d1b29"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Omzet (periwinkle, feller) achter, spend (indigo) ervoor */}
                <path d={data.revArea} fill={`url(#${gradRev})`} />
                <path
                  d={data.revLine}
                  fill="none"
                  stroke="#9BA3F2"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: "drop-shadow(0 0 5px rgba(155,163,242,0.4))" }}
                />
                <path d={data.spendArea} fill={`url(#${gradSpend})`} />
                <path
                  d={data.spendLine}
                  fill="none"
                  stroke="#5B5FE8"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: "drop-shadow(0 0 5px rgba(91,95,232,0.5))" }}
                />
              </svg>

              {/* Y-as labels bij de rasterlijnen */}
              {data.gridValues.map((g) => (
                <span
                  key={g.y}
                  className="absolute left-0 -translate-y-1/2 font-mono text-[9px] text-(--color-muted)"
                  style={{ top: `${g.y}%` }}
                >
                  {compactEuro(g.value)}
                </span>
              ))}

              {/* Hover: verticale gids + punten + tooltip met beide waarden */}
              {hoverPoint && hoverIdx !== null ? (
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[rgba(155,163,242,0.3)]"
                    style={{ left: `${hoverPoint.x}%` }}
                  />
                  <span
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b0a12] bg-(--color-accent-light)"
                    style={{ left: `${hoverPoint.x}%`, top: `${hoverPoint.yRev}%` }}
                  />
                  <span
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b0a12] bg-(--color-accent)"
                    style={{ left: `${hoverPoint.x}%`, top: `${hoverPoint.ySpend}%` }}
                  />
                  <div
                    className="absolute z-10 -translate-x-1/2 rounded-lg border border-(--color-border) bg-(--color-surface-hover) px-3 py-2 shadow-lg"
                    style={{ left: `${Math.min(84, Math.max(16, hoverPoint.x))}%`, top: "4px" }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] whitespace-nowrap text-(--color-muted)">
                      {pointLabel(hoverIdx)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] whitespace-nowrap text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" />
                      {t.legendSpend} · {fmtEuro(hoverPoint.spend)}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] whitespace-nowrap text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent-light)" />
                      {t.legendRevenue} · {fmtEuro(hoverPoint.revenue)}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* X-as: vier vaste labels over de breedte */}
            <div className="mt-2 flex justify-between font-mono text-[10px] text-(--color-muted)">
              {axisIdx.map((i) => (
                <span key={i}>{pointLabel(i)}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* AI-inzichten feed */}
        <Reveal delay={0.16} className={`${CARD} p-4 sm:p-5`}>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-semibold text-white/90">{t.aiTitle}</h4>
            <span className="rounded-md border border-[rgba(91,95,232,0.35)] bg-[rgba(91,95,232,0.14)] px-1.5 py-0.5 font-mono text-[10px] text-(--color-accent-light)">
              {t.aiChip}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {t.insights.map((ins, i) => {
              // Het middelste inzicht is de afwijking en krijgt het amber-accent.
              const alert = i === 1;
              return (
                <div
                  key={ins.text}
                  className={`rounded-xl border p-3 ${
                    alert
                      ? "border-[rgba(224,185,120,0.28)] bg-[rgba(224,185,120,0.05)]"
                      : "border-(--color-border) bg-[rgba(91,95,232,0.05)]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                        alert
                          ? "bg-(--color-warm) shadow-[0_0_8px_rgba(224,185,120,0.5)]"
                          : "bg-(--color-accent-light) shadow-[0_0_8px_rgba(91,95,232,0.5)]"
                      }`}
                    />
                    <div>
                      <p className="text-xs leading-relaxed text-white/75">{ins.text}</p>
                      <p className="mt-1.5 font-mono text-[10px] text-(--color-muted)">{ins.meta}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Onderste strook: kanalentabel met pacing-bars en status-dots */}
      <Reveal delay={0.2} className={`${CARD} mt-3 p-4 sm:p-5`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="text-xs font-semibold text-white/90">{t.channelsTitle}</h4>
          <p className="text-[10px] text-(--color-muted)">{t.channelsNote}</p>
        </div>
        <div className="mt-3">
          <div className={`${ROW_GRID} px-3 pb-1.5`}>
            <span className={TINY}>{t.colChannel}</span>
            <span className={TINY}>{t.colSpend}</span>
            <span className={`${TINY} hidden sm:block`}>{t.colPacing}</span>
            <span className={`${TINY} text-right`}>{t.colRoas}</span>
            <span className="sr-only">{t.colStatus}</span>
          </div>
          <div className="flex flex-col gap-1">
            {data.channels.map((row) => (
              <div
                key={row.name}
                className={`${ROW_GRID} rounded-lg px-3 py-2.5 transition-[transform,background-color] duration-150 hover:-translate-y-px hover:bg-(--color-surface-hover) motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
              >
                <span className="text-xs font-medium text-white/90">{row.name}</span>
                <span className="font-mono text-xs text-(--color-muted-light)">
                  {fmtEuro(row.spend)}
                </span>
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${row.pacing}%`,
                        backgroundImage: "linear-gradient(90deg,#3F44C9,#5B5FE8 55%,#9BA3F2)",
                      }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-[10px] text-(--color-muted)">
                    {row.pacing}%
                  </span>
                </div>
                <span className="text-right font-mono text-xs text-white/90">
                  {fmt1(row.roas)}x
                </span>
                <span className="flex items-center justify-end">
                  <span
                    title={row.warn ? t.statusWarn : t.statusOk}
                    aria-hidden="true"
                    className={
                      row.warn
                        ? "h-2 w-2 rounded-full bg-(--color-warm) shadow-[0_0_8px_rgba(224,185,120,0.55)]"
                        : "h-2 w-2 animate-pulse rounded-full bg-(--color-accent-light) shadow-[0_0_8px_rgba(91,95,232,0.55)] motion-reduce:animate-none"
                    }
                  />
                  <span className="sr-only">{row.warn ? t.statusWarn : t.statusOk}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
