module.exports = {
  selectText: "Language",
  label: "English",
  editLinkText: "Edit this page on GitHub",
  searchPlaceholder: "Search the Craft docs (Press “/” to focus)",
  sidebar: {
    "3.x": {
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
            "template-roots",
            "extending-twig",
            "template-hooks",
            "soft-deletes",
            "queue-jobs",
            "environmental-settings",
            "extending-system-components"
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
            "testing-craft/setup",
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
      "/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "coc"]
        },
        {
          title: "Installing & Updating",
          collapsable: false,
          children: ["requirements", "installation", "updating", "upgrade"]
        },
        {
          title: "Configuration",
          collapsable: false,
          children: ["config/", "config/config-settings", "config/db-settings"]
        },
        {
          title: "System Overview",
          collapsable: false,
          children: [
            "directory-structure",
            "elements",
            "fields",
            "relations",
            "user-management",
            "sites",
            "console-commands",
            "project-config",
            "plugins"
          ],
          toggleChildren: ["searching", "reference-tags", "gc"]
        },
        {
          title: "Element Types",
          collapsable: false,
          children: [
            "entries",
            "categories",
            "tags",
            "assets",
            "globals",
            "matrix-blocks",
            "users"
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
            "email-fields",
            "entries-fields",
            "lightswitch-fields",
            "matrix-fields",
            "multi-select-fields",
            "number-fields",
            "plain-text-fields",
            "radio-buttons-fields",
            "table-fields",
            "tags-fields",
            "time-fields",
            "url-fields",
            "users-fields"
          ]
        },
        {
          title: "Front End Development",
          collapsable: false,
          children: [
            "image-transforms",
            "element-queries",
            "dev/eager-loading-elements",
            "dev/controller-actions",
            "graphql",
            "routing"
          ]
        },
        {
          title: "Twig Templating",
          collapsable: false,
          children: [
            "dev/twig-primer",
            "dev/global-variables",
            "dev/filters",
            "dev/functions",
            "dev/tags",
            "dev/tests"
          ]
        },
      ]
    },
    "2.x": {
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
  },
  sidebarExtra: {
    "3.x": {
      "/extend/": [
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v3/"
        },
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/3.x/"
        }
      ],
      "/testing/": [
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/3.x/"
        }
      ],
      "/": [
        {
          title: "Extending Craft",
          icon: "/docs/icons/icon-book.svg",
          link: "/3.x/extend/"
        },
        {
          title: "Testing Craft",
          icon: "/docs/icons/icon-flask.svg",
          link: "/3.x/testing/"
        },
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v3/"
        },
      ]
    },
    "2.x": {
      "/": [
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v2/"
        }
      ]
    }
  }
};
