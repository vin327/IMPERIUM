// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  compatibilityDate: '2024-11-01',
  css: ['~/assets/styles/main.css'],
  devtools: { enabled: true },
  supabase: {
    redirect: false
  },
  pages: true,
})