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
          light: '#FDFBF9',
          medium: '#E3D5CA',
          dark: '#2C2826',
          accent: '#B98B73',
          hover: '#A37861',
        }
      }
    },
  },
  plugins: [],
}