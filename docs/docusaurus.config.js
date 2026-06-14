// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "React Pro Image",
  tagline: "A single React component for production-grade image optimization.",
  favicon: "img/logo.png",

  url: "https://mohamedalfeky1.github.io",
  baseUrl: "/react-pro-image/",
  organizationName: "MohamedAlfeky1",
  projectName: "react-pro-image",

  onBrokenLinks: "warn",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  future: {
    faster: true,
    v4: true,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: "/",
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "/",
          editUrl:
            "https://github.com/MohamedAlfeky1/react-pro-image/tree/main/docs",
        },
        blog: false,
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "React Pro Image",
        logo: {
          alt: "React Pro Image",
          src: "img/logo.png",
        },
        items: [
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/MohamedAlfeky1/react-pro-image",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
        hideOnScroll: false,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "React Pro Image",
            items: [
              {
                html: `
                  <p style="max-width: 320px; line-height: 1.6; font-size: 0.95rem; color: #9ca3af; margin: 0;">
                    A powerful, lightweight, and customizable React component for production-grade image optimization and progressive loading.
                  </p>
                `,
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "GitHub Repository",
                href: "https://github.com/MohamedAlfeky1/react-pro-image",
              },
              {
                label: "NPM Package",
                href: "https://www.npmjs.com/package/react-pro-image",
              },
            ],
          },
        ],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      prism: {
        theme: require("prism-react-renderer").themes.github,
        darkTheme: require("prism-react-renderer").themes.dracula,
        additionalLanguages: ["bash", "tsx", "typescript"],
      },
    }),
};

module.exports = config;
