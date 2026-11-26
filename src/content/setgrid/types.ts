export const SETGRID_LANGS = ["en", "nl", "de", "fr", "es", "pt"] as const;
export type SetgridLang = (typeof SETGRID_LANGS)[number];

export const SETGRID_LANG_NAMES: Record<SetgridLang, string> = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
};

/** Screenshot files in public/setgrid/shots/<lang>/, in page order. */
export const SETGRID_SHOTS = [
  "1-workout",
  "2-progress",
  "3-coach",
  "4-calendar",
  "5-food",
  "6-shopping",
  "7-swap",
] as const;

export type SetgridContent = {
  meta: { title: string; description: string };
  nav: { features: string; faq: string; support: string; terms: string };
  hero: {
    badge: string;
    headline: string;
    sub: string;
    note: string;
    ctaSupport: string;
    ctaFeatures: string;
  };
  featuresTitle: string;
  /** One per screenshot, same order as SETGRID_SHOTS. */
  features: { title: string; text: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  support: {
    title: string;
    intro: string;
    name: string;
    email: string;
    topic: string;
    topics: string[];
    message: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
    required: string;
    privacy: string;
  };
  terms: {
    title: string;
    updated: string;
    intro: string;
    sections: { h: string; p: string }[];
  };
  footer: { madeBy: string; back: string; privacy: string };
};
