import { useEffect, useState } from "react";
import type { UseImageLoaderOptions } from "../interfaces";
import type { ImageLoadState } from "../types";

export default function useImageLoader({
  src,
  avifSrc,
  webpSrc,
}: UseImageLoaderOptions) {
  // Pick the best available format (avif > webp > original)
  let activeSrc: string;

  if (avifSrc) {
    activeSrc = avifSrc;
  } else if (webpSrc) {
    activeSrc = webpSrc;
  } else {
    activeSrc = src;
  }

  const [imageState, setImageState] = useState<ImageLoadState>("idle");

  // Preload the active source and track its load state
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageState("loaded");
    img.onerror = () => setImageState("error");
    img.src = activeSrc;

    // Cleanup listeners on unmount or src change
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [activeSrc]);

  return imageState;
}
