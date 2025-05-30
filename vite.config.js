import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173, // El puerto del servidor de desarrollo de Vite
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL de tu servidor Node.js
        changeOrigin: true, // Cambia el origen de las solicitudes
        secure: false, // Solo necesario si estás usando HTTPS en desarrollo
      },
    },
  },
});

