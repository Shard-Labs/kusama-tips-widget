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
        dark: "#150000",
        medium: "#4E4E4E",
        light: "#f9f9f9",
        background: "#f6f6f6"
      },
    },
  },
  variants: {},
  plugins: [],
  backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  textColor: ['responsive', 'hover', 'focus'],
  borderColor: ['hover', 'focus', 'active'],
};
