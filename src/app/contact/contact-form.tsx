"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ naam: "", email: "", bericht: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4 py-8">
        <span className="text-2xl">✓</span>
        <p className="font-semibold text-lg">Bericht verstuurd.</p>
        <p className="text-[--color-muted]">
          Ik reageer binnen één werkdag.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[--color-muted]" htmlFor="naam">
          Naam
        </label>
        <input
          id="naam"
          type="text"
          required
          placeholder="Jan de Vries"
          value={form.naam}
          onChange={(e) => setForm({ ...form, naam: e.target.value })}
          className="bg-transparent border border-[--color-border] rounded-lg px-4 py-3 text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[--color-muted]" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="jan@bedrijf.nl"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="bg-transparent border border-[--color-border] rounded-lg px-4 py-3 text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[--color-muted]" htmlFor="bericht">
          Bericht
        </label>
        <textarea
          id="bericht"
          rows={5}
          required
          placeholder="Vertel me over je project..."
          value={form.bericht}
          onChange={(e) => setForm({ ...form, bericht: e.target.value })}
          className="bg-transparent border border-[--color-border] rounded-lg px-4 py-3 text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm">
          Er ging iets mis. Probeer het opnieuw of mail direct naar info@mobilegrowthstudio.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[--color-accent] text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity w-fit disabled:opacity-50"
      >
        {status === "loading" ? "Versturen..." : "Verstuur bericht"}
      </button>
    </form>
  );
}
