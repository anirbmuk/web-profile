import datasource from './config/datasource';
import locales from './config/locales';
import apiPaths from './config/paths';

const apiBasePath = '/api';

const HOUR = 60 * 60;
const DAY = 24 * HOUR;
const YEAR = 365 * DAY;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-07-07',

  app: {
    head: {
      meta: [
        {
          name: 'app-version',
          content: '2.0.6',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
    },
  },

  runtimeConfig: {
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
    '~/modules/firebase/src',
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    'nuxt-jsonld',
    '~/modules/sitemap/src',
    'nuxt-vitalizer',
    '@nuxt/eslint',
    '@nuxt/hints',
  ],

  googleFonts: {
    display: 'swap',
    preconnect: true,
    preload: true,
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
    sitemap: '/sitemap.xml',
  },

  firebase: {
    ...datasource,
    apiBasePath, // Override by setting NUXT_FIREBASE_API_BASE_PATH
    apiPaths, // Override by setting NUXT_FIREBASE_API_PATHS
  },

  gtm: {
    id: '', // Override by setting NUXT_PUBLIC_GTM_ID
    debug: false, // Override by setting NUXT_PUBLIC_GTM_DEBUG
    enabled: true, // Override by setting NUXT_PUBLIC_GTM_ENABLED,
    defer: true, // Override by setting NUXT_PUBLIC_GTM_DEFER,
  },

  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: './../assets/i18n',
    vueI18n: './../vue-i18n.config.ts',
    locales,
    defaultLocale: 'en',
    autoDeclare: true,
  },

  sitemap: {
    sourceUrl: '',
  },

  vitalizer: {
    disablePreloadLinks: true,
    disablePrefetchLinks: true,
    disableStylesheets: true,
  },

  routeRules: {
    '/en/**': {
      headers: {
        'Cache-Control': `public, max-age=${DAY}`,
      },
      swr: true,
    },
    '/de/**': {
      headers: {
        'Cache-Control': `public, max-age=${DAY}`,
      },
      swr: true,
    },
    '/icons/**': {
      headers: {
        'Cache-Control': `public, max-age=${YEAR}`,
      },
      swr: true,
    },
    '/seo.webp': {
      headers: {
        'Cache-Control': `public, max-age=${YEAR}`,
      },
      swr: true,
    },
    '/favicon.ico': {
      headers: {
        'Cache-Control': `public, max-age=${YEAR}`,
      },
      swr: true,
    },
    '/apple-touch-icon.png': {
      headers: {
        'Cache-Control': `public, max-age=${YEAR}`,
      },
      swr: true,
    },
    '/api/**': {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  },

  devServer: {
    https: {
      key: 'localhost.pem',
      cert: 'localhost.crt',
    },
  },

  experimental: {
    renderJsonPayloads: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  features: {
    inlineStyles: true,
  },

  vite: {
    optimizeDeps: {
      exclude: ['@nuxt/hints'],
    },
  },

});
