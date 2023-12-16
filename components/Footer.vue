<template>
  <footer class="fixed bottom-0 z-50 w-full border-t border-gray-100 bg-gray-50">
    <nav class="p-4 text-md">
      <div class="flex justify-between">
        <div class="flex space-x-2 lg:space-x-6">
          <template v-for="link in block?.links" :key="link.text">
            <UiLink :link="link" @link-click="onLinkClick(localePath(link.url))"></UiLink>
          </template>
        </div>
        <div class="flex items-center gap-1.5 lg:gap-2.5">
          <UiIcon
            :icon="'en'"
            :url="getSwitcherUrl('en')"
            :title="getTitle('en')"
            :label="getTitle('en')"
            :size="6"
            target="_self"
            @icon-click="onIconClick(getSwitcherUrl('en'))"></UiIcon>
          <div class="-mt-0.5 text">|</div>
          <UiIcon
            :icon="'de'"
            :url="getSwitcherUrl('de')"
            :title="getTitle('de')"
            :label="getTitle('de')"
            :size="6"
            target="_self"
            @icon-click="onIconClick(getSwitcherUrl('de'))"></UiIcon>
        </div>
        <span translate="no"
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
const { trackInternalClickEvent, trackCountrySwitchEvent } = useTracking();

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
    pageType: 'footer',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'footer_section',
    event_url,
  });
};

const onIconClick = (event_url: string | undefined) => {
  trackCountrySwitchEvent({
    pageTitle: window.document.title,
    pageType: 'footer',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'footer_section',
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
