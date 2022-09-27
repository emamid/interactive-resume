import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from "url";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		tsconfigPaths(),
		vue(),
	],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
	server: {
		proxy: {
			'^/api': {
				target: 'http://localhost:3001',
				ws: true,
				changeOrigin: true
			},
			'^/images': {
				target: 'http://localhost:3001',
				ws: true,
				changeOrigin: true
			},
			'^/thumbnails': {
				target: 'http://localhost:3001',
				ws: true,
				changeOrigin: true
			}
		}
	}
})
