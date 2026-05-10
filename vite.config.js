// Vite configuration with PWA plugin for Service Worker and manifest generation
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icons/*.png"],
      manifest: {
        name: "Mise en Place",
        short_name: "Mise",
        description: "Your personal recipe companion and meal planner",
        theme_color: "#F4A535",
        background_color: "#FAF7F2",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Cache all recipe detail pages for offline access
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.themealdb\.com\/api\/json\/v1\/1\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "mealdb-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/www\.themealdb\.com\/images\//,
            handler: "CacheFirst",
            options: {
              cacheName: "mealdb-images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
