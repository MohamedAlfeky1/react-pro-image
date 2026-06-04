import type { CSSProperties } from "react";

/**
 * Configuration for automatic format negotiation via URL query parameters.
 *
 * When using `autoSrc`, the component appends `&{formatKey}={format}` to the
 * URL for each format the browser supports, in the order specified.
 *
 * @example
 * // Unsplash / Imgix CDN
 * { formatKey: "fm", formats: ["avif", "webp"] }
 *
 * // Cloudinary
 * { formatKey: "f", formats: ["avif", "webp"] }
 */
export interface AutoFormatConfig {
  /** The query parameter key used by the CDN for format selection (e.g. "fm", "f", "format") */
  formatKey: string;
  /** Ordered list of modern formats to try, from most preferred to least (e.g. ["avif", "webp"]) */
  formats: ("avif" | "webp")[];
}

/**
 * Options configuration for the custom `useImageLoader` hook.
 * Handles the state management of preloading and switching between image formats.
 */
export interface UseImageLoaderOptions {
  /** The fallback standard image source (JPEG, PNG, etc.) */
  src?: string;
  /** Automatically optimized or generated source URL */
  autoSrc?: string;
  /** Format configuration for autoSrc URL parameter building */
  autoFormat?: AutoFormatConfig;
  /** Optional high-efficiency AVIF source */
  avifSrc?: string;
  /** Optional WebP source */
  webpSrc?: string;
  /** When true, the hook starts preloading the image. Default: false */
  isInView?: boolean;
}

/**
 * Base properties shared by all configurations of the OptimizedImage component.
 * Contains standard image properties and format-specific overrides.
 */
interface OptimizedImageBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional high-efficiency AVIF image source */
  avifSrc?: string;
  /** Optional WebP image source */
  webpSrc?: string;
  /** Accessible alternative text description for the image */
  alt?: string;
  /** Visual display width of the image (in pixels) */
  width?: number;
  /** Visual display height of the image (in pixels) */
  height?: number;
  /** Optional CSS class names for styling the outer container */
  className?: string;
  /** Optional AVIF override specifically for the error fallback image */
  avifFallback?: string;
  /** Optional WebP override specifically for the error fallback image */
  webpFallback?: string;
  /** Enable lazy loading with IntersectionObserver. Default: true */
  lazy?: boolean;
  /** How much of the image must be visible before loading (0 to 1). Default: 0.25 */
  threshold?: number;
  /** Extra margin to start loading before element is visible. Default: "0px" */
  rootMargin?: string;
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
  autoFormat?: never;
};
type AutoSrc = {
  /** Automatically optimized or generated source URL */
  autoSrc: string;
  /** Configuration for format query parameter (required with autoSrc) */
  autoFormat: AutoFormatConfig;
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
  src?: string;
  /** Automatically optimized source URL */
  autoSrc?: string;
  /** Format configuration for autoSrc URL parameter building */
  autoFormat?: AutoFormatConfig;
  /** Alternative text for accessibility */
  alt?: string;
  /** AVIF source URL, if available */
  avifSrc?: string;
  /** WebP source URL, if available */
  webpSrc?: string;
  /** Inline styles used for transitions and layout positioning */
  customStyles?: CSSProperties;
}

export interface UseInViewOptions {
  /** Percentage of the element that must be visible to trigger (0–1). Default: `0.25` */
  threshold?: number;
  /** Margin around the root used to expand/shrink the observation area. Default: `"0px"` */
  rootMargin?: string;
}
