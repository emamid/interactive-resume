import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: '',
  plugins: [
		tsconfigPaths(),
		react()
	],
  resolve: {
    alias: {
			'@/': path.resolve('./src/', import.meta.url),
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
