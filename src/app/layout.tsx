import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mobilegs studio — Apps & tools die je bedrijf slimmer maken",
  description:
    "mobilegs studio bouwt webapps, native apps en AI tooling voor Nederlandse MKB-ers en ZZP-ers. Geen jargon, wel resultaat.",
  openGraph: {
    title: "mobilegs studio",
    description: "Apps & tools die je bedrijf slimmer maken.",
    url: "https://mobilegs.studio",
    siteName: "mobilegs studio",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--color-background] text-[--color-foreground]">
        {children}
      </body>
    </html>
  );
}
