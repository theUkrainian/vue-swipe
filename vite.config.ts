import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // @ts-ignore
  test: {
    environment: "jsdom",
  },
  server: {
    port: 8080
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "vue-swipe",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        inlineDynamicImports: true,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        },
      },
    },
  },
});
