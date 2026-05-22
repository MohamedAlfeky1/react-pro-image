import { useEffect, useState } from "react";
import type { ImageLoadState } from "../types";
import type { UseImageLoaderOptions } from "../interfaces";

/**
 * A custom hook that preloads an image in the background.
 * It tracks the loading lifecycle and prevents UI render-blocking.
 *
 * @param options - Contains the image source URL.
 * @returns The current state: 'idle', 'loading', 'loaded', or 'error'.
 */
export default function useImageLoader({
  src,
}: UseImageLoaderOptions): ImageLoadState {
  // Track the current status of the image download process
  const [imageState, setImageState] = useState<ImageLoadState>("idle");

  useEffect(() => {
    // 1. Early exit: If no source URL is provided, mark as 'idle' and halt
    if (!src) {
      setImageState("idle");
      return;
    }

    // 2. Indicate that the download process has officially started
    setImageState("loading");

    // 3. Create an invisible HTMLImageElement in memory to handle the download
    const img = new Image();

    // 4. Attach event listeners FIRST to ensure we catch instantly cached images
    img.onload = () => {
      // Triggered when the image is successfully downloaded
      setImageState("loaded");
    };

    img.onerror = () => {
      // Triggered if the image fails to download (e.g., broken link, network failure)
      setImageState("error");
    };

    // 5. Assign the src LAST. This action actually triggers the browser's network request
    img.src = src;

    // 6. Cleanup function: Runs when the component unmounts or before the next effect runs
    return () => {
      // Remove event listeners to prevent memory leaks and state updates on unmounted components
      img.onload = null;
      img.onerror = null;
    };
  }, [src]); // Re-run this effect only when the 'src' URL changes

  // 7. Return the state so the consuming component can update its UI accordingly
  return imageState;
}
