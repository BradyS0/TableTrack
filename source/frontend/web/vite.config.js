import { defineConfig } from 'vite'

// Change API URL if needed (your Render deployment URL)
const API_URL = process.env.VITE_API_URL || "http://localhost:5500"

export default defineConfig({
  base: './',
  define: {
    __API_URL__: JSON.stringify(API_URL)
  }
})