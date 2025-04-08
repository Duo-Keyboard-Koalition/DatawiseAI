import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/app': {
        target: 'http://localhost:8080', // Go backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app/, ''), // Optional: Adjust path if needed
      },
    },
  },
  plugins: [react()],
});