// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt','nuxt-mdi'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
   runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://localhost:7055'
    }
  }
})
