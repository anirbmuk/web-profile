<template>
  <Header />
  <main class="container mx-auto my-20">
    <ClientOnly>
      <UiBackToTop v-if="scrollState > 100" @scroll-to-top="scrollToTop" />
    </ClientOnly>
    <slot />
  </main>
  <Footer v-if="footer?.[0]" :block="footer[0]" />
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';
import { FOOTER } from '~/constants/url';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();
const { scrollState, scrollToTop } = useScroll('scroll');

const footer = await fetch<FooterBlock>(FOOTER);

useHead({
  htmlAttrs: {
    lang: $i18n.locale,
  },
});
useSeoMeta({
  robots: 'index,follow',
  description: $i18n.t('global.description'),
  ogDescription: $i18n.t('global.description'),
  ogImage: '~/assets/images/seo.webp',
  colorScheme: 'dark light',
  ogLocale: $i18n.locale,
  author: 'Anirban Mukherjee',
  ogSiteName: 'anirbmuk',
  ogType: 'website',
  twitterSite: 'anirbmuk',
  twitterCreator: '@anirbmuk',
  keywords: 'anirban,mukherjee,anirbmuk,frontend,developer,bio,resume',
  twitterCard: 'summary_large_image',
  themeColor: '#f5f5f5',
});
defineOptions({
  name: 'DefaultLayout',
});
</script>
