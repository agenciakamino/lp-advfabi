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
          light: '#F5F2EC',
          wine: '#6B1D2A',
          medium: '#DDD0BB',
          muted: '#6B6057',
          dark: '#1A355B',
          accent: '#C8A46E',
          amber: '#6B1D2A',
          hover: '#C8A46E',
        }
      }
    },
  },
  plugins: [],
}
