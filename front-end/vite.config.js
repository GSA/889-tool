import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({

  build: {
    outDir: '../_site'
  },
  base: process.env.BASEURL,
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
/* It is possible to use vue's scss features to build USWDS sass from the source,
 * but does not add much to the developer experience and seems to require building
 * the entire systems from scratch for each change, which is very slow.
  css: {
    preprocessorOptions: {
        scss: {
            includePaths: ['./node_modules/@uswds/uswds/packages'],
    
            additionalData: `
            @use "./src/scss/uswds/styles" as *;
            `
        }
    }
  },
*/
});
