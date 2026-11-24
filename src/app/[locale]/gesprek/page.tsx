import type { Metadata } from "next";
import { getTranslations } from "@/i18n/translations";
import ContactForm from "../contact/contact-form";

// Plan een gratis call van 30 minuten. De agenda is een Cal.com-embed
// (synct met Hendriks agenda, blokkeert bezette tijden, stuurt uitnodigingen).
// Stel de link in met NEXT_PUBLIC_CAL_LINK, bijv. "mobilegrowthstudio/30min".
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

const COPY = {
  nl: {
    title: "Plan een gratis call",
    label: "Gratis kennismaking",
    heading: "Plan een call van 30 minuten.",
    sub: "We bespreken je idee, je doelen en wat het ongeveer kost. Geen verplichtingen.",
    points: ["30 minuten, via video", "Kies zelf een moment", "Je krijgt meteen een uitnodiging"],
    missing: "Laat je gegevens achter. We sturen je binnen één werkdag een paar momenten om uit te kiezen.",
  },
  en: {
    title: "Book a free call",
    label: "Free intro call",
    heading: "Book a 30-minute call.",
    sub: "We talk through your idea, your goals and a rough cost. No strings attached.",
    points: ["30 minutes, on video", "Pick a time that suits you", "You get an invite right away"],
    missing: "Leave your details. Within one working day we send you a few times to choose from.",
  },
  de: {
    title: "Kostenloses Gespräch buchen",
    label: "Kostenloses Kennenlernen",
    heading: "Buchen Sie ein 30-Minuten-Gespräch.",
    sub: "Wir besprechen Ihre Idee, Ihre Ziele und die ungefähren Kosten. Unverbindlich.",
    points: ["30 Minuten, per Video", "Termin selbst wählen", "Sie erhalten sofort eine Einladung"],
    missing: "Hinterlassen Sie Ihre Daten. Innerhalb eines Werktags senden wir Ihnen einige Termine zur Auswahl.",
  },
};

const pick = (locale: string) => COPY[locale as keyof typeof COPY] ?? COPY.nl;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = pick(locale);
  return { title: c.title, description: c.sub };
}

export default async function BookCall({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = pick(locale);
  const t = getTranslations(locale);
  const src = CAL_LINK
    ? `https://cal.com/${CAL_LINK}?embed=true&theme=dark&layout=month_view&locale=${locale === "en" ? "en" : locale === "de" ? "de" : "nl"}`
    : null;

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">{c.label}</p>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight max-w-2xl">{c.heading}</h1>
      <p className="mt-6 text-lg text-(--color-muted) max-w-xl leading-relaxed">{c.sub}</p>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {c.points.map((p) => (
          <span key={p} className="inline-flex items-center gap-2 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
            {p}
          </span>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface)">
        {src ? (
          <iframe
            src={src}
            title={c.title}
            loading="lazy"
            className="block h-[760px] w-full sm:h-[700px]"
          />
        ) : (
          <div className="flex flex-col gap-6 p-6 sm:p-10">
            <p className="text-(--color-muted-light) max-w-lg">{c.missing}</p>
            <div className="max-w-xl">
              <ContactForm t={t.contact} differentiator={t.home.differentiator} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
