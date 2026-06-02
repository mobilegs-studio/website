import type { LegalDoc } from "@/content/legal";

const updatedLabels: Record<string, string> = {
  nl: "Laatst bijgewerkt",
  en: "Last updated",
  de: "Zuletzt aktualisiert",
};

export default function LegalDocView({
  doc,
  locale,
}: {
  doc: LegalDoc;
  locale: string;
}) {
  const updatedLabel = updatedLabels[locale] ?? updatedLabels.nl;

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-3xl mx-auto w-full">
      <h1 className="font-display text-4xl sm:text-5xl leading-tight">
        {doc.title}
      </h1>
      <p className="mt-4 text-sm text-(--color-muted)">
        {updatedLabel}: {doc.updated}
      </p>
      <p className="mt-8 text-(--color-muted-light) leading-relaxed">
        {doc.intro}
      </p>

      <div className="mt-12 flex flex-col gap-10">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold tracking-tight">
              {section.heading}
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-(--color-muted-light) leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
