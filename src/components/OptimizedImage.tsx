import useImageLoader from "../hooks/useImageLoader";
import type { ImageWithFormatsProps, OptimizedImageProps } from "../interfaces";

function ImageWithFormats({
  src,
  alt,
  avifSrc,
  webpSrc,
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

  if (avifSrc) {
    return <img src={avifSrc} alt={alt} style={sharedStyles} />;
  }

  if (webpSrc) {
    return <img src={webpSrc} alt={alt} style={sharedStyles} />;
  }

  return <img src={src} alt={alt} style={sharedStyles} />;
}

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
}: OptimizedImageProps) {
  const imageState = useImageLoader({ src, avifSrc, webpSrc });

  if (imageState === "error" && fallback) {
    return (
      <div style={{ width, height, position: "relative" }}>
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
      {placeholder && (
        <ImageWithFormats
          src={placeholder}
          alt={alt}
          customStyles={{
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      {/* 2. Real Full-Quality Image (Top Layer) */}
      <ImageWithFormats
        src={src}
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
