import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The dev server proxies /api, /admin and /static to Django so the browser sees
// one origin: session cookies and CSRF work exactly as in production (ADR-013).
const backend = process.env.VITE_BACKEND_URL ?? 'http://localhost:8000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // Bind mounts from Windows/macOS hosts do not deliver file events into Docker.
    watch: process.env.VITE_USE_POLLING ? { usePolling: true, interval: 300 } : undefined,
    proxy: {
      '/api': { target: backend, changeOrigin: false },
      '/admin': { target: backend, changeOrigin: false },
      '/static': { target: backend, changeOrigin: false },
    },
  },
})
