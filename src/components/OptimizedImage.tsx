import { useImageFormatSupport } from "../hooks/useImageFormatSupport";
import useImageLoader from "../hooks/useImageLoader";
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
}: OptimizedImageProps) {
  const imageState = useImageLoader({
    src,
    autoSrc,
    autoFormat,
    avifSrc,
    webpSrc,
  });

  if (imageState === "error" && (fallback || autoFallback)) {
    return (
      <div style={{ width, height, position: "relative" }}>
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

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Placeholder Image (Bottom Layer) */}
      {(placeholder || autoPlaceholder) && (
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

      {/* 2. Real Full-Quality Image (Top Layer) */}
      <ImageWithFormats
        src={src}
        autoSrc={autoSrc}
        autoFormat={autoFormat}
        avifSrc={avifSrc}
        webpSrc={webpSrc}
        alt={alt}
        customStyles={{
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}
