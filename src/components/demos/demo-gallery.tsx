"use client";

// Demo-galerij op de portfolio-pagina: kaarten per demo, filter op categorie,
// demo opent in een modal (lazy geladen). Alle data is fictief.

import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const loading = () => <div className="h-[420px] animate-pulse rounded-xl bg-(--color-surface-hover)" />;
const DEMOS = {
  chatbot: dynamic(() => import("./chatbot"), { ssr: false, loading }),
  insights: dynamic(() => import("./insights-agent"), { ssr: false, loading }),
  meeting: dynamic(() => import("./meeting-notes"), { ssr: false, loading }),
  aisearch: dynamic(() => import("./ai-search"), { ssr: false, loading }),
  multilingual: dynamic(() => import("./multilingual"), { ssr: false, loading }),
  portal: dynamic(() => import("./client-portal"), { ssr: false, loading }),
  planning: dynamic(() => import("./planning-tool"), { ssr: false, loading }),
};
type DemoId = keyof typeof DEMOS;
type Cat = "all" | "ai" | "web" | "app";

type Card = { id: DemoId; cat: Exclude<Cat, "all">; title: string; client: string; problem: string; result: string };
type Copy = {
  label: string;
  heading: string;
  intro: string;
  filters: Record<Cat, string>;
  catLabel: Record<Exclude<Cat, "all">, string>;
  open: string;
  close: string;
  disclaimer: string;
  cta: string;
  cards: Card[];
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    label: "Demo's",
    heading: "Probeer wat we kunnen bouwen.",
    intro: "Werkende demo's van tools die we voor bedrijven bouwen. Klant en data zijn fictief, de techniek is echt.",
    filters: { all: "Alles", ai: "AI-tools", web: "Websites", app: "Webapps" },
    catLabel: { ai: "AI-tool", web: "Website", app: "Webapp" },
    open: "Probeer de demo",
    close: "Sluiten",
    disclaimer: "Interactieve demo · fictieve data · geanonimiseerd",
    cta: "Zoiets voor jouw bedrijf?",
    cards: [
      { id: "chatbot", cat: "ai", title: "Klantenservice-bot op eigen kennis", client: "Installatiebedrijf", problem: "Telefoon staat roodgloeiend met steeds dezelfde vragen.", result: "~40% minder telefoontjes" },
      { id: "insights", cat: "ai", title: "AI-weekrapport", client: "Webshop", problem: "Elke maandag een halve dag cijfers bij elkaar zoeken.", result: "Rapport klaar vóór 8:00" },
      { id: "meeting", cat: "ai", title: "Vergadering naar actiepunten", client: "Adviesbureau", problem: "Afspraken uit overleggen raken zoek.", result: "0 minuten notuleren" },
      { id: "aisearch", cat: "web", title: "Gevonden in AI-zoek", client: "Bakkerij", problem: "Klanten vragen ChatGPT om advies, en daar kwam de bakker niet voor.", result: "Genoemd als eerste tip" },
      { id: "multilingual", cat: "web", title: "Meertalige website", client: "Vakantiepark", problem: "Duitse en Engelse gasten haakten af op een Nederlandse site.", result: "+35% buitenlandse boekingen" },
      { id: "portal", cat: "app", title: "Klantportaal", client: "Administratiekantoor", problem: "Documenten via losse mails, eindeloos nabellen.", result: "Dossiers 3x sneller compleet" },
      { id: "planning", cat: "app", title: "Roostertool", client: "Zorgteam", problem: "Rooster in Excel, fouten pas op de dag zelf zichtbaar.", result: "Rooster maken in 10 minuten" },
    ],
  },
  en: {
    label: "Demos",
    heading: "Try what we can build.",
    intro: "Working demos of tools we build for businesses. Client and data are fictional, the technology is real.",
    filters: { all: "All", ai: "AI tools", web: "Websites", app: "Web apps" },
    catLabel: { ai: "AI tool", web: "Website", app: "Web app" },
    open: "Try the demo",
    close: "Close",
    disclaimer: "Interactive demo · fictional data · anonymized",
    cta: "Something like this for your business?",
    cards: [
      { id: "chatbot", cat: "ai", title: "Customer service bot on your own knowledge", client: "Installation company", problem: "The phone never stops ringing with the same questions.", result: "~40% fewer calls" },
      { id: "insights", cat: "ai", title: "AI weekly report", client: "Webshop", problem: "Half of every Monday spent pulling numbers together.", result: "Report ready before 8:00" },
      { id: "meeting", cat: "ai", title: "Meeting to action items", client: "Consultancy", problem: "Agreements from meetings get lost.", result: "0 minutes of minute-taking" },
      { id: "aisearch", cat: "web", title: "Found in AI search", client: "Bakery", problem: "Customers ask ChatGPT for advice, and the bakery never came up.", result: "Named as the top tip" },
      { id: "multilingual", cat: "web", title: "Multilingual website", client: "Holiday park", problem: "German and English guests dropped off on a Dutch-only site.", result: "+35% foreign bookings" },
      { id: "portal", cat: "app", title: "Client portal", client: "Accounting firm", problem: "Documents by loose emails, endless chasing.", result: "Files complete 3x faster" },
      { id: "planning", cat: "app", title: "Scheduling tool", client: "Care team", problem: "Schedule in Excel, mistakes only visible on the day.", result: "Schedule done in 10 minutes" },
    ],
  },
  de: {
    label: "Demos",
    heading: "Probieren Sie, was wir bauen können.",
    intro: "Funktionierende Demos von Tools, die wir für Unternehmen bauen. Kunde und Daten sind fiktiv, die Technik ist echt.",
    filters: { all: "Alle", ai: "KI-Tools", web: "Websites", app: "Web-Apps" },
    catLabel: { ai: "KI-Tool", web: "Website", app: "Web-App" },
    open: "Demo ausprobieren",
    close: "Schließen",
    disclaimer: "Interaktive Demo · fiktive Daten · anonymisiert",
    cta: "So etwas für Ihr Unternehmen?",
    cards: [
      { id: "chatbot", cat: "ai", title: "Kundenservice-Bot mit eigenem Wissen", client: "Installationsbetrieb", problem: "Das Telefon klingelt ständig mit denselben Fragen.", result: "~40% weniger Anrufe" },
      { id: "insights", cat: "ai", title: "KI-Wochenbericht", client: "Onlineshop", problem: "Jeden Montag einen halben Tag Zahlen zusammensuchen.", result: "Bericht fertig vor 8:00" },
      { id: "meeting", cat: "ai", title: "Meeting zu Aufgaben", client: "Beratung", problem: "Absprachen aus Meetings gehen verloren.", result: "0 Minuten Protokoll" },
      { id: "aisearch", cat: "web", title: "Gefunden in der KI-Suche", client: "Bäckerei", problem: "Kunden fragen ChatGPT um Rat, und die Bäckerei kam nie vor.", result: "Als erster Tipp genannt" },
      { id: "multilingual", cat: "web", title: "Mehrsprachige Website", client: "Ferienpark", problem: "Deutsche und englische Gäste sprangen auf der niederländischen Seite ab.", result: "+35% ausländische Buchungen" },
      { id: "portal", cat: "app", title: "Kundenportal", client: "Steuerbüro", problem: "Dokumente per losen Mails, endloses Nachfragen.", result: "Akten 3x schneller vollständig" },
      { id: "planning", cat: "app", title: "Dienstplan-Tool", client: "Pflegeteam", problem: "Dienstplan in Excel, Fehler erst am Tag selbst sichtbar.", result: "Dienstplan in 10 Minuten" },
    ],
  },
};

