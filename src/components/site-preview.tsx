"use client";

// Preview van een externe site: toont een (volledige-pagina) screenshot die
// langzaam verticaal door het venster scrolt en alterneert (omhoog/omlaag),
// als een rustige rondleiding. Pauzeert bij hover. De omliggende link opent
// de echte site in een nieuw tabblad.
//
// Live inbedden via iframe is bewust losgelaten: oreq.nl en ericsweder.com
// sturen X-Frame-Options / CSP frame-ancestors 'self', waardoor framing op
// een ander domein door de browser geweigerd wordt.
//
// Het scroll-effect komt pas goed tot zijn recht met een lange volledige-
// pagina screenshot. Geef per voorbeeld de echte beeldverhouding mee via
// imgW/imgH zodat next/image niet vervormt.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SitePreview({
  image,
  alt,
  imgW = 1280,
  imgH = 1024,
}: {
  image: string;
  alt: string;
  imgW?: number;
  imgH?: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      const track = trackRef.current;
      if (!box || !track) return;
      setDistance(Math.max(0, track.offsetHeight - box.offsetHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (boxRef.current) ro.observe(boxRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // ~26px per seconde, met een minimum zodat korte screenshots niet jachtig zijn.
  const duration = Math.max(10, Math.round(distance / 26));

  return (
    <div
      ref={boxRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)"
    >
      <div
        ref={trackRef}
        className={distance > 0 ? "site-scroll-anim absolute top-0 left-0 w-full" : "absolute top-0 left-0 w-full"}
        style={
          distance > 0
            ? ({
                ["--site-scroll-distance"]: `${distance}px`,
                animation: `site-scroll ${duration}s ease-in-out infinite alternate`,
                animationPlayState: paused ? "paused" : "running",
              } as React.CSSProperties)
            : undefined
        }
      >
        <Image
          src={image}
          alt={alt}
          width={imgW}
          height={imgH}
          sizes="(max-width: 640px) 90vw, 360px"
          className="w-full h-auto"
        />
      </div>

      {/* Hover-overlay met 'open extern'-affordance */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/ex:opacity-100 transition-opacity duration-300">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white">
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path
              d="M3.5 8.5l5-5M4.5 3.5h4v4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
