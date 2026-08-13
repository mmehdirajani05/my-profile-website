"use client";

import { ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { CarouselSkeleton } from "@/components/portfolio/carousel-skeleton";
import { isVideoUrl } from "@/lib/projects";
import type { PortfolioSlide } from "@/lib/portfolio-sections";

type SectionMediaCarouselProps = {
  slides: PortfolioSlide[];
  title: string;
  projectId: string;
  accent: string;
  autoPlayMs?: number;
  fullPageCaptures?: boolean;
  mobileScreens?: boolean;
  compactMobile?: boolean;
  visitUrl?: string;
};

function stopCarouselClick(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function PlaceholderSlide({
  label,
  accent,
  index,
}: {
  label: string;
  accent: string;
  index: number;
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-slate-900"
      style={{
        background: `radial-gradient(circle at 20% 20%, ${accent}33, transparent 45%), radial-gradient(circle at 80% 80%, ${accent}22, transparent 40%), linear-gradient(145deg, #0f172a 0%, #1e293b 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <span
        className="relative mb-4 grid size-16 place-items-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur"
        style={{ color: accent }}
      >
        {index === 2 ? <Play size={28} fill="currentColor" /> : <ImageIcon size={28} />}
      </span>
      <p className="relative max-w-md px-6 text-center text-sm font-medium tracking-wide text-white/80">
        {label}
      </p>
      <p className="relative mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
        Placeholder {index + 1}
      </p>
    </div>
  );
}

function MobileScreenSlide({
  src,
  alt,
  label,
  compact = false,
}: {
  src: string;
  alt: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center bg-gradient-to-b from-slate-100 via-white to-slate-100 ${
        compact ? "px-3 py-5" : "px-4 py-8 sm:px-6 sm:py-10"
      }`}
    >
      <div
        className={`relative max-w-full rounded-[2rem] border-[8px] border-slate-950 bg-slate-950 shadow-xl shadow-black/20 ${
          compact ? "w-[168px]" : "w-[250px] sm:w-[270px] rounded-[2.75rem] border-[10px] shadow-2xl"
        }`}
      >
        <div
          className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-xl bg-slate-950 ${
            compact ? "h-4 w-16" : "h-6 w-28 rounded-b-2xl"
          }`}
        />
        <div className={`overflow-hidden bg-white ${compact ? "rounded-[1.25rem]" : "rounded-[2rem]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="block aspect-[9/19.5] w-full object-cover object-top"
            draggable={false}
          />
        </div>
        {!compact ? (
          <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/30" />
        ) : null}
      </div>
      {!compact ? (
        <p className="mt-4 font-mono text-xs text-slate-500">{label}</p>
      ) : null}
    </div>
  );
}

function VideoDemoSlide({
  src,
  accent,
  projectId,
  minHeightClass,
}: {
  src: string;
  accent: string;
  projectId: string;
  minHeightClass: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${minHeightClass}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 18%, ${accent}18, transparent 42%), radial-gradient(circle at 82% 82%, ${accent}10, transparent 38%), linear-gradient(180deg, #f8f7f5 0%, #f2f0ed 48%, #ebe8e4 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0">
        <video
          key={`${projectId}-${src}`}
          className="h-full w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          controls
        />
      </div>
    </div>
  );
}

function FullPageCapture({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div
      className="max-h-[460px] overflow-y-auto overscroll-contain bg-slate-100"
      onClick={stopCarouselClick}
      onMouseDown={stopCarouselClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block h-auto w-full" draggable={false} />
    </div>
  );
}

export function SectionMediaCarousel({
  slides,
  title,
  projectId,
  accent,
  autoPlayMs = 5000,
  fullPageCaptures = false,
  mobileScreens = false,
  compactMobile = false,
  visitUrl,
}: SectionMediaCarouselProps) {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMountedRef = useRef(false);
  const count = slides.length;

  const updatePaused = useCallback((next: boolean) => {
    if (isMountedRef.current) {
      setPaused(next);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    setReady(true);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const goTo = useCallback(
    (direction: -1 | 1) => {
      setActive((index) => (index + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!ready || count <= 1 || paused) {
      return;
    }

    const timer = window.setInterval(() => goTo(1), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, count, goTo, paused, ready]);

  if (!ready) {
    return <CarouselSkeleton compactMobile={compactMobile} className="w-full" />;
  }

  const current = slides[active];
  const isVideoDemo = Boolean(
    current.src &&
      (current.type === "video" || isVideoUrl(current.src)),
  );

  return (
    <div
      className="w-full"
      onClick={stopCarouselClick}
      onMouseEnter={() => updatePaused(true)}
      onMouseLeave={() => updatePaused(false)}
      onFocusCapture={() => updatePaused(true)}
      onBlurCapture={() => updatePaused(false)}
    >
      <div
        className={`relative w-full overflow-hidden border border-black/10 bg-white shadow-lg shadow-black/[0.06] ${
          compactMobile ? "rounded-[1.5rem]" : "rounded-[2rem] shadow-xl shadow-black/[0.06]"
        }`}
      >
        {mobileScreens ? (
          current.type === "placeholder" || !current.src ? (
            <div className={`relative ${compactMobile ? "aspect-[9/14]" : "aspect-[9/16]"}`}>
              <PlaceholderSlide
                label={current.label}
                accent={accent}
                index={active}
              />
            </div>
          ) : (
            <MobileScreenSlide
              src={current.src}
              alt={current.label || `${title} screen ${active + 1}`}
              label={current.label}
              compact={compactMobile}
            />
          )
        ) : fullPageCaptures ? (
          <div className="overflow-hidden">
            <button
              type="button"
              onClick={() => visitUrl && window.open(visitUrl, "_blank", "noopener,noreferrer")}
              className={`flex w-full items-center justify-between border-b border-black/10 bg-slate-50 px-4 py-2.5 text-left ${
                visitUrl ? "cursor-pointer transition hover:bg-slate-100" : ""
              }`}
            >
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                {visitUrl ? `${current.label} · Open live site` : current.label}
              </span>
            </button>
            {current.type === "placeholder" || !current.src ? (
              <div className="relative aspect-[16/10]">
                <PlaceholderSlide
                  label={current.label}
                  accent={accent}
                  index={active}
                />
              </div>
            ) : (
              <FullPageCapture
                src={current.src}
                alt={current.label || `${title} slide ${active + 1}`}
              />
            )}
          </div>
        ) : isVideoDemo && current.src ? (
          <VideoDemoSlide
            src={current.src}
            accent={accent}
            projectId={projectId}
            minHeightClass="aspect-[16/10] min-h-[360px] sm:min-h-[440px] lg:min-h-[520px]"
          />
        ) : (
          <div className="relative aspect-[16/10] sm:aspect-video">
            {current.type === "placeholder" || !current.src ? (
              <PlaceholderSlide
                label={current.label}
                accent={accent}
                index={active}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={current.src}
                alt={current.label || `${title} slide ${active + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
            )}
          </div>
        )}

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={(event) => {
                stopCarouselClick(event);
                goTo(-1);
              }}
              className={`absolute left-2 top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 ${
                compactMobile ? "size-8" : "left-4 size-11"
              }`}
            >
              <ChevronLeft size={compactMobile ? 16 : 20} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={(event) => {
                stopCarouselClick(event);
                goTo(1);
              }}
              className={`absolute right-2 top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 ${
                compactMobile ? "size-8" : "right-4 size-11"
              }`}
            >
              <ChevronRight size={compactMobile ? 16 : 20} />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          className={`flex items-center justify-between gap-4 ${compactMobile ? "mt-3" : "mt-5"}`}
          onClick={stopCarouselClick}
        >
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${
                  active === index ? "w-8" : "w-2 bg-black/15 hover:bg-black/25"
                }`}
                style={active === index ? { backgroundColor: accent } : undefined}
              />
            ))}
          </div>
          <p className="font-mono text-xs text-slate-500">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
