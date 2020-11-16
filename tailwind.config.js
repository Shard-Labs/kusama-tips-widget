module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.svelte"],
  },
  theme: {
    extend: {
      colors: {
        accent: "#FF8C00",
      },
    },
  },
  variants: {},
  plugins: [],
  backgroundColor: ["responsive", "hover", "focus", "active"],
  textColor: ["responsive", "hover", "focus"],
};
