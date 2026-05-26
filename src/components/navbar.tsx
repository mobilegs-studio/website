"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/diensten", label: "Diensten" },
  { href: "/cases", label: "Cases" },
  { href: "/over", label: "Over" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[--color-border] backdrop-blur-md bg-[--color-background]/80"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-widest uppercase hover:text-[--color-accent] transition-colors"
        >
          mobilegs studio
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors hover:text-[--color-foreground] ${
                  pathname === href
                    ? "text-[--color-foreground]"
                    : "text-[--color-muted]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center text-sm font-semibold bg-[--color-accent] text-black px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Neem contact op
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
        >
          <span
            className={`block w-6 h-0.5 bg-[--color-foreground] transition-transform duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[--color-foreground] transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[--color-foreground] transition-transform duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-[--color-border] bg-[--color-background] px-6 pt-8 pb-10 flex flex-col gap-6"
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-3xl font-bold tracking-tight transition-colors ${
                  pathname === href
                    ? "text-[--color-accent]"
                    : "text-[--color-foreground] hover:text-[--color-accent]"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center text-sm font-semibold bg-[--color-accent] text-black px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Neem contact op
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
