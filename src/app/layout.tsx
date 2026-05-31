import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const BASE_URL = "https://www.mobilegrowthstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mobile Growth Studio — Apps & tools die je bedrijf slimmer maken",
    template: "%s — Mobile Growth Studio",
  },
  description:
    "Mobile Growth Studio bouwt webapps, native apps, AI tooling, dashboards en websites voor Nederlandse MKB-ers en ZZP-ers. Gevestigd in Hilversum. Geen jargon, wel resultaat.",
  keywords: [
    "webapp laten bouwen",
    "app laten bouwen",
    "native app ontwikkeling",
    "AI tooling MKB",
    "dashboard bouwen",
    "website laten maken",
    "Next.js developer Nederland",
    "freelance app developer Hilversum",
    "digitale oplossingen ZZP",
    "Mobile Growth Studio",
  ],
  authors: [{ name: "Hendrik Polinder", url: BASE_URL }],
  creator: "Hendrik Polinder",
  publisher: "Mobile Growth Studio",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Mobile Growth Studio — Apps & tools die je bedrijf slimmer maken",
    description:
      "Webapps, native apps, AI tooling, dashboards en websites voor Nederlandse MKB-ers en ZZP-ers. Geen jargon, wel resultaat.",
    url: BASE_URL,
    siteName: "Mobile Growth Studio",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Growth Studio",
    description:
      "Webapps, native apps, AI tooling en websites voor Nederlandse MKB-ers en ZZP-ers.",
    creator: "@mobilegrowthstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "nl";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-background) text-(--color-foreground)">
        {children}
      </body>
    </html>
  );
}
