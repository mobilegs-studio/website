// Statische mockup van het eindproduct, per type. Vervangt de klantfoto's in
// de portfolio. Puur SVG in de huisstijl (indigo + amber op donker glas).

function Browser() {
  return (
    <svg viewBox="0 0 340 230" className="w-full max-w-[340px] h-auto drop-shadow-2xl" role="img" aria-label="Webportaal">
      <rect x="2" y="2" width="336" height="226" rx="14" fill="#141021" stroke="rgba(155,163,242,0.25)" />
      {/* top bar */}
      <path d="M2 16 a14 14 0 0 1 14-14 h308 a14 14 0 0 1 14 14 v16 h-336 z" fill="#1b1730" />
      <circle cx="20" cy="17" r="3.5" fill="#E0B978" />
      <circle cx="33" cy="17" r="3.5" fill="rgba(155,163,242,0.6)" />
      <circle cx="46" cy="17" r="3.5" fill="rgba(255,255,255,0.18)" />
      <rect x="70" y="11" width="200" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
      {/* sidebar */}
      <rect x="14" y="44" width="74" height="172" rx="9" fill="rgba(155,163,242,0.08)" />
      <rect x="26" y="58" width="50" height="7" rx="3.5" fill="rgba(155,163,242,0.5)" />
      <rect x="26" y="74" width="40" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="26" y="88" width="44" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="26" y="102" width="36" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      {/* content cards */}
      <rect x="100" y="44" width="106" height="74" rx="10" fill="rgba(91,95,232,0.20)" stroke="rgba(91,95,232,0.4)" />
      <rect x="114" y="58" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.5)" />
      <rect x="114" y="92" width="30" height="14" rx="4" fill="#9BA3F2" />
      <rect x="218" y="44" width="106" height="74" rx="10" fill="rgba(224,185,120,0.14)" stroke="rgba(224,185,120,0.35)" />
      <rect x="232" y="58" width="48" height="7" rx="3.5" fill="rgba(255,255,255,0.4)" />
      <rect x="232" y="92" width="30" height="14" rx="4" fill="#E0B978" />
      {/* chart row */}
      <rect x="100" y="130" width="224" height="86" rx="10" fill="rgba(255,255,255,0.04)" />
      <rect x="118" y="188" width="16" height="14" rx="2" fill="rgba(155,163,242,0.7)" />
      <rect x="144" y="174" width="16" height="28" rx="2" fill="rgba(155,163,242,0.7)" />
      <rect x="170" y="160" width="16" height="42" rx="2" fill="#9BA3F2" />
      <rect x="196" y="178" width="16" height="24" rx="2" fill="rgba(155,163,242,0.7)" />
      <rect x="222" y="166" width="16" height="36" rx="2" fill="#9BA3F2" />
      <rect x="248" y="150" width="16" height="52" rx="2" fill="#E0B978" />
      <rect x="274" y="172" width="16" height="30" rx="2" fill="rgba(224,185,120,0.7)" />
    </svg>
  );
}

function Mobile() {
  return (
    <svg viewBox="0 0 180 300" className="w-auto max-h-[280px] h-full drop-shadow-2xl" role="img" aria-label="Mobiele app">
      <rect x="2" y="2" width="176" height="296" rx="26" fill="#141021" stroke="rgba(155,163,242,0.25)" />
      <rect x="10" y="10" width="160" height="280" rx="20" fill="#0e0b18" />
      {/* notch */}
      <rect x="64" y="16" width="52" height="7" rx="3.5" fill="#1b1730" />
      {/* header */}
      <rect x="22" y="36" width="70" height="10" rx="5" fill="rgba(255,255,255,0.7)" />
      <circle cx="156" cy="41" r="9" fill="rgba(91,95,232,0.3)" />
      {/* hero card */}
      <rect x="22" y="58" width="136" height="60" rx="12" fill="rgba(91,95,232,0.22)" stroke="rgba(91,95,232,0.4)" />
      <rect x="34" y="72" width="60" height="8" rx="4" fill="rgba(255,255,255,0.55)" />
      <rect x="34" y="90" width="40" height="16" rx="5" fill="#9BA3F2" />
      {/* list rows */}
      {[130, 162, 194].map((y, i) => (
        <g key={y}>
          <rect x="22" y={y} width="136" height="24" rx="8" fill="rgba(255,255,255,0.05)" />
          <circle cx="36" cy={y + 12} r="7" fill={i === 1 ? "#E0B978" : "rgba(155,163,242,0.6)"} />
          <rect x="50" y={y + 8} width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />
        </g>
      ))}
      {/* bottom tab bar */}
      <rect x="10" y="262" width="160" height="28" rx="0" fill="#15111f" />
      <circle cx="50" cy="276" r="4" fill="#9BA3F2" />
      <circle cx="90" cy="276" r="4" fill="rgba(255,255,255,0.25)" />
      <circle cx="130" cy="276" r="4" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

function Ai() {
  return (
    <svg viewBox="0 0 340 230" className="w-full max-w-[340px] h-auto drop-shadow-2xl" role="img" aria-label="AI-tool">
      <rect x="2" y="2" width="336" height="226" rx="14" fill="#141021" stroke="rgba(155,163,242,0.25)" />
      {/* header with spark */}
      <g transform="translate(22 22)">
        <path d="M10 0v6M10 14v6M0 10h6M14 10h6M3 3l4 4M13 13l4 4M17 3l-4 4M7 13l-4 4" stroke="#E0B978" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="10" r="3" fill="#E0B978" />
      </g>
      <rect x="54" y="26" width="90" height="10" rx="5" fill="rgba(255,255,255,0.6)" />
      {/* incoming bubble */}
      <rect x="22" y="60" width="180" height="44" rx="12" fill="rgba(155,163,242,0.12)" />
      <rect x="36" y="72" width="150" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
      <rect x="36" y="84" width="110" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
      {/* outgoing bubble (accent) */}
      <rect x="120" y="116" width="198" height="56" rx="12" fill="rgba(91,95,232,0.28)" stroke="rgba(91,95,232,0.45)" />
      <rect x="134" y="128" width="170" height="6" rx="3" fill="rgba(255,255,255,0.55)" />
      <rect x="134" y="140" width="150" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
      <rect x="134" y="152" width="90" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
      {/* input bar */}
      <rect x="22" y="186" width="296" height="26" rx="13" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
      <rect x="36" y="196" width="160" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
      <circle cx="304" cy="199" r="9" fill="#9BA3F2" />
    </svg>
  );
}

export default function ProductMockup({ type }: { type: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Brand-gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, rgba(91,95,232,0.20) 0%, rgba(63,68,201,0.10) 50%, rgba(224,185,120,0.12) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(91,95,232,0.28) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex h-full w-full items-center justify-center p-7 sm:p-9">
        {type === "mobile" ? <Mobile /> : type === "ai" ? <Ai /> : <Browser />}
      </div>
    </div>
  );
}
