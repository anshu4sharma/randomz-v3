import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/

export default defineConfig(({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    server: {
      host: true,
      // port:8000,
      strictPort: true,
    },
  };
});
