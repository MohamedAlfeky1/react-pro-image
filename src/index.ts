// ─── Main Component ─────────────────────────────────────────────────────────
export { default as OptimizedImage } from "./components/OptimizedImage";

// ─── Hooks ──────────────────────────────────────────────────────────────────
export { useImageFormatSupport } from "./hooks/useImageFormatSupport";
export { default as useImageLoader } from "./hooks/useImageLoader";
export { default as useInView } from "./hooks/useInView";

// ─── Types & Interfaces ────────────────────────────────────────────────────
export type {
  AutoFormatConfig,
  OptimizedImageProps,
  ImageWithFormatsProps,
  UseImageLoaderOptions,
  UseInViewOptions,
} from "./interfaces";

export type { ImageLoadState } from "./types";
