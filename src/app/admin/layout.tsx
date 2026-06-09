import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, checkIsAdmin } from "@/lib/auth";
import LogoutButton from "./logout-button";

export const metadata = {
  title: "Admin — Mobile Growth Studio",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Overzicht" },
  { href: "/admin/cases", label: "Cases" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/nl/login");

  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <div className="max-w-md rounded-2xl card-depth p-8">
          <h1 className="text-2xl font-bold tracking-tight">Geen toegang</h1>
          <p className="mt-3 text-sm text-(--color-muted-light) leading-relaxed">
            Je bent ingelogd als {user.email}, maar dit account heeft geen
            admin-rechten. Vraag de beheerder je toe te voegen.
          </p>
          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-(--color-border) bg-(--color-surface) p-6">
        <Link href="/admin" className="text-sm font-semibold tracking-widest uppercase">
          MGS Admin
        </Link>
        <nav className="mt-10 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-(--color-muted-light) hover:bg-(--color-surface-hover) hover:text-(--color-foreground) transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-(--color-border)">
          <p className="text-xs text-(--color-muted) truncate mb-3">{user.email}</p>
          <LogoutButton />
          <Link
            href="/nl"
            className="mt-3 block text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
          >
            ← Naar de site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 px-6 py-10 sm:px-10 max-w-5xl w-full">
        {children}
      </main>
    </div>
  );
}
