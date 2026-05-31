import { getTranslations } from "@/i18n/translations";
import ContactForm from "./contact-form";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const c = t.contact;

  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
        {c.label}
      </p>
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight max-w-2xl">
        {c.heading}
      </h1>
      <p className="mt-8 text-lg text-(--color-muted) max-w-xl leading-relaxed">
        {c.subtext}
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <ContactForm t={c} />

        <div className="flex flex-col gap-8 md:pt-0 pt-8 border-t border-(--color-border) md:border-0">
          <div>
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {c.emailInfoLabel}
            </p>
            <a
              href="mailto:info@mobilegrowthstudio.com"
              className="font-medium hover:text-(--color-accent) transition-colors"
            >
              info@mobilegrowthstudio.com
            </a>
          </div>
          <div>
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {c.locationLabel}
            </p>
            <p className="font-medium">{c.locationValue}</p>
          </div>
          <div>
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {c.responseLabel}
            </p>
            <p className="font-medium">{c.responseValue}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
