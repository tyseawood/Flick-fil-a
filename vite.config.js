import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  envPrefix: 'APP_',
  server: {
    port: 3000,
  },
  preview: {
    open: 'index.html',
    port: 8080,
  },
  clearScreen: false,
})
