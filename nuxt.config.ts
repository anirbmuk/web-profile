import locales from './config/locales';
import datasource from './config/datasource';

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
    ...datasource,
  },

  css: ['@/assets/styles/root.css', '@/assets/styles/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
    'nuxt-gtag',
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

  svgo: {
    autoImportPath: './assets/icons',
    defaultImport: 'component',
    componentPrefix: 'Icon',
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

  _modules: ['~/modules/sitemap/src/module'],
});
