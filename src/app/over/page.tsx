import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over — Mobile Growth Studio",
  description:
    "Mobile Growth Studio is het freelance label van Hendrik Polinder, gevestigd in Hilversum.",
};

export default function Over() {
  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
        Over
      </p>
      <h1 className="font-display text-5xl sm:text-6xl leading-tight max-w-2xl">
        Hendrik Polinder.
      </h1>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-(--color-border) pt-16">
        <div className="flex flex-col gap-6 text-(--color-muted) leading-relaxed">
          <p>
            Mobile Growth Studio is het freelance label van Hendrik Polinder —
            senior growth manager en digitaal consultant gevestigd in
            Hilversum.
          </p>
          <p>
            Ik help Nederlandse MKB-ers en ZZP-ers met het bouwen van digitale
            producten die echt werken. Geen overbodig advies, geen ingewikkelde
            trajecten — gewoon bouwen wat je nodig hebt.
          </p>
          <p>
            Van webapp tot native app tot AI-tooling: ik neem het technische
            gedeelte uit handen zodat jij je kunt focussen op je bedrijf.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              Locatie
            </p>
            <p className="font-medium">Hilversum, Nederland</p>
          </div>
          <div className="border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              Beschikbaarheid
            </p>
            <p className="font-medium">
              Beschikbaar voor nieuwe projecten{" "}
              <span className="inline-block w-2 h-2 rounded-full bg-(--color-accent) ml-1 align-middle" />
            </p>
          </div>
          <div className="border-t border-(--color-border) pt-6">
            <p className="text-xs text-(--color-muted) tracking-widest uppercase mb-3">
              Contact
            </p>
            <Link
              href="/contact"
              className="font-medium hover:text-(--color-accent) transition-colors"
            >
              Stuur een bericht →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
