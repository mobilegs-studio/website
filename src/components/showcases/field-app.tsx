"use client";

// App-demo: buitendienst-app op een telefoon. Opdracht openen, checklist
// afvinken, foto toevoegen, klant laten tekenen, afronden. Werkt ook "offline".

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Job = { id: string; time: string; client: string; address: string; type: string };
type Copy = {
  steps: { title: string; text: string }[];
  today: (n: number) => string;
  online: string;
  offline: string;
  offlineNote: string;
  back: string;
  route: string;
  checklist: string;
  tasks: string[];
  photos: string;
  addPhoto: string;
  signature: string;
  signHere: string;
  clear: string;
  finish: string;
  finishHint: string;
  doneOnline: string;
  doneOffline: string;
  statusOpen: string;
  statusDone: string;
  statusSync: string;
  jobs: Job[];
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    steps: [
      { title: "Planning op zak", text: "Monteurs zien hun opdrachten van vandaag, met adres en route." },
      { title: "Alles vastleggen", text: "Checklist, foto's en handtekening van de klant, direct in de app." },
      { title: "Ook zonder bereik", text: "Offline gewoon doorwerken; de app synchroniseert vanzelf." },
    ],
    today: (n) => `Vandaag · ${n} opdrachten`,
    online: "Online",
    offline: "Offline",
    offlineNote: "Geen bereik · alles wordt bewaard",
    back: "Terug",
    route: "Route",
    checklist: "Checklist",
    tasks: ["Ketel gecontroleerd", "Druk bijgevuld", "Rookgas gemeten"],
    photos: "Foto's",
    addPhoto: "+ Foto",
    signature: "Handtekening klant",
    signHere: "Teken hier",
    clear: "Wissen",
    finish: "Opdracht afronden",
    finishHint: "Vink alles af, voeg een foto toe en laat tekenen",
    doneOnline: "Afgerond · rapport gemaild naar de klant",
    doneOffline: "Opgeslagen · wordt verstuurd zodra je online bent",
    statusOpen: "Open",
    statusDone: "Klaar",
    statusSync: "Wacht op sync",
    jobs: [
      { id: "j1", time: "08:30", client: "Fam. de Vries", address: "Lindelaan 12, Hilversum", type: "Onderhoud cv-ketel" },
      { id: "j2", time: "11:00", client: "Bakkerij Van Dam", address: "Kerkstraat 4, Bussum", type: "Storing oven" },
      { id: "j3", time: "14:15", client: "Kantoor Noord", address: "Stationsweg 88, Baarn", type: "Airco-inspectie" },
    ],
  },
  en: {
    steps: [
      { title: "Schedule in your pocket", text: "Technicians see today's jobs, with address and route." },
      { title: "Capture everything", text: "Checklist, photos and the customer's signature, right in the app." },
      { title: "Works without signal", text: "Keep working offline; the app syncs by itself." },
    ],
    today: (n) => `Today · ${n} jobs`,
    online: "Online",
    offline: "Offline",
    offlineNote: "No signal · everything is saved",
    back: "Back",
    route: "Route",
    checklist: "Checklist",
    tasks: ["Boiler checked", "Pressure topped up", "Flue gas measured"],
    photos: "Photos",
    addPhoto: "+ Photo",
    signature: "Customer signature",
    signHere: "Sign here",
    clear: "Clear",
    finish: "Complete job",
    finishHint: "Tick everything, add a photo and get a signature",
    doneOnline: "Completed · report emailed to the customer",
    doneOffline: "Saved · sent as soon as you're online",
    statusOpen: "Open",
    statusDone: "Done",
    statusSync: "Waiting to sync",
    jobs: [
      { id: "j1", time: "08:30", client: "The de Vries family", address: "Lindelaan 12, Hilversum", type: "Boiler service" },
      { id: "j2", time: "11:00", client: "Van Dam Bakery", address: "Kerkstraat 4, Bussum", type: "Oven fault" },
      { id: "j3", time: "14:15", client: "North Office", address: "Stationsweg 88, Baarn", type: "AC inspection" },
    ],
  },
  de: {
    steps: [
      { title: "Planung in der Tasche", text: "Techniker sehen ihre heutigen Aufträge, mit Adresse und Route." },
      { title: "Alles festhalten", text: "Checkliste, Fotos und Unterschrift des Kunden, direkt in der App." },
      { title: "Auch ohne Empfang", text: "Offline weiterarbeiten; die App synchronisiert von selbst." },
    ],
    today: (n) => `Heute · ${n} Aufträge`,
    online: "Online",
    offline: "Offline",
    offlineNote: "Kein Empfang · alles wird gespeichert",
    back: "Zurück",
    route: "Route",
    checklist: "Checkliste",
    tasks: ["Kessel geprüft", "Druck aufgefüllt", "Abgas gemessen"],
    photos: "Fotos",
    addPhoto: "+ Foto",
    signature: "Unterschrift Kunde",
    signHere: "Hier unterschreiben",
    clear: "Löschen",
    finish: "Auftrag abschließen",
    finishHint: "Alles abhaken, Foto hinzufügen, unterschreiben lassen",
    doneOnline: "Abgeschlossen · Bericht an den Kunden gemailt",
    doneOffline: "Gespeichert · wird gesendet, sobald Sie online sind",
    statusOpen: "Offen",
    statusDone: "Erledigt",
    statusSync: "Wartet auf Sync",
    jobs: [
      { id: "j1", time: "08:30", client: "Familie de Vries", address: "Lindelaan 12, Hilversum", type: "Wartung Heizkessel" },
      { id: "j2", time: "11:00", client: "Bäckerei Van Dam", address: "Kerkstraat 4, Bussum", type: "Störung Ofen" },
      { id: "j3", time: "14:15", client: "Büro Nord", address: "Stationsweg 88, Baarn", type: "Klima-Inspektion" },
    ],
  },
};

