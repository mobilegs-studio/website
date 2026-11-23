"use client";

// Klantenservice-bot op eigen kennis (gescript): vraag kiezen, antwoord
// verschijnt woord voor woord met bronnen; laatste optie draagt over aan een mens.

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type QA = { q: string; a: string; sources: string[]; human?: boolean };
type Copy = { brand: string; hello: string; typing: string; sources: string; suggestions: string; kb: string; kbItems: string[]; qa: QA[] };

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    brand: "Installatiebedrijf Zuid · assistent",
    hello: "Hoi! Ik beantwoord vragen over onderhoud, storingen en tarieven. Waar kan ik mee helpen?",
    typing: "typt…",
    sources: "Bronnen",
    suggestions: "Kies een vraag",
    kb: "Kennisbank van de bot",
    kbItems: ["Handleidingen (42 pdf's)", "Tarieven 2026", "Veelgestelde vragen", "Werkgebied en planning"],
    qa: [
      { q: "Mijn cv-ketel geeft storing F28, wat nu?", a: "F28 betekent meestal dat de ketel niet ontsteekt. Controleer of de gaskraan open staat en druk 5 seconden op de resetknop. Blijft de storing? Dan plannen we een monteur in, vaak nog dezelfde dag.", sources: ["Handleiding HR-ketel p. 31", "Storingscodes"] },
      { q: "Wat kost een onderhoudsbeurt?", a: "Een onderhoudsbeurt kost € 119 inclusief btw en voorrijkosten. Met een onderhoudscontract betaal je € 11,50 per maand en zit storingshulp erbij.", sources: ["Tarieven 2026"] },
      { q: "Komen jullie ook in Baarn?", a: "Ja, Baarn valt in ons werkgebied. De eerstvolgende vrije plek daar is donderdag tussen 8:00 en 12:00.", sources: ["Werkgebied en planning"] },
      { q: "Ik wil een monteur spreken", a: "Ik zet je door naar Sanne van de planning. Ze heeft je vraag en het gesprek al voor zich. Gemiddelde wachttijd: 2 minuten.", sources: [], human: true },
    ],
  },
  en: {
    brand: "South Installations · assistant",
    hello: "Hi! I answer questions about servicing, faults and prices. How can I help?",
    typing: "typing…",
    sources: "Sources",
    suggestions: "Pick a question",
    kb: "The bot's knowledge base",
    kbItems: ["Manuals (42 PDFs)", "Prices 2026", "FAQ", "Service area and scheduling"],
    qa: [
      { q: "My boiler shows fault F28, what now?", a: "F28 usually means the boiler doesn't ignite. Check that the gas valve is open and press the reset button for 5 seconds. Still there? We'll book a technician, often the same day.", sources: ["Boiler manual p. 31", "Fault codes"] },
      { q: "What does a service cost?", a: "A service costs €119 including VAT and call-out. With a service contract you pay €11.50 a month and fault help is included.", sources: ["Prices 2026"] },
      { q: "Do you cover Baarn?", a: "Yes, Baarn is in our service area. The next free slot there is Thursday between 8:00 and 12:00.", sources: ["Service area and scheduling"] },
      { q: "I want to talk to a technician", a: "I'm passing you to Sanne from scheduling. She already has your question and this chat in front of her. Average wait: 2 minutes.", sources: [], human: true },
    ],
  },
  de: {
    brand: "Installation Süd · Assistent",
    hello: "Hallo! Ich beantworte Fragen zu Wartung, Störungen und Preisen. Wobei kann ich helfen?",
    typing: "schreibt…",
    sources: "Quellen",
    suggestions: "Frage wählen",
    kb: "Wissensbasis des Bots",
    kbItems: ["Handbücher (42 PDFs)", "Preise 2026", "Häufige Fragen", "Einsatzgebiet und Planung"],
    qa: [
      { q: "Mein Kessel zeigt Störung F28, was nun?", a: "F28 bedeutet meist, dass der Kessel nicht zündet. Prüfen Sie, ob der Gashahn offen ist, und drücken Sie 5 Sekunden die Reset-Taste. Bleibt die Störung? Dann planen wir einen Techniker ein, oft noch am selben Tag.", sources: ["Kesselhandbuch S. 31", "Störungscodes"] },
      { q: "Was kostet eine Wartung?", a: "Eine Wartung kostet 119 € inkl. MwSt. und Anfahrt. Mit Wartungsvertrag zahlen Sie 11,50 € im Monat, Störungshilfe inklusive.", sources: ["Preise 2026"] },
      { q: "Kommen Sie auch nach Baarn?", a: "Ja, Baarn liegt in unserem Einsatzgebiet. Der nächste freie Termin dort ist Donnerstag zwischen 8:00 und 12:00.", sources: ["Einsatzgebiet und Planung"] },
      { q: "Ich möchte einen Techniker sprechen", a: "Ich verbinde Sie mit Sanne aus der Planung. Sie hat Ihre Frage und diesen Chat bereits vor sich. Durchschnittliche Wartezeit: 2 Minuten.", sources: [], human: true },
    ],
  },
};

