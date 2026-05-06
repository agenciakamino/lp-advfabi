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
        brand: {
          light: '#F7F4EF',
          medium: '#DDD0BB',
          muted: '#6B6057',
          dark: '#1A2B3C',
          accent: '#C9A052',
          hover: '#B8893E',
        }
      }
    },
  },
  plugins: [],
}