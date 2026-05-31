import useImageLoader from "../hooks/useImageLoader";
import useInView from "../hooks/useInView";
import type { ImageWithFormatsProps, OptimizedImageProps } from "../interfaces";

/**
 * Renders an `<img>` element using the best available source format.
 *
 * Resolution order: AVIF → WebP → original `src`.
 * The first truthy source wins; this lets consumers supply modern formats
 * as progressive enhancements without any extra branching in parent components.
 *
 * @internal Not exported from the package — used only by `OptimizedImage`.
 */
function ImageWithFormats({
  src,
  alt,
  avifSrc,
  webpSrc,
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

  if (avifSrc) {
    return <img src={avifSrc} alt={alt} style={sharedStyles} />;
  }

  if (webpSrc) {
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
  avifSrc,
  webpSrc,
  alt,
  width,
  height,
  placeholder,
  fallback,
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
    avifSrc,
    webpSrc,
    isInView: lazy ? isInView : true,
  });

  // If the image failed to load and the consumer provided a fallback,
  // render the fallback image (with optional AVIF/WebP variants) and bail out.
  if (imageState === "error" && fallback) {
    return (
      <div ref={ref} style={{ width, height, position: "relative" }}>
        <ImageWithFormats
          avifSrc={avifFallback}
          webpSrc={webpFallback}
          src={fallback}
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
          avifSrc={avifSrc}
          webpSrc={webpSrc}
          alt={alt}
        />
      )}
    </div>
  );
}
