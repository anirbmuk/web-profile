<template>
  <div class="my-24 md:my-32">
    <article
      v-if="aboutme"
      class="mx-auto whitespace-break-spaces text-justify text-md md:text xl:max-w-1/2">
      <p
        v-for="content in aboutme"
        :key="content.documentid"
        class="p-4 md:py-5"
        @click="onLinkClick($event)"
        v-html="content.description || ''" />
    </article>
  </div>
</template>

<script setup lang="ts">
import type { AboutmeBlock } from '~/types/features/about';
import type { ClickEventParams } from '~/types/tracking';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();
const { loadingState } = useLoader();

const {
  trackPageViewEvent,
  trackExternalClickEvent,
} = useTracking();

const trackableTagNames = ['A', 'SPAN'];

const loadData = async () => {
  loadingState.value = true;
  return (
    await fetch<AboutmeBlock>('aboutme').finally(
      () => (loadingState.value = false),
    )
  )?.sort((a1, a2) => a1.position - a2.position);
};

const { data } = useAsyncData('about', () => loadData(), {
  getCachedData: (key, nuxt) => nuxt.payload.data[key],
});
const aboutme = computed(() => data.value);

const onLinkClick = (event: Event) => {
  const tagName = (event?.target as HTMLElement)?.tagName;
  const trackable = trackableTagNames.includes(tagName);

  if (trackable) {
    let url: string;
    const metadata: ClickEventParams = {
      pageTitle: window.document.title,
      pageType: 'about',
      pageUrl: window.location.href,
      locale: $i18n.locale.value,
      event_section: 'aboutme_section',
      event_url: undefined,
    };
    if (tagName === 'A') {
      url = (event?.target as HTMLAnchorElement)?.href;
      metadata.event_url = url;
    } else if (tagName === 'SPAN') {
      url = ((event?.target as HTMLSpanElement)?.parentElement as HTMLAnchorElement)
        ?.href;
      metadata.event_url = url;
    }
    trackExternalClickEvent(metadata);
  }
};

onMounted(() =>
  trackPageViewEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
  }),
);

defineOptions({
  name: 'AboutComponent',
});
</script>
