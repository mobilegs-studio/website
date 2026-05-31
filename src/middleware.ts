import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "nl", "de"] as const;
type Locale = (typeof LOCALES)[number];

const SKIP_PREFIXES = ["/api/", "/_next/"];
const SKIP_EXACT = ["/sitemap.xml", "/robots.txt", "/favicon.ico"];
const SKIP_EXTENSIONS = /\.(svg|png|jpg|jpeg|ico|webp)$/;

function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return "en";
  const lang = header.split(",")[0].trim().toLowerCase();
  if (lang.startsWith("nl")) return "nl";
  if (lang.startsWith("de")) return "de";
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and special paths
  if (SKIP_EXTENSIONS.test(pathname)) return NextResponse.next();
  if (SKIP_EXACT.includes(pathname)) return NextResponse.next();
  for (const prefix of SKIP_PREFIXES) {
    if (pathname.startsWith(prefix)) return NextResponse.next();
  }

  // Check if path already has a locale prefix
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    const locale = LOCALES.find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    ) as Locale;
    const response = NextResponse.next();
    response.headers.set("x-locale", locale);
    return response;
  }

  // Redirect to locale-prefixed path
  const locale = getLocaleFromAcceptLanguage(
    request.headers.get("accept-language")
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
