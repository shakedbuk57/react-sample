/// <reference types="vitest/config" />
/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  base: '/',
  // For developer testing on the Safari
  // server: {
  //   host: '127.0.0.1',
  // },
  plugins: [react(), tailwindcss(), VitePWA({
    manifest: false,
    registerType: 'autoUpdate',
    injectRegister: 'script-defer',
    workbox: {
      globPatterns: ['**/*.{js,css,html,jpeg,jpg,png,svg}']
    },
    devOptions: {
      enabled: false
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    projects: [{
      extends: true,
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: "./src/__tests__/setup.ts"
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});