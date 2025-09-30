import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/supabase',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  runtimeConfig: {
    public: {
      // Get a hold of the deployment URL from Vercel (fallback to localhost 3000)
      baseUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000'
    }
  },
})