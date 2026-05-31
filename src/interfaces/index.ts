import type { CSSProperties } from "react";

export interface UseImageLoaderOptions {
  src: string;
  avifSrc?: string;
  webpSrc?: string;
  /** When true, the hook starts preloading the image. Default: false */
  isInView?: boolean;
}

export interface OptimizedImageProps {
  src: string;
  avifSrc?: string;
  webpSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  placeholder?: string;
  fallback?: string;
  avifFallback?: string;
  webpFallback?: string;
  /** Enable lazy loading with IntersectionObserver. Default: true */
  lazy?: boolean;
  /** How much of the image must be visible before loading (0 to 1). Default: 0.25 */
  threshold?: number;
  /** Extra margin to start loading before element is visible. Default: "0px" */
  rootMargin?: string;
}

// 1. Define strict types for the internal component props
export interface ImageWithFormatsProps {
  src: string;
  alt: string;
  avifSrc?: string;
  webpSrc?: string;
  customStyles?: CSSProperties;
}

export interface UseInViewOptions {
  /** Percentage of the element that must be visible to trigger (0–1). Default: `0.25` */
  threshold?: number;
  /** Margin around the root used to expand/shrink the observation area. Default: `"0px"` */
  rootMargin?: string;
}
