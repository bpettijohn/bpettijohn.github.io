import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ben Pettijohn",
  // description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog" },
      { text: "Resume", link: "/resume" },
    ],
    sidebar: [
      {
        text: "Blog",
        items: [
          {
            text: "Create reusable javascript packages with workspaces",
            link: "/blog/create-reusable-javascript-packages-with-workspaces",
          },
          { text: "Barrel Files", link: "/blog/what-is-a-barrel-file" },
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
