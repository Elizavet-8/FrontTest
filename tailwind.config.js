/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'white': {
          100: '#FFFFFF',
          200: '#D1D5DB',
        },
        'back': '#111827',
        'gray': {
          100: '#6B7280',
          200: '#374151',
        },
        'blue': '#3B82F6',
        'mint': '#0D9488',
        'green': '#16A34A',
        'bgshadow': 'rgba(107, 114, 128, 0.75)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}