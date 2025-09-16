module.exports = {
  purge: {
    enabled: process.env.MY_ENV_VAR === "production" ? true : false,
    content: ["./docs/.vuepress/theme/**/*.vue", "./docs/**/*.md"]
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["GT Eesti", "Futura Std", "Futura", "Helvetica", "sans-serif"]
      },
      fontSize: {
        '2.5xl': '1.5625rem',
        '1.5xl': '1.37rem',
      },
      colors: {
        slate: "#2d3748",
        soft: "#f1f5fd",
        "soft-gray": "#f1f5f8",
        softer: "#fafbfe",
        blue: {
          "lighter": "#86A7F9",
          "default": "#2963F5",
          "darker": "#1554F4",
        },
        red: "#da5a47",
        cinder: "#131119",
        green: "#27AB83",
        "light-slate": "#66778A",
        craft: {
          red: "#ef4444",
          orange: "#f97316",
          amber: "#f59e0b",
          yellow: "#eab308",
          lime: "#84cc16",
          green: "#22c55e",
          emerald: "#10b981",
          teal: "#14b8a6",
          cyan: "#06b6d4",
          sky: "#0ea5e9",
          blue: "#3b82f6",
          indigo: "#6366f1",
          violet: "#8b5cf6",
          purple: "#a855f7",
          fuchsia: "#d946ef",
          pink: "#ec4899",
          rose: "#f43f5e",
        },
      },
      width: {
        80: "20rem"
      },
      screens: {
        xxl: "1408px"
      }
    }
  },
  variants: {},
  plugins: []
};
