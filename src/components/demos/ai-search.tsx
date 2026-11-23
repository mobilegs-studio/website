"use client";

// Gevonden in AI-zoek: een AI-assistent beantwoordt een lokale vraag, voor en
// na onze aanpak. Rechts wat we aan de site deden (GEO/AEO-checklist).

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Answer = { text: string; sources: { name: string; client?: boolean }[] };
type Copy = { before: string; after: string; question: string; assistant: string; sourcesL: string; didT: string; did: string[]; answers: { before: Answer; after: Answer } };

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    before: "Voor",
    after: "Na",
    question: "Waar haal ik het lekkerste desembrood in Hilversum?",
    assistant: "AI-assistent",
    sourcesL: "Bronnen",
    didT: "Wat we aan de site deden",
    did: ["Gestructureerde data (bedrijf, producten, openingstijden)", "FAQ met de vragen die klanten echt stellen", "Reviews en prijzen zichtbaar op de site", "Snelle, mobielvriendelijke pagina's", "Vermeldingen op lokale gidsen gelijkgetrokken"],
    answers: {
      before: { text: "Voor desembrood in Hilversum kun je terecht bij verschillende supermarkten en de grotere bakkerijketens in het centrum. Ook op de weekmarkt op woensdag en zaterdag staan bakkers.", sources: [{ name: "supermarkt.nl" }, { name: "stadsgids-hilversum.nl" }] },
      after: { text: "Bakkerij Van Dam aan de Kerkstraat wordt vaak genoemd voor desembrood: dagelijks vers, 4,9 sterren uit 312 reviews, open vanaf 7:00. Je kunt online bestellen en de volgende ochtend ophalen.", sources: [{ name: "bakkerij-vandam.nl", client: true }, { name: "reviews" }, { name: "stadsgids-hilversum.nl" }] },
    },
  },
  en: {
    before: "Before",
    after: "After",
    question: "Where do I get the best sourdough in Hilversum?",
    assistant: "AI assistant",
    sourcesL: "Sources",
    didT: "What we did to the site",
    did: ["Structured data (business, products, opening hours)", "FAQ with the questions customers really ask", "Reviews and prices visible on the site", "Fast, mobile-friendly pages", "Local directory listings made consistent"],
    answers: {
      before: { text: "For sourdough in Hilversum you can try various supermarkets and the larger bakery chains in the center. Bakers also sell at the Wednesday and Saturday market.", sources: [{ name: "supermarket.com" }, { name: "cityguide-hilversum.nl" }] },
      after: { text: "Van Dam Bakery on Kerkstraat is often recommended for sourdough: fresh daily, 4.9 stars from 312 reviews, open from 7:00. You can order online and pick up the next morning.", sources: [{ name: "vandam-bakery.nl", client: true }, { name: "reviews" }, { name: "cityguide-hilversum.nl" }] },
    },
  },
  de: {
    before: "Vorher",
    after: "Nachher",
    question: "Wo bekomme ich das beste Sauerteigbrot in Hilversum?",
    assistant: "KI-Assistent",
    sourcesL: "Quellen",
    didT: "Was wir an der Website gemacht haben",
    did: ["Strukturierte Daten (Firma, Produkte, Öffnungszeiten)", "FAQ mit den Fragen, die Kunden wirklich stellen", "Bewertungen und Preise sichtbar auf der Seite", "Schnelle, mobilfreundliche Seiten", "Einträge in lokalen Verzeichnissen vereinheitlicht"],
    answers: {
      before: { text: "Sauerteigbrot gibt es in Hilversum in verschiedenen Supermärkten und bei den größeren Bäckereiketten im Zentrum. Auch auf dem Wochenmarkt mittwochs und samstags stehen Bäcker.", sources: [{ name: "supermarkt.de" }, { name: "stadtfuehrer-hilversum.nl" }] },
      after: { text: "Die Bäckerei Van Dam in der Kerkstraat wird oft für Sauerteigbrot empfohlen: täglich frisch, 4,9 Sterne aus 312 Bewertungen, ab 7:00 geöffnet. Online bestellen und am nächsten Morgen abholen.", sources: [{ name: "baeckerei-vandam.nl", client: true }, { name: "Bewertungen" }, { name: "stadtfuehrer-hilversum.nl" }] },
    },
  },
};

export default function AiSearch({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"before" | "after">("before");
  const [words, setWords] = useState(0);
  const answer = c.answers[mode];
  const total = answer.text.split(" ").length;
  const shown = reduce ? total : words;

  useEffect(() => {
    if (reduce || words >= total) return;
    const id = setTimeout(() => setWords((w) => w + 1), 40);
    return () => clearTimeout(id);
  }, [words, total, reduce]);

  const switchTo = (m: "before" | "after") => {
    setMode(m);
    setWords(0);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
      <div className="rounded-2xl border border-(--color-border) bg-(--color-background) p-5">
        <div className="mb-5 inline-flex rounded-full border border-(--color-border) p-1">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => switchTo(m)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${mode === m ? "bg-(--color-accent) text-white" : "text-(--color-muted-light)"}`}
            >
              {c[m]}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl bg-(--color-surface-hover) px-4 py-2.5 text-sm">{c.question}</p>
        </div>
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">✦ {c.assistant}</p>
          <p className="mt-2 min-h-[96px] text-[15px] leading-relaxed">{answer.text.split(" ").slice(0, shown).join(" ")}</p>
          {shown >= total && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-(--color-muted)">{c.sourcesL}</span>
              {answer.sources.map((s, i) => (
                <span
                  key={s.name}
                  className={`rounded-md px-2 py-1 text-xs ${
                    s.client ? "border border-emerald-400/50 bg-emerald-400/10 font-semibold text-emerald-300" : "border border-(--color-border) text-(--color-muted-light)"
                  }`}
                >
                  [{i + 1}] {s.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="rounded-2xl border border-(--color-border) p-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.didT}</p>
        <ul className="mt-3 space-y-2.5">
          {c.did.map((d, i) => (
            <li key={d} className="flex items-start gap-2.5 text-sm">
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] transition-colors duration-300 ${
                  mode === "after" ? "bg-emerald-500/20 text-emerald-300" : "border border-(--color-border)"
                }`}
                style={{ transitionDelay: mode === "after" ? `${i * 120}ms` : "0ms" }}
              >
                {mode === "after" ? "✓" : ""}
              </span>
              <span className={mode === "after" ? "" : "text-(--color-muted-light)"}>{d}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
