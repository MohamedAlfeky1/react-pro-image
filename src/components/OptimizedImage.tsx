import { useImageFormatSupport } from "../hooks/useImageFormatSupport";
import useImageLoader from "../hooks/useImageLoader";
import useInView from "../hooks/useInView";
import type { ImageWithFormatsProps, OptimizedImageProps } from "../interfaces";

/**
 * Internal component that resolves the best image source based on browser
 * format support and renders the appropriate `<img>` tag.
 *
 * When `autoSrc` + `autoFormat` is provided, it iterates through the
 * configured formats in priority order and appends the format query param
 * to the URL for the first supported format.
 *
 * When manual `avifSrc` / `webpSrc` is provided, it picks the best
 * supported source directly.
 */
function ImageWithFormats({
  src,
  autoSrc,
  autoFormat,
  avifSrc,
  webpSrc,
  alt,
  customStyles,
}: ImageWithFormatsProps) {
  /**
   * Base styles that position the image as an absolutely-placed cover layer.
   * The `transition` enables a smooth opacity crossfade between the
   * placeholder and the fully-loaded image.
   * Any `customStyles` (e.g. dynamic opacity) are spread on top.
   */
  const sharedStyles = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    ...customStyles,
  };

  const { avif, webp, ready } = useImageFormatSupport();

  // --- Auto-format path: build URL with format query param -----------------
  if (autoSrc && autoFormat && ready) {
    // Helper: appends "?fm=avif" or "&fm=avif" depending on whether URL already has "?"
    const separator = autoSrc.includes("?") ? "&" : "?";

    // Pick the best format: always prefer avif over webp (best quality first)
    // The formats array controls which formats are allowed, not the priority
    let bestFormat: string | undefined;

    if (avif && autoFormat.formats.includes("avif")) {
      bestFormat = "avif";
    } else if (webp && autoFormat.formats.includes("webp")) {
      bestFormat = "webp";
    }

    // If a supported format was found, use it; otherwise use autoSrc as-is
    return (
      <img
        src={
          bestFormat
            ? `${autoSrc}${separator}${autoFormat.formatKey}=${bestFormat}`
            : autoSrc
        }
        alt={alt}
        style={sharedStyles}
      />
    );
  }

  // --- Manual path: use explicit avifSrc / webpSrc -------------------------
  if (avifSrc && ready && avif) {
    return <img src={avifSrc} alt={alt} style={sharedStyles} />;
  }

  if (webpSrc && ready && webp) {
    return <img src={webpSrc} alt={alt} style={sharedStyles} />;
  }

  return <img src={src} alt={alt} style={sharedStyles} />;
}

/**
 * A performance-focused image component that combines **lazy loading**,
 * **placeholder-to-full crossfade**, and **modern format selection**
 * (AVIF / WebP) into a single drop-in `<img>` replacement.
 *
 * ## How it works
 *
 * 1. **Visibility detection** — An `IntersectionObserver` (via `useInView`)
 *    watches the container element. No network request is made until the
 *    configured `threshold` of the element is visible in the viewport.
 *
 * 2. **Off-screen preload** — Once visible, `useImageLoader` creates a
 *    hidden `Image()` object to download the best-available format
 *    (AVIF → WebP → original). The component tracks the load state
 *    (`idle` → `loading` → `loaded` | `error`).
 *
 * 3. **Crossfade transition** — The placeholder and real image are rendered
 *    as stacked layers. When the real image finishes loading, the
 *    placeholder's opacity is animated to `0`, revealing the full image.
 *
 * 4. **Error recovery** — If loading fails and a `fallback` src is provided,
 *    the fallback image is rendered instead.
 *
 * @see {@link useInView}       — viewport detection hook
 * @see {@link useImageLoader}  — off-screen preloading hook
 */
export default function OptimizedImage({
  src,
  autoSrc,
  autoFormat,
  avifSrc,
  webpSrc,
  alt,
  width,
  height,
  placeholder,
  autoPlaceholder,
  fallback,
  autoFallback,
  avifFallback,
  webpFallback,
  lazy = true,
  threshold = 0.25,
  rootMargin = "0px",
}: OptimizedImageProps) {
  // Attach `ref` to the wrapper so the IntersectionObserver can track it.
  // `isInView` flips to `true` once the element meets the visibility threshold
  // and stays `true` permanently (one-shot observation).
  const { ref, isInView } = useInView({ threshold, rootMargin });

  // Start downloading the real image only after the element enters the viewport.
  // When `lazy` is disabled, we pass `true` directly to load immediately.
  const imageState = useImageLoader({
    src,
    autoSrc,
    autoFormat,
    avifSrc,
    webpSrc,
    isInView: lazy ? isInView : true,
  });

  // If the image failed to load and the consumer provided a fallback,
  // render the fallback image (with optional AVIF/WebP variants) and bail out.
  if (imageState === "error" && (fallback || autoFallback)) {
    return (
      <div ref={ref} style={{ width, height, position: "relative" }}>
        <ImageWithFormats
          avifSrc={avifFallback}
          webpSrc={webpFallback}
          src={fallback}
          autoSrc={autoFallback}
          autoFormat={autoFormat}
          alt={alt}
        />
      </div>
    );
  }

  const isLoaded = imageState === "loaded";

  // The container uses `position: relative` + `overflow: hidden` to create
  // a stacking context. Both the placeholder and the real image are positioned
  // absolutely so they overlap — only their opacity differs.
  return (
    <div
      ref={ref}
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Placeholder layer (bottom) — visible immediately, fades out once loaded */}
      {placeholder && (
        <ImageWithFormats
          src={placeholder}
          autoSrc={autoPlaceholder}
          autoFormat={autoFormat}
          alt={alt}
          customStyles={{
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      {/* Real image layer (top) — mounted only after the element enters the viewport */}
      {(lazy ? isInView : true) && (
        <ImageWithFormats
          src={src}
          autoSrc={autoSrc}
          autoFormat={autoFormat}
          avifSrc={avifSrc}
          webpSrc={webpSrc}
          alt={alt}
        />
      )}
    </div>
  );
}
