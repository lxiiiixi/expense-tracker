/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
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
  ]
}
