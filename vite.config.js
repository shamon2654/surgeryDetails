import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      // Proxy API requests
      '/master': {
        target: 'http://192.168.70.210:9080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/common/, '/common'),
      },
    },
  },
})

