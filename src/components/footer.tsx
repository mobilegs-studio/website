import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[--color-border] px-6 py-10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase">
            Mobile Growth Studio
          </p>
          <p className="text-sm text-[--color-muted] mt-1">
            Hilversum, Nederland
          </p>
        </div>
        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-[--color-muted]">
          <Link href="/diensten" className="hover:text-[--color-foreground] transition-colors">Diensten</Link>
          <Link href="/cases" className="hover:text-[--color-foreground] transition-colors">Cases</Link>
          <Link href="/over" className="hover:text-[--color-foreground] transition-colors">Over</Link>
          <Link href="/contact" className="hover:text-[--color-foreground] transition-colors">Contact</Link>
        </nav>
        <p className="text-sm text-[--color-muted]">
          © {year} Mobile Growth Studio
        </p>
      </div>
    </footer>
  );
}
