import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import RubyPlugin from 'vite-plugin-ruby';
import path from 'path';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), RubyPlugin()],
  resolve: {
    alias: {
      '@components': '../frontend/components' // Поднимемся на один уровень, чтобы достичь frontend/components
    },
  },
  build: {
    outDir: './public/vite',
    manifest: true,
  },
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      '/rails/active_storage': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
