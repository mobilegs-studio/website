export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-sm tracking-widest uppercase text-[--color-muted] mb-6">
        mobilegs studio
      </p>
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight max-w-3xl">
        Apps & tools die je bedrijf slimmer maken.
      </h1>
      <p className="mt-8 text-lg text-[--color-muted] max-w-xl">
        We bouwen webapps, native apps en AI tooling voor Nederlandse MKB-ers
        en ZZP-ers — zonder poespas, met resultaat.
      </p>
      <a
        href="/contact"
        className="mt-12 inline-flex items-center gap-2 bg-[--color-accent] text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
      >
        Neem contact op
      </a>
    </main>
  );
}
