"use client";

// Klantportaal van een administratiekantoor. Wissel tussen klant- en
// kantoorweergave: uploads van de klant zie je meteen terug bij het kantoor,
// een herinnering van het kantoor verschijnt bij de klant.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Copy = {
  roleClient: string;
  roleOffice: string;
  hello: string;
  file: string;
  steps: string[];
  docsT: string;
  docs: string[];
  upload: string;
  uploaded: string;
  msgsT: string;
  welcome: string;
  reminder: string;
  officeT: string;
  colClient: string;
  colMissing: string;
  colStatus: string;
  complete: string;
  remind: string;
  reminded: string;
  you: string;
  others: { name: string; missing: number }[];
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    roleClient: "Klant",
    roleOffice: "Kantoor",
    hello: "Welkom terug, fam. Jansen",
    file: "Aangifte inkomstenbelasting 2026",
    steps: ["Documenten", "In behandeling", "Ter ondertekening", "Ingediend"],
    docsT: "Nog aan te leveren",
    docs: ["Jaaropgaaf werkgever", "Hypotheekoverzicht", "Bankafschrift 31-12", "Zorgkosten"],
    upload: "Uploaden",
    uploaded: "Ontvangen ✓",
    msgsT: "Berichten",
    welcome: "Kantoor: Fijn dat u er bent. Upload de documenten hieronder, dan gaan wij aan de slag.",
    reminder: "Kantoor: Vriendelijke herinnering: we missen nog een paar documenten.",
    officeT: "Dossiers aangifte 2026",
    colClient: "Klant",
    colMissing: "Ontbreekt",
    colStatus: "Status",
    complete: "Compleet",
    remind: "Herinnering",
    reminded: "Verstuurd",
    you: "Fam. Jansen",
    others: [
      { name: "De Boer Advies", missing: 0 },
      { name: "Fam. Smit", missing: 2 },
      { name: "Kapsalon Mila", missing: 1 },
    ],
  },
  en: {
    roleClient: "Client",
    roleOffice: "Office",
    hello: "Welcome back, Jansen family",
    file: "Income tax return 2026",
    steps: ["Documents", "In progress", "To sign", "Filed"],
    docsT: "Still to provide",
    docs: ["Employer annual statement", "Mortgage statement", "Bank statement 31 Dec", "Medical costs"],
    upload: "Upload",
    uploaded: "Received ✓",
    msgsT: "Messages",
    welcome: "Office: Good to have you. Upload the documents below and we'll get started.",
    reminder: "Office: Friendly reminder: we're still missing a few documents.",
    officeT: "Tax return files 2026",
    colClient: "Client",
    colMissing: "Missing",
    colStatus: "Status",
    complete: "Complete",
    remind: "Remind",
    reminded: "Sent",
    you: "Jansen family",
    others: [
      { name: "De Boer Consulting", missing: 0 },
      { name: "Smit family", missing: 2 },
      { name: "Salon Mila", missing: 1 },
    ],
  },
  de: {
    roleClient: "Kunde",
    roleOffice: "Büro",
    hello: "Willkommen zurück, Familie Jansen",
    file: "Einkommensteuererklärung 2026",
    steps: ["Dokumente", "In Bearbeitung", "Zur Unterschrift", "Eingereicht"],
    docsT: "Noch einzureichen",
    docs: ["Lohnsteuerbescheinigung", "Hypothekenübersicht", "Kontoauszug 31.12.", "Krankheitskosten"],
    upload: "Hochladen",
    uploaded: "Erhalten ✓",
    msgsT: "Nachrichten",
    welcome: "Büro: Schön, dass Sie da sind. Laden Sie die Dokumente unten hoch, dann legen wir los.",
    reminder: "Büro: Freundliche Erinnerung: Uns fehlen noch einige Dokumente.",
    officeT: "Akten Steuererklärung 2026",
    colClient: "Kunde",
    colMissing: "Fehlt",
    colStatus: "Status",
    complete: "Vollständig",
    remind: "Erinnern",
    reminded: "Gesendet",
    you: "Familie Jansen",
    others: [
      { name: "De Boer Beratung", missing: 0 },
      { name: "Familie Smit", missing: 2 },
      { name: "Salon Mila", missing: 1 },
    ],
  },
};

