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
  defaultVersion: "1.x",
  searchPlaceholder: "Search the Nitro docs (Press “/” to focus)",
  primarySet: true,
  sidebar: {
    "2.x": {
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
