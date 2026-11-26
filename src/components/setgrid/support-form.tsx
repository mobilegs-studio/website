"use client";

import { useState } from "react";
import type { SetgridContent, SetgridLang } from "@/content/setgrid";

type State = "idle" | "sending" | "sent" | "error" | "missing";

export default function SetgridSupportForm({
  lang,
  t,
}: {
  lang: SetgridLang;
  t: SetgridContent["support"];
}) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      lang,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setState("missing");
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/setgrid-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("send failed");
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <p className="sg-card p-5 text-[var(--sg-green)]" role="status">
        {t.sent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="sg-card grid gap-4 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-[var(--sg-muted)]">{t.name}</span>
          <input name="name" type="text" autoComplete="name" className="sg-field" required />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-[var(--sg-muted)]">{t.email}</span>
          <input name="email" type="email" autoComplete="email" className="sg-field" required />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-[var(--sg-muted)]">{t.topic}</span>
        <select name="topic" className="sg-field" defaultValue={t.topics[0]}>
          {t.topics.map((topic) => (
            <option key={topic} value={topic} className="bg-[#061220]">
              {topic}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="text-[var(--sg-muted)]">{t.message}</span>
        <textarea name="message" rows={6} className="sg-field" required />
      </label>

      {state === "missing" && (
        <p className="text-sm text-amber-300" role="alert">
          {t.required}
        </p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-300" role="alert">
          {t.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="sg-btn sg-btn-primary disabled:opacity-60"
          disabled={state === "sending"}
        >
          {state === "sending" ? t.sending : t.send}
        </button>
        <p className="text-xs text-[var(--sg-muted)]">{t.privacy}</p>
      </div>
    </form>
  );
}
