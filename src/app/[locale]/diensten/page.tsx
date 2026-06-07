import { getTranslations } from "@/i18n/translations";
import { serviceIcons } from "@/components/service-icons";

export default async function Diensten({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const s = t.services;

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
        {s.label}
      </p>
      <h1 className="font-sans font-bold tracking-tight text-5xl sm:text-6xl leading-tight max-w-2xl">
        {s.heading}
      </h1>

      <div className="mt-24 flex flex-col gap-24">
        {s.items.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-(--color-border) pt-12"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-(--color-accent)">
                  {serviceIcons[item.id]}
                </span>
                <span className="text-xs text-(--color-muted) tracking-widest font-mono">
                  {item.number}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-(--color-accent) font-medium text-sm">
                {item.tagline}
              </p>
            </div>
            <div>
              <p className="text-(--color-muted) leading-relaxed">
                {item.description}
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {item.items.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-sm text-(--color-foreground)"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
                    {bullet}
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
