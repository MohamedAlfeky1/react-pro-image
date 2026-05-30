/**
 * useImageFormatSupport
 *
 * A React hook that detects whether the user's browser supports modern image
 * formats (AVIF and WebP). It works by attempting to load a tiny test image
 * for each format — if the browser can render it, the format is supported.
 *
 * Results are cached in `localStorage` so the detection only runs once per
 * browser, avoiding unnecessary network/decode work on subsequent visits.
 *
 * @example
 * ```tsx
 * const { avif, webp, ready } = useImageFormatSupport();
 *
 * if (!ready) return <p>Checking format support…</p>;
 *
 * return (
 *   <img src={avif ? "/photo.avif" : webp ? "/photo.webp" : "/photo.jpg"} />
 * );
 * ```
 *
 * @returns An object with three properties:
 *  - `avif`  — `true` if the browser can decode AVIF images
 *  - `webp`  — `true` if the browser can decode WebP images
 *  - `ready` — `true` once detection is complete (initially `false`)
 */
import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Test assets
// ---------------------------------------------------------------------------
// AVIF: We fetch a 1×1 AVIF encoded as a Base64 data-URI to verify the browser can
// actually decode the AVIF format.
const AVIF_TEST =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAACEwAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKBzgAPtPlAIED8GqhABwMDIBAAAAA";

// WebP: A tiny 1×1 WebP encoded as a Base64 data-URI. WebP files are small
// enough to inline directly, so no network request is needed.
const WEBP_TEST =
  "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";

// localStorage key used to persist detection results across page loads.
const CACHE_KEY = "img-support";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Attempts to load an image from `src` and resolves to `true` if the browser
 * successfully decoded it, or `false` if loading failed.
 *
 * How it works:
 *  1. Create an off-screen `<img>` element (never added to the DOM).
 *  2. Set its `src` to the test image.
 *  3. Listen for `onload` (success → true) or `onerror` (failure → false).
 *
 * The Promise is typed as `Promise<boolean>` so TypeScript knows the resolved
 * value is a boolean — without this, it would default to `Promise<unknown>`.
 */
function canLoadImage(src: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useImageFormatSupport() {
  // State shape:
  //   avif  → does the browser support AVIF?  (default: false)
  //   webp  → does the browser support WebP?  (default: false)
  //   ready → has detection finished?         (default: false)
  //
  // Components can check `ready` before acting on `avif`/`webp` to avoid
  // a flash of incorrect content while the async check is still running.
  const [support, setSupport] = useState({
    avif: false,
    webp: false,
    ready: false,
  });

  useEffect(() => {
    // --- Cache hit: reuse a previous result from localStorage -------------
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      // `cached` is a JSON string like '{"avif":true,"webp":true}'.
      // We spread it into state and set `ready: true` immediately.
      setSupport({ ...JSON.parse(cached), ready: true });
      return; // skip the network/decode tests entirely
    }

    // --- Cache miss: run the format detection tests -----------------------
    // `Promise.all` runs both checks in parallel and waits for both to finish.
    // The result is an array of two booleans: [avifSupported, webpSupported].
    Promise.all([canLoadImage(AVIF_TEST), canLoadImage(WEBP_TEST)]).then(
      ([avif, webp]) => {
        // Persist so we never re-run the tests on this browser.
        localStorage.setItem(CACHE_KEY, JSON.stringify({ avif, webp }));

        // Update React state — triggers a re-render with the final values.
        setSupport({ avif, webp, ready: true });
      },
    );
  }, []); // Empty dependency array → runs once on mount, never re-runs.

  return support;
}
