import type { CSSProperties } from "react";

/**
 * Options configuration for the custom `useImageLoader` hook.
 * Handles the state management of preloading and switching between image formats.
 */
export interface UseImageLoaderOptions {
  /** The fallback standard image source (JPEG, PNG, etc.) */
  src: string;
  /** Optional high-efficiency AVIF source */
  avifSrc?: string;
  /** Optional WebP source */
  webpSrc?: string;
}

/**
 * Base properties shared by all configurations of the OptimizedImage component.
 * Contains standard image properties and format-specific overrides.
 */
interface OptimizedImageBaseProps {
  /** Optional high-efficiency AVIF image source */
  avifSrc?: string;
  /** Optional WebP image source */
  webpSrc?: string;
  /** Accessible alternative text description for the image */
  alt: string;
  /** Visual display width of the image (in pixels) */
  width: number;
  /** Visual display height of the image (in pixels) */
  height: number;
  /** Optional CSS class names for styling the outer container */
  className?: string;
  /** Optional AVIF override specifically for the error fallback image */
  avifFallback?: string;
  /** Optional WebP override specifically for the error fallback image */
  webpFallback?: string;
}

// ============================================================================
// MUTUALLY EXCLUSIVE PROP TYPES
// ============================================================================
// TypeScript does not support native XOR types. We implement exclusive prop pairs
// using unions of types where one prop is set to `?: never`. This prevents a developer
// from accidentally providing both keys at the same time.
// ============================================================================

/** Ensure either `src` or `autoSrc` is provided, but never both. */
type ManualSrc = { 
  /** Manual standard image source URL (JPEG, PNG, etc.) */
  src: string; 
  autoSrc?: never; 
};
type AutoSrc = { 
  /** Automatically optimized or generated source URL */
  autoSrc: string; 
  src?: never; 
};

/** Ensure at most one of `placeholder` or `autoPlaceholder` is provided. */
type ManualPlaceholder = { 
  /** Manual low-res or layout placeholder image URL (e.g. Base64 or tiny thumbnail) */
  placeholder: string; 
  autoPlaceholder?: never; 
};
type AutoPlaceholder = { 
  /** Automatically generated low-res placeholder image URL */
  autoPlaceholder: string; 
  placeholder?: never; 
};
type NoPlaceholder = { 
  placeholder?: never; 
  autoPlaceholder?: never; 
};

/** Ensure at most one of `fallback` or `autoFallback` is provided. */
type ManualFallback = { 
  /** Manual fallback image URL shown if the primary image fails to load */
  fallback: string; 
  autoFallback?: never; 
};
type AutoFallback = { 
  /** Automatically generated fallback image URL shown if the primary image fails to load */
  autoFallback: string; 
  fallback?: never; 
};
type NoFallback = { 
  fallback?: never; 
  autoFallback?: never; 
};

/**
 * Main properties for the `OptimizedImage` component.
 * Uses TypeScript intersections and unions to enforce strict exclusive prop matching:
 * - Must provide either `src` OR `autoSrc` (never both).
 * - Can optionally provide either `placeholder` OR `autoPlaceholder` (never both).
 * - Can optionally provide either `fallback` OR `autoFallback` (never both).
 */
export type OptimizedImageProps = OptimizedImageBaseProps &
  (ManualSrc | AutoSrc) &
  (ManualPlaceholder | AutoPlaceholder | NoPlaceholder) &
  (ManualFallback | AutoFallback | NoFallback);

/**
 * Properties for the internal/underlying image rendering component.
 * Standardizes source selection once mutually exclusive options have been resolved.
 */
export interface ImageWithFormatsProps {
  /** The final resolved fallback standard image source URL */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** AVIF source URL, if available */
  avifSrc?: string;
  /** WebP source URL, if available */
  webpSrc?: string;
  /** Inline styles used for transitions and layout positioning */
  customStyles?: CSSProperties;
}

