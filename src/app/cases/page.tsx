import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cases — Mobile Growth Studio",
  description: "Projecten en cases van Mobile Growth Studio.",
};

export default function Cases() {
  return (
    <main className="flex flex-1 flex-col px-6 py-32 max-w-5xl mx-auto w-full">
      <p className="text-sm tracking-widest uppercase text-(--color-muted) mb-6">
        Cases
      </p>
      <h1 className="font-display text-5xl sm:text-6xl leading-tight max-w-2xl">
        Wat we gemaakt hebben.
      </h1>
      <p className="mt-8 text-lg text-(--color-muted) max-w-xl leading-relaxed">
        Cases worden binnenkort toegevoegd. Heb je een concreet project in
        gedachten?
      </p>
      <Link
        href="/contact"
        className="mt-10 inline-flex items-center gap-2 bg-(--color-accent) text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity w-fit"
      >
        Neem contact op
      </Link>
    </main>
  );
}
