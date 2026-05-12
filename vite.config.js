import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
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
})