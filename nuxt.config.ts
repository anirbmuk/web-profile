import datasource from './config/datasource';
import locales from './config/locales';
import apiPaths from './config/paths';

const apiBasePath = '/api';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false, 
  },

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
      apiBasePath, // Override by setting NUXT_PUBLIC_API_BASE_PATH
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
      },
      {
        Disallow: '/api/*',
      },
      {
        Disallow: '/_nuxt/*',
      },
      {
        Sitemap: 'https://anirbmuk.appspot.com/sitemap.xml',
      },
    ],
  },

  svgo: {
    autoImportPath: './assets/icons',
    defaultImport: 'component',
    componentPrefix: 'Icon',
  },

  firebase: {
    ...datasource,
    apiBasePath, // Override by setting NUXT_FIREBASE_API_BASE_PATH
    apiPaths, // Override by setting NUXT_FIREBASE_API_PATHS
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
