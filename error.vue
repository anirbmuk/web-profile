<template>
  <header class="fixed top-0 z-50 w-full border-b border-gray-100 bg-gray-50 dark:bg-transparent">
    <div class="py-4">
      <h1
        class="text-shadow items-center text-center text-3xl font-bold uppercase tracking-wide md:text-4xl md:tracking-wider lg:text-6xl"
        translate="no">
        Anirban Mukherjee
      </h1>
    </div>
  </header>
  <main class="container mx-auto my-20">
    <section class="text-center">
      <h2 class="py-4 text-16xl font-bold text-black-dark md:text-massive">
        !{{ error?.statusCode }}!
      </h2>
      <div
        v-if="error?.message"
        class="m-2 text-red">
        {{ error.message }}
      </div>
      <p
        v-if="error?.statusCode !== 404"
        class="text-center">
        {{ $i18n.t('error.message_others') }}
      </p>
      <p v-else>
        {{ $i18n.t('error.message_not_found') }}
      </p>
      <div class="mb-2 mt-4 flex items-center justify-center">
        <UiButton
          :button-type="{ type: 'button', buttonClass: 'download-button' }"
          @onclick="onLinkClick(localePath('/'))">
          {{ $i18n.t('error.back_button') }}
        </UiButton>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object as PropType<{
      url: string;
      statusCode: number;
      statusMessage: string;
      message: string;
      description: string;
      data: unknown;
    }>,
    default: null,
  },
});

const localePath = useLocalePath();
const { $i18n } = useNuxtApp();
const { public: { googleSiteVerification } } = useRuntimeConfig();
const { trackInternalClickEvent } = useTracking();
const {
  getCanonical,
  getISOLocale,
  getAlternateISOLocales,
} = useSeo();

const GLOBAL_TITLE = $i18n.t('global.title');

const title =
  props.error?.statusCode === 404
    ? $i18n.t('error.title_not_found')
    : $i18n.t('error.title_others');

useHead({
  htmlAttrs: {
    lang: getISOLocale($i18n.locale.value),
  },
  title,
});
useSeoMeta({
  robots: props.error?.statusCode ? 'noindex,follow' : 'noindex,nofollow',
  description: $i18n.t('global.description'),
  ogDescription: $i18n.t('global.description'),
  ogImage: '/seo.webp',
  ogLocale: getISOLocale($i18n.locale.value),
  ogLocaleAlternate: getAlternateISOLocales($i18n.locale.value),
  ogUrl: getCanonical(),
  ogTitle: GLOBAL_TITLE,
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

const onLinkClick = (event_url: string | undefined) => {
  clearError({
    redirect: event_url,
  });
  trackInternalClickEvent({
    pageTitle: window.document.title,
    pageType: 'error',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'error_page',
    event_url,
  });
};

defineOptions({
  name: 'GlobalErrorPage',
});
</script>
