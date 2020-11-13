module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.svelte"],
  },
  variants: {},
  plugins: [],
  backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  textColor: ['responsive', 'hover', 'focus'],
};
