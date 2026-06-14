export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://www.mobilegrowthstudio.com/#organization",
        name: "Mobile Growth Studio",
        alternateName: "mobilegs-studio",
        url: "https://www.mobilegrowthstudio.com",
        logo: "https://www.mobilegrowthstudio.com/icon.png",
        description:
          "Mobile Growth Studio bouwt webapps, native apps, AI tooling, dashboards en websites voor MKB-ers en ZZP-ers. Geen jargon, wel resultaat.",
        founder: {
          "@type": "Person",
          name: "Hendrik Polinder",
          jobTitle: "Senior Growth Manager & Digitaal Consultant",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hilversum",
          addressCountry: "NL",
        },
        areaServed: {
          "@type": "Country",
          name: "Nederland",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@mobilegrowthstudio.com",
          availableLanguage: ["Dutch", "English"],
        },
        knowsAbout: [
          "Webapplicaties",
          "Native app ontwikkeling",
          "AI tooling",
          "Dashboarding",
          "Website ontwikkeling",
          "React Native",
          "Next.js",
          "SwiftUI",
          "Digitale transformatie MKB",
        ],
        sameAs: [
          "https://www.linkedin.com/company/mobilegrowthstudio",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.mobilegrowthstudio.com/#website",
        url: "https://www.mobilegrowthstudio.com",
        name: "Mobile Growth Studio",
        publisher: {
          "@id": "https://www.mobilegrowthstudio.com/#organization",
        },
        inLanguage: "nl-NL",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@id": "https://www.mobilegrowthstudio.com/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
