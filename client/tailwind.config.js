/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'honeydew': '#F1FFF3',
        'light-green': '#DFF7E2',
        'caribbean-green': '#00D09E',
        'cyprus': '#0E3E3E',
        'fence-green': '#052224',
        'void': '#031314',
        'light-blue': '#6DB6FE',
        'vivid-blue': '#3299FF',
        'ocean-blue': '#0068FF',
        'main-layout': '#093030'
      },

      fontFamily: {
        'poppins': ['Poppins'],
        'league-spartan': ['League Spartan']
      }
    },
  },
  plugins: [],
}