type Msg = { from: "bot" | "user"; text: string; sources?: string[]; human?: boolean };

export default function Chatbot({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: c.hello }]);
  const [asked, setAsked] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [stream, setStream] = useState<{ qa: QA; words: number } | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, stream]);

  // Antwoord woord voor woord "streamen"; bij het laatste woord wordt het een bericht.
  useEffect(() => {
    if (!stream) return;
    const total = stream.qa.a.split(" ").length;
    const id = setTimeout(() => {
      if (stream.words + 1 >= total) {
        setMsgs((m) => [...m, { from: "bot", text: stream.qa.a, sources: stream.qa.sources, human: stream.qa.human }]);
        setStream(null);
      } else {
        setStream({ ...stream, words: stream.words + 1 });
      }
    }, 45);
    return () => clearTimeout(id);
  }, [stream]);

  const ask = (i: number) => {
    if (typing || stream) return;
    const qa = c.qa[i];
    setAsked((a) => [...a, i]);
    setMsgs((m) => [...m, { from: "user", text: qa.q }]);
    if (reduce) {
      setMsgs((m) => [...m, { from: "bot", text: qa.a, sources: qa.sources, human: qa.human }]);
      return;
    }
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setStream({ qa, words: 0 });
    }, 800);
  };

  const left = c.qa.map((_, i) => i).filter((i) => !asked.includes(i));

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
      <div className="flex h-[460px] flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-background)">
        <div className="flex items-center gap-2 border-b border-(--color-border) px-4 py-3 text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> {c.brand}
        </div>
        <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {msgs.map((m, i) => (
            <Bubble key={i} m={m} sourcesLabel={c.sources} />
          ))}
          {stream && (
            <Bubble m={{ from: "bot", text: stream.qa.a.split(" ").slice(0, stream.words).join(" ") }} sourcesLabel={c.sources} />
          )}
          {typing && <p className="text-xs text-(--color-muted)">{c.typing}</p>}
        </div>
        <div className="border-t border-(--color-border) px-4 py-3">
          <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.suggestions}</p>
          <div className="flex flex-wrap gap-2">
            {left.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => ask(i)}
                disabled={typing || !!stream}
                className="rounded-full border border-[rgba(var(--accent-rgb),0.4)] px-3 py-1.5 text-xs text-(--color-accent-light) transition-colors hover:bg-[rgba(var(--accent-rgb),0.12)] disabled:opacity-40"
              >
                {c.qa[i].q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="rounded-2xl border border-(--color-border) p-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.kb}</p>
        <ul className="mt-3 space-y-2">
          {c.kbItems.map((k) => (
            <li key={k} className="flex items-center gap-2 text-sm text-(--color-muted-light)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent)" /> {k}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function Bubble({ m, sourcesLabel }: { m: Msg; sourcesLabel: string }) {
  const user = m.from === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={`flex ${user ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          user ? "bg-(--color-accent) text-white" : m.human ? "border border-[rgba(var(--warm-rgb),0.4)] bg-[rgba(var(--warm-rgb),0.08)]" : "bg-(--color-surface-hover)"
        }`}
      >
        {m.text}
        {m.sources && m.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-(--color-muted)">{sourcesLabel}</span>
            {m.sources.map((s) => (
              <span key={s} className="rounded-md border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted-light)">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
