import { defineConfig } from "vite";
// import path from "path";
import { fileURLToPath, URL } from 'node:url';

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      // @ts-ignore
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
