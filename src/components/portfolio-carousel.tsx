"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductMockup from "@/components/product-mockup";

interface Story {
  id: string;
  mockup: string;
  name: string;
  business: string;
  quote: string;
  project: string;
  result: string;
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PortfolioCarousel({
  stories,
  projectLabel,
  resultLabel,
}: {
  stories: readonly Story[];
  projectLabel: string;
  resultLabel: string;
}) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = stories.length;

  const paginate = useCallback(
    (dir: number) => {
      setState(([i]) => [(i + dir + count) % count, dir]);
    },
    [count]
  );

  const goTo = (i: number) => {
    setState(([cur]) => [i, i > cur ? 1 : -1]);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), 6000);
    return () => clearInterval(id);
  }, [paginate, paused, index]);

  const story = stories[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-3xl card-depth">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={story.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="grid grid-cols-1 md:grid-cols-2 h-[600px] md:h-[440px]"
          >
            {/* Product mockup */}
            <div className="relative h-56 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-(--color-border)">
              <ProductMockup type={story.mockup} />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-7 sm:p-10 gap-5 overflow-hidden">
              <div>
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-(--color-accent-light) mb-5"
                >
                  <path
                    d="M9.5 7C6.5 7 5 9.2 5 12v5h5v-5H7.5c0-1.7.7-2.8 2-3L9.5 7zm9 0c-3 0-4.5 2.2-4.5 5v5h5v-5h-2.5c0-1.7.7-2.8 2-3L18.5 7z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-lg sm:text-xl leading-relaxed text-(--color-foreground)">
                  {story.quote}
                </p>
              </div>

              <div>
                <p className="font-semibold">{story.name}</p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 rounded-xl bg-[rgba(91,95,232,0.08)] border border-[rgba(91,95,232,0.2)] px-4 py-3">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-(--color-muted)">
                      {projectLabel}
                    </p>
                    <p className="mt-1 text-sm">{story.project}</p>
                  </div>
                  <div className="flex-1 rounded-xl bg-[rgba(91,95,232,0.14)] border border-[rgba(91,95,232,0.3)] px-4 py-3">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-(--color-muted)">
                      {resultLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-(--color-accent-light)">
                      {story.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Ga naar verhaal ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-7 bg-(--color-accent)"
                  : "w-2 bg-(--color-border) hover:bg-(--color-muted)"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => paginate(-1)}
            aria-label="Vorige"
            className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-(--color-muted-light) hover:text-(--color-foreground) hover:border-(--color-accent) transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Volgende"
            className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-(--color-muted-light) hover:text-(--color-foreground) hover:border-(--color-accent) transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
