import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  server: { port: 4001, host: true, cors: true },
  build: {
    lib:{
      entry:'client/main',
      name: 'MemoTalk',
      fileName: 'memo_talk',
    },
  },
  plugins: [svelte()],
})
