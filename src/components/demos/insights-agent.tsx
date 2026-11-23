"use client";

// AI-weekrapport (gescript): de agent laat zijn stappen zien, schrijft daarna
// een samenvatting met KPI's en drie acties die je kunt inplannen.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Copy = {
  start: string;
  again: string;
  steps: string[];
  reportTitle: string;
  summary: string;
  kpis: { label: string; value: string; delta: string; up: boolean }[];
  actionsTitle: string;
  actions: string[];
  plan: string;
  planned: string;
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    start: "Start weekanalyse",
    again: "Opnieuw",
    steps: ["Orders van deze week lezen (1.284)", "Vergelijken met vorige week", "Advertentiekosten ophalen (Google, Meta)", "Voorraad en retouren checken", "Rapport schrijven"],
    reportTitle: "Weekrapport · week 47",
    summary: "Omzet steeg 12% door de actie op winterjassen, vooral via Meta. Google Shopping werd duurder zonder extra verkopen. Twee bestsellers raken binnen 5 dagen op.",
    kpis: [
      { label: "Omzet", value: "€ 48.210", delta: "+12%", up: true },
      { label: "Kosten per order", value: "€ 6,40", delta: "+9%", up: false },
      { label: "Retouren", value: "4,1%", delta: "−0,8 pt", up: true },
    ],
    actionsTitle: "Voorgestelde acties",
    actions: ["Verschuif € 400 van Google Shopping naar Meta", "Bestel 60 extra 'Parka Noord' bij", "Mail vaste klanten over de wintercollectie"],
    plan: "Inplannen",
    planned: "Ingepland ✓",
  },
  en: {
    start: "Start weekly analysis",
    again: "Run again",
    steps: ["Reading this week's orders (1,284)", "Comparing with last week", "Fetching ad costs (Google, Meta)", "Checking stock and returns", "Writing the report"],
    reportTitle: "Weekly report · week 47",
    summary: "Revenue rose 12% thanks to the winter coat promotion, mainly via Meta. Google Shopping got more expensive without extra sales. Two bestsellers run out within 5 days.",
    kpis: [
      { label: "Revenue", value: "€48,210", delta: "+12%", up: true },
      { label: "Cost per order", value: "€6.40", delta: "+9%", up: false },
      { label: "Returns", value: "4.1%", delta: "−0.8 pt", up: true },
    ],
    actionsTitle: "Suggested actions",
    actions: ["Move €400 from Google Shopping to Meta", "Reorder 60 extra 'North Parka'", "Email regular customers about the winter collection"],
    plan: "Schedule",
    planned: "Scheduled ✓",
  },
  de: {
    start: "Wochenanalyse starten",
    again: "Erneut",
    steps: ["Bestellungen dieser Woche lesen (1.284)", "Mit der Vorwoche vergleichen", "Werbekosten abrufen (Google, Meta)", "Bestand und Retouren prüfen", "Bericht schreiben"],
    reportTitle: "Wochenbericht · KW 47",
    summary: "Der Umsatz stieg um 12 % durch die Winterjacken-Aktion, vor allem über Meta. Google Shopping wurde teurer ohne Mehrverkäufe. Zwei Bestseller sind in 5 Tagen ausverkauft.",
    kpis: [
      { label: "Umsatz", value: "48.210 €", delta: "+12%", up: true },
      { label: "Kosten pro Bestellung", value: "6,40 €", delta: "+9%", up: false },
      { label: "Retouren", value: "4,1%", delta: "−0,8 Pkt", up: true },
    ],
    actionsTitle: "Vorgeschlagene Aktionen",
    actions: ["400 € von Google Shopping zu Meta verschieben", "60 weitere 'Parka Nord' nachbestellen", "Stammkunden zur Winterkollektion mailen"],
    plan: "Einplanen",
    planned: "Eingeplant ✓",
  },
};

export default function InsightsAgent({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const [step, setStep] = useState(-1); // -1 = nog niet gestart
  const [planned, setPlanned] = useState<boolean[]>([false, false, false]);
  const done = step >= c.steps.length;

  useEffect(() => {
    if (step < 0 || done) return;
    const id = setTimeout(() => setStep((s) => s + 1), reduce ? 0 : 650);
    return () => clearTimeout(id);
  }, [step, done, reduce]);

  const run = () => {
    setPlanned([false, false, false]);
    setStep(0);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
      <div className="rounded-2xl border border-(--color-border) p-4">
        <button
          type="button"
          onClick={run}
          disabled={step >= 0 && !done}
          className="w-full rounded-full bg-(--color-accent) px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {done ? c.again : c.start}
        </button>
        <ol className="mt-4 space-y-2.5">
          {c.steps.map((s, i) => {
            const state = step > i ? "done" : step === i ? "busy" : "todo";
            return (
              <li key={s} className={`flex items-start gap-2.5 text-sm ${state === "todo" ? "text-(--color-muted)" : "text-(--color-foreground)"}`}>
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                    state === "done" ? "bg-emerald-500/20 text-emerald-300" : state === "busy" ? "bg-(--color-accent) animate-pulse" : "border border-(--color-border)"
                  }`}
                >
                  {state === "done" ? "✓" : ""}
                </span>
                {s}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="min-h-[380px] rounded-2xl border border-(--color-border) bg-(--color-background) p-5">
        {!done ? (
          <div className="flex h-full min-h-[340px] items-center justify-center text-sm text-(--color-muted)">
            {step < 0 ? "→ " + c.start : c.steps[step]}
          </div>
        ) : (
          <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.reportTitle}</p>
            <p className="mt-3 text-[15px] leading-relaxed">{c.summary}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {c.kpis.map((k) => (
                <div key={k.label} className="rounded-xl border border-(--color-border) px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-(--color-muted)">{k.label}</p>
                  <p className="mt-1 font-mono text-lg">{k.value}</p>
                  <p className={`text-xs ${k.up ? "text-emerald-300" : "text-red-300"}`}>{k.delta}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.actionsTitle}</p>
            <ul className="mt-2 space-y-2">
              {c.actions.map((a, i) => (
                <li key={a} className="flex items-center justify-between gap-3 rounded-xl border border-(--color-border) px-3 py-2.5 text-sm">
                  {a}
                  <button
                    type="button"
                    onClick={() => setPlanned((p) => p.map((v, k) => (k === i ? !v : v)))}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      planned[i] ? "bg-emerald-500/15 text-emerald-300" : "border border-[rgba(var(--accent-rgb),0.4)] text-(--color-accent-light)"
                    }`}
                  >
                    {planned[i] ? c.planned : c.plan}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
