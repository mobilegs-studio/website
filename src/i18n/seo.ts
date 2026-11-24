import type { Metadata } from "next";

// Titel en beschrijving per pagina en taal. De homepage krijgt de volledige
// titel; andere pagina's lopen via het template "%s — Mobile Growth Studio".
type PageKey = "home" | "diensten" | "portfolio" | "faq" | "over" | "contact";
type Entry = { title: string; description: string };

const SEO: Record<"nl" | "en" | "de", Record<PageKey, Entry>> = {
  nl: {
    home: {
      title: "Mobile Growth Studio — Apps, websites en AI-tools voor het MKB",
      description:
        "We bouwen webapps, native apps, AI-tools, dashboards en websites voor MKB-ers en ZZP-ers. Vaste prijs, geen jargon. Plan een gratis call van 30 minuten.",
    },
    diensten: { title: "Diensten", description: "AI-tooling, dashboards, websites, webapps en native apps. Bekijk wat we bouwen en voor wie." },
    portfolio: { title: "Portfolio", description: "Projecten en interactieve demo's: probeer zelf wat we kunnen bouwen." },
    faq: { title: "Veelgestelde vragen", description: "Antwoorden over prijs, planning, werkwijze en onderhoud." },
    over: { title: "Over", description: "Mobile Growth Studio is het label van Hendrik Polinder, gevestigd in Hilversum." },
    contact: { title: "Contact", description: "Stuur een bericht, app ons of plan direct een gratis call van 30 minuten." },
  },
  en: {
    home: {
      title: "Mobile Growth Studio — Apps, websites and AI tools for small businesses",
      description:
        "We build web apps, native apps, AI tools, dashboards and websites for small businesses and freelancers. Fixed price, no jargon. Book a free 30-minute call.",
    },
    diensten: { title: "Services", description: "AI tooling, dashboards, websites, web apps and native apps. See what we build and who it's for." },
    portfolio: { title: "Portfolio", description: "Projects and interactive demos: try what we can build yourself." },
    faq: { title: "FAQ", description: "Answers about pricing, timelines, how we work and maintenance." },
    over: { title: "About", description: "Mobile Growth Studio is the label of Hendrik Polinder, based in Hilversum, the Netherlands." },
    contact: { title: "Contact", description: "Send a message, WhatsApp us or book a free 30-minute call right away." },
  },
  de: {
    home: {
      title: "Mobile Growth Studio — Apps, Websites und KI-Tools für KMU",
      description:
        "Wir entwickeln Web-Apps, native Apps, KI-Tools, Dashboards und Websites für KMU und Selbstständige. Festpreis, kein Fachjargon. Buchen Sie ein kostenloses 30-Minuten-Gespräch.",
    },
    diensten: { title: "Leistungen", description: "KI-Tools, Dashboards, Websites, Web-Apps und native Apps. Sehen Sie, was wir bauen und für wen." },
    portfolio: { title: "Portfolio", description: "Projekte und interaktive Demos: Probieren Sie selbst aus, was wir bauen können." },
    faq: { title: "Häufige Fragen", description: "Antworten zu Preis, Zeitplan, Arbeitsweise und Wartung." },
    over: { title: "Über uns", description: "Mobile Growth Studio ist das Label von Hendrik Polinder mit Sitz in Hilversum, Niederlande." },
    contact: { title: "Kontakt", description: "Schreiben Sie uns, per WhatsApp oder buchen Sie direkt ein kostenloses 30-Minuten-Gespräch." },
  },
};

const BASE = "https://www.mobilegrowthstudio.com";
const OG_LOCALE = { nl: "nl_NL", en: "en_US", de: "de_DE" } as const;

export function pageMetadata(locale: string, key: PageKey): Metadata {
  const loc = (locale in SEO ? locale : "nl") as keyof typeof SEO;
  const e = SEO[loc][key];
  const path = key === "home" ? "" : `/${key}`;
  const fullTitle = key === "home" ? e.title : `${e.title} — Mobile Growth Studio`;
  return {
    title: key === "home" ? { absolute: e.title, template: "%s — Mobile Growth Studio" } : e.title,
    description: e.description,
    alternates: {
      canonical: `${BASE}/${loc}${path}`,
      languages: { nl: `${BASE}/nl${path}`, en: `${BASE}/en${path}`, de: `${BASE}/de${path}` },
    },
    openGraph: { title: fullTitle, description: e.description, url: `${BASE}/${loc}${path}`, locale: OG_LOCALE[loc] },
    twitter: { title: fullTitle, description: e.description },
  };
}
