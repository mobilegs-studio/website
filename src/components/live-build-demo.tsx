"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Translations } from "@/i18n/translations";

type T = Translations["home"]["liveBuild"];
type SceneId = "app" | "site" | "ai" | "ab";
// 0 = prompt typing, 1 = wireframe, 2 = built, 3 = result
type Phase = 0 | 1 | 2 | 3;

const ORDER: SceneId[] = ["app", "site", "ai", "ab"];
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TYPE_MS = 42;
const PHASE_MS = { 1: 900, 2: 1700, 3: 2800 } as const;

// Hero-demo: een prompt wordt live een app, website of AI-tool. Pauzeert
// buiten beeld; bij reduced motion staat elke scène direct in eindstand.
export default function LiveBuildDemo({ t }: { t: T }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [scene, setScene] = useState<SceneId>("app");
  const [rawPhase, setPhase] = useState<Phase>(0);
  const [rawTyped, setTyped] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);

  const prompt = t.scenes[scene].prompt;
  const running = !reduce && inView && pageVisible;
  // Reduced motion: altijd de eindstand van de gekozen scène.
  const phase: Phase = reduce ? 3 : rawPhase;
  const typed = reduce ? prompt.length : rawTyped;

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!running) return;
    let id: ReturnType<typeof setTimeout>;
    if (phase === 0) {
      id =
        typed < prompt.length
          ? setTimeout(() => setTyped((n) => n + 1), TYPE_MS)
          : setTimeout(() => setPhase(1), 350);
    } else if (phase < 3) {
      id = setTimeout(() => setPhase((phase + 1) as Phase), PHASE_MS[phase as 1 | 2]);
    } else {
      id = setTimeout(() => {
        const next = ORDER[(ORDER.indexOf(scene) + 1) % ORDER.length];
        setScene(next);
        setPhase(0);
        setTyped(0);
      }, PHASE_MS[3]);
    }
    return () => clearTimeout(id);
  }, [running, phase, typed, prompt.length, scene]);

  const pick = (id: SceneId) => {
    setScene(id);
    setPhase(0);
    setTyped(0);
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label={t.ariaLabel}
      className="relative w-full rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-[0_40px_120px_-40px_rgba(var(--accent-rgb),0.45)] overflow-hidden text-left"
    >
      {/* Top bar met scène-tabs */}
      <div className="flex items-center gap-4 overflow-x-auto border-b border-(--color-border) px-4 py-3">
        <div className="hidden sm:flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex gap-1" role="tablist">
          {ORDER.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={scene === id}
              onClick={() => pick(id)}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors ${
                scene === id
                  ? "bg-[rgba(var(--accent-rgb),0.15)] text-(--color-accent-light)"
                  : "text-(--color-muted-light) hover:text-(--color-foreground)"
              }`}
            >
              {t.scenes[id].tab}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-background) px-3.5 py-2.5">
          <span aria-hidden="true" className="text-(--color-accent-light)">✦</span>
          <span className="flex-1 min-w-0 min-h-[2.5rem] sm:min-h-0 flex items-center text-sm leading-snug text-(--color-foreground)">
            <span>
            {prompt.slice(0, typed)}
            {phase === 0 && !reduce && (
              <span className="ml-0.5 inline-block w-[2px] h-4 -mb-0.5 bg-(--color-accent-light) animate-pulse" />
            )}
            </span>
          </span>
          <span
            className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              phase >= 1
                ? "bg-(--color-accent) text-white"
                : "bg-white/5 text-(--color-muted)"
            }`}
          >
            {t.build}
          </span>
        </div>
      </div>

      {/* Stage */}
      <div className="relative h-[300px] sm:h-[320px] px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {scene === "app" && <AppScene t={t.scenes.app} phase={phase} />}
            {scene === "site" && <SiteScene t={t.scenes.site} phase={phase} />}
            {scene === "ai" && <AiScene t={t.scenes.ai} phase={phase} />}
            {scene === "ab" && <AbScene t={t.scenes.ab} phase={phase} />}
          </motion.div>
        </AnimatePresence>

        {/* Resultaat-badge */}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              key={`${scene}-result`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--warm-rgb),0.4)] bg-[rgba(var(--warm-rgb),0.12)] px-3 py-1.5 text-xs font-semibold text-(--color-warm) backdrop-blur-sm"
            >
              <Check /> {t.scenes[scene].result}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voortgang */}
      <div className="h-[2px] bg-(--color-border)">
        <motion.div
          className="h-full origin-left"
          style={{ background: "var(--brand-gradient)" }}
          animate={{ scaleX: (phase + (phase === 0 ? typed / prompt.length : 0)) / 3 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

/* ---------- gedeelde bouwstenen ---------- */

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6.2l2.3 2.3L9.5 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Wireframe-blok dat overgaat in echte content.
function Block({
  built,
  delay = 0,
  className = "",
  children,
}: {
  built: boolean;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease }}
      className={`relative rounded-lg transition-colors duration-500 ${
        built
          ? "bg-white/[0.04] border border-white/[0.06]"
          : "border border-dashed border-white/15"
      } ${className}`}
    >
      <motion.div
        animate={{ opacity: built ? 1 : 0 }}
        transition={{ duration: 0.35, delay: built ? delay : 0 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- App ---------- */

function AppScene({ t, phase }: { t: T["scenes"]["app"]; phase: Phase }) {
  const built = phase >= 2;
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-full w-[200px] rounded-[30px] border border-white/10 bg-(--color-background) p-3 pt-6 shadow-2xl">
        <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/10" />
        {(
          <div className="flex flex-col gap-2">
            <Block built={built} className="h-8 px-2 flex items-center">
              <span className="text-xs font-semibold">{t.today}</span>
            </Block>
            {t.classes.map((c, i) => {
              const booked = phase === 3 && i === 0;
              return (
                <Block key={c.name} built={built} delay={0.12 * (i + 1)} className="h-[52px] px-2.5">
                  <div className="flex h-full items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold">{c.name}</div>
                      <div className="text-[10px] text-(--color-muted-light)">
                        {c.time} · {c.spots}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors duration-300 ${
                        booked ? "bg-emerald-500/20 text-emerald-300" : "bg-(--color-accent) text-white"
                      }`}
                    >
                      {booked && <Check />}
                      {booked ? t.booked : t.book}
                    </span>
                  </div>
                </Block>
              );
            })}
          </div>
        )}
        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease }}
              className="absolute left-2 right-2 top-7 rounded-xl border border-white/10 bg-(--color-surface-hover)/95 px-2.5 py-2 text-[10px] shadow-xl backdrop-blur"
            >
              <span className="font-semibold">Spinning · 07:00</span>
              <div className="text-(--color-muted-light)">{t.toast}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Website ---------- */

function SiteScene({ t, phase }: { t: T["scenes"]["site"]; phase: Phase }) {
  const built = phase >= 2;
  return (
    <div className="h-full rounded-xl border border-white/10 bg-(--color-background) overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="flex-1 rounded bg-white/[0.04] px-2 py-0.5 text-[10px] text-(--color-muted)">
          jansen-co.nl
        </span>
      </div>
      {(
        <div className="flex flex-col gap-2.5 p-3">
          <Block built={built} className="h-7 px-2.5">
            <div className="flex h-full items-center justify-between text-[10px]">
              <span className="font-bold">{t.brand}</span>
              <span className="hidden sm:flex gap-3 text-(--color-muted-light)">
                {t.nav.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </div>
          </Block>
          <Block built={built} delay={0.12} className="h-[104px] px-4">
            <div className="flex h-full flex-col justify-center gap-2">
              <div className="text-base sm:text-lg font-bold leading-tight">{t.headline}</div>
              <span className="w-fit rounded-full bg-(--color-warm) px-2.5 py-1 text-[10px] font-semibold text-black">
                {t.cta}
              </span>
            </div>
          </Block>
          <div className="grid grid-cols-3 gap-2">
            {t.cards.map((c, i) => (
              <Block key={c} built={built} delay={0.24 + i * 0.08} className="h-14 p-2">
                <span className="block h-3 w-3 rounded bg-(--color-accent)/70" />
                <span className="mt-1.5 block text-[10px] font-semibold">{c}</span>
              </Block>
            ))}
          </div>
        </div>
      )}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="absolute left-7 bottom-6 flex items-center gap-2 rounded-xl border border-white/10 bg-(--color-surface-hover)/95 px-2.5 py-1.5 backdrop-blur"
          >
            <ScoreRing value={98} />
            <span className="text-[10px] text-(--color-muted-light)">{t.speed}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 11;
  const c = 2 * Math.PI * r;
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
      <motion.circle
        cx="15"
        cy="15"
        r={r}
        stroke="#34d399"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value / 100) }}
        transition={{ duration: 0.9, ease }}
        transform="rotate(-90 15 15)"
      />
      <text x="15" y="18.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#34d399">
        {value}
      </text>
    </svg>
  );
}

/* ---------- AI tool ---------- */

function AiScene({ t, phase }: { t: T["scenes"]["ai"]; phase: Phase }) {
  const built = phase >= 2;
  return (
    <div className="grid h-full grid-cols-[0.85fr_1fr] gap-3">
      {/* Factuur met scanlijn */}
      <div className="relative overflow-hidden rounded-xl bg-[#f4f1ea] p-3 text-black">
        <div className="text-[11px] font-bold">{t.invoice} #2026-1184</div>
        <div className="mt-3 flex flex-col gap-1.5">
          {[70, 55, 85, 40, 65, 50, 75].map((w, i) => (
            <span key={i} className="h-1.5 rounded bg-black/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between border-t border-black/10 pt-2 text-[10px] font-bold">
          <span>Total</span>
          <span>{t.fields[3].value}</span>
        </div>
        {phase === 1 && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.9, ease: "linear" }}
            className="absolute left-0 right-0 h-8 -mt-8 bg-gradient-to-b from-transparent to-[rgba(var(--accent-rgb),0.35)]"
          />
        )}
      </div>

      {/* Geëxtraheerde velden */}
      <div className="flex flex-col gap-2">
        {t.fields.map((f, i) => (
            <Block key={f.label} built={built} delay={0.15 * i} className="px-2.5 py-1.5">
              <div className="text-[9px] uppercase tracking-wider text-(--color-muted)">{f.label}</div>
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="truncate">{f.value}</span>
                {phase === 3 && <span className="text-emerald-300"><Check /></span>}
              </div>
            </Block>
          ))}
        {phase === 3 && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-1 w-fit rounded-lg bg-(--color-accent) px-2.5 py-1 text-[10px] font-semibold text-white"
          >
            {t.export} →
          </motion.span>
        )}
      </div>
    </div>
  );
}

/* ---------- A/B-test (site patcher) ---------- */

function AbScene({ t, phase }: { t: T["scenes"]["ab"]; phase: Phase }) {
  const built = phase >= 2;
  const arms = [
    { key: "A", label: t.control, button: t.buttonA, conv: t.convA, bar: 0.62, win: false },
    { key: "B", label: t.variant, button: t.buttonB, conv: t.convB, bar: 0.78, win: true },
  ];
  return (
    <div className="grid h-full grid-cols-2 gap-3 pb-10">
      {arms.map((a, i) => (
        <Block key={a.key} built={built} delay={0.12 * i} className="p-2.5 sm:p-3">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-semibold">
                {a.key} · {a.label}
              </span>
              <span className="text-(--color-muted)">50%</span>
            </div>
            <div className="mt-2 h-8 sm:h-12 rounded-md bg-gradient-to-br from-white/10 to-white/[0.02]" />
            <div className="mt-2 text-[11px] font-semibold">{t.product}</div>
            <div className="text-[10px] text-(--color-muted-light)">€ 89</div>
            <span
              className={`mt-2 rounded-md px-2 py-1 text-center text-[10px] font-semibold leading-tight ${
                a.win ? "bg-(--color-warm) text-black" : "bg-white/10"
              }`}
            >
              {a.button}
            </span>
            <div className="mt-auto pt-2">
              <div className="flex justify-between text-[9px] uppercase tracking-wider text-(--color-muted)">
                <span>{t.conversion}</span>
                <span className="text-(--color-foreground)">{built ? a.conv : "–"}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${a.win ? "bg-emerald-400" : "bg-white/30"}`}
                  initial={{ width: 0 }}
                  animate={{ width: built ? `${a.bar * 100}%` : 0 }}
                  transition={{ duration: 1.1, ease }}
                />
              </div>
              <div className="h-4 mt-1.5">
                {phase === 3 && a.win && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300"
                  >
                    <Check /> {t.winner}
                  </motion.span>
                )}
              </div>
            </div>
          </div>
        </Block>
      ))}
    </div>
  );
}
