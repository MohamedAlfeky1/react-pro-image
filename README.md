<div align="center">

# react-pro-image

**One single `<OptimizedImage />` component, a few props, and you get lazy loading, AVIF/WebP auto-format, placeholder crossfade, and error fallback — out of the box.**

[![npm version](https://img.shields.io/npm/v/react-pro-image.svg?style=flat-square&color=cb3837)](https://www.npmjs.com/package/react-pro-image)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-pro-image?style=flat-square&color=44cc11)](https://bundlephobia.com/package/react-pro-image)
[![license](https://img.shields.io/npm/l/react-pro-image?style=flat-square&color=blue)](https://github.com/MohamedAlfeky1/react-pro-image/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ Features

| Feature                        | Description                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 🚀 **Lazy Loading**            | Images load only when they enter the viewport via `IntersectionObserver` — zero layout shift, zero wasted bandwidth. |
| 🎨 **AVIF / WebP Negotiation** | Automatically detects browser support and serves the smallest modern format. Results are cached in `localStorage`.   |
| 🌄 **Placeholder Crossfade**   | Show a low-res or blurred placeholder that smoothly fades out once the full image loads.                             |
| 💥 **Error Fallback**          | Gracefully display a fallback image if the primary source fails to load.                                             |
| 🔗 **CDN Auto-Format**         | Works with Unsplash, Imgix, Cloudinary, and any CDN that accepts a format query parameter.                           |
| 📦 **Tree-Shakeable**          | ESM + CJS dual builds. Import only what you use.                                                                     |
| 🔒 **Fully Typed**             | Written in TypeScript with strict, exported types for every prop and hook.                                           |
| ⚡ **Zero Dependencies**       | Only `react` (≥ 17) as a peer dependency.                                                                            |

---

## 📦 Installation

```bash
# npm
npm install react-pro-image

# yarn
yarn add react-pro-image

# pnpm
pnpm add react-pro-image
```

> **Peer dependency:** React ≥ 17.0.0

---

## 🚀 How to use (Quick Start)

The easiest and recommended way to use `react-pro-image` is with **CDN Auto-Format**.

If your images are hosted on a CDN (like Unsplash, Imgix, or Cloudinary), you don't need to manually create different image formats. Just give the component your image URL, and it will automatically ask the CDN for the best format (AVIF or WebP) that the user's browser supports!

```tsx
import { OptimizedImage } from "react-pro-image";

function Hero() {
  return (
    <OptimizedImage
      autoSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
      autoFormat={{ formatKey: "fm", formats: ["avif", "webp"] }}
      autoPlaceholder="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=20&blur=10"
      alt="Mountain landscape"
      width={800}
      height={400}
    />
  );
}
```

### 💡 What do these props mean?

| Prop | Simple Explanation |
| --- | --- |
| `autoSrc` | The main link to your image on the CDN. The component will automatically add the format parameter to the end of this link. |
| `autoFormat` | Tells the component how your CDN expects the format request. For example, Unsplash uses `fm` (so it becomes `&fm=avif`). We also tell it to try `"avif"` first, then `"webp"`. |
| `autoPlaceholder` | A link to a very tiny, blurry version of the same image. This loads instantly and looks nice while the user waits for the big image to download. It smoothly fades out when the real image is ready. |
| `alt` | Text that describes the image. Important for accessibility (screen readers) and SEO. |
| `width` / `height` | The size of the image container in pixels. |

---

## 📖 More Ways to Use

### 1. Manual Sources (if you host the images yourself)

If you aren't using a CDN and instead have your images saved in your project (like in a `public` folder), you can pass each format manually.

The component will automatically check the browser's capabilities and pick the best one:

```tsx
<OptimizedImage
  src="/photo.jpg"
  avifSrc="/photo.avif"
  webpSrc="/photo.webp"
  placeholder="/photo-tiny.jpg"
  fallback="/photo-fallback.jpg"
  alt="A beautiful scene"
  width={800}
  height={400}
/>
```

**How the component chooses the best image:**
1. Does the browser support **AVIF** and did you provide `avifSrc`? -> It uses **AVIF**.
2. Does the browser support **WebP** and did you provide `webpSrc`? -> It uses **WebP**.
3. Otherwise? -> It falls back to the standard `src` (JPEG/PNG).

*(You only need to provide the formats you have — `avifSrc` and `webpSrc` are completely optional).*

---

### 2. Disabling Lazy Loading

By default, all images are "lazy-loaded". This means they won't even start downloading until the user scrolls down and the image enters the screen. This saves a lot of data!

However, for images at the very top of your page (like a hero image), you want them to load immediately. Set `lazy={false}`:

```tsx
<OptimizedImage
  src="/hero.jpg"
  alt="Above the fold hero"
  lazy={false}
  width={1920}
  height={800}
/>
```

---

### 3. Adjusting the Viewport Trigger (When to start loading)

You can control exactly *when* the lazy loading starts using `threshold` and `rootMargin`:

```tsx
<OptimizedImage
  src="/gallery-item.jpg"
  alt="Gallery item"
  threshold={0.1}
  rootMargin="200px"
  width={400}
  height={300}
/>
```

- **`threshold={0.1}`**: Start loading when just **10%** of the image area becomes visible on screen. (The default is `0.25` or 25%).
- **`rootMargin="200px"`**: Start loading **200 pixels before** the image even reaches the screen. This is great for making sure images are already downloaded by the time the user scrolls to them!

---

## 📚 API Reference

### `<OptimizedImage />` — Props

#### Source Props

> You must provide **either** `src` **or** `autoSrc` — never both.

| Prop         | Type               | Default | Description                                                                                                   |
| ------------ | ------------------ | ------- | ------------------------------------------------------------------------------------------------------------- |
| `src`        | `string`           | —       | Standard image URL (JPEG, PNG, etc.). **Required** if `autoSrc` is not used.                                  |
| `autoSrc`    | `string`           | —       | CDN image URL. The component appends the format query param automatically. **Required** if `src` is not used. |
| `autoFormat` | `AutoFormatConfig` | —       | Format negotiation config. **Required** when using `autoSrc`.                                                 |
| `avifSrc`    | `string`           | —       | Optional AVIF source URL. Served if the browser supports AVIF.                                                |
| `webpSrc`    | `string`           | —       | Optional WebP source URL. Served if the browser supports WebP.                                                |

#### Placeholder Props

> You may provide **either** `placeholder` **or** `autoPlaceholder` — never both.

| Prop              | Type     | Default | Description                                                                         |
| ----------------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| `placeholder`     | `string` | —       | URL of a low-res or blurred placeholder image. Fades out once the full image loads. |
| `autoPlaceholder` | `string` | —       | CDN-generated placeholder URL.                                                      |

#### Fallback Props

> You may provide **either** `fallback` **or** `autoFallback` — never both.

| Prop           | Type     | Default | Description                                                                |
| -------------- | -------- | ------- | -------------------------------------------------------------------------- |
| `fallback`     | `string` | —       | Image URL displayed if the primary source fails to load.                   |
| `autoFallback` | `string` | —       | CDN fallback URL. Format param is appended automatically via `autoFormat`. |
| `avifFallback` | `string` | —       | AVIF override for the fallback image.                                      |
| `webpFallback` | `string` | —       | WebP override for the fallback image.                                      |

#### Layout and Behavior Props

| Prop         | Type      | Default | Description                                                |
| ------------ | --------- | ------- | ---------------------------------------------------------- |
| `alt`        | `string`  | —       | Accessible alt text for the image.                         |
| `width`      | `number`  | —       | Display width of the container in pixels.                  |
| `height`     | `number`  | —       | Display height of the container in pixels.                 |
| `className`  | `string`  | —       | CSS class names applied to the outer wrapper div.          |
| `lazy`       | `boolean` | `true`  | Enable or disable lazy loading via IntersectionObserver.   |
| `threshold`  | `number`  | `0.25`  | Visibility ratio (0 to 1) required to trigger loading.     |
| `rootMargin` | `string`  | `"0px"` | CSS-style margin to expand or shrink the observation area. |

> The component also spreads any additional `HTMLDivElement` attributes onto the outer wrapper.

---

### AutoFormatConfig

Configuration object for CDN format negotiation.

```ts
interface AutoFormatConfig {
  formatKey: string;
  formats: ("avif" | "webp")[];
}
```

- **formatKey** — The query parameter key used by the CDN (e.g. `"fm"`, `"f"`, `"format"`).
- **formats** — Ordered list of modern formats to try, from most preferred to least (e.g. `["avif", "webp"]`).

**CDN examples:**

| CDN              | formatKey  | Example URL       |
| ---------------- | ---------- | ----------------- |
| Unsplash / Imgix | `"fm"`     | `...?fm=avif`     |
| Cloudinary       | `"f"`      | `...&f=webp`      |
| Custom           | `"format"` | `...?format=avif` |

---

## 🪝 Hooks

The package exports three composable hooks you can use independently in custom components.

### useImageFormatSupport()

Detects AVIF and WebP support by loading tiny test images. Results are cached in `localStorage` so detection runs only once per browser.

```tsx
import { useImageFormatSupport } from "react-pro-image";

function MyComponent() {
  const { avif, webp, ready } = useImageFormatSupport();

  if (!ready) return <p>Checking format support...</p>;

  return (
    <img
      src={avif ? "/photo.avif" : webp ? "/photo.webp" : "/photo.jpg"}
      alt="example"
    />
  );
}
```

**Returns:**

| Property | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `avif`   | `boolean` | `true` if the browser can decode AVIF. |
| `webp`   | `boolean` | `true` if the browser can decode WebP. |
| `ready`  | `boolean` | `true` once detection is complete.     |

---

### useImageLoader(options)

Preloads an image off-screen and tracks its load state. Loading is deferred until `isInView` is `true`, enabling lazy-load patterns.

```tsx
import { useImageLoader } from "react-pro-image";

function MyComponent() {
  const state = useImageLoader({
    src: "/photo.jpg",
    avifSrc: "/photo.avif",
    isInView: true,
  });
  // state: "idle" -> "loading" -> "loaded" | "error"
}
```

**Options (UseImageLoaderOptions):**

| Option       | Type               | Default | Description                              |
| ------------ | ------------------ | ------- | ---------------------------------------- |
| `src`        | `string`           | —       | Baseline image source.                   |
| `autoSrc`    | `string`           | —       | CDN image URL for auto-format mode.      |
| `autoFormat` | `AutoFormatConfig` | —       | Format config (required with `autoSrc`). |
| `avifSrc`    | `string`           | —       | Optional AVIF source (highest priority). |
| `webpSrc`    | `string`           | —       | Optional WebP source (second priority).  |
| `isInView`   | `boolean`          | `false` | When `true`, triggers the preload.       |

**Returns:** `ImageLoadState` — `"idle"` or `"loading"` or `"loaded"` or `"error"`

---

### useInView(options?)

Tracks whether a DOM element has entered the viewport using `IntersectionObserver`. One-shot: the observer disconnects after the first intersection.

```tsx
import { useInView } from "react-pro-image";

function MyComponent() {
  const { ref, isInView } = useInView({ threshold: 0.25 });

  return (
    <div ref={ref}>{isInView && <img src="/photo.jpg" alt="example" />}</div>
  );
}
```

**Options (UseInViewOptions):**

| Option       | Type     | Default | Description                                          |
| ------------ | -------- | ------- | ---------------------------------------------------- |
| `threshold`  | `number` | `0.25`  | Visibility ratio (0 to 1) required to trigger.       |
| `rootMargin` | `string` | `"0px"` | CSS margin to expand or shrink the observation area. |

**Returns:**

| Property   | Type                        | Description                                  |
| ---------- | --------------------------- | -------------------------------------------- |
| `ref`      | `RefObject<HTMLDivElement>` | Attach to the target element.                |
| `isInView` | `boolean`                   | `true` once the element meets the threshold. |

---

## 🔤 Exported Types

All types are exported and available for use in your own components:

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
| `ImageLoadState`        | Union type: `"idle"` or `"loading"` or `"loaded"` or `"error"` |

---

## ⚙️ How It Works

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
 │     - State: idle -> loading -> loaded or error         │
 │                                                         │
 │  3. Render                                              │
 │     - Placeholder layer (opacity: 1 -> 0 on load)       │
 │     - Real image layer (mounted after entering view)    │
 │     - Fallback layer (shown only on error)              │
 └─────────────────────────────────────────────────────────┘
```

---

## 🌐 Browser Support

| Feature      | Requirement                                             |
| ------------ | ------------------------------------------------------- |
| Lazy Loading | IntersectionObserver — supported in all modern browsers |
| AVIF         | Chrome 85+, Firefox 93+, Safari 16.4+                   |
| WebP         | Chrome 32+, Firefox 65+, Safari 14+                     |
| Fallback     | Automatic — gracefully falls back to src (JPEG/PNG)     |

---

## 📄 License

[MIT](https://github.com/MohamedAlfeky1/react-pro-image/blob/main/LICENSE) © [MohamedAlfeky1](https://github.com/MohamedAlfeky1)
