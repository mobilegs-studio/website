"use client";

// Preview van een externe site: een volledige-pagina screenshot die in een
// naadloze, continue lus verticaal doorscrolt. De track bevat twee identieke
// kopieën; de animatie schuift precies één kopie omhoog (-50%), waardoor de
// bovenkant naadloos op de onderkant aansluit en het oneindig doorloopt.
// Start direct bij render (duur uit de beeldverhouding, geen meet-vertraging).
// Pauzeert bij hover. De omliggende link opent de echte site in een nieuw tab.
//
// Live inbedden via iframe is bewust losgelaten: oreq.nl en ericsweder.com
// sturen X-Frame-Options / CSP frame-ancestors 'self'.

import { useState } from "react";
import Image from "next/image";

// Aangenomen weergavebreedte van een tegel (Tailwind w-72 = 288px); bepaalt
// samen met de beeldverhouding de gerenderde hoogte en dus de scrollduur.
const TILE_WIDTH = 288;
const SPEED = 34; // px per seconde

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
  const [paused, setPaused] = useState(false);

  const renderedHeight = (TILE_WIDTH * imgH) / imgW;
  const duration = Math.max(18, Math.round(renderedHeight / SPEED));

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)"
    >
      <div
        className="site-scroll-anim absolute top-0 left-0 w-full"
        style={{
          animation: `site-scroll ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* Twee identieke kopieën onder elkaar voor de naadloze lus */}
        <Image
          src={image}
          alt={alt}
          width={imgW}
          height={imgH}
          sizes="(max-width: 640px) 90vw, 360px"
          className="block w-full h-auto"
          priority
        />
        <Image
          src={image}
          alt=""
          aria-hidden
          width={imgW}
          height={imgH}
          sizes="(max-width: 640px) 90vw, 360px"
          className="block w-full h-auto"
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
