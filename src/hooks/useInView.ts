import { useEffect, useRef, useState } from "react";
import type { UseInViewOptions } from "../interfaces";

/**
 * Tracks whether a DOM element has entered the viewport using the
 * `IntersectionObserver` API. Observation is one-shot: once the element
 * becomes visible the observer disconnects automatically.
 *
 * @param options.threshold  - Visibility ratio required to trigger (default `0.25`).
 * @param options.rootMargin - CSS-style margin applied to the root viewport (default `"0px"`).
 * @returns `{ ref, isInView }` — attach `ref` to the target element;
 *          `isInView` flips to `true` once the threshold is met.
 *
 * @example
 * ```tsx
 * const { ref, isInView } = useInView({ threshold: 0.25 });
 * return <div ref={ref}>{isInView && <img src={src} />}</div>;
 * ```
 */
export default function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.25, rootMargin = "0px" } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // One-shot: stop after first intersection
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
