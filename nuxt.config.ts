import locales from './config/locales';
import datasource from './config/datasource';
import { initializeApp } from 'firebase/app';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: true,

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

  css: ['@/assets/styles/root.css', '@/assets/styles/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  googleFonts: {
    display: 'swap',
    preconnect: true,
    useStylesheet: true,
    families: {
      'Noto Sans': [400, 600, 700],
    },
  },

  robots: {
    rules: [
      {
        UserAgent: '*',
        Disallow: '',
      },
    ],
  },

  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: 'assets/i18n',
    lazy: true,
    vueI18n: 'vue-i18n.config.ts',
    locales,
    defaultLocale: 'en',
  },
});
