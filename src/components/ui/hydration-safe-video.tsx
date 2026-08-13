"use client";

import { useEffect, useState, type VideoHTMLAttributes } from "react";

type HydrationSafeVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  placeholderClassName?: string;
};

export function HydrationSafeVideo({
  placeholderClassName,
  className,
  ...props
}: HydrationSafeVideoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={placeholderClassName ?? className}
        aria-hidden="true"
      />
    );
  }

  return <video className={className} {...props} />;
}
