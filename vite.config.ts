import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    port: 5273,
    https: {
      key: path.resolve(__dirname, "nginx/ssl/private.key"),
      cert: path.resolve(__dirname, "nginx/ssl/ssl-bundle.crt"),
    }
  },
  plugins: [svgr(), react({ include: /\.(js|jsx|ts|tsx)$/ }), VitePWA()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  base: process.env.NODE_ENV === "production" ? "." : "./"
});
