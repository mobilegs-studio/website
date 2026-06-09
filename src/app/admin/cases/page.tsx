import { getCasesContent, type PortfolioContent } from "@/lib/content";
import CasesEditor from "./cases-editor";

const LOCALES = ["nl", "en", "de"] as const;

export default async function AdminCasesPage() {
  const initial: Record<string, PortfolioContent> = {
    nl: await getCasesContent("nl"),
    en: await getCasesContent("en"),
    de: await getCasesContent("de"),
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Portfolio bewerken</h1>
      <p className="mt-3 text-(--color-muted-light)">
        Pas de succesverhalen aan per taal. Opslaan toont de wijziging direct op
        de site.
      </p>
      <CasesEditor initial={initial} locales={[...LOCALES]} />
    </div>
  );
}
