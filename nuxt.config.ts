// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: 'assets/i18n',
    lazy: true,
    vueI18n: 'vue-i18n.config.ts',
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
        iso: 'en-US',
        domain: 'localhost:3000',
        name: 'English',
      },
      {
        code: 'de',
        file: 'de-DE.json',
        iso: 'de-DE',
        domain: 'localhost:3000',
        name: 'Deutsch',
      },
    ],
    defaultLocale: 'en',
  },
});
