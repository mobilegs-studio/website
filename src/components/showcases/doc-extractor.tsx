"use client";

// AI-tool demo: kies een document, de "AI" leest het uit (gescript), velden
// met lage zekerheid moet je eerst controleren, daarna export naar boekhouding.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

type Field = { label: string; value: string; conf: number };
type Doc = { id: string; kind: string; title: string; from: string; fields: Field[] };
type Copy = {
  pick: string;
  reading: string;
  fieldsDone: (n: number, check: number) => string;
  check: string;
  approved: string;
  exportBtn: string;
  exportNeedsCheck: string;
  exported: string;
  confidence: string;
  docs: Doc[];
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    pick: "Kies een document",
    reading: "AI leest het document…",
    fieldsDone: (n, c) => `${n} velden uitgelezen in 2,1 sec${c ? ` · ${c} om te controleren` : ""}`,
    check: "Controleer",
    approved: "Goedgekeurd",
    exportBtn: "Naar boekhouding",
    exportNeedsCheck: "Controleer eerst de gele velden",
    exported: "Verstuurd naar de boekhouding",
    confidence: "zeker",
    docs: [
      {
        id: "invoice",
        kind: "Factuur",
        title: "Factuur #2026-1184",
        from: "Groothandel Noord BV",
        fields: [
          { label: "Leverancier", value: "Groothandel Noord BV", conf: 99 },
          { label: "Btw-nummer", value: "NL8521.04.937.B01", conf: 98 },
          { label: "Factuurdatum", value: "14-11-2026", conf: 99 },
          { label: "Vervaldatum", value: "14-12-2026", conf: 82 },
          { label: "Bedrag excl. btw", value: "€ 1.998,84", conf: 97 },
          { label: "Btw 21%", value: "€ 419,76", conf: 97 },
          { label: "Totaal", value: "€ 2.418,60", conf: 99 },
        ],
      },
      {
        id: "receipt",
        kind: "Bon",
        title: "Kassabon",
        from: "Tankstation De Brug",
        fields: [
          { label: "Winkel", value: "Tankstation De Brug", conf: 97 },
          { label: "Datum", value: "19-11-2026", conf: 99 },
          { label: "Bedrag", value: "€ 86,40", conf: 99 },
          { label: "Btw 21%", value: "€ 15,00", conf: 96 },
          { label: "Categorie", value: "Brandstof (auto zaak)", conf: 84 },
        ],
      },
      {
        id: "quote",
        kind: "Offerte",
        title: "Offerte Q-0457",
        from: "Installatiebedrijf Zuid",
        fields: [
          { label: "Klant", value: "Bakkerij Van Dam", conf: 99 },
          { label: "Geldig tot", value: "31-12-2026", conf: 98 },
          { label: "Totaal", value: "€ 6.250,00", conf: 99 },
          { label: "Betaaltermijn", value: "30 dagen", conf: 95 },
          { label: "Let op", value: "Verlengt automatisch per jaar", conf: 79 },
        ],
      },
    ],
  },
  en: {
    pick: "Pick a document",
    reading: "AI is reading the document…",
    fieldsDone: (n, c) => `${n} fields read in 2.1 sec${c ? ` · ${c} to check` : ""}`,
    check: "Check",
    approved: "Approved",
    exportBtn: "Send to accounting",
    exportNeedsCheck: "Check the yellow fields first",
    exported: "Sent to accounting",
    confidence: "sure",
    docs: [
      {
        id: "invoice",
        kind: "Invoice",
        title: "Invoice #2026-1184",
        from: "North Wholesale Ltd",
        fields: [
          { label: "Supplier", value: "North Wholesale Ltd", conf: 99 },
          { label: "VAT number", value: "NL8521.04.937.B01", conf: 98 },
          { label: "Invoice date", value: "14 Nov 2026", conf: 99 },
          { label: "Due date", value: "14 Dec 2026", conf: 82 },
          { label: "Amount excl. VAT", value: "€ 1,998.84", conf: 97 },
          { label: "VAT 21%", value: "€ 419.76", conf: 97 },
          { label: "Total", value: "€ 2,418.60", conf: 99 },
        ],
      },
      {
        id: "receipt",
        kind: "Receipt",
        title: "Receipt",
        from: "Bridge Fuel Station",
        fields: [
          { label: "Store", value: "Bridge Fuel Station", conf: 97 },
          { label: "Date", value: "19 Nov 2026", conf: 99 },
          { label: "Amount", value: "€ 86.40", conf: 99 },
          { label: "VAT 21%", value: "€ 15.00", conf: 96 },
          { label: "Category", value: "Fuel (company car)", conf: 84 },
        ],
      },
      {
        id: "quote",
        kind: "Quote",
        title: "Quote Q-0457",
        from: "South Installations",
        fields: [
          { label: "Client", value: "Van Dam Bakery", conf: 99 },
          { label: "Valid until", value: "31 Dec 2026", conf: 98 },
          { label: "Total", value: "€ 6,250.00", conf: 99 },
          { label: "Payment term", value: "30 days", conf: 95 },
          { label: "Watch out", value: "Renews automatically each year", conf: 79 },
        ],
      },
    ],
  },
  de: {
    pick: "Dokument wählen",
    reading: "KI liest das Dokument…",
    fieldsDone: (n, c) => `${n} Felder in 2,1 Sek. ausgelesen${c ? ` · ${c} zu prüfen` : ""}`,
    check: "Prüfen",
    approved: "Freigegeben",
    exportBtn: "An Buchhaltung",
    exportNeedsCheck: "Erst die gelben Felder prüfen",
    exported: "An die Buchhaltung gesendet",
    confidence: "sicher",
    docs: [
      {
        id: "invoice",
        kind: "Rechnung",
        title: "Rechnung #2026-1184",
        from: "Großhandel Nord GmbH",
        fields: [
          { label: "Lieferant", value: "Großhandel Nord GmbH", conf: 99 },
          { label: "USt-IdNr.", value: "DE284519371", conf: 98 },
          { label: "Rechnungsdatum", value: "14.11.2026", conf: 99 },
          { label: "Fällig am", value: "14.12.2026", conf: 82 },
          { label: "Netto", value: "1.998,84 €", conf: 97 },
          { label: "MwSt. 19%", value: "379,78 €", conf: 97 },
          { label: "Summe", value: "2.378,62 €", conf: 99 },
        ],
      },
      {
        id: "receipt",
        kind: "Beleg",
        title: "Kassenbon",
        from: "Tankstelle Brücke",
        fields: [
          { label: "Geschäft", value: "Tankstelle Brücke", conf: 97 },
          { label: "Datum", value: "19.11.2026", conf: 99 },
          { label: "Betrag", value: "86,40 €", conf: 99 },
          { label: "MwSt. 19%", value: "13,79 €", conf: 96 },
          { label: "Kategorie", value: "Kraftstoff (Firmenwagen)", conf: 84 },
        ],
      },
      {
        id: "quote",
        kind: "Angebot",
        title: "Angebot Q-0457",
        from: "Installation Süd",
        fields: [
          { label: "Kunde", value: "Bäckerei Van Dam", conf: 99 },
          { label: "Gültig bis", value: "31.12.2026", conf: 98 },
          { label: "Summe", value: "6.250,00 €", conf: 99 },
          { label: "Zahlungsziel", value: "30 Tage", conf: 95 },
          { label: "Achtung", value: "Verlängert sich jährlich automatisch", conf: 79 },
        ],
      },
    ],
  },
};

