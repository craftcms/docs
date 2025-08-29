module.exports = {
  title: "Craft Cloud",
  handle: "cloud",
  icon: "/docs/icons/icon-cloud.svg",
  baseDir: "cloud",
  abandoned: false,
  searchPlaceholder: "Search Cloud docs (Press “/” to focus)",
  primarySet: true,
  globalVars: {
    supportEmail: 'support@craft.cloud',
    minCraftVersion: '4.6.0',
    minCloudExtensionVersion: '1.16.5',
    minPhpVersion: '8.1',
    dbSupportMySql: '8.0',
    dbSupportPostgres: '15',
    trialDays: 7,
    minNodeVersion: '18',
    regionSupport: 'North America, Canada, Europe, and Asia/Pacific',
    scheduledCommandsMax: 'five',
  },
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
