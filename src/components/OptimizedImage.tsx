import useImageLoader from "../hooks/useImageLoader";
import type { OptimizedImageProps } from "../interfaces";

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  placeholder,
  fallback,
}: OptimizedImageProps) {
  const imageState = useImageLoader({ src });

  // If error happens and we have a fallback, show it directly
  if (imageState === "error" && fallback) {
    return (
      <div style={{ width, height, position: "relative" }}>
        <img
          src={fallback}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  // Determine opacities based on our state machine
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
        <img
          src={placeholder}
          alt={alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      {/* 2. Real Full-Quality Image (Top Layer) */}
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}
