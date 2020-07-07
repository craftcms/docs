module.exports = {
  purge: {
    enabled: true,
    content: ["./docs/.vuepress/theme/**/*.vue", "./docs/**/*.md"]
  },
  theme: {
    extend: {
      colors: {
        slate: "#2d3748",
        soft: "#f1f5fd",
        blue: "#4a7cf6",
        red: "#da5a47",
        cinder: "#131119"
      },
      width: {
        80: "20rem"
      },
      screens: {
        xxl: "1600px"
      }
    }
  },
  variants: {},
  plugins: []
};
