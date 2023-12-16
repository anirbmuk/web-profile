<template>
  <footer class="fixed bottom-0 w-full border-t border-gray-100 bg-gray-50">
    <nav class="p-4 text-md">
      <div class="flex justify-between">
        <div class="flex space-x-4 lg:space-x-8">
          <template v-for="link in block?.links" :key="link.text">
            <UiLink :link="link" @link-click="onLinkClick(localePath(link.url))"></UiLink>
          </template>
        </div>
        <div class="flex space-x-1.5 lg:space-x-2.5">
          <UiIcon
            :icon="'en'"
            :url="getSwitcherUrl('en')"
            :title="getTitle('en')"
            :label="getTitle('en')"
            :size="6"
            target="_self"></UiIcon>
          <span>{{ '|' }}</span>
          <UiIcon
            :icon="'de'"
            :url="getSwitcherUrl('de')"
            :title="getTitle('de')"
            :label="getTitle('de')"
            :size="6"
            target="_self"></UiIcon>
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
const {
  public: { baseUrl },
} = useRuntimeConfig();
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

const isCurrentlyOnLocale = (locale: string) => locale === $i18n.locale.value;

const getSwitcherUrl = (locale: string) =>
  isCurrentlyOnLocale(locale) ? '' : `${baseUrl}/${locale}`;

const getTitle = (locale: string) =>
  isCurrentlyOnLocale(locale)
    ? $i18n.t(`footer.${locale}.current`)
    : $i18n.t(`footer.${locale}.switch`);

defineOptions({
  name: 'FooterComponent',
});
</script>
