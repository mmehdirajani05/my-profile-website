type CarouselSkeletonProps = {
  compactMobile?: boolean;
  className?: string;
};

export function CarouselSkeleton({
  compactMobile = false,
  className = "",
}: CarouselSkeletonProps) {
  return (
    <div
      className={`animate-pulse border border-black/10 bg-gradient-to-b from-[#f8f7f5] to-[#ebe8e4] ${
        compactMobile
          ? "aspect-[9/14] rounded-[1.5rem]"
          : "aspect-[16/10] min-h-[360px] rounded-[2rem] sm:min-h-[440px] lg:min-h-[520px]"
      } ${className}`}
      aria-hidden="true"
    />
  );
}
