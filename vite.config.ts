import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { copyFileSync, existsSync } from 'node:fs'

// https://vite.dev/config/
// Emit a 404.html identical to index.html so GitHub Pages serves the SPA
// for deep links (e.g. /flights) instead of a hard 404.
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const index = resolve(dist, 'index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(dist, '404.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  base: '/myhitch-jetnrest/',
})
