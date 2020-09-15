module.exports = {
  title: "Craft Nitro Documentation",
  setTitle: "Craft Nitro",
  handle: "nitro",
  icon: "/docs/icons/nitro.svg",
  baseDir: "nitro",
  searchPlaceholder: "Search the Nitro docs (Press “/” to focus)",
  primarySet: true,
  sidebar: {
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
  }
};
