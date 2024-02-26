import { existsSync } from 'fs';
import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit';
import type { ModuleOptions } from './types';
import { SITEMAP_FILENAME, SITEMAP_MODULENAME } from './constants';

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
    name: SITEMAP_MODULENAME,
    configkey: 'sitemap',
    compatibility: {
      nuxt: '^3.8.2',
    },
  },
  defaults: {
    sourceUrl: 'https://anirbmuk.appspot.com',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const staticFilePath = resolve(
      nuxt.options.srcDir,
      nuxt.options.dir.public,
      SITEMAP_FILENAME,
    );
    if (existsSync(staticFilePath)) {
      console.error(
        `To use '${SITEMAP_MODULENAME}', please remove public/${SITEMAP_FILENAME}`,
      );
      return;
    }

    nuxt.options.runtimeConfig.sitemap = { ...options };

    const runtimeDir = resolve('./runtime');
    nuxt.options.build.transpile.push(runtimeDir);

    addServerHandler({
      route: `/${SITEMAP_FILENAME}`,
      handler: resolve(runtimeDir, 'handler'),
      method: 'get',
    });
  },
});
