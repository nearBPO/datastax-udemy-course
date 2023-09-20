import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const env = loadEnv(
  'all',
  process.cwd()
);


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/stargate': {
        target: `https://${env.VITE_ASTRA_DB_ID}-${env.VITE_ASTRA_DB_REGION}.apps.astra.datastax.com`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/stargate/, ''),
      },
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
