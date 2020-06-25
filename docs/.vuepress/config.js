module.exports = {
  theme: "craftdocs",
  base: "/docs/",
  plugins: [
    ["@vuepress/google-analytics", { ga: "UA-39036834-9" }],
    "vuepress-plugin-smooth-scroll",
    [
      "@vuepress/active-header-links",
      {
        sidebarLinkSelector: ".right-nav .sidebar-link",
        headerAnchorSelector: ".header-anchor"
      }
    ],
    [
      "vuepress-plugin-medium-zoom",
      {
        selector: ".theme-default-content img",
        delay: 1000,
        options: {
          margin: 24,
          background: "#f1f5fd",
          scrollOffset: 0
        }
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "tip",
        defaultTitle: ""
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "warning",
        defaultTitle: ""
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "danger",
        defaultTitle: ""
      }
    ]
  ],
  shouldPrefetch: () => false,
  head: require("./head"),
  themeConfig: {
    title: "Craft Documentation",
    docSets: [
      require("./sets/craft-cms"),
      require("./sets/craft-commerce"),
      require("./sets/tutorials/getting-started")
    ],
    docsRepo: "craftcms/craft-docs",
    docsDir: "docs",
    docsBranch: "master",
    searchPlaceholder:
      "Search the Craft and Commerce docs (Press “/” to focus)",
    editLinks: true,
    nextLinks: true,
    prevLinks: true,
    searchMaxSuggestions: 10,
    nav: [
      { text: "Knowlege Base", link: "https://craftcms.com/knowledge-base" }
    ],
    codeLanguages: {
      twig: "Twig",
      php: "PHP",
      js: "JavaScript",
      json: "JSON",
      xml: "XML",
      treeview: "Folder"
    },
    feedback: {
      helpful: "Was this page helpful?",
      thanks: "Thanks for your feedback.",
      more: "Give More Feedback →"
    }
  },
  markdown: {
    anchor: {
      level: [2, 3, 4]
    },
    toc: {
      format(content) {
        return content.replace(/[_`]/g, "");
      }
    },
    extendMarkdown(md) {
      // provide our own highlight.js to customize Prism setup
      md.options.highlight = require("./theme/highlight");
      // add markdown extensions
      md.use(require("./theme/util/replace-anchor-prefixes").replacePrefixes)
        .use(require("./theme/markup"))
        .use(require("markdown-it-deflist"))
        .use(require("markdown-it-imsize"));
    }
  },
  postcss: {
    plugins: require("../../postcss.config.js").plugins
  }
};
