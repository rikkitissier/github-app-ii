import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

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
      'stream': 'stream-browserify'
    }
  },
	plugins: [react(), !process.env.CODESANDBOX_HOST && mkcert()],
});
