import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ben Pettijohn",
  // description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Blog",
        items: [
          // { text: "NPM Workspaces", link: "/blog/npm-workspaces" },
          { text: "Barrel Files", link: "/blog/barrel-files" },
          // { text: "all", link: "/blog" },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/bpettijohn/bpettijohn.github.io",
      },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/benjamin-pettijohn-9b56462/",
      },
    ],
  },
});
