import datasource from './config/datasource';
import locales from './config/locales';
import apiPaths from './config/paths';

const apiBasePath = '/api';

const HOUR = 60 * 60;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  compatibilityDate: '2024-11-17',

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
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-jsonld',
    '@nuxtjs/i18n',
    '~/modules/sitemap/src',
    '~/modules/firebase/src',
    '@nuxt/eslint',
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
    groups: [
      {
        userAgent: '*',
        disallow: ['/api/*', '/_nuxt/*'],
      },
    ],
    sitemap: 'https://anirbmuk.appspot.com/sitemap.xml',
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

  gtm: {
    id: '', // Override by setting NUXT_PUBLIC_GTM_ID
    debug: false, // Override by setting NUXT_PUBLIC_GTM_DEBUG
    enabled: true, // Override by setting NUXT_PUBLIC_GTM_ENABLED
  },

  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: './../assets/i18n',
    lazy: true,
    vueI18n: './../vue-i18n.config.ts',
    locales,
    defaultLocale: 'en',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  sitemap: {
    sourceUrl: '',
  },

  routeRules: {
    '/en/**': {
      headers: {
        'Cache-Control': `public, max-age=${HOUR}`,
      },
      swr: true,
    },
    '/de/**': {
      headers: {
        'Cache-Control': `public, max-age=${HOUR}`,
      },
      swr: true,
    },
  },

  devServer: {
    https: {
      key: 'localhost.pem',
      cert: 'localhost.crt',
    },
  },

});
