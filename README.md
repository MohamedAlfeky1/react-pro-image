<div align="center">
  <img
    src="https://mohamedalfeky1.github.io/react-pro-image/img/logo.png"
    alt="React Pro Image logo"
    width="96"
    height="96"
  />

  <h1>react-pro-image</h1>

  <p>
    A production-ready React image component for lazy loading, AVIF/WebP format
    negotiation, progressive placeholders, and graceful error fallbacks.
  </p>

  <p>
    <a href="https://www.npmjs.com/package/react-pro-image">
      <img src="https://img.shields.io/npm/v/react-pro-image.svg?style=flat-square&color=cb3837" alt="npm version" />
    </a>
    <a href="https://bundlephobia.com/package/react-pro-image">
      <img src="https://img.shields.io/bundlephobia/minzip/react-pro-image?style=flat-square&color=44cc11" alt="bundle size" />
    </a>
    <a href="https://github.com/MohamedAlfeky1/react-pro-image/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/react-pro-image?style=flat-square&color=blue" alt="license" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript ready" />
    </a>
  </p>
</div>

---

## Features

| Feature                        | Description                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Lazy Loading**            | Images load only when they enter the viewport via `IntersectionObserver` — zero layout shift, zero wasted bandwidth. |
| **AVIF / WebP Negotiation** | Automatically detects browser support and serves the smallest modern format. Results are cached in `localStorage`.   |
| **Placeholder Crossfade**   | Show a low-res or blurred placeholder that smoothly fades out once the full image loads.                             |
| **Error Fallback**          | Gracefully display a fallback image if the primary source fails to load.                                             |
| **CDN Auto-Format**         | Works with Unsplash, Imgix, Cloudinary, and any CDN that accepts a format query parameter.                           |
| **Tree-Shakeable**          | ESM + CJS dual builds. Import only what you use.                                                                     |
| **Fully Typed**             | Written in TypeScript with strict, exported types for every prop and hook.                                           |
| **Zero Dependencies**       | Only `react` (≥ 16.8) as a peer dependency.                                                                         |

---

## Installation

```bash
npm install react-pro-image
```

```bash
yarn add react-pro-image
```

```bash
pnpm add react-pro-image
```

React `>=16.8.0` is required as a peer dependency.

---

## Documentation

