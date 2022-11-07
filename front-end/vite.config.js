import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
//   css: {
//     preprocessorOptions: {
//         scss: {
//             includePaths: ['./node_modules/@uswds/uswds/packages'],
        
//             additionalData: `
//             @use "./src/scss/uswds/styles" as *;
//             `
//         }
//     }
//   },
});
