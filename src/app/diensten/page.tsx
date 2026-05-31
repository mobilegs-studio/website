import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diensten — Mobile Growth Studio",
  description:
    "Webapps, native apps en AI tooling voor Nederlandse MKB-ers en ZZP-ers.",
};

const diensten = [
  {
    id: "webapps",
    number: "01",
    title: "Webapps",
    tagline: "Van idee naar werkende applicatie.",
    description:
      "We bouwen maatwerk webapplicaties die jouw bedrijfsprocessen digitaliseren en automatiseren. Of het nu gaat om een klantportaal, een intern dashboard of een volledig SaaS-product — we bouwen het van begin tot eind.",
    items: [
      "Next.js webapplicaties",
      "Klantportalen en dashboards",
      "API-integraties",
      "SaaS-producten",
    ],
  },
  {
    id: "native-apps",
    number: "02",
    title: "Native apps",
    tagline: "iOS en Android, goed gedaan.",
    description:
      "We bouwen native mobiele apps die je klanten graag gebruiken. Strak design, soepele performance en een ervaring die aanvoelt alsof hij thuishoort op het platform.",
    items: [
      "iOS apps (Swift / SwiftUI)",
      "Android apps",
      "Cross-platform (React Native)",
      "App Store & Play Store publicatie",
    ],
  },
  {
    id: "ai-tooling",
    number: "03",
    title: "AI tooling",
    tagline: "Automatiseer wat jou tijd kost.",
    description:
      "We bouwen AI-tools die repetitieve taken overnemen. Geen generieke chatbots, maar slimme oplossingen op maat voor jouw specifieke bedrijfsprocessen.",
    items: [
      "AI-gestuurde workflows",
      "Document- en dataverwerking",
      "Chatbots op maat",
      "Integraties met GPT, Claude en andere LLMs",
    ],
  },
];

export default function Diensten() {
  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-[--color-muted] mb-6">
        Diensten
      </p>
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight max-w-2xl">
        Wat we bouwen.
      </h1>

      <div className="mt-24 flex flex-col gap-24">
        {diensten.map((dienst) => (
          <div
            key={dienst.id}
            id={dienst.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-[--color-border] pt-12"
          >
            <div>
              <span className="text-xs text-[--color-muted] tracking-widest font-mono">
                {dienst.number}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                {dienst.title}
              </h2>
              <p className="mt-2 text-[--color-accent] font-medium text-sm">
                {dienst.tagline}
              </p>
            </div>
            <div>
              <p className="text-[--color-muted] leading-relaxed">
                {dienst.description}
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {dienst.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[--color-foreground]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[--color-accent] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
