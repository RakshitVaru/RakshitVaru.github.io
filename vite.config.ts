import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', 'framer-motion'],
  },
  server: {
    port: parseInt(process.env.PORT || '5174'),
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber'],
  },
})
