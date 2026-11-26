import Image from "next/image";
import Link from "next/link";
import {
  SETGRID_LANGS,
  SETGRID_LANG_NAMES,
  getSetgridContent,
  type SetgridLang,
} from "@/content/setgrid";

type Props = {
  lang: SetgridLang;
  /** Path inside /setgrid/<lang>, e.g. "" | "support" | "terms". */
  page?: "" | "support" | "terms";
  children: React.ReactNode;
};

export default function SetgridShell({ lang, page = "", children }: Props) {
  const t = getSetgridContent(lang);
  const home = `/setgrid/${lang}`;

  return (
    <div className="sg">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-5 sm:px-6">
        <Link href={home} className="flex items-center gap-3">
          <Image
            src="/setgrid/icon-512.png"
            alt=""
            width={36}
            height={36}
            className="rounded-[10px]"
          />
          <span className="text-lg font-semibold tracking-tight">Setgrid</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm text-[var(--sg-muted)]">
          <Link href={`${home}#features`} className="hover:text-[var(--sg-text)]">
            {t.nav.features}
          </Link>
          <Link href={`${home}#faq`} className="hover:text-[var(--sg-text)]">
            {t.nav.faq}
          </Link>
          <Link
            href={`${home}/support`}
            className={
              page === "support"
                ? "text-[var(--sg-text)]"
                : "hover:text-[var(--sg-text)]"
            }
          >
            {t.nav.support}
          </Link>
          <Link
            href={`${home}/terms`}
            className={
              page === "terms"
                ? "text-[var(--sg-text)]"
                : "hover:text-[var(--sg-text)]"
            }
          >
            {t.nav.terms}
          </Link>
        </nav>

        <div className="ml-auto flex flex-wrap items-center gap-1 text-xs">
          {SETGRID_LANGS.map((l) => (
            <Link
              key={l}
              href={`/setgrid/${l}${page ? `/${page}` : ""}`}
              hrefLang={l}
              title={SETGRID_LANG_NAMES[l]}
              className={`rounded-full px-2 py-1 uppercase ${
                l === lang
                  ? "bg-[var(--sg-accent)] text-[#042029]"
                  : "text-[var(--sg-muted)] hover:text-[var(--sg-text)]"
              }`}
            >
              {l}
            </Link>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">{children}</main>

      <footer className="border-t border-[var(--sg-border)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-[var(--sg-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{t.footer.madeBy}</p>
          <div className="flex gap-5">
            <Link href={`${home}/terms`} className="hover:text-[var(--sg-text)]">
              {t.nav.terms}
            </Link>
            <a
              href="https://fittrack.fittrack-worker.workers.dev/privacy/"
              className="hover:text-[var(--sg-text)]"
            >
              {t.footer.privacy}
            </a>
            <Link href="/" className="hover:text-[var(--sg-text)]">
              {t.footer.back}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
