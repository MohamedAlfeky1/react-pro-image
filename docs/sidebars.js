/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: "doc",
      id: "overview",
      label: "Overview",
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "getting-started/installation",
          label: "Installation",
        },
        {
          type: "doc",
          id: "getting-started/quick-start",
          label: "Quick Start",
        },
      ],
    },
    {
      type: "category",
      label: "Usage Modes",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "usage-modes/cdn-images",
          label: "CDN Images",
        },
        {
          type: "doc",
          id: "usage-modes/self-hosted-images",
          label: "Self-Hosted Images",
        },
      ],
    },
    {
      type: "category",
      label: "Loading & Reliability",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "loading-reliability/progressive-loading",
          label: "Progressive Loading",
        },
        {
          type: "doc",
          id: "loading-reliability/lazy-loading",
          label: "Lazy Loading",
        },
        {
          type: "doc",
          id: "loading-reliability/error-fallbacks",
          label: "Error Fallbacks",
        },
      ],
    },
    {
      type: "category",
      label: "Technical Details",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "technical-details/architecture",
          label: "Architecture",
        },
        {
          type: "doc",
          id: "technical-details/avif-webp-negotiation",
          label: "AVIF & WebP Negotiation",
        },
        {
          type: "doc",
          id: "technical-details/browser-support",
          label: "Browser Support",
        },
      ],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        {
          type: "doc",
          id: "api-reference/props-reference",
          label: "Props Reference",
        },
        {
          type: "doc",
          id: "api-reference/auto-format-config",
          label: "AutoFormatConfig",
        },
        {
          type: "doc",
          id: "api-reference/hooks",
          label: "Hooks",
        },
        {
          type: "doc",
          id: "api-reference/exported-types",
          label: "Exported Types",
        },
      ],
    },
  ],
};

module.exports = sidebars;
