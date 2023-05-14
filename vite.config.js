import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { open: true },
  test: {
    globals: true,
    environment: 'node',
    include: ['**/(*)?test.{js,jsx,ts,tsx}'],
  },
})
