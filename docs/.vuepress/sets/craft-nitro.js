module.exports = {
  title: "Craft Nitro Documentation",
  setTitle: "Craft Nitro",
  handle: "nitro",
  icon: "/docs/icons/nitro.svg",
  baseDir: "nitro",
  versions: [
    ["2.x", { label: "2.x" }],
    ["1.x", { label: "1.x" }]
  ],
  defaultVersion: "2.x",
  abandoned: true,
  deprecationMessage: "Nitro is no longer supported. Please see our <a href=\"https://craftcms.com/blog/retiring-craft-nitro\">announcement</a> and <a href=\"https://craftcms.com/knowledge-base/migrating-from-craft-nitro-to-ddev\">DDEV migration guide</a>.",
  searchPlaceholder: "Search the Nitro docs",
  primarySet: false,
  sidebar: {
    "2.x": {
      "/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "installation", "updating", "upgrade", "how-nitro-works"]
        },
        {
          title: "Using Nitro",
          collapsable: false,
          children: ["usage", "commands", "composer", "node", "share", ["windows", "Nitro on Windows"]]
        },
        {
          title: "Databases",
          collapsable: false,
          children: [["databases", "Connecting a GUI"], "multiple-databases", ["backups", "Backing Up"], ["importing", "Importing"]]
        },
        {
          title: "Services",
          collapsable: false,
          children: ["services/redis", "services/mailhog", "services/dynamodb", "services/minio"]
        },
         {
           title: "Debugging",
           collapsable: false,
           children: [["xdebug", "Xdebug"], ["ray", "Ray"]]
         },
        {
          title: "Advanced Settings",
          collapsable: false,
          children: [["php-settings", "PHP Settings"], ["extensions", "PHP Extensions"], ["plugin-development", "Plugin Development"], ["local-sharing", "Sharing Sites Locally"], "containers", "customizing"]
        },
      ]
    },
    "1.x": {
      "/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "installation", "updating"]
        },
        {
          title: "Using Nitro",
          collapsable: false,
          children: ["usage", "commands", "blackfire", "xdebug", "mailhog", "advanced"]
        },
      ]
    },
  }
};
