import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rest-countries-api-with-color-theme-switcher-master/',
  plugins: [react()],
})
