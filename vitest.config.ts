import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const rootDir = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  // `vue()` is cast because Vitest bundles its own copy of Vite, whose plugin
  // types differ nominally from the root Vite used by @vitejs/plugin-vue.
  plugins: [vue() as never],
  resolve: {
    // Mirror Nuxt's `~` / `@` aliases so imports resolve in tests.
    alias: {
      '~': rootDir,
      '@': rootDir
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.ts']
  }
})
