"use client";

// ShowcaseSection — homepage-sectie met drie interactieve demo-dashboards
// in een futuristisch browserframe. Dashboards worden lazy geladen
// (ssr:false) omdat ze client-side interactie en animatie bevatten.

import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/* ---------- Skeleton (laadplaceholder met shimmer) ---------- */

function ShowcaseSkeleton() {
  return (
    <div
      className="relative min-h-[480px] overflow-hidden p-6 sm:p-8"
      aria-hidden="true"
    >
      {/* Keyframes lokaal, zodat we globals.css niet hoeven aan te raken */}
      <style>{`
        @keyframes showcase-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .showcase-shimmer-bar { animation: none !important; }
        }
      `}</style>

      <div className="animate-pulse space-y-5">
        {/* nep-KPI-rij */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl border border-(--color-border) bg-(--color-surface-hover)"
            />
          ))}
        </div>
        {/* nep-grafiek */}
        <div className="h-56 rounded-xl border border-(--color-border) bg-(--color-surface-hover)" />
        {/* nep-tabelrijen */}
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-9 rounded-lg border border-(--color-border) bg-(--color-surface-hover)"
            />
          ))}
        </div>
      </div>

      {/* Shimmer-overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="showcase-shimmer-bar absolute inset-y-0 -left-full w-full"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(91,95,232,0.07) 50%, transparent 70%)",
            animation: "showcase-shimmer 1.8s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

/* ---------- Lazy dashboards (parallel gebouwd door teamgenoten) ---------- */

const GrowthCockpit = dynamic(
  () => import("@/components/showcases/growth-cockpit"),
  { ssr: false, loading: () => <ShowcaseSkeleton /> }
);
const AppInsights = dynamic(
  () => import("@/components/showcases/app-insights"),
  { ssr: false, loading: () => <ShowcaseSkeleton /> }
);
const SocialPulse = dynamic(
  () => import("@/components/showcases/social-pulse"),
  { ssr: false, loading: () => <ShowcaseSkeleton /> }
);
const DocExtractor = dynamic(
  () => import("@/components/showcases/doc-extractor"),
  { ssr: false, loading: () => <ShowcaseSkeleton /> }
);
const FieldApp = dynamic(
  () => import("@/components/showcases/field-app"),
  { ssr: false, loading: () => <ShowcaseSkeleton /> }
);
const RedesignSlider = dynamic(
  () => import("@/components/showcases/redesign-slider"),
  { ssr: false, loading: () => <ShowcaseSkeleton /> }
);

/* ---------- Copy (nl primair, en/de vertaald) ---------- */

type TabId = "ai" | "mobile" | "web" | "dash";
type DashId = "cockpit" | "app" | "social";

type TabCopy = {
  id: TabId;
  name: string;
  description: string;
  url: string;
  chips: string[];
};

type DashCopy = {
  id: DashId;
  name: string;
  description: string;
  url: string;
  chips: string[];
};

type Copy = {
  label: string;
  heading: string;
  intro: string;
  disclaimer: string;
  cta: string;
  tablistLabel: string;
  dashLabel: string;
  tabs: TabCopy[];
  dashboards: DashCopy[];
};

const COPY: Record<"nl" | "en" | "de", Copy> = {
  nl: {
    label: "Showcases",
    heading: "Wat we bouwen. Probeer het zelf.",
    intro:
      "Interactieve demo's van een AI-tool, een app, een website en dashboards. Gebaseerd op echt werk, volledig geanonimiseerd en gevuld met fictieve data.",
    disclaimer: "Interactieve demo · fictieve data · geanonimiseerd",
    cta: "Zoiets laten bouwen?",
    tablistLabel: "Kies een demo",
    dashLabel: "Kies een dashboard",
    tabs: [
      {
        id: "ai",
        name: "AI-tools",
        description: "AI die facturen, bonnen en offertes uitleest en twijfelgevallen aan je voorlegt.",
        url: "documenten.demo.mobilegrowthstudio.com",
        chips: ["Facturen & bonnen", "Controle per veld", "Export naar boekhouding"],
      },
      {
        id: "mobile",
        name: "Apps",
        description: "Een buitendienst-app: opdrachten, checklist, foto's en handtekening, ook offline.",
        url: "buitendienst.demo.mobilegrowthstudio.com",
        chips: ["iOS & Android", "Werkt offline", "Foto + handtekening"],
      },
      {
        id: "web",
        name: "Websites",
        description: "Van verouderde site naar een snelle site die gevonden wordt op Google en in AI-zoek.",
        url: "bakkerij-vandam.demo.mobilegrowthstudio.com",
        chips: ["Snelheid 98/100", "SEO & AI-zoek", "Mobiel eerst"],
      },
      {
        id: "dash",
        name: "Dashboards",
        description: "Marketing-, app- en social-dashboards, gebaseerd op werk voor grote organisaties.",
        url: "",
        chips: [],
      },
    ],
    dashboards: [
      {
        id: "cockpit",
        name: "Marketing cockpit",
        description:
          "Eén commandocentrum voor al je marketingkanalen, met AI-inzichten en automatische budgetbewaking.",
        url: "cockpit.demo.mobilegrowthstudio.com",
        chips: ["Realtime data", "AI-aanbevelingen", "Multi-kanaal"],
      },
      {
        id: "app",
        name: "App-groei dashboard",
        description:
          "Alle productcijfers van een mobiele app op één scherm: downloads, conversie, retentie en reviews.",
        url: "app-insights.demo.mobilegrowthstudio.com",
        chips: ["Funnel-analyse", "Retentie-cohorten", "Review-monitoring"],
      },
      {
        id: "social",
        name: "Social dashboard",
        description:
          "Organische social performance over alle platformen, inclusief de beste momenten om te posten.",
        url: "social.demo.mobilegrowthstudio.com",
        chips: ["Alle platformen", "Beste posttijden", "Engagement-trends"],
      },
    ],
  },
  en: {
    label: "Showcases",
    heading: "What we build. Try it yourself.",
    intro:
      "Interactive demos of an AI tool, an app, a website and dashboards. Based on real work, fully anonymized and filled with fictional data.",
    disclaimer: "Interactive demo · fictional data · anonymised",
    cta: "Want something like this?",
    tablistLabel: "Choose a demo",
    dashLabel: "Choose a dashboard",
    tabs: [
      {
        id: "ai",
        name: "AI tools",
        description: "AI that reads invoices, receipts and quotes and flags what it isn't sure about.",
        url: "documents.demo.mobilegrowthstudio.com",
        chips: ["Invoices & receipts", "Check per field", "Export to accounting"],
      },
      {
        id: "mobile",
        name: "Apps",
        description: "A field-service app: jobs, checklist, photos and signature, also offline.",
        url: "field.demo.mobilegrowthstudio.com",
        chips: ["iOS & Android", "Works offline", "Photo + signature"],
      },
      {
        id: "web",
        name: "Websites",
        description: "From a dated site to a fast one that gets found on Google and in AI search.",
        url: "vandam-bakery.demo.mobilegrowthstudio.com",
        chips: ["Speed 98/100", "SEO & AI search", "Mobile first"],
      },
      {
        id: "dash",
        name: "Dashboards",
        description: "Marketing, app and social dashboards, based on work for large organizations.",
        url: "",
        chips: [],
      },
    ],
    dashboards: [
      {
        id: "cockpit",
        name: "Marketing cockpit",
        description:
          "One command centre for all your marketing channels, with AI insights and automatic budget monitoring.",
        url: "cockpit.demo.mobilegrowthstudio.com",
        chips: ["Real-time data", "AI recommendations", "Multi-channel"],
      },
      {
        id: "app",
        name: "App growth dashboard",
        description:
          "All product metrics of a mobile app on one screen: downloads, conversion, retention and reviews.",
        url: "app-insights.demo.mobilegrowthstudio.com",
        chips: ["Funnel analysis", "Retention cohorts", "Review monitoring"],
      },
      {
        id: "social",
        name: "Social dashboard",
        description:
          "Organic social performance across all platforms, including the best times to post.",
        url: "social.demo.mobilegrowthstudio.com",
        chips: ["All platforms", "Best times to post", "Engagement trends"],
      },
    ],
  },
  de: {
    label: "Showcases",
    heading: "Was wir bauen. Probieren Sie es selbst.",
    intro:
      "Interaktive Demos eines KI-Tools, einer App, einer Website und von Dashboards. Basierend auf echter Arbeit, vollständig anonymisiert und mit fiktiven Daten gefüllt.",
    disclaimer: "Interaktive Demo · fiktive Daten · anonymisiert",
    cta: "So etwas bauen lassen?",
    tablistLabel: "Demo wählen",
    dashLabel: "Dashboard wählen",
    tabs: [
      {
        id: "ai",
        name: "KI-Tools",
        description: "KI, die Rechnungen, Belege und Angebote ausliest und Unsicheres zur Prüfung vorlegt.",
        url: "dokumente.demo.mobilegrowthstudio.com",
        chips: ["Rechnungen & Belege", "Prüfung pro Feld", "Export an Buchhaltung"],
      },
      {
        id: "mobile",
        name: "Apps",
        description: "Eine Außendienst-App: Aufträge, Checkliste, Fotos und Unterschrift, auch offline.",
        url: "aussendienst.demo.mobilegrowthstudio.com",
        chips: ["iOS & Android", "Funktioniert offline", "Foto + Unterschrift"],
      },
      {
        id: "web",
        name: "Websites",
        description: "Von der veralteten Seite zur schnellen Website, die bei Google und in der KI-Suche gefunden wird.",
        url: "baeckerei-vandam.demo.mobilegrowthstudio.com",
        chips: ["Speed 98/100", "SEO & KI-Suche", "Mobile first"],
      },
      {
        id: "dash",
        name: "Dashboards",
        description: "Marketing-, App- und Social-Dashboards, basierend auf Arbeit für große Organisationen.",
        url: "",
        chips: [],
      },
    ],
    dashboards: [
      {
        id: "cockpit",
        name: "Marketing-Cockpit",
        description:
          "Eine Kommandozentrale für alle deine Marketingkanäle, mit KI-Insights und automatischer Budgetüberwachung.",
        url: "cockpit.demo.mobilegrowthstudio.com",
        chips: ["Echtzeitdaten", "KI-Empfehlungen", "Multi-Kanal"],
      },
      {
        id: "app",
        name: "App-Wachstums-Dashboard",
        description:
          "Alle Produktkennzahlen einer mobilen App auf einem Bildschirm: Downloads, Conversion, Retention und Reviews.",
        url: "app-insights.demo.mobilegrowthstudio.com",
        chips: ["Funnel-Analyse", "Retention-Kohorten", "Review-Monitoring"],
      },
      {
        id: "social",
        name: "Social-Dashboard",
        description:
          "Organische Social-Performance über alle Plattformen, inklusive der besten Zeitpunkte zum Posten.",
        url: "social.demo.mobilegrowthstudio.com",
        chips: ["Alle Plattformen", "Beste Postzeiten", "Engagement-Trends"],
      },
    ],
  },
};

const TAB_ORDER: TabId[] = ["ai", "mobile", "web", "dash"];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Component ---------- */

export default function ShowcaseSection({ locale }: { locale: string }) {
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.nl;
  const [activeTab, setActiveTab] = useState<TabId>("ai");
  const [activeDash, setActiveDash] = useState<DashId>("cockpit");
  const prefersReducedMotion = useReducedMotion();

  const category = copy.tabs.find((t) => t.id === activeTab) ?? copy.tabs[0];
  const dash = copy.dashboards.find((d) => d.id === activeDash) ?? copy.dashboards[0];
  // Bij Dashboards komen URL en chips van het gekozen dashboard.
  const active =
    activeTab === "dash"
      ? { ...category, url: dash.url, chips: dash.chips }
      : category;
  const panelKey = activeTab === "dash" ? `dash-${activeDash}` : activeTab;

  /* --- 3D-tilt: max 1.5 graden, via springs; uit op touch/reduced-motion --- */
  const frameRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 20 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // Alleen bij muis, niet op touch en niet bij verminderde beweging
    if (prefersReducedMotion || e.pointerType !== "mouse") return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 3); // max 1.5deg per kant
    rotateXRaw.set(py * -3);
  }

  function resetTilt() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  /* --- Toetsenbordnavigatie op de tablijst (pijltjestoetsen) --- */
  function handleTabKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next =
      TAB_ORDER[(currentIndex + delta + TAB_ORDER.length) % TAB_ORDER.length];
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="relative max-w-7xl mx-auto px-6 pb-24 w-full">
      {/* Subtiel dotted-grid patroon achter de hele sectie */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(91,95,232,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent)",
        }}
      />

      {/* Sectiekop in huisstijl: label + lijn, dan H2 + intro */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center gap-4 mb-10"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-(--color-muted)">
          {copy.label}
        </span>
        <span className="flex-1 h-px bg-(--color-border)" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl">
          {copy.heading}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-(--color-muted-light) leading-relaxed max-w-3xl">
          {copy.intro}
        </p>
      </motion.div>

      {/* Tabbalk: 3 gesegmenteerde knoppen met layoutId-pil */}
      <div
        role="tablist"
        aria-label={copy.tablistLabel}
        onKeyDown={handleTabKeyDown}
        className="relative mb-8 grid grid-cols-2 lg:grid-cols-4 gap-2 rounded-2xl border border-(--color-border) bg-(--color-surface) p-2"
      >
        {copy.tabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`showcase-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`showcase-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-xl px-4 py-3 text-left transition-colors ${
                selected
                  ? "text-(--color-foreground)"
                  : "text-(--color-muted-light) hover:text-(--color-foreground) hover:bg-(--color-surface-hover)"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="showcase-active-tab"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.35, ease: EASE }
                  }
                  className="absolute inset-0 rounded-xl bg-[rgba(91,95,232,0.12)] border border-[rgba(91,95,232,0.3)]"
                  aria-hidden="true"
                />
              )}
              <span className="relative flex items-center gap-2 text-sm font-semibold">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    selected ? "bg-(--color-accent)" : "bg-(--color-border)"
                  }`}
                  aria-hidden="true"
                />
                {tab.name}
              </span>
              <span className="relative mt-1 hidden lg:block text-xs text-(--color-muted) leading-snug">
                {tab.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ambient glow + browserframe */}
      <div className="relative">
        {/* Zachte indigo gloed achter het frame */}
        {/* inset-x-0 i.p.v. -inset-x-8: de gloed is toch geblurd en gecentreerd,
            en 32px extra breedte gaf horizontale scroll op mobiel. */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 -z-10"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "rgba(91,95,232,0.14)" }}
          />
        </div>

        <motion.div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformPerspective: 1200,
          }}
          className="relative rounded-3xl p-px bg-[linear-gradient(135deg,rgba(91,95,232,0.5),rgba(29,27,41,0.8)_40%,rgba(224,185,120,0.35))] will-change-transform"
        >
          <div className="rounded-[calc(1.5rem-1px)] bg-(--color-surface) overflow-hidden">
            {/* Browserbalk: stoplichtjes, adresbalk, disclaimer-chip */}
            <div className="flex items-center gap-3 border-b border-(--color-border) px-4 py-3 sm:px-5">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2a2836]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#252233]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#211e2e]" />
              </div>

              {/* Adresbalk met slotje en fictieve URL */}
              <div className="flex-1 flex justify-center min-w-0">
                <div className="flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-background) px-3.5 py-1.5 max-w-full">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="shrink-0 text-(--color-accent-light)"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="5"
                      width="8"
                      height="6"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <path
                      d="M4 5V3.5a2 2 0 0 1 4 0V5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={active.url}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 4 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -4 }
                      }
                      transition={{ duration: 0.2, ease: EASE }}
                      className="truncate font-mono text-[11px] text-(--color-muted-light)"
                    >
                      {active.url}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Disclaimer-chip rechts */}
              <span className="hidden md:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(224,185,120,0.3)] bg-[rgba(224,185,120,0.08)] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-(--color-warm)">
                <span
                  className="w-1 h-1 rounded-full bg-(--color-warm)"
                  aria-hidden="true"
                />
                {copy.disclaimer}
              </span>
            </div>

            {/* Actief dashboard met fade+y wissel */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={`showcase-panel-${activeTab}`}
                aria-labelledby={`showcase-tab-${activeTab}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.25, ease: EASE }}
              >
                {activeTab === "ai" && <DocExtractor locale={locale} />}
                {activeTab === "mobile" && <FieldApp locale={locale} />}
                {activeTab === "web" && <RedesignSlider locale={locale} />}
                {activeTab === "dash" && (
                  <>
                    <div
                      role="group"
                      aria-label={copy.dashLabel}
                      className="flex flex-wrap gap-2 border-b border-(--color-border) px-4 py-3 sm:px-5"
                    >
                      {copy.dashboards.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          aria-pressed={d.id === activeDash}
                          onClick={() => setActiveDash(d.id)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                            d.id === activeDash
                              ? "bg-[rgba(91,95,232,0.15)] text-(--color-accent-light) border border-[rgba(91,95,232,0.35)]"
                              : "border border-(--color-border) text-(--color-muted-light) hover:text-(--color-foreground)"
                          }`}
                        >
                          {d.name}
                        </button>
                      ))}
                    </div>
                    {activeDash === "cockpit" && <GrowthCockpit locale={locale} />}
                    {activeDash === "app" && <AppInsights locale={locale} />}
                    {activeDash === "social" && <SocialPulse locale={locale} />}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Disclaimer ook onder het frame op mobiel (chip is daar verborgen) */}
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.15em] text-(--color-muted) md:hidden">
          {copy.disclaimer}
        </p>
      </div>

      {/* Feature-chips van de actieve tab + CTA */}
      <div className="relative mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={panelKey}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex flex-wrap items-center gap-2"
          >
            {active.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-3.5 py-1.5 text-xs text-(--color-muted-light)"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-(--color-accent)"
                  aria-hidden="true"
                />
                {chip}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <Link
          href={`/${locale}/contact`}
          className="inline-flex shrink-0 items-center gap-2 bg-(--color-accent) text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
        >
          {copy.cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 7h8M7 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
