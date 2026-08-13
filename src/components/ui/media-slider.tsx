"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useState } from "react";

import { HydrationSafeVideo } from "@/components/ui/hydration-safe-video";
import { isVideoUrl } from "@/lib/projects";

type MediaSliderProps = {
  urls: string[];
  title: string;
  className?: string;
};

export function MediaSlider({ urls, title, className = "" }: MediaSliderProps) {
  const [active, setActive] = useState(0);
  const media = urls.filter(Boolean);
  const current = media[active];

  if (!current) {
    return (
      <div
        className={`grid aspect-video place-items-center rounded-3xl border border-black/10 bg-white text-slate-400 ${className}`}
      >
        <ImageIcon size={36} />
      </div>
    );
  }

  const goTo = (direction: -1 | 1) => {
    setActive((index) => (index + direction + media.length) % media.length);
  };

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white">
        <div className="relative aspect-video">
          {isVideoUrl(current) ? (
            <HydrationSafeVideo
              key={current}
              className="h-full w-full object-cover"
              placeholderClassName="h-full w-full"
              src={current}
              muted
              loop
              playsInline
              preload="metadata"
              controls
            />
          ) : (
            <Image
              src={current}
              alt={`${title} media ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          )}
        </div>

        {media.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous media"
              onClick={() => goTo(-1)}
              className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next media"
              onClick={() => goTo(1)}
              className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>

      {media.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {media.map((url, index) => (
            <button
              type="button"
              key={url}
              aria-label={`Show media ${index + 1}`}
              onClick={() => setActive(index)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                active === index
                  ? "border-[#1a6eff]"
                  : "border-black/10 opacity-60 hover:opacity-100"
              }`}
            >
              {isVideoUrl(url) ? (
                <HydrationSafeVideo
                  src={url}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  placeholderClassName="h-full w-full"
                />
              ) : (
                <Image
                  src={url}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
