import Link from "next/link";

const sections = [
  {
    href: "/admin/cases",
    title: "Cases",
    description: "Succesverhalen: namen, quotes, projecten en resultaten.",
    ready: true,
  },
  {
    href: "#",
    title: "Home & diensten",
    description: "Hero, propositie en de vijf diensten.",
    ready: false,
  },
  {
    href: "#",
    title: "FAQ",
    description: "Veelgestelde vragen en antwoorden.",
    ready: false,
  },
  {
    href: "#",
    title: "Juridisch",
    description: "Privacy, voorwaarden en cookies.",
    ready: false,
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Content beheren</h1>
      <p className="mt-3 text-(--color-muted-light)">
        Kies een onderdeel om te bewerken. Wijzigingen worden direct op de site
        getoond.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight">
                  {s.title}
                </h2>
                {!s.ready && (
                  <span className="text-[10px] uppercase tracking-wider text-(--color-muted) border border-(--color-border) rounded-full px-2 py-0.5">
                    Binnenkort
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-(--color-muted-light) leading-relaxed">
                {s.description}
              </p>
            </>
          );

          return s.ready ? (
            <Link
              key={s.title}
              href={s.href}
              className="rounded-2xl card-depth p-6 block"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={s.title}
              className="rounded-2xl border border-(--color-border) p-6 opacity-50"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
