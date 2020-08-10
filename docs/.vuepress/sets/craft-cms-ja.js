module.exports = {
  selectText: "言語",
  label: "日本語",
  editLinkText: "このページを GitHub で編集",
  searchPlaceholder: "Search the Craft docs (Press “/” to focus)",
  sidebar: {
    "3.x": {
      "/ja/extend/": [
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
          children: ["cp-section", "cp-templates"]
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
            "environmental-settings",
            "extending-system-components"
          ]
        }
      ],
      "/ja/testing/": [
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
      "/ja/": [
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
          title: "Front End Development",
          collapsable: false,
          children: [
            "element-queries",
            "dev/eager-loading-elements",
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
        {
          title: "Templating Examples",
          collapsable: false,
          children: [
            "dev/examples/integrating-disqus",
            "dev/examples/rss-feed",
            "dev/examples/atom-feed",
            "dev/examples/entry-form",
            "dev/examples/search-form",
            "dev/examples/login-form",
            "dev/examples/user-profile-form",
            "dev/examples/user-registration-form",
            "dev/examples/forgot-password-form",
            "dev/examples/set-password-form"
          ]
        }
      ]
    }
  },
  sidebarExtra: {
    "3.x": {
      "/ja/extend/": [
        {
          title: "Class Reference",
          icon: "/docs/icons/craft-api.svg",
          link: "https://docs.craftcms.com/api/v3/"
        },
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/3.x/ja/"
        }
      ],
      "/ja/testing/": [
        {
          title: "Back to Craft Docs",
          icon: "/docs/icons/icon-back.svg",
          link: "/3.x/ja/"
        }
      ],
      "/ja/": [
        {
          title: "Extending Craft",
          icon: "/docs/icons/icon-book.svg",
          link: "/3.x/ja/extend/"
        },
        {
          title: "Testing Craft",
          icon: "/docs/icons/icon-flask.svg",
          link: "/3.x/ja/testing/"
        }
      ]
    }
  }
};
