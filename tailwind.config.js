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
          light: '#F8FAFC',
          medium: '#CBD5E1',
          muted: '#475569',
          dark: '#0F172A',
          accent: '#0D9488',
          hover: '#0F766E',
        }
      }
    },
  },
  plugins: [],
}