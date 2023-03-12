import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  server: {
    proxy: {
      '/api': 'http://0.0.0.0:3000/'
    }
  }
})