export default function ClientPortal({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const [role, setRole] = useState<"client" | "office">("client");
  const [got, setGot] = useState<boolean[]>([true, false, false, false]);
  const [reminded, setReminded] = useState(false);
  const missing = got.filter((g) => !g).length;
  const stage = missing === 0 ? 1 : 0;

  return (
    <div>
      <div className="mb-4 inline-flex rounded-full border border-(--color-border) p-1">
        {(["client", "office"] as const).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={role === r}
            onClick={() => setRole(r)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${role === r ? "bg-(--color-accent) text-white" : "text-(--color-muted-light)"}`}
          >
            {r === "client" ? c.roleClient : c.roleOffice}
            {r === "client" && reminded && missing > 0 && <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-(--color-warm)" />}
          </button>
        ))}
      </div>

      <div className="min-h-[420px] rounded-2xl border border-[#e2e5ea] bg-[#f6f7f9] p-4 text-[#14161a] sm:p-6">
        <AnimatePresence mode="wait">
          {role === "client" ? (
            <motion.div key="client" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-bold">{c.hello}</p>
                  <p className="text-sm text-[#5e6570]">{c.file}</p>
                </div>
                {/* Statusbalk */}
                <ol className="grid grid-cols-4 gap-1.5">
                  {c.steps.map((s, i) => (
                    <li key={s}>
                      <div className={`h-1.5 rounded-full transition-colors duration-500 ${i <= stage ? "bg-[#1f6feb]" : "bg-[#e2e5ea]"}`} />
                      <p className={`mt-1.5 text-[11px] ${i === stage ? "font-semibold" : "text-[#5e6570]"}`}>{s}</p>
                    </li>
                  ))}
                </ol>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="mb-2 text-xs font-semibold text-[#5e6570]">
                    {c.docsT} · {missing}/{c.docs.length}
                  </p>
                  <ul className="space-y-2">
                    {c.docs.map((d, i) => (
                      <li key={d} className="flex items-center justify-between gap-3 text-sm">
                        <span className={got[i] ? "text-[#5e6570]" : ""}>{d}</span>
                        {got[i] ? (
                          <span className="text-xs font-semibold text-emerald-700">{c.uploaded}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setGot((g) => g.map((v, k) => (k === i ? true : v)))}
                            className="rounded-lg bg-[#1f6feb] px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            ↑ {c.upload}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="mb-2 text-xs font-semibold text-[#5e6570]">{c.msgsT}</p>
                <div className="space-y-2 text-sm">
                  <p className="rounded-lg bg-[#eef1f5] px-3 py-2">{c.welcome}</p>
                  {reminded && (
                    <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-amber-50 px-3 py-2 text-amber-900">
                      {c.reminder}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="office" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="mb-3 text-lg font-bold">{c.officeT}</p>
              <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e2e5ea] text-left text-xs text-[#5e6570]">
                      <th className="px-4 py-2.5 font-semibold">{c.colClient}</th>
                      <th className="px-4 py-2.5 font-semibold">{c.colMissing}</th>
                      <th className="hidden px-4 py-2.5 font-semibold sm:table-cell">{c.colStatus}</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {[{ name: c.you, missing, me: true }, ...c.others.map((o) => ({ ...o, me: false }))].map((row) => (
                      <tr key={row.name} className={`border-b border-[#f0f2f5] last:border-0 ${row.me ? "bg-[#f3f7ff]" : ""}`}>
                        <td className="px-4 py-3 font-medium">{row.name}</td>
                        <td className="px-4 py-3">{row.missing}</td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${row.missing === 0 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                            {row.missing === 0 ? c.complete : c.steps[0]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          {row.me && row.missing > 0 && (
                            <button
                              type="button"
                              disabled={reminded}
                              onClick={() => setReminded(true)}
                              className="rounded-lg border border-[#1f6feb] px-3 py-1 text-xs font-semibold text-[#1f6feb] disabled:border-[#c5cad3] disabled:text-[#5e6570]"
                            >
                              {reminded ? c.reminded : c.remind}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
