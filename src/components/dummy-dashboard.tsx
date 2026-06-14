"use client";

// Interactief dummy-dashboard voor de Dashboarding-focusmodal. Puur demo:
// wissel tussen twee dashboards (Sales / Marketing) en tussen periodes
// (7/30/90 dagen). KPI's en de grafiek reageren live. Geen externe chart-
// dependency, alles in SVG/divs in de huisstijl. Data is deterministisch
// gegenereerd zodat het stabiel blijft tussen renders.

import { useMemo, useState } from "react";

type TabId = "sales" | "marketing";
type Range = 7 | 30 | 90;

const TABS: { id: TabId; label: string }[] = [
  { id: "sales", label: "Sales" },
  { id: "marketing", label: "Marketing" },
];

const RANGES: Range[] = [7, 30, 90];

// Kleine deterministische pseudo-random op basis van een integer-seed.
function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function buildSeries(tab: TabId, range: Range) {
  const bars = range === 7 ? 7 : range === 30 ? 10 : 12;
  const base = tab === "sales" ? 4200 : 1800;
  const tabOffset = tab === "sales" ? 0 : 100;
  const values: number[] = [];
  for (let i = 0; i < bars; i++) {
    const wave = 0.6 + 0.4 * Math.sin((i / bars) * Math.PI * 1.6);
    const noise = 0.7 + 0.6 * seeded(i + range + tabOffset);
    values.push(Math.round(base * wave * noise));
  }
  return values;
}

function formatNumber(n: number) {
  return n.toLocaleString("nl-NL");
}

export default function DummyDashboard() {
  const [tab, setTab] = useState<TabId>("sales");
  const [range, setRange] = useState<Range>(30);
  const [hover, setHover] = useState<number | null>(null);

  const values = useMemo(() => buildSeries(tab, range), [tab, range]);
  const max = Math.max(...values);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / values.length);
  const delta = useMemo(() => {
    // Verschil eerste vs laatste helft, als procentuele "groei".
    const mid = Math.floor(values.length / 2);
    const first = values.slice(0, mid).reduce((a, b) => a + b, 0) || 1;
    const second = values.slice(mid).reduce((a, b) => a + b, 0);
    return Math.round(((second - first) / first) * 100);
  }, [values]);

  const kpis =
    tab === "sales"
      ? [
          { label: "Omzet", value: `€${formatNumber(total)}` },
          { label: "Orders", value: formatNumber(Math.round(total / 87)) },
          { label: "Gem. orderwaarde", value: `€${formatNumber(87)}` },
        ]
      : [
          { label: "Bezoekers", value: formatNumber(total) },
          { label: "Leads", value: formatNumber(Math.round(total / 42)) },
          { label: "Conversie", value: `${(2.4 + (delta > 0 ? 0.6 : 0)).toFixed(1)}%` },
        ];

  return (
    <div className="rounded-2xl border border-(--color-border) bg-(--color-background)/50 p-5 sm:p-6">
      {/* Kop: tabs + periode-keuze */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-(--color-border) p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                tab === t.id
                  ? "bg-(--color-accent) text-white"
                  : "text-(--color-muted-light) hover:text-(--color-foreground)"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-full border border-(--color-border) p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                range === r
                  ? "bg-[rgba(91,95,232,0.18)] text-(--color-accent-light)"
                  : "text-(--color-muted) hover:text-(--color-foreground)"
              }`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      {/* KPI-kaarten */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-(--color-muted)">
              {k.label}
            </p>
            <p className="mt-1 text-lg sm:text-xl font-semibold tracking-tight">
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Grafiek */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-(--color-muted)">
            {tab === "sales" ? "Omzet per periode" : "Bezoekers per periode"}
          </p>
          <span
            className={`text-xs font-semibold ${
              delta >= 0 ? "text-(--color-accent-light)" : "text-(--color-warm)"
            }`}
          >
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        </div>
        <div className="flex items-end gap-1.5 h-40">
          {values.map((v, i) => {
            const heightPct = Math.max(6, (v / max) * 100);
            const active = hover === i;
            return (
              <div
                key={i}
                className="relative flex-1 h-full flex items-end"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {active && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-(--color-border) bg-(--color-surface) px-2 py-1 text-[11px] font-medium shadow-lg z-10">
                    {tab === "sales" ? `€${formatNumber(v)}` : formatNumber(v)}
                  </div>
                )}
                <div
                  className="w-full rounded-t-md transition-[height,background-color] duration-500 ease-out"
                  style={{
                    height: `${heightPct}%`,
                    background: active
                      ? "var(--color-accent-light)"
                      : "linear-gradient(180deg, rgba(91,95,232,0.9) 0%, rgba(91,95,232,0.35) 100%)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] text-(--color-muted)">
          Gemiddeld {tab === "sales" ? `€${formatNumber(avg)}` : formatNumber(avg)} per
          interval · {range} dagen · demodata
        </p>
      </div>
    </div>
  );
}
