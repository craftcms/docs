module.exports = {
  title: "Craft CMS Documentation | %v",
  setTitle: "Craft CMS",
  handle: "craft",
  icon: "/docs/icons/craft.svg",
  baseDir: "",
  versions: [
    ["5.x", { label: "5.x" }],
    ["4.x", { label: "4.x" }],
    ["3.x", { label: "3.x" }],
    ["2.x", { label: "2.x", isEol: true }]
  ],
  defaultVersion: "5.x",
  abandoned: false,
  searchPlaceholder: "Search the Craft docs (Press “/” to focus)",
  primarySet: true,
  sidebar: {
    "5.x": {
      // Sections here are greedily-matched, so the more specific ones must come first:
      "/reference/": [
        {
          title: "Reference",
          collapsable: false,
          children: [
            ["", "Index"],
          ],
        },
        {
          title: "Element Types",
          collapsable: false,
          children: [
            "element-types/addresses",
            "element-types/assets",
            "element-types/categories",
            "element-types/entries",
            "element-types/globals",
            "element-types/tags",
            "element-types/users",
          ],
        },
        {
          title: "Field Types",
          collapsable: false,
          children: [
            "field-types/addresses",
            "field-types/assets",
            "field-types/categories",
            "field-types/checkboxes",
            "field-types/color",
            "field-types/country",
            "field-types/date-time",
            "field-types/dropdown",
            "field-types/email",
            "field-types/entries",
            "field-types/icon",
            "field-types/lightswitch",
            "field-types/link",
            "field-types/matrix",
            "field-types/money",
            "field-types/multi-select",
            "field-types/number",
            "field-types/plain-text",
            "field-types/radio-buttons",
            "field-types/range",
            "field-types/table",
            "field-types/tags",
            "field-types/time",
            "field-types/users",
          ],
        },
        {
          title: "Configuration",
          collapsable: false,
          children: [
            "config/general",
            "config/db",
            "config/app",
            "config/bootstrap",
          ],
        },
        {
          title: "Twig",
          collapsable: false,
          children: [
            "twig/filters",
            "twig/functions",
            "twig/global-variables",
            "twig/tags",
            "twig/tests"
          ],
        },
        {
          title: "Controller Actions",
          collapsable: false,
          children: [
            "controller-actions",
          ],
        },
        {
          title: "CLI",
          collapsable: false,
          children: [
            "cli",
          ],
        },
      ],
      "/extend/": [
        {
          title: "Extending Craft",
          collapsable: false,
          children: [
            ["", "Introduction"],
            "coding-guidelines",
            "generator",
            "topics"
          ]
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
            "cp-templates",
            "cp-edit-pages"
          ]
        },
        {
          title: "System Components",
          collapsable: false,
          children: [
            "element-types",
            "element-exporter-types",
            "field-types",
            "field-layout-element-types",
            "filesystem-types",
            "widget-types",
          ]
        },
        {
          title: "More",
          collapsable: false,
          children: [
            "asset-bundles",
            "behaviors",
            "commands",
            "conditions",
            "controllers",
            "element-actions",
            "environmental-settings",
            "events",
            "extending-twig",
            "graphql",
            "migrations",
            "queue-jobs",
            "services",
            "soft-deletes",
            "template-hooks",
            "template-roots",
            "translation-categories",
            "user-permissions",
            "utilities",
          ]
        }
      ],
      "/": [
        {
          title: "Welcome to Craft",
          collapsable: false,
          children: [
            ["", "About Craft CMS"],
            "coc"
          ]
        },
        {
          title: "Getting Started",
          collapsable: false,
          children: [
            // All top-level pages:
            "requirements",
            "install",
            "editions",
            "update",
            "deploy",
            "upgrade",
            "configure",
          ]
        },
        {
          title: "System",
          collapsable: false,
          children: [
            "system/directory-structure",
            "system/control-panel",
            "system/user-management",
            "system/elements",
            "system/fields",
            "system/relations",
            "system/sites",
            "system/searching",
            "system/project-config",
            "system/plugins",
            "system/cli",
            "system/routing", // Development?
          ],
          toggleChildren: [
            "system/object-templates",
            "system/reference-tags",
            "system/logging",
            "system/queue",
            "system/mail",
            "system/gc"
          ]
        },
        {
          title: "Front-End Development",
          collapsable: false,
          children: [
            "development/templates",
            "development/twig",
            "development/element-queries",
            "development/eager-loading",
            "development/image-transforms",
            "development/forms",
            "development/graphql",
            "development/collections",
          ]
        },
      ],
    },
    "4.x": {
      "/extend/": [
        {
          title: "Extending Craft",
          collapsable: false,
          children: [
            ["", "Introduction"],
            "coding-guidelines",
            "generator",
            "topics"
          ]
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
            "cp-templates",
            "cp-edit-pages"
          ]
        },
        {
          title: "System Components",
          collapsable: false,
          children: [
            "element-types",
            "element-exporter-types",
            "field-types",
            "filesystem-types",
            "widget-types",
          ]
        },
        {
          title: "More",
          collapsable: false,
          children: [
            "asset-bundles",
            "behaviors",
            "commands",
            "conditions",
            "controllers",
            "element-actions",
            "environmental-settings",
            "events",
            "extending-twig",
            "graphql",
            "migrations",
            "queue-jobs",
            "services",
            "soft-deletes",
            "template-hooks",
            "template-roots",
            "translation-categories",
            "user-permissions",
            "utilities",
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
          children: [
            ["", "About Craft CMS"],
            "coc"
          ]
        },
        {
          title: "Installing & Updating",
          collapsable: false,
          children: ["requirements", "installation", "updating", "deployment", "upgrade"]
        },
        {
          title: "Configuration",
          collapsable: false,
          children: ["config/", "config/general", "config/db"],
          toggleChildren: ["config/app"]
        },
        {
          title: "System Overview",
          collapsable: false,
          children: [
            "directory-structure",
            "control-panel",
            "elements",
            "fields",
            "relations",
            "user-management",
            "sites",
            "console-commands",
            "project-config",
            "plugins"
          ],
          toggleChildren: ["searching", "logging", "queue", "mail", "object-templates", "reference-tags", "gc"]
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
            "users",
            "addresses"
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
            "country-fields",
            "date-time-fields",
            "dropdown-fields",
            "email-fields",
            "entries-fields",
            "lightswitch-fields",
            "matrix-fields",
            "money-fields",
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
            "cp-templates",
            "cp-edit-pages"
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
            "events",
            "migrations",
            "user-permissions",
            "translation-categories",
            "asset-bundles",
            "services",
            "controllers",
            "commands",
            "template-roots",
            "extending-twig",
            "graphql",
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
          children: [
            ["", "About Craft CMS"],
            "coc"
          ]
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
          children: [
            ["", "About Craft CMS"],
            "code-of-conduct"
          ]
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
    "5.x": {
      "/reference/": [
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v5/"
        },
        {
          title: "Knowledge Base",
          icon: "/docs/icons/icon-knowledge-base.svg",
          link: "https://craftcms.com/knowledge-base/",
        },
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/5.x/"
        },
      ],
      "/extend/": [
        {
          title: "Knowledge Base",
          icon: "/docs/icons/icon-knowledge-base.svg",
          link: "https://craftcms.com/knowledge-base/",
        },
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/5.x/",
        },
      ],
      "/": [
        {
          title: "Reference",
          icon: "/docs/icons/icon-tutorial.svg",
          link: "/5.x/reference/",
        },
        {
          title: "Extending Craft",
          icon: "/docs/icons/icon-book.svg",
          link: "/5.x/extend/"
        },
        {
          title: "Knowledge Base",
          icon: "/docs/icons/icon-knowledge-base.svg",
          link: "https://craftcms.com/knowledge-base/",
        },
      ],
    },
    "4.x": {
      "/extend/": [
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v4/"
        },
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/4.x/"
        }
      ],
      "/testing/": [
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/4.x/"
        }
      ],
      "/": [
        {
          title: "Extending Craft",
          icon: "/docs/icons/icon-book.svg",
          link: "/4.x/extend/"
        },
        {
          title: "Testing Craft",
          icon: "/docs/icons/icon-flask.svg",
          link: "/4.x/testing/"
        },
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v4/"
        },
      ]
    },
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
