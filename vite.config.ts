import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    minify: true,
    target: 'es2015',
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
    },
  },
})
