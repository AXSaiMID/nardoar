import { defineConfig } from 'vite'

// No build, usa o caminho do GitHub Pages (https://axsaimid.github.io/nardoar/).
// Para domínio próprio ou deploy na raiz: BASE=/ npm run build
export default defineConfig(({ command }) => ({
  base: command === 'build' ? process.env.BASE || '/nardoar/' : '/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
  },
}))
