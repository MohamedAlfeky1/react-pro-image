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

## Introduction

`react-pro-image` gives you one `<OptimizedImage />` component for the image
loading work most React apps repeat by hand.

It can delay off-screen image downloads, choose AVIF or WebP when the browser
supports them, show a lightweight placeholder while the full image loads, and
render a fallback image when the primary source fails.

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

React `>=17.0.0` is required as a peer dependency.

## Documentation

You can find the React Pro Image documentation [on this website](https://mohamedalfeky1.github.io/react-pro-image/).

Check out the [Quick Start](https://mohamedalfeky1.github.io/react-pro-image/getting-started/quick-start) page for a quick overview.

The documentation is divided into several sections:

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
- [AutoFormatConfig](https://mohamedalfeky1.github.io/react-pro-image/api-reference/auto-format-config)
- [Hooks](https://mohamedalfeky1.github.io/react-pro-image/api-reference/hooks)
- [Exported Types](https://mohamedalfeky1.github.io/react-pro-image/api-reference/exported-types)
- [Where to Get Support](https://github.com/MohamedAlfeky1/react-pro-image/issues)
- [Contributing](https://github.com/MohamedAlfeky1/react-pro-image/pulls)

You can improve it by sending pull requests to this repository.

## Usage Examples

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

---

### Self-Hosted Images

Use this mode when you host your own JPEG, PNG, AVIF, or WebP files. This
advanced example provides modern formats, a placeholder, and an error fallback.

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

## Links

- [Documentation](https://mohamedalfeky1.github.io/react-pro-image/)
- [npm Package](https://www.npmjs.com/package/react-pro-image)
