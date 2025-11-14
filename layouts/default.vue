<template>
  <Header />
  <main class="container mx-auto my-20">
    <ClientOnly>
      <UiBackToTop
        v-show="scrollState > 200"
        @scroll-to-top="scrollToTop" />
    </ClientOnly>
    <slot />
  </main>
  <Footer
    v-if="footer"
    :block="footer" />
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';
import { omit } from 'radash';

const { $i18n } = useNuxtApp();
const {
  public: {
    googleSiteVerification,
    gtm: { enabled: gtmEnabled },
  },
} = useRuntimeConfig();
const { fetch } = useFirebase();
const {
  scrollState,
  scrollToTop,
} = useScroll('scroll');
const {
  getCanonical,
  getISOLocale,
  getAlternateISOLocales,
} = useSeo();

const GLOBAL_TITLE = $i18n.t('global.title');

const { data: footer } = useAsyncData('footer', async () => {
  const [footer] = await fetch<FooterBlock>('footer', true, 1);
  return footer;
}, {
  getCachedData(key, nuxt) {
    return nuxt.payload.data[key];
  },
  transform(data) {
    if (!data) {
      return null;
    }
    return omit(data, ['documentid', 'visibility']) as FooterBlock;
  },
});

useHead({
  htmlAttrs: {
    lang: getISOLocale($i18n.locale.value),
  },
  titleTemplate(title) {
    return title ? `${GLOBAL_TITLE} | ${title}` : GLOBAL_TITLE;
  },
  link: [
    ...(gtmEnabled ? [{
      rel: 'preconnect',
      href: 'https://www.googletagmanager.com/',
    }] : []),
  ],
});

useSeoMeta({
  robots: 'index,follow',
  description: $i18n.t('global.description'),
  ogDescription: $i18n.t('global.description'),
  ogImage: '/seo.webp',
  ogLocale: getISOLocale($i18n.locale.value),
  ogLocaleAlternate: getAlternateISOLocales($i18n.locale.value),
  ogUrl: getCanonical(),
  ogSiteName: 'anirbmuk',
  ogType: 'profile',
  ogImageAlt: $i18n.t('global.twitterTitle'),
  twitterSite: 'anirbmuk',
  twitterCreator: '@anirbmuk',
  twitterImage: '/seo.webp',
  twitterImageAlt: $i18n.t('global.twitterTitle'),
  twitterCard: 'summary_large_image',
  author: 'Anirban Mukherjee',
  colorScheme: 'dark light',
  keywords: $i18n.t('global.keywords'),
  profileFirstName: 'Anirban',
  profileLastName: 'Mukherjee',
  profileUsername: 'anirbmuk',
  profileGender: 'Male',
  themeColor: '#f5f5f5',
  ...(googleSiteVerification && {
    googleSiteVerification,
  }),
});

defineOptions({
  name: 'DefaultLayout',
});
</script>
