import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configurado para GitHub Pages: 'base: ./' asegura rutas relativas correctas
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
