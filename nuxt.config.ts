// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxt/icon"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    apiBase: "http://localhost:5006",
    public: {
      apiBase: "/api", // frontend always uses /api
    },
  },
});