Full documentation is available at **[mohamedalfeky1.github.io/react-pro-image](https://mohamedalfeky1.github.io/react-pro-image/)**.

- [Overview](https://mohamedalfeky1.github.io/react-pro-image/)
- [Installation](https://mohamedalfeky1.github.io/react-pro-image/getting-started/installation)
- [Quick Start](https://mohamedalfeky1.github.io/react-pro-image/getting-started/quick-start)
- [CDN Images](https://mohamedalfeky1.github.io/react-pro-image/usage-modes/cdn-images)
- [Self-Hosted Images](https://mohamedalfeky1.github.io/react-pro-image/usage-modes/self-hosted-images)
- [Progressive Loading](https://mohamedalfeky1.github.io/react-pro-image/loading-reliability/progressive-loading)
- [Lazy Loading](https://mohamedalfeky1.github.io/react-pro-image/loading-reliability/lazy-loading)
- [Error Fallbacks](https://mohamedalfeky1.github.io/react-pro-image/loading-reliability/error-fallbacks)
- [Architecture](https://mohamedalfeky1.github.io/react-pro-image/technical-details/architecture)
- [AVIF and WebP Negotiation](https://mohamedalfeky1.github.io/react-pro-image/technical-details/avif-webp-negotiation)
- [Browser Support](https://mohamedalfeky1.github.io/react-pro-image/technical-details/browser-support)
- [Props Reference](https://mohamedalfeky1.github.io/react-pro-image/api-reference/props-reference)
- [Hooks](https://mohamedalfeky1.github.io/react-pro-image/api-reference/hooks)
- [Exported Types](https://mohamedalfeky1.github.io/react-pro-image/api-reference/exported-types)
- [Where to Get Support](https://github.com/MohamedAlfeky1/react-pro-image/issues)
- [Contributing](https://github.com/MohamedAlfeky1/react-pro-image/blob/main/CONTRIBUTING.md)

---

## Quick Start

### CDN Images

Use this mode when your images are served from a CDN that accepts a format query
parameter, such as `fm`, `f`, or `format`.

```tsx
import { OptimizedImage } from "react-pro-image";

function Hero() {
  return (
    <OptimizedImage
      autoSrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
      autoFormat={{ formatKey: "fm", formats: ["avif", "webp"] }}
      autoPlaceholder="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=20&blur=10"
      autoFallback="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
      alt="Sunlit mountain valley with golden light"
      width={800}
      height={400}
    />
  );
}
```

### Self-Hosted Images

Use this mode when you host your own JPEG, PNG, AVIF, or WebP files.

```tsx
import { OptimizedImage } from "react-pro-image";

function GalleryImage() {
  return (
    <OptimizedImage
      src="/photo.jpg"
      avifSrc="/photo.avif"
      webpSrc="/photo.webp"
      placeholder="/photo-tiny.jpg"
      fallback="/photo-fallback.jpg"
      alt="A scenic landscape"
      width={800}
      height={400}
    />
  );
}
```

---

## Props Reference

### OptimizedImage

| Prop              | Type               | Default | Description                                                |
| ----------------- | ------------------ | ------- | ---------------------------------------------------------- |
| `src`             | `string`           | —       | Standard image source (JPEG, PNG). Mutually exclusive with `autoSrc`. |
| `autoSrc`         | `string`           | —       | CDN image URL for auto-format mode. Requires `autoFormat`. |
| `autoFormat`      | `AutoFormatConfig` | —       | CDN format query configuration (required with `autoSrc`).  |
| `avifSrc`         | `string`           | —       | Optional AVIF source for self-hosted images.               |
| `webpSrc`         | `string`           | —       | Optional WebP source for self-hosted images.               |
| `placeholder`     | `string`           | —       | Low-res placeholder URL. Mutually exclusive with `autoPlaceholder`. |
| `autoPlaceholder` | `string`           | —       | Auto-generated placeholder URL. Mutually exclusive with `placeholder`. |
| `fallback`        | `string`           | —       | Fallback image URL on error. Mutually exclusive with `autoFallback`. |
| `autoFallback`    | `string`           | —       | Auto-generated fallback URL. Mutually exclusive with `fallback`. |
| `avifFallback`    | `string`           | —       | AVIF override for the fallback image.                      |
| `webpFallback`    | `string`           | —       | WebP override for the fallback image.                      |
| `alt`             | `string`           | —       | Accessible alt text for the image.                         |
| `width`           | `number`           | —       | Display width of the container in pixels.                  |
| `height`          | `number`           | —       | Display height of the container in pixels.                 |
| `className`       | `string`           | —       | CSS class names applied to the outer wrapper div.          |
| `lazy`            | `boolean`          | `true`  | Enable or disable lazy loading via IntersectionObserver.   |
| `threshold`       | `number`           | `0.25`  | Visibility ratio (0 to 1) required to trigger loading.     |
| `rootMargin`      | `string`           | `"0px"` | CSS-style margin to expand or shrink the observation area. |

> The component also spreads any additional `HTMLDivElement` attributes onto the outer wrapper.

### AutoFormatConfig

```ts
interface AutoFormatConfig {
  formatKey: string;        // CDN query param key (e.g. "fm", "f", "format")
  formats: ("avif" | "webp")[]; // Ordered list of modern formats to try
}
```

| CDN              | formatKey  | Example URL       |
| ---------------- | ---------- | ----------------- |
| Unsplash / Imgix | `"fm"`     | `...?fm=avif`     |
| Cloudinary       | `"f"`      | `...&f=webp`      |
| Custom           | `"format"` | `...?format=avif` |

---

## Hooks

### useImageFormatSupport()

Detects AVIF and WebP support. Results are cached in `localStorage`.

```tsx
const { avif, webp, ready } = useImageFormatSupport();
```

| Returns | Type      | Description                            |
| ------- | --------- | -------------------------------------- |
| `avif`  | `boolean` | `true` if the browser can decode AVIF. |
| `webp`  | `boolean` | `true` if the browser can decode WebP. |
| `ready` | `boolean` | `true` once detection is complete.     |

### useImageLoader(options)

Preloads an image off-screen and tracks its load state.

```tsx
const state = useImageLoader({ src: "/photo.jpg", isInView: true });
// state: "idle" → "loading" → "loaded" | "error"
```

| Option       | Type               | Default | Description                              |
| ------------ | ------------------ | ------- | ---------------------------------------- |
| `src`        | `string`           | —       | Baseline image source.                   |
| `autoSrc`    | `string`           | —       | CDN image URL for auto-format mode.      |
| `autoFormat` | `AutoFormatConfig` | —       | Format config (required with `autoSrc`). |
| `avifSrc`    | `string`           | —       | Optional AVIF source (highest priority). |
| `webpSrc`    | `string`           | —       | Optional WebP source (second priority).  |
| `isInView`   | `boolean`          | `false` | When `true`, triggers the preload.       |

**Returns:** `ImageLoadState` — `"idle"` | `"loading"` | `"loaded"` | `"error"`

### useInView(options?)

One-shot `IntersectionObserver` wrapper. Disconnects after first intersection.

```tsx
const { ref, isInView } = useInView({ threshold: 0.25 });
```

| Option       | Type     | Default | Description                                         |
| ------------ | -------- | ------- | --------------------------------------------------- |
| `threshold`  | `number` | `0.25`  | Visibility ratio (0 to 1) required to trigger.      |
| `rootMargin` | `string` | `"0px"` | CSS margin to expand or shrink the observation area. |

| Returns    | Type                        | Description                                  |
| ---------- | --------------------------- | -------------------------------------------- |
| `ref`      | `RefObject<HTMLDivElement>` | Attach to the target element.                |
| `isInView` | `boolean`                   | `true` once the element meets the threshold. |

---

## Exported Types

```ts
import type {
  OptimizedImageProps,
  AutoFormatConfig,
  ImageWithFormatsProps,
  UseImageLoaderOptions,
  UseInViewOptions,
  ImageLoadState,
} from "react-pro-image";
```

| Type                    | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `OptimizedImageProps`   | Full prop type for the OptimizedImage component.               |
| `AutoFormatConfig`      | Configuration for CDN format query parameters.                 |
| `ImageWithFormatsProps` | Props for the internal format-resolving image renderer.        |
| `UseImageLoaderOptions` | Options for the useImageLoader hook.                           |
| `UseInViewOptions`      | Options for the useInView hook.                                |
| `ImageLoadState`        | Union type: `"idle"` \| `"loading"` \| `"loaded"` \| `"error"` |

---

## How It Works

```
 ┌─────────────────────────────────────────────────────────┐
 │                    OptimizedImage                       │
 │                                                         │
 │  1. useInView()                                         │
 │     - IntersectionObserver watches the container        │
 │     - Flips isInView to true when threshold is met      │
 │     - Disconnects after first trigger (one-shot)        │
 │                                                         │
 │  2. useImageLoader()                                    │
 │     - Waits until isInView is true                      │
 │     - useImageFormatSupport() detects AVIF/WebP         │
 │     - Creates off-screen Image() to preload best format │
 │     - State: idle → loading → loaded or error           │
 │                                                         │
 │  3. Render                                              │
 │     - Placeholder layer (opacity: 1 → 0 on load)       │
 │     - Real image layer (mounted after entering view)    │
 │     - Fallback layer (shown only on error)              │
 └─────────────────────────────────────────────────────────┘
```

---

## Browser Support

| Feature      | Requirement                                             |
| ------------ | ------------------------------------------------------- |
| Lazy Loading | IntersectionObserver — supported in all modern browsers |
| AVIF         | Chrome 85+, Firefox 93+, Safari 16.4+                   |
| WebP         | Chrome 32+, Firefox 65+, Safari 14+                     |
| Fallback     | Automatic — gracefully falls back to src (JPEG/PNG)     |

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Security

To report a vulnerability, please see [SECURITY.md](./SECURITY.md).

## License

[MIT](https://github.com/MohamedAlfeky1/react-pro-image/blob/main/LICENSE) © [MohamedAlfeky1](https://github.com/MohamedAlfeky1)
