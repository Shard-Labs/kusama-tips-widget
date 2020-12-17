module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.svelte"],
    options: {
      whitelist: ["hidden", "invisible", "border-accent"],
      whitelistPatterns: [/^bg-gray-\d+$/],
    },
  },
  theme: {
    extend: {
      colors: {
        accent: "#E6007A",
        paragraph: "#24292e",
        light: "#717171",
        cyan: "#00ffe1",
        background: "#f6f6f6",
        dark: "#000",
      },
    },
  },
  variants: {},
  plugins: [],
  backgroundColor: ["responsive", "hover", "focus", "active"],
  textColor: ["responsive", "hover", "focus"],
};
