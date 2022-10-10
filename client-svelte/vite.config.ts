import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
	base: '',
  plugins: [
		svelte(),
		tsconfigPaths()
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
			'^/icons': {
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
