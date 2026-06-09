import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "@/i18n/translations";

// Bewerkbare portfolio/cases-content. Mutabele types (niet afgeleid van de
// `as const` translations) zodat ze in de editor en DB gebruikt kunnen worden.
export interface PortfolioStory {
  id: string;
  mockup: string;
  name: string;
  business: string;
  quote: string;
  project: string;
  result: string;
  image?: string;
  url?: string;
}

export interface PortfolioContent {
  label: string;
  heading: string;
  intro: string;
  projectLabel: string;
  resultLabel: string;
  visitLabel: string;
  stories: PortfolioStory[];
  ctaHeading: string;
  cta: string;
}

function defaults(locale: string): PortfolioContent {
  // De translations zijn `as const`; we casten naar het mutabele type.
  return getTranslations(locale).cases as unknown as PortfolioContent;
}

// Leest de cases-content voor een taal: DB-override gemerged over de
// code-defaults. Zonder DB-rij of bij een fout vallen we terug op de defaults,
// zodat de site altijd blijft werken.
export async function getCasesContent(
  locale: string
): Promise<PortfolioContent> {
  const fallback = defaults(locale);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("section", "cases")
      .eq("locale", locale)
      .maybeSingle();

    if (error || !data?.data) return fallback;
    return { ...fallback, ...(data.data as Partial<PortfolioContent>) };
  } catch {
    return fallback;
  }
}
