module.exports = {
  title: "Craft CMS Tutorial",
  icon: "/icons/tutorial.svg",
  baseDir: "tutorials/getting-started",
  primarySet: false,
  sidebar: {
    "/": [
      {
        title: "Introduction",
        collapsable: true,
        children: [""]
      },
      {
        title: "0. Set Up Your Environment",
        collapsable: true,
        children: [
          "environment/",
          "environment/terminal",
          "environment/editor",
          "environment/stack"
        ]
      },
      {
        title: "1. Install Craft CMS",
        collapsable: true,
        children: [
          "install/files",
          "install/database",
          "install/server",
          "install/setup"
        ]
      },
      {
        title: "2. Build Your Content",
        collapsable: true,
        children: [
          "configure/",
          "configure/control-panel",
          "configure/modeling",
          "configure/section",
          "configure/globals",
          "configure/single",
          "configure/editing"
        ]
      },
      {
        title: "3. Build Your Front End",
        collapsable: true,
        children: [
          "build/",
          "build/routing",
          "build/twig",
          "build/templates",
          "build/preview",
          "build/graphql"
        ]
      },
      {
        title: "Next Steps",
        collapsable: true,
        children: ["more/"]
      }
    ]
  }
};
