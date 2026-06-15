"use client";

// Preview van een externe site: een volledige-pagina screenshot die in een
// naadloze, continue lus verticaal doorscrolt (twee gestapelde kopieën,
// -50% = precies één kopie). Pauzeert bij hover. Werkt in elk formaat: de
// scrollduur wordt gemeten uit de gerenderde hoogte, zodat de snelheid
// gelijk blijft in een kleine tegel én in een groter portfolio-panel.
//
// Live inbedden via iframe is bewust losgelaten: oreq.nl en ericsweder.com
// sturen X-Frame-Options / CSP frame-ancestors 'self'.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SPEED = 34; // px per seconde

export default function SitePreview({
  image,
  alt,
  imgW = 1280,
  imgH = 1024,
  // Vorm van het venster; default is een tegel met rand. Geef bv. "h-full"
  // mee om een panel te vullen.
  className = "aspect-video rounded-xl border border-(--color-border)",
}: {
  image: string;
  alt: string;
  imgW?: number;
  imgH?: number;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(() =>
    Math.max(18, Math.round(((320 * imgH) / imgW) / SPEED))
  );

  useEffect(() => {
    const measure = () => {
      const tr = trackRef.current;
      if (!tr) return;
      const oneCopy = tr.offsetHeight / 2; // twee identieke kopieën
      if (oneCopy > 0) setDuration(Math.max(18, Math.round(oneCopy / SPEED)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative w-full overflow-hidden bg-(--color-surface) ${className}`}
    >
      <div
        ref={trackRef}
        className={`site-scroll-anim absolute top-0 left-0 w-full ${
          paused ? "is-paused" : ""
        }`}
        style={
          { "--site-scroll-duration": `${duration}s` } as React.CSSProperties
        }
      >
        {/* Twee identieke kopieën onder elkaar voor de naadloze lus */}
        <Image
          src={image}
          alt={alt}
          width={imgW}
          height={imgH}
          sizes="(max-width: 640px) 90vw, 480px"
          className="block w-full h-auto"
          priority
        />
        <Image
          src={image}
          alt=""
          aria-hidden
          width={imgW}
          height={imgH}
          sizes="(max-width: 640px) 90vw, 480px"
          className="block w-full h-auto"
        />
      </div>

      {/* Hover-overlay met 'open extern'-affordance (in contexten met group/ex) */}
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
