import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import path from 'path';
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";
import AstroPWA from "@vite-pwa/astro"
const __dirname = path.dirname(".");


// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(), 
    solidJs(), 
    partytown(), 
    AstroPWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.woff2', 'confetti.browser.min.js']
      },
      includeAssets: ["/icons/favicon.ico", "/icons/apple-touch-icon.png", "/icons/android-chrome-192x192.png"],
       manifest: {
        name: 'MedMatch',
        short_name: 'MedMatch',
        description: 'Match your way to mastery',
        theme_color: '#EAEDF0',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }

    })
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@composables': path.resolve(__dirname, './src/composables'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@pages': path.resolve(__dirname, './src/pages/'),
        '@stores': path.resolve(__dirname, './src/stores'),
        '@scss': path.resolve(__dirname, './src/scss'),
        '@types': path.resolve(__dirname, './src/types')
      }
    },
  }
});