const LOW = 90;

export default function DocExtractor({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [docIdx, setDocIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const [exported, setExported] = useState(false);

  const doc = c.docs[docIdx];
  const total = doc.fields.length;
  const visible = reduce ? total : shown;
  const done = visible >= total;
  const toCheck = doc.fields.filter((f) => f.conf < LOW && !approved[f.label]);

  // Velden één voor één laten verschijnen zodra de demo in beeld is.
  useEffect(() => {
    if (reduce || !inView || shown >= total) return;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 300);
    return () => clearTimeout(id);
  }, [reduce, inView, shown, total]);

  const pick = (i: number) => {
    setDocIdx(i);
    setShown(0);
    setApproved({});
    setExported(false);
  };

  return (
    <div ref={ref} className="grid min-h-[500px] gap-5 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Links: documentkeuze + papieren preview */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-(--color-muted)">{c.pick}</p>
          <div className="grid grid-cols-3 gap-2">
            {c.docs.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === docIdx}
                className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                  i === docIdx
                    ? "border-[rgba(var(--accent-rgb),0.5)] bg-[rgba(var(--accent-rgb),0.12)]"
                    : "border-(--color-border) hover:bg-(--color-surface-hover)"
                }`}
              >
                <span className="block text-xs font-semibold">{d.kind}</span>
                <span className="block truncate text-[10px] text-(--color-muted-light)">{d.from}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex-1 min-h-[260px] overflow-hidden rounded-xl bg-[#f4f1ea] p-5 text-black">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-bold">{doc.from}</div>
              <div className="text-[11px] text-black/50">{doc.title}</div>
            </div>
            <div className="h-8 w-8 rounded bg-black/10" />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {doc.fields.map((f, i) => (
              <div
                key={f.label}
                className={`flex items-center justify-between rounded px-1.5 py-0.5 text-[11px] transition-colors duration-300 ${
                  i === visible - 1 && !done ? "bg-[rgba(91,95,232,0.25)]" : ""
                }`}
              >
                <span className="text-black/50">{f.label}</span>
                <span className="font-medium">{f.value}</span>
              </div>
            ))}
          </div>
          {!done && !reduce && (
            <motion.div
              key={docIdx}
              initial={{ top: "-15%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[rgba(91,95,232,0.3)]"
            />
          )}
        </div>
      </div>

      {/* Rechts: uitgelezen velden */}
      <div className="flex flex-col rounded-xl border border-(--color-border) bg-(--color-background) p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-(--color-muted-light)">
          <span className={`h-2 w-2 rounded-full ${done ? "bg-emerald-400" : "bg-(--color-accent) animate-pulse"}`} />
          {done ? c.fieldsDone(total, doc.fields.filter((f) => f.conf < LOW).length) : c.reading}
        </div>
        <ul className="flex flex-col gap-1.5">
          {doc.fields.slice(0, visible).map((f) => {
            const low = f.conf < LOW;
            const ok = approved[f.label];
            return (
              <motion.li
                key={`${doc.id}-${f.label}`}
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                  low && !ok ? "border-[rgba(var(--warm-rgb),0.45)] bg-[rgba(var(--warm-rgb),0.08)]" : "border-(--color-border)"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-(--color-muted)">{f.label}</div>
                  <div className="truncate text-sm font-medium">{f.value}</div>
                </div>
                {low && !ok ? (
                  <button
                    type="button"
                    onClick={() => setApproved((a) => ({ ...a, [f.label]: true }))}
                    className="shrink-0 rounded-full bg-(--color-warm) px-2.5 py-1 text-[11px] font-semibold text-black"
                  >
                    {c.check}
                  </button>
                ) : (
                  <span className={`shrink-0 text-[11px] ${ok ? "text-emerald-300" : "text-(--color-muted-light)"}`}>
                    {ok ? `✓ ${c.approved}` : `${f.conf}% ${c.confidence}`}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-auto pt-4">
          <AnimatePresence mode="wait">
            {exported ? (
              <motion.p
                key="ok"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-emerald-500/10 px-3 py-2.5 text-sm font-semibold text-emerald-300"
              >
                ✓ {c.exported}
              </motion.p>
            ) : (
              <motion.div key="btn" className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={!done || toCheck.length > 0}
                  onClick={() => setExported(true)}
                  className="rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                >
                  {c.exportBtn} →
                </button>
                {done && toCheck.length > 0 && (
                  <span className="text-xs text-(--color-warm)">{c.exportNeedsCheck}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
