import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'dist',
    // Raise chunk size warning limit — frame images are served from public/
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libs into a separate chunk for better caching
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
