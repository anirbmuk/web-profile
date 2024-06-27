<template>
  <header class="header-background fixed top-0 z-50 w-full">
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
      <h1 class="py-4 text-16xl font-bold text-black-dark md:text-massive">
        !{{ error?.statusCode }}!
      </h1>
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
      data: any;
    }>,
    default: null,
  },
});

const localePath = useLocalePath();
const { $i18n } = useNuxtApp();
const { public: { googleSiteVerification } } = useRuntimeConfig();
const { trackInternalClickEvent } = useTracking();

const title =
  props.error?.statusCode === 404
    ? $i18n.t('error.title_not_found')
    : $i18n.t('error.title_others');

useHead({
  title,
});
useSeoMeta({
  robots: 'noindex,nofollow',
  description: `${title} - ${props.error?.message || ''}`,
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
    pageType: 'footer',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'footer_section',
    event_url,
  });
};

defineOptions({
  name: 'GlobalErrorPage',
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 0 2px var(--black-light);
}

.header-background {
  @apply border-b border-gray-100 bg-gray-50 dark:border-transparent;
}
</style>
