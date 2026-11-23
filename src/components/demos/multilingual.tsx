"use client";

// Meertalige website: één vakantiepark-site in vier talen. Taal wisselen past
// tekst, URL, datum- en prijsnotatie aan; rechts wat er technisch achter zit.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Lang = "nl" | "en" | "de" | "fr";
type Site = { nav: string[]; title: string; sub: string; cta: string; from: string; price: string; date: string; perks: string[] };

const SITE: Record<Lang, Site> = {
  nl: { nav: ["Accommodaties", "Activiteiten", "Boeken"], title: "Wakker worden tussen de dennen.", sub: "Boshuisjes op de Veluwe, 5 minuten van het Kootwijkerzand.", cta: "Bekijk beschikbaarheid", from: "vanaf", price: "€ 89 / nacht", date: "vr 12 – zo 14 dec", perks: ["Gratis annuleren", "Honden welkom", "Sauna in elk huisje"] },
  en: { nav: ["Stays", "Activities", "Book"], title: "Wake up among the pines.", sub: "Forest cabins on the Veluwe, 5 minutes from the Kootwijk dunes.", cta: "Check availability", from: "from", price: "€89 / night", date: "Fri 12 – Sun 14 Dec", perks: ["Free cancellation", "Dogs welcome", "Sauna in every cabin"] },
  de: { nav: ["Unterkünfte", "Aktivitäten", "Buchen"], title: "Aufwachen zwischen den Kiefern.", sub: "Waldhäuser in der Veluwe, 5 Minuten vom Kootwijkerzand.", cta: "Verfügbarkeit prüfen", from: "ab", price: "89 € / Nacht", date: "Fr 12. – So 14. Dez.", perks: ["Kostenlos stornieren", "Hunde willkommen", "Sauna in jedem Haus"] },
  fr: { nav: ["Hébergements", "Activités", "Réserver"], title: "Se réveiller parmi les pins.", sub: "Cabanes en forêt dans la Veluwe, à 5 minutes des dunes de Kootwijk.", cta: "Voir les disponibilités", from: "à partir de", price: "89 € / nuit", date: "ven. 12 – dim. 14 déc.", perks: ["Annulation gratuite", "Chiens bienvenus", "Sauna dans chaque cabane"] },
};

type Copy = { techT: string; tech: string[]; statsT: string; stats: { label: string; value: string }[] };
const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    techT: "Wat erachter zit",
    tech: ["Eigen URL per taal (/nl, /en, /de, /fr)", "hreflang-tags, zodat Google de juiste taal toont", "Taal kiest zich op basis van de bezoeker", "Prijzen en datums in de notatie van het land", "Vertalingen beheer je zelf in het CMS"],
    statsT: "Na 3 maanden",
    stats: [{ label: "Buitenlandse boekingen", value: "+35%" }, { label: "Bezoekers uit DE", value: "+52%" }],
  },
  en: {
    techT: "What's behind it",
    tech: ["Own URL per language (/nl, /en, /de, /fr)", "hreflang tags, so Google shows the right language", "Language picked from the visitor's settings", "Prices and dates in each country's format", "You manage translations yourself in the CMS"],
    statsT: "After 3 months",
    stats: [{ label: "Foreign bookings", value: "+35%" }, { label: "Visitors from DE", value: "+52%" }],
  },
  de: {
    techT: "Was dahintersteckt",
    tech: ["Eigene URL pro Sprache (/nl, /en, /de, /fr)", "hreflang-Tags, damit Google die richtige Sprache zeigt", "Sprache wird anhand des Besuchers gewählt", "Preise und Daten im Format des Landes", "Übersetzungen pflegen Sie selbst im CMS"],
    statsT: "Nach 3 Monaten",
    stats: [{ label: "Ausländische Buchungen", value: "+35%" }, { label: "Besucher aus DE", value: "+52%" }],
  },
};

export default function Multilingual({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const [lang, setLang] = useState<Lang>((["nl", "en", "de"].includes(locale) ? locale : "nl") as Lang);
  const s = SITE[lang];

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
      <div className="overflow-hidden rounded-2xl border border-(--color-border)">
        <div className="flex items-center gap-3 border-b border-(--color-border) bg-(--color-background) px-4 py-2.5">
          <span className="flex-1 truncate rounded-full bg-(--color-surface-hover) px-3 py-1 font-mono text-[11px] text-(--color-muted-light)">
            boshuisjes-veluwe.nl/<span className="text-(--color-accent-light)">{lang}</span>/
          </span>
          <div className="flex gap-1">
            {(Object.keys(SITE) as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={`rounded-md px-2 py-1 text-[11px] font-semibold uppercase ${lang === l ? "bg-(--color-accent) text-white" : "text-(--color-muted-light) hover:text-(--color-foreground)"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[340px] bg-[linear-gradient(160deg,#1d2b22,#0f1712)] p-6 text-[#eef3ec]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold">Boshuisjes Veluwe</span>
            <span className="hidden gap-4 text-[#b9c7b5] sm:flex">
              {s.nav.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mt-10 max-w-md text-3xl font-bold leading-tight tracking-tight">{s.title}</p>
              <p className="mt-3 max-w-md text-sm text-[#b9c7b5]">{s.sub}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#e0b978] px-4 py-2 text-xs font-semibold text-black">{s.cta}</span>
                <span className="text-xs text-[#b9c7b5]">
                  {s.from} <span className="font-semibold text-white">{s.price}</span> · {s.date}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.perks.map((p) => (
                  <span key={p} className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#dfe8dc]">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="rounded-2xl border border-(--color-border) p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.techT}</p>
          <ul className="mt-3 space-y-2">
            {c.tech.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-(--color-muted-light)">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent)" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-(--color-border) p-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.statsT}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {c.stats.map((st) => (
              <div key={st.label}>
                <p className="text-2xl font-bold text-emerald-300">{st.value}</p>
                <p className="text-xs text-(--color-muted-light)">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
