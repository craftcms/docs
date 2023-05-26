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
        collapsable: true,
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
        title: "Install Craft",
        collapsable: true,
        children: [
          "install/",
          "install/files",
          "install/control-panel"
        ]
      },
      {
        title: "Define a Content Model",
        collapsable: true,
        children: [
          "configure/",
          "configure/resources",
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
          "build/blog-templates",
          "build/extra-templates",
          "build/styles",
          "build/preview",
          "build/optimization"
        ]
      },
      {
        title: "Next Steps",
        collapsable: true,
        children: [
          "more/",
          "more/graphql"
        ]
      }
    ]
  }
};
