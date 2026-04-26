<template>
  <div class="my-24 md:my-32">
    <article
      v-if="aboutme"
      ref="aboutContent"
      class="mx-auto whitespace-break-spaces text-pretty text-md md:text xl:max-w-1/2">
      <p
        v-for="content in aboutme"
        :key="content.documentid"
        class="p-4 md:py-5"
        v-html="content.description || ''" />
    </article>
  </div>
</template>

<script setup lang="ts">
import type { AboutmeBlock } from '~/types/features/about';
import type { ClickEventParams } from '~/types/tracking';
import { pick } from 'radash';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();
const { loadingState } = useLoader();

const {
  trackPageViewEvent,
  trackExternalClickEvent,
} = useTracking();

const aboutContent = ref<HTMLElement | null>(null);

const loadData = async () => {
  loadingState.value = true;
  return (
    await fetch<AboutmeBlock>('aboutme').finally(
      () => (loadingState.value = false),
    )
  )?.sort((a1, a2) => a1.position - a2.position);
};

const { data } = useAsyncData('about', loadData, {
  getCachedData(key, nuxt) {
    return nuxt.payload.data[key];
  },
  transform(data) {
    return data.map((each) => pick(each, ['documentid', 'description']));
  },
});
const aboutme = computed(() => data.value);

const onLinkClick = (event: Event) => {
  const clickedElement = event.target instanceof Element
    ? event.target
    : null;
  const linkElement = clickedElement?.closest<HTMLAnchorElement>('a[href]');

  if (linkElement) {
    const metadata: ClickEventParams = {
      pageTitle: window.document.title,
      pageType: 'about',
      pageUrl: window.location.href,
      locale: $i18n.locale.value,
      event_section: 'aboutme_section',
      event_url: linkElement.href,
    };
    trackExternalClickEvent(metadata);
  }
};

watch(aboutContent, (element, previousElement) => {
  previousElement?.removeEventListener('click', onLinkClick);
  element?.addEventListener('click', onLinkClick);
});

onMounted(() =>
  trackPageViewEvent({
    pageTitle: window.document.title,
    pageType: 'about',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
  }),
);

onUnmounted(() => {
  aboutContent.value?.removeEventListener('click', onLinkClick);
});

defineOptions({
  name: 'AboutComponent',
});
</script>
