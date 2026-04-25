<template>
  <Header />
  <main
    id="main"
    class="container mx-auto my-20">
    <slot />
  </main>
  <Footer
    v-if="footer"
    :block="footer" />
  <ClientOnly>
    <UiBackToTop
      v-show="scrollState > 200"
      @scroll-to-top="scrollToTop" />
  </ClientOnly>
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';
import { omit } from 'radash';

const { $i18n } = useNuxtApp();
const {
  public: {
    googleSiteVerification,
    baseUrl,
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
  authorSchema,
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
    {
      rel: 'preload',
      as: 'image',
      type: 'image/webp',
      fetchpriority: 'high',
      href: `${baseUrl}/seo.webp`,
    },
  ],
});

const description = $i18n.t('global.description');

useSeoMeta({
  robots: 'index,follow',
  description,
  ogTitle: () => GLOBAL_TITLE + ' | ' + $i18n.t('main.title'),
  ogDescription: description,
  ogImage: `${baseUrl}/seo.webp`,
  ogLocale: $i18n.locale.value,
  ogLocaleAlternate: getAlternateISOLocales($i18n.locale.value),
  ogUrl: getCanonical(),
  ogSiteName: 'anirbmuk',
  ogType: 'profile',
  // @ts-expect-errorType '"image/webp"' is not assignable to type 'ResolvableValue<"image/gif" | "image/jpeg" | "image/png" | undefined>'
  ogImageType: 'image/webp',
  ogImageAlt: $i18n.t('global.twitterTitle'),
  twitterTitle: () => GLOBAL_TITLE + ' | ' + $i18n.t('main.title'),
  twitterDescription: $i18n.t('global.description'),
  twitterSite: 'anirbmuk',
  twitterCreator: '@anirbmuk',
  twitterImage: `${baseUrl}/seo.webp`,
  twitterImageAlt: $i18n.t('global.twitterTitle'),
  twitterCard: 'summary_large_image',
  author: 'Anirban Mukherjee',
  colorScheme: 'dark light',
  profileFirstName: 'Anirban',
  profileLastName: 'Mukherjee',
  profileUsername: 'anirbmuk',
  profileGender: 'Male',
  themeColor: '#f5f5f5',
  ...(googleSiteVerification && {
    googleSiteVerification,
  }),
});

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: baseUrl,
  name: 'anirbmuk',
  inLanguage: ['en', 'de'],
  image: `${baseUrl}/seo.webp`,
  author: authorSchema.value,
}));

defineOptions({
  name: 'DefaultLayout',
});
</script>
