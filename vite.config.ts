import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://webdis-lfu7.onrender.com/',
        changeOrigin: true,
           secure: false,      
           ws: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
  }
}
})
