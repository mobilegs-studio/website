"use client";

// Roostertool: kies een medewerker en klik op diensten. De tool bewaakt
// contracturen, open diensten en "laat gevolgd door vroeg". Pas zonder
// problemen kun je publiceren.

import { useState } from "react";

type Person = { id: string; name: string; hours: number; color: string };
type Copy = {
  pick: string;
  days: string[];
  shifts: string[];
  open: (n: number) => string;
  over: (name: string, h: number, max: number) => string;
  rest: (name: string, day: string) => string;
  allGood: string;
  publish: string;
  published: string;
  hoursL: string;
};

const PEOPLE: Person[] = [
  { id: "a", name: "Anouk", hours: 24, color: "#5B5FE8" },
  { id: "b", name: "Bram", hours: 32, color: "#E0B978" },
  { id: "c", name: "Chantal", hours: 24, color: "#34d399" },
];
const SHIFT_H = 8;

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    pick: "Kies wie je inplant, klik dan op een dienst",
    days: ["ma", "di", "wo", "do", "vr"],
    shifts: ["Vroeg 7–15", "Laat 15–23"],
    open: (n) => `${n} dienst${n === 1 ? "" : "en"} nog open`,
    over: (n, h, m) => `${n} staat op ${h} uur (contract ${m})`,
    rest: (n, d) => `${n}: late dienst gevolgd door vroege dienst (${d})`,
    allGood: "Alles klopt: geen open diensten, geen conflicten",
    publish: "Rooster publiceren",
    published: "Gepubliceerd · het team krijgt een melding",
    hoursL: "uur",
  },
  en: {
    pick: "Pick who to schedule, then click a shift",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shifts: ["Early 7–15", "Late 15–23"],
    open: (n) => `${n} shift${n === 1 ? "" : "s"} still open`,
    over: (n, h, m) => `${n} is at ${h} hours (contract ${m})`,
    rest: (n, d) => `${n}: late shift followed by early shift (${d})`,
    allGood: "All good: no open shifts, no conflicts",
    publish: "Publish schedule",
    published: "Published · the team gets a notification",
    hoursL: "hrs",
  },
  de: {
    pick: "Wählen Sie, wen Sie einplanen, dann auf eine Schicht klicken",
    days: ["Mo", "Di", "Mi", "Do", "Fr"],
    shifts: ["Früh 7–15", "Spät 15–23"],
    open: (n) => `${n} Schicht${n === 1 ? "" : "en"} noch offen`,
    over: (n, h, m) => `${n} hat ${h} Stunden (Vertrag ${m})`,
    rest: (n, d) => `${n}: Spätschicht gefolgt von Frühschicht (${d})`,
    allGood: "Alles passt: keine offenen Schichten, keine Konflikte",
    publish: "Dienstplan veröffentlichen",
    published: "Veröffentlicht · das Team wird benachrichtigt",
    hoursL: "Std.",
  },
};

// Startrooster met bewust een paar problemen erin.
const START: (string | null)[][] = [
  // [dag][dienst] -> persoon-id
  ["a", "b"],
  ["b", "a"],
  ["a", null],
  ["b", "c"],
  [null, "b"],
];

export default function PlanningTool({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const [grid, setGrid] = useState(START);
  const [active, setActive] = useState("c");
  const [published, setPublished] = useState(false);

  const hours = Object.fromEntries(PEOPLE.map((p) => [p.id, grid.flat().filter((x) => x === p.id).length * SHIFT_H]));
  const openCount = grid.flat().filter((x) => !x).length;
  const issues: string[] = [];
  PEOPLE.forEach((p) => hours[p.id] > p.hours && issues.push(c.over(p.name, hours[p.id], p.hours)));
  grid.forEach((day, d) => {
    if (d < grid.length - 1 && day[1] && day[1] === grid[d + 1][0]) {
      const p = PEOPLE.find((x) => x.id === day[1]);
      if (p) issues.push(c.rest(p.name, `${c.days[d]} → ${c.days[d + 1]}`));
    }
  });
  if (openCount) issues.unshift(c.open(openCount));
  const ok = issues.length === 0;

  const toggle = (d: number, s: number) => {
    setPublished(false);
    setGrid((g) => g.map((day, i) => (i !== d ? day : day.map((v, k) => (k !== s ? v : v === active ? null : active)))));
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs text-(--color-muted-light)">{c.pick}</p>
        <div className="flex flex-wrap gap-2">
          {PEOPLE.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={active === p.id}
              onClick={() => setActive(p.id)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active === p.id ? "border-white/40 bg-white/10" : "border-(--color-border) text-(--color-muted-light)"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
              {p.name}
              <span className={`text-xs ${hours[p.id] > p.hours ? "text-red-300" : "text-(--color-muted)"}`}>
                {hours[p.id]}/{p.hours} {c.hoursL}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-separate border-spacing-1.5 text-sm">
          <thead>
            <tr>
              <th />
              {c.days.map((d) => (
                <th key={d} className="pb-1 text-xs font-semibold uppercase tracking-wider text-(--color-muted)">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.shifts.map((sh, s) => (
              <tr key={sh}>
                <td className="whitespace-nowrap pr-2 text-xs text-(--color-muted-light)">{sh}</td>
                {grid.map((day, d) => {
                  const p = PEOPLE.find((x) => x.id === day[s]);
                  return (
                    <td key={d}>
                      <button
                        type="button"
                        onClick={() => toggle(d, s)}
                        className={`h-14 w-full rounded-xl border text-sm font-semibold transition-colors ${
                          p ? "border-transparent text-black" : "border-dashed border-red-400/50 text-red-300 hover:bg-red-400/10"
                        }`}
                        style={p ? { background: p.color } : undefined}
                      >
                        {p ? p.name : "+"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-(--color-border) p-4 sm:flex-row sm:items-center sm:justify-between">
        <ul className="space-y-1 text-sm">
          {ok ? (
            <li className="text-emerald-300">✓ {c.allGood}</li>
          ) : (
            issues.map((i) => (
              <li key={i} className="text-(--color-warm)">
                ⚠ {i}
              </li>
            ))
          )}
        </ul>
        {published ? (
          <span className="text-sm font-semibold text-emerald-300">{c.published}</span>
        ) : (
          <button
            type="button"
            disabled={!ok}
            onClick={() => setPublished(true)}
            className="shrink-0 rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            {c.publish}
          </button>
        )}
      </div>
    </div>
  );
}
