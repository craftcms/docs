const markdownHelpers = require('./theme/util/markdown');

module.exports = {
  theme: "craftdocs",
  base: "/docs/",
  plugins: [
    ['seo'],
    ["@vuepress/google-analytics", { ga: "UA-39036834-9" }],
    [
      "vuepress-plugin-medium-zoom",
      {
        selector: ".theme-default-content img:not(.no-zoom)",
        delay: 1000,
        options: {
          margin: 24,
          background: "var(--medium-zoom-overlay-color)",
          scrollOffset: 0
        }
      }
    ],
    ["vuepress-plugin-container", { type: "tip", defaultTitle: "" }],
    ["vuepress-plugin-container", { type: "warning", defaultTitle: "" }],
    ["vuepress-plugin-container", { type: "danger", defaultTitle: "" }],
    [
      "vuepress-plugin-container",
      {
        type: "details",
        before: info =>
          `<details class="custom-block details">${
            info ? `<summary>${info}</summary>` : ""
          }\n`,
        after: () => "</details>\n"
      }
    ],
    [require("./plugins/craft.js")],
  ],
  shouldPrefetch: () => false,
  head: require("./head"),
  themeConfig: {
    title: "Craft Documentation",
    docSets: [
      require("./sets/craft-cms"),
      require("./sets/craft-commerce"),
      require("./sets/craft-cloud"),
      require("./sets/craft-nitro"),
      require("./sets/getting-started-tutorial")
    ],
    docsRepo: "craftcms/docs",
    docsDir: "docs",
    docsBranch: "main",
    baseUrl: "https://craftcms.com/docs",
    searchPlaceholder: "Search all documentation",
    editLinks: true,
    nextLinks: true,
    prevLinks: true,
    searchMaxSuggestions: 10,
    nav: [
      { text: "Knowledge Base", link: "https://craftcms.com/knowledge-base" }
    ],
    codeLanguages: {
      twig: "Twig",
      php: "PHP",
      graphql: "GraphQL",
      js: "JavaScript",
      json: "JSON",
      xml: "XML",
      treeview: "Folder",
      graphql: "GraphQL",
      csv: "CSV"
    },
    feedback: {
      helpful: "Was this page helpful?",
      thanks: "Thanks for your feedback!",
      more: "Report an Issue →"
    }
  },
  markdown: {
    extractHeaders: ['h2', 'h3', 'h4'],
    anchor: {
      level: [2, 3, 4],
      permalinkSymbol: '#',
      renderPermalink: markdownHelpers.renderPermalink,
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
      md
        .use(require("./theme/markup"))
        .use(require("markdown-it-deflist"))
        .use(require("markdown-it-imsize"))
        .use(require("markdown-it-include"));
    }
  },
  postcss: {
    plugins: require("../../postcss.config.js").plugins,
  }
};
