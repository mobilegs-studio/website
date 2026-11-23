"use client";

// Vergadering naar actiepunten (gescript): transcript links, AI maakt een
// verslag met besluiten en actiepunten (eigenaar + datum), daarna versturen.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Line = { who: string; text: string };
type Action = { task: string; owner: string; due: string };
type Copy = {
  transcript: string;
  make: string;
  making: string;
  summaryT: string;
  summary: string;
  decisionsT: string;
  decisions: string[];
  actionsT: string;
  actions: Action[];
  send: string;
  sent: string;
  lines: Line[];
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    transcript: "Transcript · Klantoverleg 18 min",
    make: "Maak verslag",
    making: "Verslag maken…",
    summaryT: "Samenvatting",
    summary: "De klant wil de nieuwe offerte-flow vóór januari live. Budget blijft gelijk; de koppeling met het CRM schuift naar fase 2.",
    decisionsT: "Besluiten",
    decisions: ["Livegang offerte-flow: 15 januari", "CRM-koppeling naar fase 2"],
    actionsT: "Actiepunten",
    actions: [
      { task: "Nieuwe planning naar de klant sturen", owner: "Lotte", due: "vr 27 nov" },
      { task: "Teksten offerte-pagina aanleveren", owner: "Klant", due: "wo 2 dec" },
      { task: "Testomgeving klaarzetten", owner: "Jeroen", due: "ma 7 dec" },
    ],
    send: "Stuur naar Teams",
    sent: "Verstuurd naar #klant-noord ✓",
    lines: [
      { who: "Lotte", text: "Kunnen we de offerte-flow nog dit jaar live krijgen?" },
      { who: "Klant", text: "Liever half januari, dan is ons team terug van vakantie." },
      { who: "Jeroen", text: "Prima. De CRM-koppeling kost meer tijd, die zou ik naar fase 2 schuiven." },
      { who: "Klant", text: "Akkoord, zolang het budget gelijk blijft." },
      { who: "Lotte", text: "Dan stuur ik vrijdag een nieuwe planning. Jullie leveren de teksten?" },
      { who: "Klant", text: "Ja, uiterlijk woensdag over een week." },
      { who: "Jeroen", text: "Dan zet ik de testomgeving maandag de 7e klaar." },
    ],
  },
  en: {
    transcript: "Transcript · Client meeting 18 min",
    make: "Create minutes",
    making: "Creating minutes…",
    summaryT: "Summary",
    summary: "The client wants the new quote flow live before January. Budget stays the same; the CRM link moves to phase 2.",
    decisionsT: "Decisions",
    decisions: ["Quote flow go-live: 15 January", "CRM link moves to phase 2"],
    actionsT: "Action items",
    actions: [
      { task: "Send the new timeline to the client", owner: "Lotte", due: "Fri 27 Nov" },
      { task: "Deliver copy for the quote page", owner: "Client", due: "Wed 2 Dec" },
      { task: "Set up the test environment", owner: "Jeroen", due: "Mon 7 Dec" },
    ],
    send: "Send to Teams",
    sent: "Sent to #client-north ✓",
    lines: [
      { who: "Lotte", text: "Can we get the quote flow live this year?" },
      { who: "Client", text: "Mid-January would be better, our team is back from holiday then." },
      { who: "Jeroen", text: "Fine. The CRM link takes longer, I'd move it to phase 2." },
      { who: "Client", text: "Agreed, as long as the budget stays the same." },
      { who: "Lotte", text: "Then I'll send a new timeline on Friday. You'll deliver the copy?" },
      { who: "Client", text: "Yes, by Wednesday next week at the latest." },
      { who: "Jeroen", text: "Then I'll have the test environment ready on Monday the 7th." },
    ],
  },
  de: {
    transcript: "Transkript · Kundentermin 18 Min",
    make: "Protokoll erstellen",
    making: "Protokoll wird erstellt…",
    summaryT: "Zusammenfassung",
    summary: "Der Kunde möchte den neuen Angebotsprozess vor Januar live haben. Das Budget bleibt gleich; die CRM-Anbindung rückt in Phase 2.",
    decisionsT: "Beschlüsse",
    decisions: ["Go-live Angebotsprozess: 15. Januar", "CRM-Anbindung in Phase 2"],
    actionsT: "Aufgaben",
    actions: [
      { task: "Neuen Zeitplan an den Kunden senden", owner: "Lotte", due: "Fr 27. Nov" },
      { task: "Texte für die Angebotsseite liefern", owner: "Kunde", due: "Mi 2. Dez" },
      { task: "Testumgebung bereitstellen", owner: "Jeroen", due: "Mo 7. Dez" },
    ],
    send: "An Teams senden",
    sent: "An #kunde-nord gesendet ✓",
    lines: [
      { who: "Lotte", text: "Bekommen wir den Angebotsprozess noch dieses Jahr live?" },
      { who: "Kunde", text: "Lieber Mitte Januar, dann ist unser Team aus dem Urlaub zurück." },
      { who: "Jeroen", text: "Gut. Die CRM-Anbindung dauert länger, die würde ich in Phase 2 schieben." },
      { who: "Kunde", text: "Einverstanden, solange das Budget gleich bleibt." },
      { who: "Lotte", text: "Dann schicke ich Freitag einen neuen Zeitplan. Ihr liefert die Texte?" },
      { who: "Kunde", text: "Ja, spätestens Mittwoch nächster Woche." },
      { who: "Jeroen", text: "Dann steht die Testumgebung am Montag, den 7." },
    ],
  },
};

