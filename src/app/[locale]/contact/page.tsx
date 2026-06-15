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
  const d = t.home.differentiator;

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

      {/* Differentiator — AI-aanpak, prominent bij get-in-touch */}
      <div className="mt-12 relative overflow-hidden rounded-3xl border border-[rgba(var(--accent-rgb),0.35)] p-7 sm:p-10">
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-50"
          style={{ background: "rgba(91,95,232,0.22)" }}
        />
        <div className="relative">
          <span className="text-xs tracking-[0.22em] uppercase text-(--color-accent-light)">
            {d.label}
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight leading-tight max-w-2xl">
            {d.heading}
          </h2>
          <p className="mt-4 text-(--color-muted-light) leading-relaxed max-w-2xl">
            {d.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {d.points.map((p) => (
              <span
                key={p.title}
                className="inline-flex items-center gap-2 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) shrink-0" />
                {p.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <ContactForm t={c} />

        <div className="flex flex-col gap-8 md:pt-0 pt-8 border-t border-(--color-border) md:border-0">
          <div>
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              {c.whatsappLabel}
            </p>
            <a
              href="https://wa.me/31613827164"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-black font-semibold px-5 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
              </svg>
              {c.whatsappCta}
            </a>
          </div>
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
