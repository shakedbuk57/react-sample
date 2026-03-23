import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// Storybook-specific Vite config (PWA plugin disabled to avoid build errors)
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    // VitePWA is disabled for Storybook builds to avoid workbox cache size issues
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
});
