import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Change API URL if needed (your Render deployment URL)
const API_URL = process.env.VITE_API_URL || "http://127.0.0.1:3000"

// Auto-discover all HTML files in this folder and use them as entry points
const htmlFiles = fs.readdirSync(new URL('.', import.meta.url)).filter(f => f.endsWith('.html'))
const input = {}
for (const f of htmlFiles) {
  // use filename (without extension) as key
  input[f.replace(/\.html$/, '')] = resolve(__dirname, f)
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input
    }
  },
  define: {
    __API_URL__: JSON.stringify(API_URL)
  }
})