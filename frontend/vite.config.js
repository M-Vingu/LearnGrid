import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const viteClientDirectory = fileURLToPath(new URL('./node_modules/vite/dist/client/', import.meta.url))
  .replace(/\\/g, '/')

function viteClientPath(fileName) {
  // Vite's default alias treats dollar signs as replacement tokens; double them here.
  const filePath = `${viteClientDirectory}${fileName}`.replace(/\$/g, '$$$$')
  return `/@fs/${filePath}`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^\/?@vite\/client$/, replacement: viteClientPath('client.mjs') },
      { find: /^\/?@vite\/env$/, replacement: viteClientPath('env.mjs') },
    ],
  },
})