type Status = "open" | "done" | "sync";

export default function FieldApp({ locale }: { locale: string }) {
  const c = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const reduce = useReducedMotion();
  const [offline, setOffline] = useState(false);
  const [openJob, setOpenJob] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [photos, setPhotos] = useState(0);
  const [signed, setSigned] = useState(false);
  const [padKey, setPadKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const job = c.jobs.find((j) => j.id === openJob) ?? null;
  const canFinish = checked.every(Boolean) && photos > 0 && signed;
  const step = job ? 1 : offline ? 2 : 0;

  const open = (id: string) => {
    setOpenJob(id);
    setChecked([false, false, false]);
    setPhotos(0);
    setSigned(false);
  };

  const finish = () => {
    if (!job) return;
    setStatus((s) => ({ ...s, [job.id]: offline ? "sync" : "done" }));
    setToast(offline ? c.doneOffline : c.doneOnline);
    setOpenJob(null);
    setTimeout(() => setToast(null), 3200);
  };

  const toggleOffline = () => {
    setOffline((o) => {
      // Terug online: wachtende opdrachten worden gesynct.
      if (o) setStatus((s) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v === "sync" ? "done" : v])));
      return !o;
    });
  };

  const left = c.jobs.filter((j) => !status[j.id] || status[j.id] === "open").length;

  return (
    <div className="grid min-h-[620px] items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_auto_1fr]">
      {/* Uitleg-stappen (links op desktop) */}
      <ol className="hidden lg:flex flex-col gap-4">
        {c.steps.map((s, i) => (
          <li
            key={s.title}
            className={`rounded-xl border p-4 transition-colors duration-300 ${
              i === step
                ? "border-[rgba(var(--accent-rgb),0.45)] bg-[rgba(var(--accent-rgb),0.1)]"
                : "border-(--color-border)"
            }`}
          >
            <p className="text-sm font-semibold">
              <span className="mr-2 font-mono text-xs text-(--color-accent-light)">0{i + 1}</span>
              {s.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-(--color-muted-light)">{s.text}</p>
          </li>
        ))}
      </ol>

      {/* Telefoon */}
      <div className="relative mx-auto h-[590px] w-[290px] overflow-hidden rounded-[40px] border-[6px] border-[#1c1c1f] bg-[#f6f7f9] text-[#14161a] shadow-2xl">
        <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        {/* Statusbalk + online-schakelaar */}
        <div className="flex items-center justify-between px-5 pt-10 pb-2">
          <span className="text-[13px] font-bold">{job ? job.client : c.today(left)}</span>
          <button
            type="button"
            onClick={toggleOffline}
            aria-pressed={offline}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              offline ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            ● {offline ? c.offline : c.online}
          </button>
        </div>
        {offline && <div className="mx-4 mb-1 rounded-lg bg-amber-50 px-3 py-1.5 text-[10px] text-amber-800">{c.offlineNote}</div>}

        <AnimatePresence mode="wait" initial={false}>
          {!job ? (
            <motion.ul
              key="list"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 px-4 pt-2"
            >
              {c.jobs.map((j) => {
                const st = status[j.id] ?? "open";
                return (
                  <li key={j.id}>
                    <button
                      type="button"
                      onClick={() => st === "open" && open(j.id)}
                      className="w-full rounded-2xl bg-white p-3.5 text-left shadow-sm disabled:opacity-60"
                      disabled={st !== "open"}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#5e6570]">{j.time}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            st === "done"
                              ? "bg-emerald-100 text-emerald-800"
                              : st === "sync"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-[#eef1f5] text-[#5e6570]"
                          }`}
                        >
                          {st === "done" ? `✓ ${c.statusDone}` : st === "sync" ? c.statusSync : c.statusOpen}
                        </span>
                      </div>
                      <div className="mt-1 text-[13px] font-semibold">{j.type}</div>
                      <div className="text-[11px] text-[#5e6570]">
                        {j.client} · {j.address}
                      </div>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          ) : (
            <motion.div
              key="job"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2.5 px-4 pt-1"
            >
              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setOpenJob(null)} className="text-[12px] font-semibold text-[#1f6feb]">
                  ‹ {c.back}
                </button>
                <span className="rounded-full bg-[#1f6feb] px-2.5 py-1 text-[10px] font-semibold text-white">{c.route} ↗</span>
              </div>
              <div className="text-[11px] text-[#5e6570]">
                {job.type} · {job.address}
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="mb-1.5 text-[11px] font-semibold">{c.checklist}</p>
                {c.tasks.map((t, i) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2 py-1 text-[12px]">
                    <input
                      type="checkbox"
                      checked={checked[i]}
                      onChange={() => setChecked((cs) => cs.map((v, k) => (k === i ? !v : v)))}
                      className="h-4 w-4 accent-[#1f6feb]"
                    />
                    <span className={checked[i] ? "text-[#5e6570] line-through" : ""}>{t}</span>
                  </label>
                ))}
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="mb-1.5 text-[11px] font-semibold">{c.photos}</p>
                <div className="flex gap-1.5">
                  {Array.from({ length: photos }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-11 w-11 rounded-lg bg-gradient-to-br from-slate-300 to-slate-500"
                    />
                  ))}
                  {photos < 3 && (
                    <button
                      type="button"
                      onClick={() => setPhotos((n) => n + 1)}
                      className="h-11 rounded-lg border border-dashed border-[#c5cad3] px-2.5 text-[11px] font-semibold text-[#1f6feb]"
                    >
                      {c.addPhoto}
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[11px] font-semibold">{c.signature}</p>
                  {signed && (
                    <button
                      type="button"
                      onClick={() => {
                        setSigned(false);
                        setPadKey((k) => k + 1);
                      }}
                      className="text-[10px] text-[#5e6570]"
                    >
                      {c.clear}
                    </button>
                  )}
                </div>
                <SignaturePad key={`${openJob}-${padKey}`} placeholder={c.signHere} onSign={() => setSigned(true)} />
              </div>

              <button
                type="button"
                onClick={finish}
                disabled={!canFinish}
                className="rounded-xl bg-[#1f6feb] py-2.5 text-[13px] font-semibold text-white transition-opacity disabled:opacity-35"
              >
                {c.finish}
              </button>
              {!canFinish && <p className="-mt-1 text-center text-[10px] text-[#5e6570]">{c.finishHint}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-5 left-4 right-4 rounded-xl bg-[#14161a] px-3 py-2.5 text-[11px] font-medium text-white shadow-xl"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobiel: stappen onder de telefoon, compact */}
      <ol className="flex flex-col gap-2 lg:hidden">
        {c.steps.map((s, i) => (
          <li key={s.title} className={`text-xs ${i === step ? "text-(--color-foreground)" : "text-(--color-muted-light)"}`}>
            <span className="mr-2 font-mono text-(--color-accent-light)">0{i + 1}</span>
            <span className="font-semibold">{s.title}</span> · {s.text}
          </li>
        ))}
      </ol>

      {/* Rechterkolom op desktop: ruimte in balans houden */}
      <div className="hidden lg:block" />
    </div>
  );
}

// Tekenvlak voor de handtekening (muis, touch en pen).
function SignaturePad({ placeholder, onSign }: { placeholder: string; onSign: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 500, y: ((e.clientY - r.top) / r.height) * 120 };
  };

  return (
    <div className="relative">
      <canvas
        ref={canvas}
        width={500}
        height={120}
        className="h-[60px] w-full touch-none rounded-lg bg-[#f6f7f9]"
        onPointerDown={(e) => {
          const ctx = canvas.current?.getContext("2d");
          if (!ctx) return;
          drawing.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          const p = point(e);
          ctx.lineWidth = 4;
          ctx.lineCap = "round";
          ctx.strokeStyle = "#14161a";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = canvas.current?.getContext("2d");
          if (!ctx) return;
          const p = point(e);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          if (!hasInk) setHasInk(true);
        }}
        onPointerUp={() => {
          drawing.current = false;
          if (hasInk) onSign();
        }}
      />
      {!hasInk && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] text-[#9aa3ae]">
          {placeholder}
        </span>
      )}
    </div>
  );
}
