// this code was partially generated with chatGPT
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change API URL if needed (your Render deployment URL)
const API_URL = process.env.VITE_API_URL || "http://localhost:5000"

export default defineConfig({
  plugins: [react()],
  define: {
    __API_URL__: JSON.stringify(API_URL)
  }
})
