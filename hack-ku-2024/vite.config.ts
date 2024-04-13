import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

/**
 * Represents a user in the server
 */
export interface User {
  id: number
  name: string
  xp: number
  nextLevelXP: number
  level: number
}

/**
 * Represents a pin on the trash map
 */
export interface Pin {
  id: number
  name: string
  latitude: number
  longitude: number
}