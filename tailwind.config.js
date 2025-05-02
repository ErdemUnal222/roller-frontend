// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rollerBlue: '#1DA1F2',
        rollerPink: '#E91E63',
        rollerDark: '#0D1117',
        rollerLight: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Optional: nice clean font
      },
    },
  },
  plugins: [],
}