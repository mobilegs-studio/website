import type { Metadata } from "next";
import Link from "next/link";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op de meest gestelde vragen over webapps, native apps, AI tooling, dashboards en websites bouwen door Mobile Growth Studio.",
  alternates: {
    canonical: "https://www.mobilegrowthstudio.com/faq",
  },
  openGraph: {
    title: "Veelgestelde vragen — Mobile Growth Studio",
    description:
      "Antwoorden op de meest gestelde vragen over het bouwen van webapps, apps, AI tooling en websites voor MKB en ZZP.",
    url: "https://www.mobilegrowthstudio.com/faq",
    type: "website",
  },
};

export const faqs = [
  {
    question: "Wat doet Mobile Growth Studio?",
    answer:
      "Mobile Growth Studio bouwt digitale producten voor Nederlandse MKB-ers en ZZP-ers: webapplicaties, native iOS- en Android-apps, AI-tools, dashboards en websites. We nemen het technische gedeelte volledig uit handen zodat jij je kunt focussen op je bedrijf.",
  },
  {
    question: "Voor wie is Mobile Growth Studio bedoeld?",
    answer:
      "Onze klanten zijn Nederlandse MKB-bedrijven en ZZP-ers die een digitale oplossing nodig hebben maar geen eigen developers in dienst hebben. We werken voor bedrijven uit alle sectoren — van sportscholen en coachingspraktijken tot webwinkels en dienstverleners.",
  },
  {
    question: "Wat kost het om een webapp te laten bouwen?",
    answer:
      "De kosten van een webapp hangen af van de complexiteit en het aantal functies. Eenvoudige webapplicaties starten rond de €3.000–€6.000. Complexere SaaS-producten of klantportalen kosten meer. We werken op basis van een vaste projectprijs na een gratis kennismakingsgesprek.",
  },
  {
    question: "Wat is het verschil tussen een webapp en een native app?",
    answer:
      "Een webapp draait in de browser en is toegankelijk via een URL — geen download nodig. Een native app wordt geïnstalleerd via de App Store of Google Play en maakt direct gebruik van telefoonhardware zoals camera, notificaties en GPS. Native apps bieden doorgaans een vloeiendere gebruikerservaring, maar zijn duurder om te ontwikkelen.",
  },
  {
    question: "Hoe lang duurt het om een app of website te laten bouwen?",
    answer:
      "Een eenvoudige website of landingspagina is er binnen 1–2 weken. Een webapp of native app duurt gemiddeld 4–10 weken afhankelijk van de scope. Na het eerste gesprek krijg je altijd een concrete planning.",
  },
  {
    question: "Werken jullie met vaste prijzen of op uurbasis?",
    answer:
      "We werken bij voorkeur met een vaste projectprijs. Zo weet jij vooraf precies wat je betaalt en zijn er geen verrassingen achteraf. Voor doorlopend onderhoud of uitbreidingen werken we soms op retainer-basis.",
  },
  {
    question: "Wat is AI tooling en hoe kan het mijn bedrijf helpen?",
    answer:
      "AI tooling zijn op maat gemaakte softwaretools die gebruik maken van kunstmatige intelligentie om repetitieve taken te automatiseren. Denk aan automatische documentverwerking, slimme klantcommunicatie of datanalyse. We koppelen bestaande AI-modellen (zoals GPT of Claude) aan jouw specifieke bedrijfsprocessen.",
  },
  {
    question: "Kunnen jullie mijn bestaande systemen of software koppelen?",
    answer:
      "Ja. We bouwen regelmatig API-integraties met bestaande software zoals boekhoudsystemen, CRM-pakketten, webshops of externe databases. Vertel ons welke systemen je gebruikt en we kijken wat mogelijk is.",
  },
  {
    question: "Wat is dashboarding en waarom heb ik het nodig?",
    answer:
      "Een dashboard visualiseert jouw bedrijfsdata op één centrale plek — denk aan omzetcijfers, websitetraffic, klantendata of voorraadstatus. In plaats van losse Excel-bestanden of meerdere tools heb je alles realtime en overzichtelijk bij de hand. Wij bouwen dashboards op maat, gekoppeld aan jouw databronnen.",
  },
  {
    question: "Hoe werkt het proces bij Mobile Growth Studio?",
    answer:
      "We starten altijd met een gratis kennismakingsgesprek om jouw wensen en doelen te begrijpen. Daarna sturen we een heldere offerte. Bij akkoord starten we met de bouw, waarbij je regelmatig updates ontvangt. Na oplevering zorgen we voor een soepele overdracht en bieden we optioneel onderhoud aan.",
  },
  {
    question: "Waar is Mobile Growth Studio gevestigd?",
    answer:
      "Mobile Growth Studio is gevestigd in Hilversum, Nederland. We werken met klanten door heel Nederland, zowel op afstand als op locatie.",
  },
  {
    question: "Kan ik mijn website of app na oplevering zelf aanpassen?",
    answer:
      "Dat hangt af van de technologie die we kiezen. Voor websites bouwen we indien gewenst een CMS-integratie zodat je teksten en afbeeldingen zelf kunt aanpassen. Voor webapps en apps bespreken we vooraf welk niveau van zelfbeheer je wilt.",
  },
];

export default function Faq() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <main className="flex flex-1 flex-col px-6 py-32 max-w-3xl mx-auto w-full">
        <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
          FAQ
        </p>
        <h1 className="font-display text-5xl sm:text-6xl leading-tight">
          Veelgestelde vragen.
        </h1>
        <p className="mt-6 text-(--color-muted-light) leading-relaxed max-w-xl">
          Alles wat je wilt weten over samenwerken met Mobile Growth Studio.
        </p>

        <div className="mt-20 flex flex-col divide-y divide-(--color-border)">
          {faqs.map(({ question, answer }, i) => (
            <details
              key={i}
              className="group py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-4 text-base font-medium leading-snug select-none">
                <span>{question}</span>
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-(--color-border) flex items-center justify-center text-(--color-muted) group-open:border-(--color-accent) group-open:text-(--color-accent) transition-colors">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="transition-transform group-open:rotate-45"
                  >
                    <path
                      d="M5 1v8M1 5h8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-(--color-muted-light) leading-relaxed text-sm pr-8">
                {answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-20 border-t border-(--color-border) pt-12">
          <p className="font-display text-2xl">Staat je vraag er niet bij?</p>
          <p className="mt-3 text-(--color-muted-light) text-sm">
            Stuur een bericht en we reageren binnen één werkdag.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Neem contact op
          </Link>
        </div>
      </main>
    </>
  );
}
