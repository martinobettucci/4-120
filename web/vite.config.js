import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base relative : le site fonctionne sous n'importe quel chemin (GitHub Pages, serveur local).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { fs: { allow: ['..'] } },
  build: { chunkSizeWarningLimit: 1200 },
});
