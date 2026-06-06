"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// Hero-visual: pijnpunten van de ondernemer (admin, trage processen, geen tijd)
// gaan links de studio in, komen rechts uit als concrete oplossingen — een
// cyclus door de vijf diensten.

const inputIcons: Record<string, ReactNode> = {
  // Te veel admin — klembord met lijntjes
  admin: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 11h6M9 14.5h6M9 18h4" />
    </g>
  ),
  // Trage processen — cyclische pijlen
  process: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-3.5-7.1" />
      <path d="M21 4v5h-5" />
    </g>
  ),
  // Geen tijd — klok
  time: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </g>
  ),
};

const outputIcons: Record<string, ReactNode> = {
  webapp: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </g>
  ),
  native: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </g>
  ),
  ai: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  dashboard: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="5" />
      <rect x="13" y="8" width="3" height="9" />
      <path d="M19 5v12" />
    </g>
  ),
  website: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </g>
  ),
};

interface ConnectionGraphicTranslations {
  inputs: readonly { readonly id: string; readonly label: string }[];
  outputs: readonly { readonly id: string; readonly label: string }[];
}

export default function ConnectionGraphic({
  t,
}: {
  t: ConnectionGraphicTranslations;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % t.outputs.length);
    }, 2200);
    return () => clearInterval(id);
  }, [t.outputs.length]);

  // Input chip rechterrand op x=235, studio-orb op (420, 160), output-device
  // linkerrand op x=600.
  const servicePaths = [
    "M235 75 C 300 75, 350 160, 392 160",
    "M235 160 C 310 160, 350 160, 392 160",
    "M235 245 C 300 245, 350 160, 392 160",
  ];
  const outputPath = "M448 160 C 520 160, 560 160, 600 160";
  const inputYs = [75, 160, 245];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Glow achter het paneel */}
      <div
        className="pointer-events-none absolute inset-0 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(91,95,232,0.32) 0%, transparent 70%)",
        }}
      />

      <div className="relative rounded-3xl card-depth overflow-hidden">
        <svg
          viewBox="0 0 810 320"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cg-orb" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#9BA3F2" />
              <stop offset="55%" stopColor="#5B5FE8" />
              <stop offset="100%" stopColor="#3F44C9" />
            </radialGradient>
            <linearGradient id="cg-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5B5FE8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#9BA3F2" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#5B5FE8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="cg-line-warm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5B5FE8" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#9BA3F2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E0B978" stopOpacity="0.85" />
            </linearGradient>
            <filter id="cg-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Pijnpunten → studio lijnen + bewegende stippen */}
          {servicePaths.map((d, i) => (
            <g key={i}>
              {/* Middelste lijn is de duidelijke indigo hoofdlijn; de andere blijven subtiel */}
              <path
                d={d}
                stroke={i === 1 ? "#9BA3F2" : "url(#cg-line)"}
                strokeWidth={i === 1 ? 2 : 1.5}
                strokeOpacity={i === 1 ? 0.9 : 1}
              />
              <circle r="3.5" fill="#9BA3F2">
                <animateMotion
                  dur={`${2.4 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${i * 0.4}s`}
                />
              </circle>
            </g>
          ))}

          {/* Studio → output (warm handoff) — duidelijke gelige hoofdlijn */}
          <path d={outputPath} stroke="#E0B978" strokeWidth="2" strokeOpacity="0.9" />
          <circle r="3.5" fill="#E0B978">
            <animateMotion dur="2s" repeatCount="indefinite" path={outputPath} />
          </circle>

          {/* Pijnpunt-chips (links) — admin, processen, tijd */}
          {t.inputs.slice(0, 3).map((input, i) => {
            const cy = inputYs[i];
            return (
              <g key={input.id}>
                <rect
                  x="55"
                  y={cy - 22}
                  width="180"
                  height="44"
                  rx="22"
                  fill="#161229"
                  stroke="#2a2540"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <g
                  transform={`translate(72 ${cy - 10}) scale(0.85)`}
                  style={{ color: "#9BA3F2" }}
                >
                  {inputIcons[input.id]}
                </g>
                <text
                  x="103"
                  y={cy + 5}
                  fill="#cfd2f5"
                  fontSize="14"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fontWeight="500"
                >
                  {input.label}
                </text>
              </g>
            );
          })}

          {/* Studio-orb (midden) — brand gradient met Ascent mark */}
          <circle
            cx="420"
            cy="160"
            r="46"
            fill="url(#cg-orb)"
            filter="url(#cg-glow)"
          />
          <g transform="translate(420 160) scale(0.55) translate(-52 -52)">
            <path
              d="M86 84 L86 30"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.5"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 84 L20 30 L52 60 L86 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M64 24 L86 24 L86 46"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Output device (rechts) — cycling carousel van diensten */}
          <g>
            <rect
              x="600"
              y="80"
              width="140"
              height="160"
              rx="16"
              fill="#1a1722"
              stroke="rgba(224,185,120,0.45)"
              strokeWidth="1.2"
            />
            <rect
              x="600"
              y="80"
              width="140"
              height="160"
              rx="16"
              fill="none"
              stroke="rgba(224,185,120,0.15)"
              strokeWidth="3"
            />
            <rect x="650" y="87" width="40" height="4" rx="2" fill="#0e0c18" />
            <rect
              x="612"
              y="100"
              width="116"
              height="100"
              rx="8"
              fill="rgba(224,185,120,0.04)"
            />

            {t.outputs.map((output, i) => (
              <g
                key={output.id}
                transform="translate(670 150) scale(2) translate(-12 -12)"
                style={{
                  color: "#E0B978",
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 400ms ease",
                }}
              >
                {outputIcons[output.id]}
              </g>
            ))}

            {t.outputs.map((output, i) => (
              <text
                key={`${output.id}-label`}
                x="670"
                y="220"
                textAnchor="middle"
                fill="#E0B978"
                fontSize="11"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                fontWeight="600"
                letterSpacing="1"
                style={{
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 400ms ease",
                }}
              >
                {output.label.toUpperCase()}
              </text>
            ))}

            {t.outputs.map((_, i) => (
              <circle
                key={i}
                cx={642 + i * 14}
                cy={258}
                r="2.5"
                fill={active === i ? "#E0B978" : "rgba(224,185,120,0.25)"}
                style={{ transition: "fill 400ms ease" }}
              />
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
