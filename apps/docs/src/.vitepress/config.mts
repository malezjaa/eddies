import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Eddies",
  description: "Fully featured, modern and extensible editor",
  markdown: {
    theme: "one-dark-pro",
  },
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],

    [
      "meta",
      {
        property: "og:title",
        content: "Eddies",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "Fully featured, modern and extensible editor",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/logo.png",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.png",
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Quick Start",
        link: "/docs/quick-start",
      },
    ],

    sidebar: [
      {
        text: "👋 Introduction",
        items: [
          { text: "Installation", link: "/docs/installation" },
          { text: "Quick Start", link: "/docs/quick-start" },
        ],
      },
      {
        text: "📚 Guides",
        items: [
          { text: "Themes", link: "/docs/guides/themes" },
          {
            text: "Adding extensions",
            link: "/docs/guides/adding-extensions",
          },
          {
            text: "Creating extensions",
            link: "/docs/guides/creating-extensions",
          },
          {
            text: "Output",
            link: "/docs/guides/output",
          },
        ],
      },
      {
        text: "📦 Components",
        items: [
          { text: "Editor", link: "/docs/components/editor" },
          { text: "BubbleMenu", link: "/docs/components/bubble-menu" },
          { text: "BubbleButton", link: "/docs/components/bubble-button" },
        ],
      },
      {
        text: "📖 Reference",
        items: [
          { text: "Editor", link: "/docs/reference/editor" },
          { text: "EditorProps", link: "/docs/reference/editor-props" },
          { text: "BubbleMenuItem", link: "/docs/reference/bubble-menu-item" },
        ],
      },
      {
        text: "💾 Other",
        items: [{ text: "Credits", link: "/docs/credits" }],
      },
    ],

    editLink: {
      text: "Edit this page on GitHub",
      pattern:
        "https://github.com/malezjaa/eddies/edit/main/apps/docs/src/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/malezjaa/eddies" },
    ],
  },
});
