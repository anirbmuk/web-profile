import locales from './config/locales';
import { API_PATHS } from './constants/paths';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    app: {
      head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
      },
    },
    public: {
      appEnv: '', // Override by setting NUXT_PUBLIC_APP_ENV
      baseUrl: '', // Override by setting NUXT_PUBLIC_BASE_URL
      googleSiteVerification: '', // Override by setting NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      offlineMode: '', // Override by setting NUXT_PUBLIC_OFFLINE_MODE
      apiBasePath: '', // Override by setting NUXT_PUBLIC_API_BASE_PATH
    },
  },

  css: ['@/assets/styles/root.css', '@/assets/styles/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
    'nuxt-gtag',
    '@nuxtjs/i18n',
    '~/modules/sitemap/src',
    '~/modules/firebase/src',
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

  svgo: {
    autoImportPath: './assets/icons',
    defaultImport: 'component',
    componentPrefix: 'Icon',
  },

  firebase: {
    apiKey: '', // Override by setting NUXT_FIREBASE_API_KEY
    authDomain: '', // Override by setting NUXT_FIREBASE_AUTH_DOMAIN
    projectId: '', // Override by setting NUXT_FIREBASE_PROJECT_ID
    storageBucket: '', // Override by setting NUXT_FIREBASE_STORAGE_BUCKET
    messagingSenderId: '', // Override by setting NUXT_FIREBASE_MESSAGING_SENDER_ID
    appId: '', // Override by setting NUXT_FIREBASE_APP_ID
    measurementId: '', // Override by setting NUXT_FIREBASE_MEASUREMENT_ID
    apiBasePath: process.env.NUXT_PUBLIC_API_BASE_PATH, // Override by setting NUXT_FIREBASE_API_BASE_PATH
    apiPaths: API_PATHS, // Override by setting NUXT_FIREBASE_API_PATHS
  },

  gtag: {
    id: '', // Override by setting NUXT_PUBLIC_GTAG_ID
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

  sitemap: {
    sourceUrl: '',
  },
});
