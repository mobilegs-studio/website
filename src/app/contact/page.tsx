import type { Metadata } from "next";
import ContactForm from "./contact-form";

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
        <ContactForm />

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
