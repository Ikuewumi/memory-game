import { defineConfig } from "vitest/config"
import path from "path"


const __dirname = path.dirname('.')

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.ts"],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@scss': path.resolve(__dirname, './src/scss'),
      '@types': path.resolve(__dirname, './src/types'),
    }
  }
})
