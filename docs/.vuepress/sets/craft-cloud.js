module.exports = {
  title: "Craft Cloud",
  handle: "cloud",
  icon: "/docs/icons/icon-cloud.svg",
  baseDir: "cloud",
  abandoned: false,
  searchPlaceholder: "Search Cloud docs (Press “/” to focus)",
  primarySet: true,
  sidebar: {
    "/": [
      {
        title: "Introduction",
        collapsable: false,
        children: [
          "",
          "getting-started",
          "extension",
          "config",
        ],
      },
      {
        title: "Workflow",
        collapsable: false,
        children: [
          "deployment",
          "environments",
          "builds",
          "databases",
          "assets",
          "local-dev",
          "launch-checklist",
        ],
      },
      {
        title: "Platform Info",
        collapsable: false,
        children: [
          "compatibility",
          "static-caching",
          "quotas",
          "regions",
          "domains",
          "plugin-development",
        ],
      },
      {
        title: "Collaboration",
        collapsable: false,
        children: [
          "project-management",
          "billing",
          "clients",
          "migrating",
          "private-packages",
        ],
      },
      {
        title: "Help",
        collapsable: false,
        children: [
          "faq",
          "troubleshooting",
        ],
      },
    ],
  },
};