const COLORS = ["text-(--color-accent-light)", "text-(--color-warm)", "text-emerald-300"];

export default function MeetingNotes({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [doneTasks, setDoneTasks] = useState<boolean[]>([false, false, false]);
  const [sent, setSent] = useState(false);
  const speakers = [...new Set(c.lines.map((l) => l.who))];

  const make = () => {
    setState("busy");
    setTimeout(() => setState("done"), reduce ? 0 : 1400);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="flex flex-col rounded-2xl border border-(--color-border) p-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.transcript}</p>
        <ul className="mt-3 space-y-2.5">
          {c.lines.map((l, i) => (
            <li key={i} className="text-sm leading-relaxed">
              <span className={`font-semibold ${COLORS[speakers.indexOf(l.who) % COLORS.length]}`}>{l.who}: </span>
              <span className="text-(--color-muted-light)">{l.text}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={make}
          disabled={state !== "idle"}
          className="mt-5 w-fit rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {state === "busy" ? c.making : c.make}
        </button>
      </div>

      <div className="min-h-[360px] rounded-2xl border border-(--color-border) bg-(--color-background) p-5">
        <AnimatePresence mode="wait">
          {state !== "done" ? (
            <motion.div key="wait" exit={{ opacity: 0 }} className="flex h-full min-h-[320px] items-center justify-center">
              {state === "busy" ? (
                <div className="w-full space-y-2">
                  {[80, 95, 60, 70].map((w, i) => (
                    <div key={i} className="h-3 animate-pulse rounded bg-(--color-surface-hover)" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <span className="text-sm text-(--color-muted)">← {c.make}</span>
              )}
            </motion.div>
          ) : (
            <motion.div key="notes" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.summaryT}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{c.summary}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.decisionsT}</p>
                <ul className="mt-1.5 space-y-1 text-sm">
                  {c.decisions.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-(--color-muted)">{c.actionsT}</p>
                <ul className="mt-1.5 space-y-1.5">
                  {c.actions.map((a, i) => (
                    <li key={a.task}>
                      <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-(--color-border) px-3 py-2 text-sm">
                        <input
                          type="checkbox"
                          checked={doneTasks[i]}
                          onChange={() => setDoneTasks((d) => d.map((v, k) => (k === i ? !v : v)))}
                          className="h-4 w-4 accent-[#5B5FE8]"
                        />
                        <span className={`flex-1 ${doneTasks[i] ? "text-(--color-muted) line-through" : ""}`}>{a.task}</span>
                        <span className="shrink-0 text-xs text-(--color-muted-light)">
                          {a.owner} · {a.due}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {sent ? (
                <p className="text-sm font-semibold text-emerald-300">{c.sent}</p>
              ) : (
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="rounded-full border border-[rgba(var(--accent-rgb),0.4)] px-4 py-2 text-sm font-semibold text-(--color-accent-light)"
                >
                  {c.send} →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
