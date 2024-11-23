import { existsSync } from 'fs';
import {
  addServerHandler,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import type { ModuleOptions } from './types';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    ['sitemap']?: Partial<ModuleOptions>;
  }
  interface NuxtOptions {
    ['sitemap']?: ModuleOptions;
  }
  interface RuntimeConfig {
    ['sitemap']: ModuleOptions;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'sitemap',
    configkey: 'sitemap',
    compatibility: {
      nuxt: '^3.8.2',
    },
  },
  defaults: {
    sourceUrl: '',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const staticFilePath = resolve(
      nuxt.options.srcDir,
      nuxt.options.dir.public,
      'sitemap.xml',
    );
    if (existsSync(staticFilePath)) {
      console.error('To use \'sitemap\' module, please remove public/sitemap.xml');
      return;
    }

    nuxt.options.runtimeConfig.sitemap = {
      ...options,
    };

    const runtimeDir = resolve('./runtime');
    nuxt.options.build.transpile.push(runtimeDir);

    addServerHandler({
      route: '/sitemap.xml',
      handler: resolve(runtimeDir, 'handler'),
      method: 'get',
    });
  },
});
