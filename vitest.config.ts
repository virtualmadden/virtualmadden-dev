import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [react(), imagetools()],
  define: {
    __RELEASES__: JSON.stringify({ 'https://github.com/virtualmadden/gac-redux': 'v1.2.3' }),
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
  },
})
