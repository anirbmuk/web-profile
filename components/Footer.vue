<template>
  <footer class="fixed bottom-0 z-50 w-full border-t border-gray-100 bg-gray-50">
    <nav class="p-4 text-md">
      <div class="grid grid-cols-12">
        <div class="col-span-6 flex space-x-3 md:col-span-5 lg:space-x-6">
          <template v-for="link in block?.links" :key="link.text">
            <UiLink :link="link" @link-click="onLinkClick(localePath(link.url))" />
          </template>
        </div>
        <div
          class="col-span-6 flex items-center justify-end gap-2 md:col-span-2 md:justify-center lg:gap-3"
        >
          <UiIcon
            :icon="'en'"
            :url="getSwitcherUrl('en')"
            :title="getTitle('en')"
            :label="getTitle('en')"
            :size="6"
            target="_self"
          />
          <div class="-mt-0.5 text">
            |
          </div>
          <UiIcon
            :icon="'de'"
            :url="getSwitcherUrl('de')"
            :title="getTitle('de')"
            :label="getTitle('de')"
            :size="6"
            target="_self"
          />
        </div>
        <div translate="no" class="hidden justify-end md:col-span-5 md:flex">
          <span>{{ '&copy; ' + block?.copyright + ',' }}</span>
          <time class="ml-[3px]" :date-time="block?.publishdate" publish-date>{{
            year
          }}</time>
        </div>
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
const route = useRoute();
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
    pageType: 'footer',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'footer_section',
    event_url,
  });
};

const isCurrentlyOnLocale = (locale: string) => locale === $i18n.locale.value;

const getSwitcherUrl = (locale: string) => {
  const { fullPath } = route;
  if (!isCurrentlyOnLocale(locale)) {
    const [, path] = fullPath?.split('/').filter(Boolean) || [];
    return path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`;
  }
  return '';
};

const getTitle = (locale: string) =>
  isCurrentlyOnLocale(locale)
    ? $i18n.t(`footer.${locale}.current`)
    : $i18n.t(`footer.${locale}.switch`);

defineOptions({
  name: 'FooterComponent',
});
</script>
