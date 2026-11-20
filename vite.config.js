import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// awaljati.github.io is a user site, so it is served from the domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    outDir: 'dist',
    // Hashed build files go to /static so they never clash with the
    // hand-managed files in public/assets (photos, card images, CV).
    assetsDir: 'static',
    // The lazy Lanyard chunk (three + rapier WASM, ~1.1 MB gzip) only loads on
    // capable desktops, so its size does not block first paint.
    chunkSizeWarningLimit: 3500
  }
});
