module.exports = {
  title: "Intro to Craft CMS",
  handle: "getting-started",
  icon: "/docs/icons/tutorial.svg",
  baseDir: "getting-started-tutorial",
  abandoned: false,
  searchPlaceholder: "Search the tutorial (Press “/” to focus)",
  primarySet: false,
  sidebar: {
    "/": [
      {
        title: "Introduction",
        collapsable: false,
        children: [""]
      },
      {
        title: "Set Up Your Environment",
        collapsable: true,
        children: [
          "environment/",
          "environment/terminal",
          "environment/stack",
          "environment/editor"
        ]
      },
      {
        title: "Install Craft CMS",
        collapsable: true,
        children: [
          "install/",
          "install/files"
        ]
      },
      {
        title: "Build Your Content",
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
        title: "Build Your Front End",
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
