"use client";

import { motion } from "framer-motion";

// Decoratieve hero-visual: verbindt jouw diensten (links) via de studio (midden)
// met de klant (rechts). Taal-onafhankelijk, dus puur iconisch.
//
// Kleur-verhaal: links = indigo (tech-stack), midden = indigo→amber gradient orb
// (de studio waar tech mens wordt), rechts = amber (de menselijke klant).
export default function ConnectionGraphic() {
  // Paden van de drie dienst-nodes naar de studio, en van studio naar klant.
  const servicePaths = [
    "M150 70 C 260 70, 300 150, 392 150",
    "M150 150 C 250 150, 300 150, 392 150",
    "M150 230 C 260 230, 300 150, 392 150",
  ];
  const clientPath = "M448 150 C 540 150, 590 150, 660 150";

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
          viewBox="0 0 810 300"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Studio orb — indigo center fading to warm amber edge */}
            <radialGradient id="cg-orb" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#9BA3F2" />
              <stop offset="55%" stopColor="#5B5FE8" />
              <stop offset="100%" stopColor="#3F44C9" />
            </radialGradient>
            {/* Service lines — indigo travelling left → middle */}
            <linearGradient id="cg-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5B5FE8" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#9BA3F2" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#5B5FE8" stopOpacity="0.15" />
            </linearGradient>
            {/* Client line — the tech→human handoff: indigo fading into amber */}
            <linearGradient id="cg-line-warm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5B5FE8" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#9BA3F2" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#E0B978" stopOpacity="0.5" />
            </linearGradient>
            <filter id="cg-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Verbindingslijnen + bewegende stippen (services → studio) */}
          {servicePaths.map((d, i) => (
            <g key={i}>
              <path d={d} stroke="url(#cg-line)" strokeWidth="1.5" />
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
          {/* Studio → klant (warm handoff) */}
          <path d={clientPath} stroke="url(#cg-line-warm)" strokeWidth="1.5" />
          <circle r="3.5" fill="#E0B978">
            <animateMotion
              dur="2.2s"
              repeatCount="indefinite"
              path={clientPath}
            />
          </circle>

          {/* Dienst-nodes (links) — indigo accent */}
          {[70, 150, 230].map((cy) => (
            <g key={cy}>
              <circle
                cx="120"
                cy={cy}
                r="26"
                fill="#161229"
                stroke="#2a2540"
                strokeWidth="1"
              />
              <circle cx="120" cy={cy} r="6" fill="#9BA3F2" />
            </g>
          ))}

          {/* Studio-orb (midden) — brand gradient */}
          <circle
            cx="420"
            cy="150"
            r="46"
            fill="url(#cg-orb)"
            filter="url(#cg-glow)"
          />
          {/* Mini Ascent mark inside the orb */}
          <g transform="translate(420 150) scale(0.55) translate(-52 -52)">
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

          {/* Klant-node (rechts) — amber, de menselijke kant */}
          <circle
            cx="690"
            cy="150"
            r="40"
            fill="#1f1814"
            stroke="#3a2c1f"
            strokeWidth="1"
          />
          <circle cx="690" cy="138" r="11" fill="#E0B978" />
          <path
            d="M672 172 a18 16 0 0 1 36 0"
            fill="#E0B978"
          />
        </svg>
      </div>
    </motion.div>
  );
}
