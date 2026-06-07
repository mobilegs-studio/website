"use client";

import { use, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAuthStrings } from "@/i18n/auth";

type Status = "idle" | "sending" | "sent" | "error";

export default function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = getAuthStrings(locale);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function redirectTo() {
    return `${window.location.origin}/auth/callback?next=/${locale}/account`;
  }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo() },
    });
    setStatus(error ? "error" : "sent");
  }

  async function signInWithGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo() },
    });
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32">
      <div className="w-full max-w-md rounded-2xl card-depth p-8">
        <h1 className="font-sans font-bold tracking-tight text-3xl">
          {t.loginTitle}
        </h1>
        <p className="mt-3 text-sm text-(--color-muted-light) leading-relaxed">
          {t.loginSubtitle}
        </p>

        {status === "sent" ? (
          <p className="mt-8 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 text-sm text-(--color-foreground)">
            {t.magicLinkSent}
          </p>
        ) : (
          <form onSubmit={sendMagicLink} className="mt-8 flex flex-col gap-3">
            <label htmlFor="email" className="text-xs uppercase tracking-wider text-(--color-muted)">
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="rounded-full border border-(--color-border) bg-(--color-surface) px-5 py-3 text-sm outline-none focus:border-(--color-accent) transition-colors"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-(--color-accent) px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? t.sending : t.magicLinkCta}
            </button>
            {status === "error" && (
              <p className="text-sm text-(--color-warm)">{t.errorGeneric}</p>
            )}
          </form>
        )}

        <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-wider text-(--color-muted)">
          <span className="h-px flex-1 bg-(--color-border)" />
          {t.or}
          <span className="h-px flex-1 bg-(--color-border)" />
        </div>

        <button
          onClick={signInWithGoogle}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--color-border) px-5 py-3 text-sm font-semibold hover:bg-(--color-surface) transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.1 14.6 2.2 12 2.2 6.9 2.2 2.8 6.3 2.8 11.4S6.9 20.6 12 20.6c5.3 0 8.8-3.7 8.8-8.9 0-.6-.06-1-.15-1.5H12z" />
          </svg>
          {t.googleCta}
        </button>
      </div>
    </main>
  );
}
