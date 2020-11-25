module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.pug',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
          'lavender': '#544969',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
