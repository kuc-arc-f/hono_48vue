import pages from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//
export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [vue()],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
      build: {
        lib: {
          entry: [
            './src/main.ts',
          ],
          formats: ['es'],
          fileName: '[name]',
        },
        rollupOptions: {
          output: {
            dir: './public/static'
          }
        },
        emptyOutDir: false,
        copyPublicDir: false
      }
    }
  } else {
    return {
      plugins: [
        pages(),
        devServer({
          entry: 'src/index.tsx',
          cf: {
            d1Databases: ['DB'],
            d1Persist: true
          }
        })
      ]
    }
  }
})