export default function DemoGallery({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const [cat, setCat] = useState<Cat>("all");
  const [open, setOpen] = useState<DemoId | null>(null);
  const cards = c.cards.filter((x) => cat === "all" || x.cat === cat);
  const active = c.cards.find((x) => x.id === open) ?? null;
  const Demo = open ? DEMOS[open] : null;

  // Escape sluit; body-scroll vast zolang de modal open is.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="mt-24">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs tracking-[0.2em] uppercase text-(--color-muted)">{c.label}</span>
        <span className="flex-1 h-px bg-(--color-border)" />
      </div>
      <h2 className="font-sans font-bold tracking-tight text-3xl sm:text-4xl">{c.heading}</h2>
      <p className="mt-4 max-w-2xl text-(--color-muted-light) leading-relaxed">{c.intro}</p>

      <div className="mt-8 flex flex-wrap gap-2" role="group">
        {(Object.keys(c.filters) as Cat[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={cat === k}
            onClick={() => setCat(k)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              cat === k
                ? "border-[rgba(var(--accent-rgb),0.5)] bg-[rgba(var(--accent-rgb),0.14)] text-(--color-foreground)"
                : "border-(--color-border) text-(--color-muted-light) hover:text-(--color-foreground)"
            }`}
          >
            {c.filters[k]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setOpen(card.id)}
            className="group flex flex-col rounded-2xl card-depth p-6 text-left transition-transform hover:-translate-y-0.5"
          >
            <span className="w-fit rounded-full border border-(--color-border) px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-(--color-muted-light)">
              {c.catLabel[card.cat]} · {card.client}
            </span>
            <span className="mt-4 text-lg font-semibold tracking-tight group-hover:text-(--color-accent-light) transition-colors">
              {card.title}
            </span>
            <span className="mt-2 text-sm text-(--color-muted-light) leading-relaxed">{card.problem}</span>
            <span className="mt-4 text-sm font-semibold text-(--color-warm)">{card.result}</span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-(--color-accent-light)">
              {c.open} <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && Demo && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/80 px-3 py-6 backdrop-blur-sm sm:items-center sm:px-6"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-(--color-border) px-5 py-4 sm:px-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">
                    {c.catLabel[active.cat]} · {active.client}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{active.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label={c.close}
                  className="shrink-0 rounded-full border border-(--color-border) px-3 py-1.5 text-sm text-(--color-muted-light) hover:text-(--color-foreground)"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 sm:p-7">
                <Demo locale={locale} />
              </div>
              <div className="flex flex-col gap-3 border-t border-(--color-border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <span className="text-[10px] uppercase tracking-[0.14em] text-(--color-warm)">{c.disclaimer}</span>
                <Link
                  href={`/${locale}/gesprek`}
                  className="w-fit rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {c.cta} →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
