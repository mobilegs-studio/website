import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Mobile Growth Studio",
  description:
    "Neem contact op met Mobile Growth Studio voor webapps, native apps of AI tooling.",
};

export default function Contact() {
  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-[--color-muted] mb-6">
        Contact
      </p>
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight max-w-2xl">
        Laten we praten.
      </h1>
      <p className="mt-8 text-lg text-[--color-muted] max-w-xl leading-relaxed">
        Heb je een project in gedachten? Vertel me wat je nodig hebt en ik
        reageer binnen één werkdag.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[--color-muted]" htmlFor="naam">
              Naam
            </label>
            <input
              id="naam"
              type="text"
              placeholder="Jan de Vries"
              className="bg-transparent border border-[--color-border] rounded-lg px-4 py-3 text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[--color-muted]" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="jan@bedrijf.nl"
              className="bg-transparent border border-[--color-border] rounded-lg px-4 py-3 text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[--color-muted]" htmlFor="bericht">
              Bericht
            </label>
            <textarea
              id="bericht"
              rows={5}
              placeholder="Vertel me over je project..."
              className="bg-transparent border border-[--color-border] rounded-lg px-4 py-3 text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[--color-accent] text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity w-fit"
          >
            Verstuur bericht
          </button>
        </form>

        {/* Contact info */}
        <div className="flex flex-col gap-8 md:pt-0 pt-8 border-t border-[--color-border] md:border-0">
          <div>
            <p className="text-xs text-[--color-muted] tracking-widest uppercase mb-3">
              E-mail
            </p>
            <a
              href="mailto:info@mobilegrowthstudio.com"
              className="font-medium hover:text-[--color-accent] transition-colors"
            >
              info@mobilegrowthstudio.com
            </a>
          </div>
          <div>
            <p className="text-xs text-[--color-muted] tracking-widest uppercase mb-3">
              Locatie
            </p>
            <p className="font-medium">Hilversum, Nederland</p>
          </div>
          <div>
            <p className="text-xs text-[--color-muted] tracking-widest uppercase mb-3">
              Reactietijd
            </p>
            <p className="font-medium">Binnen één werkdag</p>
          </div>
        </div>
      </div>
    </main>
  );
}
