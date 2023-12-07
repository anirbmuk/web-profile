import locales from './config/locales';
import datasource from './config/datasource';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    app: {
      head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
      },
    },
    public: {
      baseUrl: '',
    },
    ...datasource,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/robots', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: 'assets/i18n',
    lazy: true,
    vueI18n: 'vue-i18n.config.ts',
    locales,
    defaultLocale: 'en',
  },
  robots: {
    rules: [
      {
        UserAgent: '*',
        Disallow: '',
      },
    ],
  },
});
