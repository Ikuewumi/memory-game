import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import path from 'path';
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";
const __dirname = path.dirname(".");


// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), solidJs(), partytown()],
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
    }
  }
});