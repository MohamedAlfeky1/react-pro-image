import type { CSSProperties } from "react";

export interface UseImageLoaderOptions {
  src: string;
  avifSrc?: string;
  webpSrc?: string;
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
}

// 1. Define strict types for the internal component props
export interface ImageWithFormatsProps {
  src: string;
  alt: string;
  avifSrc?: string;
  webpSrc?: string;
  customStyles?: CSSProperties;
}
