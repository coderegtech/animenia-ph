import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000', // Replace this with the URL of your API server
        ws: true,
        changeOrigin: true
      }
    }
  }
  ,
})
