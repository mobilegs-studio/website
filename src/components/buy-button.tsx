"use client";

import { useState } from "react";

export default function BuyButton({
  slug,
  locale,
  label,
}: {
  slug: string;
  locale: string;
  label: string;
}) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // val terug naar de knop
    }
    setLoading(false);
  }

  return (
    <button
      onClick={buy}
      disabled={loading}
      className="inline-flex items-center rounded-full bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
    >
      {loading ? "…" : label}
    </button>
  );
}
