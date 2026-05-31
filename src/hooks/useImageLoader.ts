import { useEffect, useState } from "react";
import type { UseImageLoaderOptions } from "../interfaces";
import type { ImageLoadState } from "../types";

/**
 * Preloads an image off-screen and exposes its load state.
 *
 * Loading is deferred until `isInView` is `true`, enabling lazy-load
 * behaviour when combined with an intersection observer. The hook
 * selects the best available format in priority order: AVIF → WebP → original.
 *
 * @param options.src      - Original image URL (required fallback).
 * @param options.avifSrc  - Optional AVIF source (highest priority).
 * @param options.webpSrc  - Optional WebP source (second priority).
 * @param options.isInView - When `true`, triggers the preload. Pass `true`
 *                           directly to disable lazy behaviour (default `false`).
 * @returns Current load state: `"idle"` | `"loading"` | `"loaded"` | `"error"`.
 *
 * @example
 * ```tsx
 * const state = useImageLoader({ src, isInView: true });
 * // state: "idle" → "loading" → "loaded" | "error"
 * ```
 */
export default function useImageLoader({
  src,
  avifSrc,
  webpSrc,
  isInView = false,
}: UseImageLoaderOptions) {
  // Resolve source by format priority: AVIF > WebP > original
  const activeSrc = avifSrc ?? webpSrc ?? src;

  const [imageState, setImageState] = useState<ImageLoadState>("idle");

  useEffect(() => {
    if (!isInView) return;

    setImageState("loading");

    const img = new Image();
    img.onload = () => setImageState("loaded");
    img.onerror = () => setImageState("error");
    img.src = activeSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [activeSrc, isInView]);

  return imageState;
}
