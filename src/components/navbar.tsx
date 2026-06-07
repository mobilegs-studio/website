"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { getAuthStrings } from "@/i18n/auth";

interface NavTranslations {
  diensten: string;
  cases: string;
  faq: string;
  over: string;
  contact: string;
  cta: string;
  menuOpen: string;
  menuClose: string;
}

const LOCALES = ["en", "nl", "de"] as const;

export default function Navbar({
  locale,
  t,
}: {
  locale: string;
  t: NavTranslations;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const ta = getAuthStrings(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sessie-status: bepaalt of we "Inloggen" of het account-icoon tonen.
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    let unsub: { unsubscribe: () => void } | undefined;
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user));
      const { data } = supabase.auth.onAuthStateChange((_event, session) =>
        setLoggedIn(!!session?.user)
      );
      unsub = data.subscription;
    } catch {
      // Supabase niet geconfigureerd — laat de knop gewoon weg.
    }
    return () => unsub?.unsubscribe();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const links = [
    { href: `/${locale}/diensten`, label: t.diensten },
    { href: `/${locale}/portfolio`, label: t.cases },
    { href: `/${locale}/faq`, label: t.faq },
    { href: `/${locale}/over`, label: t.over },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  function localePath(targetLocale: string) {
    return pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${targetLocale}$1`) || `/${targetLocale}`;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-(--color-border) bg-(--color-background)"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            aria-label="Mobile Growth Studio — home"
            className="inline-flex items-center hover:opacity-80 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo/lockup.svg"
              alt="Mobile Growth Studio"
              width={176}
              height={42}
              className="h-9 w-auto"
            />
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

          <div className="hidden md:flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1.5 text-xs text-(--color-muted)">
              {LOCALES.map((loc, i) => (
                <span key={loc} className="flex items-center gap-1.5">
                  <Link
                    href={localePath(loc)}
                    className={`uppercase tracking-wider transition-colors hover:text-(--color-foreground) ${
                      locale === loc ? "text-(--color-foreground) font-semibold" : ""
                    }`}
                  >
                    {loc}
                  </Link>
                  {i < LOCALES.length - 1 && (
                    <span className="text-(--color-border)">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Account / inloggen */}
            {loggedIn ? (
              <Link
                href={`/${locale}/account`}
                aria-label={ta.accountTitle}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-(--color-border) text-(--color-foreground) hover:bg-(--color-surface) transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </Link>
            ) : (
              <Link
                href={`/${locale}/login`}
                className="inline-flex items-center text-sm font-semibold text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              >
                {ta.loginTitle}
              </Link>
            )}

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center text-sm font-semibold bg-(--color-accent) text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              {t.cta}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
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

      {/* Mobile menu */}
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
                  onClick={closeMenu}
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

            {/* Mobile language switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-3 pt-2"
            >
              {LOCALES.map((loc) => (
                <Link
                  key={loc}
                  href={localePath(loc)}
                  onClick={closeMenu}
                  className={`text-sm uppercase tracking-widest transition-colors ${
                    locale === loc
                      ? "text-(--color-foreground) font-semibold"
                      : "text-(--color-muted) hover:text-(--color-foreground)"
                  }`}
                >
                  {loc}
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-auto pt-8 border-t border-(--color-border) flex flex-col gap-3"
            >
              <Link
                href={loggedIn ? `/${locale}/account` : `/${locale}/login`}
                onClick={closeMenu}
                className="inline-flex items-center justify-center w-full text-sm font-semibold border border-(--color-border) px-5 py-4 rounded-full hover:bg-(--color-surface) transition-colors"
              >
                {loggedIn ? ta.accountTitle : ta.loginTitle}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={closeMenu}
                className="inline-flex items-center justify-center w-full text-sm font-semibold bg-(--color-accent) text-white px-5 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                {t.cta}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
