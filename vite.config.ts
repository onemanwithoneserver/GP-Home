import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function rootFaviconPlugin(): Plugin {
  return {
    name: 'root-favicon-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/favicon.svg' || req.url === '/favicon.ico') {
          req.url = '/GP-Home/favicon.svg';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    rootFaviconPlugin(),
  ],
  base: '/GP-Home/',
})
