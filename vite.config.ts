import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/animenia-ph/',
  server: {
    proxy: {
      '/api': 'https://gogoanime.consumet.stream/'
    }
  }
})
