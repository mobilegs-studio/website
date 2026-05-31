"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/diensten", label: "Diensten" },
  { href: "/cases", label: "Cases" },
  { href: "/faq", label: "FAQ" },
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-(--color-border) bg-(--color-background)"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-widest uppercase hover:text-(--color-accent) transition-colors"
          >
            Mobile Growth Studio
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-colors hover:text-(--color-foreground) ${
                    pathname === href
                      ? "text-(--color-foreground)"
                      : "text-(--color-muted)"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center text-sm font-semibold bg-(--color-accent) text-black px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
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
              className={`block w-6 h-0.5 bg-(--color-foreground) transition-transform duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-(--color-foreground) transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-(--color-foreground) transition-transform duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu — full-screen overlay below the header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ backgroundColor: "var(--background)" }}
            className="md:hidden fixed left-0 right-0 top-[65px] bottom-0 z-40 px-6 pt-10 pb-10 flex flex-col gap-6 overflow-y-auto"
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.2 }}
              >
                <Link
                  href={href}
                  className={`text-4xl font-bold tracking-tight transition-colors ${
                    pathname === href
                      ? "text-(--color-accent)"
                      : "text-(--color-foreground) hover:text-(--color-accent)"
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-auto pt-8 border-t border-(--color-border)"
            >
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center w-full text-sm font-semibold bg-(--color-accent) text-black px-5 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                Neem contact op
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
