import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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

export const metadata: Metadata = {
  title: "Mobile Growth Studio — Apps & tools die je bedrijf slimmer maken",
  description:
    "Mobile Growth Studio bouwt webapps, native apps en AI tooling voor Nederlandse MKB-ers en ZZP-ers. Geen jargon, wel resultaat.",
  openGraph: {
    title: "Mobile Growth Studio",
    description: "Apps & tools die je bedrijf slimmer maken.",
    url: "https://www.mobilegrowthstudio.com",
    siteName: "Mobile Growth Studio",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-background) text-(--color-foreground)">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
