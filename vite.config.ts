import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // "development" mode emits inline sourcemaps and skips minification —
  // useful for local debugging builds.
  const emitSourcemaps = mode === 'development'

  // GitHub Pages serves this project from https://USERNAME.github.io/REPOSITORY-NAME/,
  // so the build needs to know the repository name to resolve asset URLs and
  // routes correctly. Set BASE_PATH in the deploy workflow (see
  // .github/workflows/deploy.yml) to "/REPOSITORY-NAME/". Locally, or when
  // BASE_PATH isn't set, the app is served from the domain root.
  const base = process.env.BASE_PATH || '/'

  return {
    base,
    build: {
      sourcemap: emitSourcemaps ? 'inline' : false,
      minify: !emitSourcemaps,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
  }
})
