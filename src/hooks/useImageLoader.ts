import { useEffect, useState } from "react";
import type { UseImageLoaderOptions } from "../interfaces";
import type { ImageLoadState } from "../types";
import { useImageFormatSupport } from "./useImageFormatSupport";

export default function useImageLoader({
  src,
  autoSrc,
  autoFormat,
  avifSrc,
  webpSrc,
}: UseImageLoaderOptions) {
  const { avif, webp, ready } = useImageFormatSupport();
  const [imageState, setImageState] = useState<ImageLoadState>("idle");

  // Preload the active source and track its load state
  useEffect(() => {
    if (!ready) return;

    let activeSrc: string | undefined;

    if (autoSrc && autoFormat) {
      // Pick the best format: always prefer avif over webp (best quality first)
      // The formats array controls which formats are allowed, not the priority
      let bestFormat: string | undefined;

      if (avif && autoFormat.formats.includes("avif")) {
        bestFormat = "avif";
      } else if (webp && autoFormat.formats.includes("webp")) {
        bestFormat = "webp";
      }

      if (bestFormat) {
        const separator = autoSrc.includes("?") ? "&" : "?";
        activeSrc = `${autoSrc}${separator}${autoFormat.formatKey}=${bestFormat}`;
      } else {
        activeSrc = autoSrc;
      }
    } else {
      // --- Manual path: use explicit avifSrc / webpSrc ----------------------
      if (avif && avifSrc) {
        activeSrc = avifSrc;
      } else if (webp && webpSrc) {
        activeSrc = webpSrc;
      } else {
        activeSrc = src;
      }
    }

    if (!activeSrc) {
      setImageState("error");
      return;
    }

    const img = new Image();
    img.onload = () => setImageState("loaded");
    img.onerror = () => setImageState("error");
    img.src = activeSrc;

    // Cleanup listeners on unmount or src change
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, autoSrc, autoFormat, avifSrc, webpSrc, avif, webp, ready]);

  return imageState;
}
