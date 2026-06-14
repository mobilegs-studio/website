"use client";

// Live preview van een externe site in een geschaald iframe, met de
// bestaande screenshot als fallback. Veel sites blokkeren framing
// (X-Frame-Options / CSP). Detecteren is niet betrouwbaar: een geblokkeerd
// iframe vuurt vaak geen load-event af. Daarom: screenshot is de basis,
// het iframe wordt eroverheen ingeladen en pas getoond zodra het echt laadt.
// Vuurt het load-event niet binnen de timeout, dan blijft de screenshot staan.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Vaste "design"-afmeting van het iframe; via scale passend gemaakt in de tile.
const FRAME_W = 1280;
const FRAME_H = 800;

export default function SitePreview({
  url,
  image,
  alt,
  // Breedte van de tile in px; bepaalt de schaal van het iframe.
  width = 288,
}: {
  url: string;
  image: string;
  alt: string;
  width?: number;
}) {
  const [live, setLive] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    // Geen load binnen 5s → aannemen dat framing geblokkeerd is, screenshot houden.
    const t = setTimeout(() => {
      if (!loaded.current) setLive(false);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  const scale = width / FRAME_W;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
      {/* Screenshot-basis */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 90vw, 360px"
        className={`object-cover object-top transition-opacity duration-500 ${
          live ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Live iframe eroverheen, geschaald. pointer-events-none zodat de
          omliggende link klikbaar blijft. */}
      <iframe
        src={url}
        title={alt}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => {
          loaded.current = true;
          setLive(true);
        }}
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className={`pointer-events-none absolute top-0 left-0 border-0 transition-opacity duration-500 ${
          live ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
