/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        website: {
            primary: '#1a1a1a', // Dark elegant
            secondary: '#C0C0C0', // Silver
            accent: '#D4AF37', // Gold
        }
      }
    },
  },
  plugins: [],
}
