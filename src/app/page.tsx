import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Webapps",
    description:
      "Maatwerk webapplicaties die processen automatiseren en je bedrijf schaalbaar maken. Van dashboard tot klantportaal.",
    href: "/diensten",
  },
  {
    number: "02",
    title: "Native apps",
    description:
      "iOS en Android apps die je klanten een native ervaring bieden. Snel, intuïtief en gebouwd om te schalen.",
    href: "/diensten",
  },
  {
    number: "03",
    title: "AI tooling",
    description:
      "Slimme tools die repetitief werk automatiseren. Gebouwd op de nieuwste AI-modellen, toegepast op jouw bedrijf.",
    href: "/diensten",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 sm:py-48 text-center min-h-[85vh]">
        <p className="text-sm tracking-widest uppercase text-[--color-muted] mb-6">
          Mobile Growth Studio
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight max-w-3xl">
          Apps & tools die je bedrijf slimmer maken.
        </h1>
        <p className="mt-8 text-lg text-[--color-muted] max-w-xl leading-relaxed">
          We bouwen webapps, native apps en AI tooling voor Nederlandse MKB-ers
          en ZZP-ers — zonder poespas, met resultaat.
        </p>
        <Link
          href="/contact"
          className="mt-12 inline-flex items-center gap-2 bg-[--color-accent] text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
        >
          Neem contact op
        </Link>
      </section>

      {/* Services */}
      <section className="px-6 pb-32 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[--color-border]">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="bg-[--color-background] p-8 sm:p-12 group hover:bg-[#0f0f0f] transition-colors"
            >
              <span className="text-xs text-[--color-muted] tracking-widest font-mono">
                {service.number}
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight group-hover:text-[--color-accent] transition-colors">
                {service.title}
              </h2>
              <p className="mt-3 text-[--color-muted] leading-relaxed text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
