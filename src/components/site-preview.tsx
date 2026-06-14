"use client";

// Preview van een externe site via een screenshot, klikbaar naar de live
// site. Live inbedden via iframe is bewust losgelaten: oreq.nl en
// ericsweder.com (en de meeste serieuze sites) sturen X-Frame-Options /
// CSP frame-ancestors 'self', waardoor een iframe op een ander domein door
// de browser geweigerd wordt. De screenshot is betrouwbaar en altijd zichtbaar.

import Image from "next/image";

export default function SitePreview({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 90vw, 320px"
        className="object-cover object-top transition-transform duration-500 group-hover/ex:scale-[1.03]"
      />
      {/* Hover-overlay met 'open extern'-affordance */}
      <div className="absolute inset-0 flex items-end justify-end p-3 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/ex:opacity-100 transition-opacity duration-300">
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
