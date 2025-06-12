import {
  addServerHandler,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import type { ModuleOptions } from './types';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    ['firebase']?: Partial<ModuleOptions>;
  }
  interface NuxtOptions {
    ['firebase']: ModuleOptions;
  }
  interface RuntimeConfig {
    ['firebase']: ModuleOptions;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'firebase',
    configkey: 'firebase',
    compatibility: {
      nuxt: '^3.8.2',
    },
  },
  defaults: {
    apiKey: '', // Override by setting NUXT_FIREBASE_API_KEY
    authDomain: '', // Override by setting NUXT_FIREBASE_AUTH_DOMAIN
    projectId: '', // Override by setting NUXT_FIREBASE_PROJECT_ID
    storageBucket: '', // Override by setting NUXT_FIREBASE_STORAGE_BUCKET
    messagingSenderId: '', // Override by setting NUXT_FIREBASE_MESSAGING_SENDER_ID
    appId: '', // Override by setting NUXT_FIREBASE_APP_ID
    measurementId: '', // Override by setting NUXT_FIREBASE_MEASUREMENT_ID
    apiBasePath: '', // Override by setting NUXT_FIREBASE_API_BASE_PATH
    apiPaths: [], // Override by setting NUXT_FIREBASE_API_PATHS
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.runtimeConfig.firebase = {
      ...options,
    };

    const runtimeDir = resolve('./runtime');
    nuxt.options.build.transpile.push(runtimeDir);

    for (const path of options.apiPaths) {
      addServerHandler({
        route: `${options.apiBasePath}/${path}`,
        handler: resolve(runtimeDir, 'handler'),
        method: 'get',
      });
    }
  },
});
