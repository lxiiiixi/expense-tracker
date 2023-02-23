/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      levelColor: {
        'warning': '#FCF26B',
        'danger': '#F76560',
        'safe': '#5B8FF9',
      },
      textGary: '#58647B',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
    fontSize: {
      'xs': ['12px', '14px'],
      'sm': ['14px', '1.5em'],
      'tiny': ['16px', '1.5em'],
      'base': ['14px', '1.4em'],
      'lg': '18px',
      'xl': ['20px', '26px'],
      '2xl': '26px',
      '3xl': '30px',
      '4xl': ['36px', '42px'],
      '5xl': ['40px', '46px'],
      '6xl': '44px',
      '7xl': '52px',
    }
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
  corePlugins: {
    preflight: false
  }
}
