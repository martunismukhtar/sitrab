import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Pisahkan react ke dalam chunk 'vendor'          
        },
      },
    },
  },
})
