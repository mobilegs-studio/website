import type { Metadata } from "next";
import { getLegal } from "@/content/legal";
import LegalDocView from "@/components/legal-doc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegal(locale).terms;
  return {
    title: doc.title,
    description: doc.intro.slice(0, 155),
    alternates: {
      canonical: `https://www.mobilegrowthstudio.com/${locale}/voorwaarden`,
    },
  };
}

export default async function Voorwaarden({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegalDocView doc={getLegal(locale).terms} locale={locale} />;
}
