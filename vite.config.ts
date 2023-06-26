import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react(), !process.env.CODESANDBOX_HOST && mkcert()],
});
