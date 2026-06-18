# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.8] - 2026-06-13

### Changed

- Bump version for CI-based publish with provenance attestation.

## [1.1.7] - 2026-06-12

### Added

- GitHub Actions workflow for automated npm publishing with Sigstore provenance.

### Changed

- All future releases are now built and published exclusively through CI.

## [1.1.2] - 2026-06-10

### Fixed

- Resolve image not being shown on the documentation overview page.

## [1.1.1] - 2026-06-10

### Changed

- Update `homepage` field to point to the documentation site.

## [1.1.0] - 2026-06-10

### Added

- Documentation site built with Docusaurus, deployed to GitHub Pages.
- GitHub Actions workflow for automatic documentation deployment.
- `SECURITY.md` with vulnerability reporting guidelines.
- `.npmignore` to keep the `docs/` directory out of the published package.

### Changed

- Streamline README and link to the external documentation site.

## [1.0.2] - 2026-06-04

### Fixed

- Render placeholder when `autoPlaceholder` is used without the `placeholder` prop.

## [1.0.1] - 2026-06-04

### Changed

- Polish documentation and sync registry description.

## [1.0.0] - 2026-06-04

### Added

- `OptimizedImage` component with lazy loading, AVIF/WebP auto-format negotiation, placeholder crossfade, and error fallback.
- `useImageFormatSupport` hook — detects AVIF and WebP browser support with `localStorage` caching.
- `useImageLoader` hook — preloads images off-screen and tracks load state.
- `useInView` hook — one-shot `IntersectionObserver` wrapper.
- Self-hosted mode (`src`, `avifSrc`, `webpSrc`) and CDN auto-format mode (`autoSrc`, `autoFormat`).
- Full TypeScript support with exported types: `OptimizedImageProps`, `AutoFormatConfig`, `ImageWithFormatsProps`, `UseImageLoaderOptions`, `UseInViewOptions`, `ImageLoadState`.
- ESM + CJS dual builds, tree-shakeable with `sideEffects: false`.
- Zero runtime dependencies.

[1.1.8]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.1.7...v1.1.8
[1.1.7]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.1.2...v1.1.7
[1.1.2]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/MohamedAlfeky1/react-pro-image/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/MohamedAlfeky1/react-pro-image/releases/tag/v1.0.0
