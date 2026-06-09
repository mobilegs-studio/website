"use client";

import { useState } from "react";
import { saveCasesContent } from "../actions";
import type { PortfolioContent, PortfolioStory } from "@/lib/content";

type Initial = Record<string, PortfolioContent>;

const localeNames: Record<string, string> = {
  nl: "Nederlands",
  en: "English",
  de: "Deutsch",
};

const mockups = ["browser", "mobile", "ai"];

export default function CasesEditor({
  initial,
  locales,
}: {
  initial: Initial;
  locales: string[];
}) {
  const [active, setActive] = useState(locales[0]);
  // Diepe kopie zodat we per taal kunnen bewerken zonder de props te muteren.
  const [data, setData] = useState<Initial>(() =>
    JSON.parse(JSON.stringify(initial))
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const current = data[active];

  function update(patch: Partial<PortfolioContent>) {
    setData((d) => ({ ...d, [active]: { ...d[active], ...patch } }));
    setStatus("idle");
  }

  function updateStory(index: number, patch: Partial<PortfolioStory>) {
    setData((d) => {
      const stories = d[active].stories.map((s, i) =>
        i === index ? { ...s, ...patch } : s
      );
      return { ...d, [active]: { ...d[active], stories } };
    });
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    setError("");
    const res = await saveCasesContent(active, current);
    if (res.ok) setStatus("saved");
    else {
      setStatus("error");
      setError(res.error);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm outline-none focus:border-(--color-accent) transition-colors";

  return (
    <div className="mt-8">
      {/* Locale tabs */}
      <div className="flex items-center gap-2 border-b border-(--color-border)">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => {
              setActive(loc);
              setStatus("idle");
            }}
            className={`px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${
              active === loc
                ? "border-(--color-accent) text-(--color-foreground)"
                : "border-transparent text-(--color-muted) hover:text-(--color-foreground)"
            }`}
          >
            {localeNames[loc] ?? loc}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {/* Intro + CTA heading */}
        <div className="rounded-2xl card-depth p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-(--color-muted)">
              Introtekst
            </span>
            <textarea
              rows={2}
              value={current.intro}
              onChange={(e) => update({ intro: e.target.value })}
              className={`${fieldClass} resize-none`}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-(--color-muted)">
              CTA-kop onderaan
            </span>
            <input
              value={current.ctaHeading}
              onChange={(e) => update({ ctaHeading: e.target.value })}
              className={fieldClass}
            />
          </label>
        </div>

        {/* Stories */}
        {current.stories.map((story, i) => (
          <div key={story.id} className="rounded-2xl card-depth p-6">
            <p className="text-xs uppercase tracking-wider text-(--color-accent-light) mb-4">
              Verhaal {i + 1} · {story.business}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-(--color-muted)">Naam</span>
                <input
                  value={story.name}
                  onChange={(e) => updateStory(i, { name: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-(--color-muted)">Bedrijf</span>
                <input
                  value={story.business}
                  onChange={(e) => updateStory(i, { business: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs text-(--color-muted)">Quote</span>
                <textarea
                  rows={2}
                  value={story.quote}
                  onChange={(e) => updateStory(i, { quote: e.target.value })}
                  className={`${fieldClass} resize-none`}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-(--color-muted)">Project</span>
                <input
                  value={story.project}
                  onChange={(e) => updateStory(i, { project: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-(--color-muted)">Resultaat</span>
                <input
                  value={story.result}
                  onChange={(e) => updateStory(i, { result: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-(--color-muted)">Mockup-type</span>
                <select
                  value={story.mockup}
                  onChange={(e) => updateStory(i, { mockup: e.target.value })}
                  className={fieldClass}
                >
                  {mockups.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs text-(--color-muted)">
                  Externe link (optioneel)
                </span>
                <input
                  value={story.url ?? ""}
                  onChange={(e) =>
                    updateStory(i, { url: e.target.value || undefined })
                  }
                  placeholder="https://..."
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs text-(--color-muted)">
                  Afbeelding-pad (optioneel)
                </span>
                <input
                  value={story.image ?? ""}
                  onChange={(e) =>
                    updateStory(i, { image: e.target.value || undefined })
                  }
                  placeholder="/cases/voorbeeld.png"
                  className={fieldClass}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 mt-8 flex items-center gap-4 border-t border-(--color-border) bg-(--color-background)/90 backdrop-blur py-4">
        <button
          onClick={save}
          disabled={status === "saving"}
          className="inline-flex items-center rounded-full bg-(--color-accent) px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === "saving"
            ? "Opslaan..."
            : `Opslaan (${localeNames[active] ?? active})`}
        </button>
        {status === "saved" && (
          <span className="text-sm text-(--color-accent-light)">
            Opgeslagen. De wijziging staat live.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-(--color-warm)">{error}</span>
        )}
      </div>
    </div>
  );
}
