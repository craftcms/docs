module.exports = {
  title: "Craft CMS Documentation | %v",
  setTitle: "Craft CMS",
  handle: "craft",
  icon: "/docs/icons/craft.svg",
  baseDir: "",
  versions: [
    ["3.x", { label: "3.x" }],
    ["2.x", { label: "2.x" }]
  ],
  defaultVersion: "3.x",
  searchPlaceholder: "Search the Craft docs (Press “/” to focus)",
  primarySet: true,
  locales: {
    "/": {
      lang: "en-US",
      name: "English",
      title: "Craft CMS Documentation | %v",
      config: require("./craft-cms-en.js")
    },
    "/ja/": {
      lang: "ja",
      title: "Craft CMS ドキュメント | %v",
      config: require("./craft-cms-ja.js")
    },
    "/fr/": {
      lang: "fr",
      title: "Craft CMS Documentation | %v",
      config: require("./craft-cms-fr.js")
    }
  }
};
