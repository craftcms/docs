const path = require("path");

module.exports = {
  stories: ["../.vuepress/theme/stories/*.stories.[tj]s"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.p?css$|\.postcss/,
      use: [
        "style-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: path.resolve(__dirname, "../../")
            }
          }
        }
      ],
      include: path.resolve(__dirname, "../")
    });

    //console.log("postcss config path: " + path.resolve(__dirname, "../../"));

    config.module.rules.push({
      test: /\.styl$|\.stylus/,
      use: ["style-loader", "css-loader", "stylus-loader"],
      include: path.resolve(__dirname, "../")
    });

    return config;
  }
};
