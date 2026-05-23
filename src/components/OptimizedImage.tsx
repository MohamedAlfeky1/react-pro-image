import type { OptimizedImageProps } from "../interfaces";

/**
 * Base OptimizedImage Component
 * Reserves layout space to prevent Cumulative Layout Shift (CLS).
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) {
  return (
    // Wrapper div receives exact dimensions and forwards the className
    <div className={className} style={{ width, height, position: "relative" }}>
      {/* Inner image fills the reserved space completely */}
      <img src={src} alt={alt} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
