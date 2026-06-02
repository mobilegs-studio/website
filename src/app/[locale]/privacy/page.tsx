import type { Metadata } from "next";
import { getLegal } from "@/content/legal";
import LegalDocView from "@/components/legal-doc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLegal(locale).privacy;
  return {
    title: doc.title,
    description: doc.intro.slice(0, 155),
    alternates: { canonical: `https://www.mobilegrowthstudio.com/${locale}/privacy` },
  };
}

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegalDocView doc={getLegal(locale).privacy} locale={locale} />;
}
