import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/lp-advfabi/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/client': 'preact/compat/client',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/compat'],
        },
      },
    },
  },
}))
