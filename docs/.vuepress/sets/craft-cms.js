module.exports = {
  title: "Craft CMS",
  icon: "/icons/craft.svg",
  baseDir: "",
  defaultUri: "/v3/",
  versions: {
    v3: "v3",
    v2: "v2"
  },
  defaultVersion: "v3",
  primarySet: true,
  locales: {
    "/": {
      lang: "en-US",
      name: "English",
      title: "Craft CMS Documentation",
      config: require("./craft-cms-en.js")
    },
    "/ja/": {
      lang: "ja",
      title: "Craft CMS ドキュメント",
      config: require("./craft-cms-ja.js")
    }
  }
};
