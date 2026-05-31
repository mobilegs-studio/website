"use client";

import { useState } from "react";

interface InterestOption {
  value: string;
  label: string;
}

interface ContactFormTranslations {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  interestLabel: string;
  interestPlaceholder: string;
  interestOptions: readonly InterestOption[];
  messageLabel: string;
  messagePlaceholder: string;
  submitIdle: string;
  submitLoading: string;
  successHeading: string;
  successSubtext: string;
  errorText: string;
}

export default function ContactForm({ t }: { t: ContactFormTranslations }) {
  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    interesse: "",
    bericht: "",
  });
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
        <p className="font-semibold text-lg">{t.successHeading}</p>
        <p className="text-(--color-muted)">{t.successSubtext}</p>
      </div>
    );
  }

  const fieldClass =
    "bg-transparent border border-(--color-border) rounded-lg px-4 py-3 text-(--color-foreground) placeholder:text-(--color-muted) focus:outline-none focus:border-(--color-accent) transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-(--color-muted)" htmlFor="naam">
          {t.nameLabel}
        </label>
        <input
          id="naam"
          type="text"
          required
          placeholder={t.namePlaceholder}
          value={form.naam}
          onChange={(e) => setForm({ ...form, naam: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-(--color-muted)" htmlFor="email">
          {t.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder={t.emailPlaceholder}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-(--color-muted)" htmlFor="telefoon">
          {t.phoneLabel}
        </label>
        <input
          id="telefoon"
          type="tel"
          placeholder={t.phonePlaceholder}
          value={form.telefoon}
          onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-(--color-muted)" htmlFor="interesse">
          {t.interestLabel}
        </label>
        <select
          id="interesse"
          value={form.interesse}
          onChange={(e) => setForm({ ...form, interesse: e.target.value })}
          className={`${fieldClass} appearance-none bg-[image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 stroke=%22%235a5a5a%22 stroke-width=%221.5%22><path d=%22M2 4l4 4 4-4%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${form.interesse === "" ? "text-(--color-muted)" : "text-(--color-foreground)"}`}
        >
          <option value="" disabled className="text-(--color-muted)">
            {t.interestPlaceholder}
          </option>
          {t.interestOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-(--color-background) text-(--color-foreground)"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-(--color-muted)" htmlFor="bericht">
          {t.messageLabel}
        </label>
        <textarea
          id="bericht"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
          value={form.bericht}
          onChange={(e) => setForm({ ...form, bericht: e.target.value })}
          className={`${fieldClass} resize-none`}
        />
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm">{t.errorText}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-(--color-accent) text-black font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity w-fit disabled:opacity-50"
      >
        {status === "loading" ? t.submitLoading : t.submitIdle}
      </button>
    </form>
  );
}
