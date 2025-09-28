<template>
  <Header />
  <main class="container mx-auto my-20">
    <ClientOnly>
      <LazyUiBackToTop
        v-show="scrollState > 200"
        hydrate-on-idle
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
const { public: { googleSiteVerification } } = useRuntimeConfig();
const { fetch } = useFirebase();
const {
  scrollState,
  scrollToTop,
} = useScroll('scroll');

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
    lang: $i18n.locale.value,
  },
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
  titleTemplate(title) {
    return title ? `${$i18n.t('global.title')} | ${title}` : $i18n.t('global.title');
  },
});

useSeoMeta({
  robots: 'index,follow',
  description: $i18n.t('global.description'),
  ogDescription: $i18n.t('global.description'),
  ogImage: '/seo.webp',
  ogLocale: $i18n.locale.value,
  author: 'Anirban Mukherjee',
  ogSiteName: 'anirbmuk',
  ogType: 'profile',
  ogImageAlt: $i18n.t('global.twitterTitle'),
  twitterSite: 'anirbmuk',
  twitterCreator: '@anirbmuk',
  twitterImage: '/seo.webp',
  twitterImageAlt: $i18n.t('global.twitterTitle'),
  twitterCard: 'summary_large_image',
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
