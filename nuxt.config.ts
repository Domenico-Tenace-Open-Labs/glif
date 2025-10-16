import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@vite-pwa/nuxt", "@nuxt/fonts"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Glif | Create and download customizable QR codes",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  css: ["~/assets/css/main.css"],

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700],
      styles: ["normal"],
    },
    families: [{ name: "Inter", provider: "google" }],
  },

  vite: { plugins: [tailwindcss()] },

  pwa: {
    registerType: "autoUpdate",
    strategies: "generateSW",
    manifest: {
      name: "Glif",
      short_name: "Glif",
      description: "Application that allows you to create and download customizable QR codes",
      theme_color: "#4caf50",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
});
