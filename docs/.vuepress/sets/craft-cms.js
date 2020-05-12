module.exports = {
  title: "Craft CMS",
  icon: "/icons/craft.svg",
  baseDir: "",
  defaultUri: "/v3/",
  versions: {
    v3: "v3",
    v2: "v2"
  },
  defaultVersion: "v3",
  primarySet: true,
  locales: {
    "/": {
      lang: "en-US",
      title: "Craft 3 Documentation"
    },
    "/ja/": {
      lang: "ja",
      title: "Craft 3 ドキュメント"
    }
  },
  sidebar: {
    v3: {
      "/extend/": [
        {
          title: "Extending Craft",
          collapsable: false,
          children: [["", "Introduction"], "coding-guidelines"]
        },
        {
          title: "Module Development",
          collapsable: false,
          children: ["module-guide"]
        },
        {
          title: "Plugin Development",
          collapsable: false,
          children: [
            "plugin-guide",
            "updating-plugins",
            "plugin-settings",
            "project-config",
            "changelogs-and-updates",
            "plugin-editions",
            "plugin-store"
          ]
        },
        {
          title: "Extending the Control Panel",
          collapsable: false,
          children: [
            "cp-section",
            "cp-templates"
            // 'cp-components',
            // 'cp-controllers',
          ]
        },
        {
          title: "System Components",
          collapsable: false,
          children: [
            "widget-types",
            "field-types",
            "volume-types",
            "utility-types",
            "element-types",
            "element-action-types",
            "element-exporter-types"
          ]
        },
        {
          title: "More",
          collapsable: false,
          children: [
            "migrations",
            "user-permissions",
            "translation-categories",
            "asset-bundles",
            "services",
            "controllers",
            "commands",
            // 'behaviors',
            "template-roots",
            "extending-twig",
            "template-hooks",
            "soft-deletes",
            "environmental-settings",
            "extending-system-components"
            // 'front-end-controllers',
          ]
        }
      ],
      "/testing/": [
        {
          title: "About testing",
          collapsable: false,
          children: [["", "Introduction"], "testing", "codeception", "ci"]
        },
        {
          title: "Testing Craft",
          collapsable: false,
          children: [
            "testing-craft/getting-started",
            "testing-craft/testing-tips",
            "testing-craft/plugins-and-modules",
            "testing-craft/fixtures",
            "testing-craft/console",
            "testing-craft/queue",
            "testing-craft/events"
          ]
        },
        {
          title: "Craft testing framework",
          collapsable: false,
          children: [
            "framework/config-options",
            "framework/mocking",
            "framework/support-classes",
            "framework/full-mock",
            "framework/assertion-helpers"
          ]
        }
      ],
      "/dev/": [
        {
          title: "Front-End Development",
          collapsable: false,
          children: [["", "Introduction"], "headless"]
        },
        {
          title: "Templating",
          collapsable: false,
          children: [
            "twig-primer",
            "global-variables",
            "filters",
            "functions",
            "tags",
            "tests"
          ]
        },
        {
          title: "Querying Elements",
          collapsable: false,
          children: [
            "element-queries/",
            "element-queries/asset-queries",
            "element-queries/category-queries",
            "element-queries/entry-queries",
            "element-queries/global-set-queries",
            "element-queries/matrix-block-queries",
            "element-queries/tag-queries",
            "element-queries/user-queries",
            "eager-loading-elements"
          ]
        },
        {
          title: "Templating Examples",
          collapsable: false,
          children: [
            "examples/integrating-disqus",
            "examples/rss-feed",
            "examples/atom-feed",
            "examples/entry-form",
            "examples/search-form",
            "examples/login-form",
            "examples/user-profile-form",
            "examples/user-registration-form",
            "examples/forgot-password-form",
            "examples/set-password-form"
          ]
        }
      ],
      "/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "coc", "directory-structure"]
        },
        {
          title: "Installing & Updating",
          collapsable: false,
          children: [
            "requirements",
            "installation",
            "updating",
            "upgrade",
            "changes-in-craft-3"
          ]
        },
        {
          title: "Configuration",
          collapsable: false,
          children: [
            "config/",
            "config/config-settings",
            "config/db-settings",
            "config/environments",
            "config/php-constants",
            "config/app"
          ]
        },
        {
          title: "Core Concepts",
          collapsable: false,
          children: [
            "sections-and-entries",
            "fields",
            "categories",
            "assets",
            "users",
            "globals",
            "tags",
            "routing",
            "relations",
            "searching",
            "sites",
            ["localization", "Localization"],
            "static-translations",
            "plugins"
          ]
        },
        {
          title: "Field Types",
          collapsable: false,
          children: [
            "assets-fields",
            "categories-fields",
            "checkboxes-fields",
            "color-fields",
            "date-time-fields",
            "dropdown-fields",
            "entries-fields",
            "lightswitch-fields",
            "matrix-fields",
            "multi-select-fields",
            "number-fields",
            "plain-text-fields",
            "radio-buttons-fields",
            "table-fields",
            "tags-fields",
            "users-fields"
          ]
        },
        {
          title: "Development",
          collapsable: false,
          children: ["graphql", "dev/", "extend/", "testing/"]
        },
        {
          title: "More",
          collapsable: false,
          children: ["project-config", "gc", "reference-tags"]
        }
      ]
    },
    v2: {
      "/plugins/": [
        {
          title: "Plugin Development",
          collapsable: false,
          children: [
            "introduction",
            "setting-things-up",
            "plugin-settings",
            "templates",
            "resources",
            "database",
            "internationalization",
            "hooks-and-events"
          ]
        },
        {
          title: "Components",
          collapsable: false,
          children: [
            "controllers",
            "element-actions",
            "widgets",
            "field-types",
            "models",
            "records",
            "services",
            "variables"
          ]
        },
        {
          title: "References",
          collapsable: false,
          children: ["hooks-reference", "events-reference"]
        },
        {
          title: "Guides",
          collapsable: false,
          children: ["migrations", "working-with-elements"]
        }
      ],
      "/templating/": [
        ["../templating-overview", "← Templating Overview"],
        {
          title: "Templating Reference",
          collapsable: false,
          children: ["filters", "functions", "global-variables"]
        },
        {
          title: "Tags",
          collapsable: false,
          children: [
            "cache",
            "exit",
            "header",
            "includecss",
            "includecssfile",
            "includehirescss",
            "includejs",
            "includejsfile",
            "nav",
            "paginate",
            "redirect",
            "requirelogin",
            "requirepermission",
            "switch"
          ]
        },
        {
          title: "Querying Elements",
          collapsable: false,
          children: [
            "craft.assets",
            "craft.categories",
            "craft.entries",
            "craft.tags",
            "craft.users",
            "eager-loading-elements"
          ]
        },
        {
          title: "Variables",
          collapsable: false,
          children: [
            "assetfilemodel",
            "assetfoldermodel",
            "assetsourcemodel",
            "categorygroupmodel",
            "categorymodel",
            "datetime",
            "elementcriteriamodel",
            "entrymodel",
            "entrytypemodel",
            "globalsetmodel",
            "matrixblockmodel",
            "sectionmodel",
            "taggroupmodel",
            "tagmodel",
            "usergroupmodel",
            "usermodel"
          ]
        },
        {
          title: "More",
          collapsable: false,
          children: [
            "craft.config",
            "craft.feeds",
            "craft.fields",
            "craft.globals",
            "craft.request",
            "craft.sections",
            "craft.session"
          ]
        },
        {
          title: "Examples",
          collapsable: false,
          children: [
            "integrating-disqus",
            "rss-feed",
            "atom-feed",
            "entry-form",
            "search-form",
            "login-form",
            "user-profile-form",
            "user-registration-form",
            "forgot-password-form",
            "set-password-form"
          ]
        }
      ],
      "/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "code-of-conduct"]
        },
        {
          title: "Installing & Updating",
          collapsable: false,
          children: ["requirements", "installing", "updating"]
        },
        {
          title: "Getting Started",
          collapsable: false,
          children: ["folder-structure"]
        },
        {
          title: "Configuration",
          collapsable: false,
          children: [
            "config-settings",
            "multi-environment-configs",
            "php-constants"
          ]
        },
        {
          title: "Core Concepts",
          collapsable: false,
          children: [
            "sections-and-entries",
            "fields",
            "categories",
            "assets",
            "users",
            "globals",
            "tags",
            "relations",
            "routing",
            "searching",
            "reference-tags",
            ["localization-guide", "Localization"],
            "static-translations"
          ]
        },
        {
          title: "Templating",
          collapsable: false,
          children: [
            "templating-overview",
            "twig-primer",
            ["templating/filters", "Templating Reference"]
          ]
        },
        {
          title: "Plugin Development",
          collapsable: false,
          children: [["plugins/introduction", "Plugin Development"]]
        }
      ]
    }
  }
};
