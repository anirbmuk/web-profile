<template>
  <footer class="fixed bottom-0 w-full border-t border-gray-100 bg-gray-50">
    <nav class="p-4 text-md">
      <div class="flex justify-between">
        <div class="flex space-x-4 lg:space-x-8">
          <template v-for="link in block?.links" :key="link.text">
            <UiLink :link="link" @link-click="onLinkClick(localePath(link.url))"></UiLink>
          </template>
        </div>
        <span
          >&copy; {{ block?.copyright }},
          <time :date-time="block?.publishdate" publish-date>{{ year }}</time></span
        >
      </div>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';

const { $i18n } = useNuxtApp();
const localePath = useLocalePath();
const { trackInternalClickEvent } = useTracking();

defineProps({
  block: {
    type: Object as PropType<FooterBlock>,
    default: undefined,
  },
});

const year = new Date().getFullYear();

const onLinkClick = (event_url: string | undefined) => {
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
  name: 'FooterComponent',
});
</script>
