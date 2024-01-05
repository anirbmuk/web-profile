<template>
  <Header />
  <main class="container mx-auto my-20">
    <ClientOnly>
      <UiBackToTop v-show="scrollState > 200" @scroll-to-top="scrollToTop" />
    </ClientOnly>
    <slot />
  </main>
  <Footer v-if="footer?.[0]" :block="footer[0]" />
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';

const { $i18n } = useNuxtApp();
const {
  public: { googleSiteVerification },
} = useRuntimeConfig();
const { fetch } = useFirebase();
const { scrollState, scrollToTop } = useScroll('scroll');

const footer = await fetch<FooterBlock>('footer', true, 1);

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
  ],
  titleTemplate (title) {
    return title ? `${$i18n.t('global.title')} | ${title}` : $i18n.t('global.title');
  },
});
useSeoMeta({
  robots: 'index,follow',
  description: $i18n.t('global.description'),
  ogDescription: $i18n.t('global.description'),
  ogImage: '/seo.webp',
  colorScheme: 'dark light',
  ogLocale: $i18n.locale.value,
  author: 'Anirban Mukherjee',
  ogSiteName: 'anirbmuk',
  ogType: 'website',
  twitterSite: 'anirbmuk',
  twitterCreator: '@anirbmuk',
  keywords: 'anirban,mukherjee,anirbmuk,frontend,developer,bio,resume',
  twitterCard: 'summary_large_image',
  themeColor: '#f5f5f5',
  ...(googleSiteVerification && { googleSiteVerification }),
});
defineOptions({
  name: 'DefaultLayout',
});
</script>
