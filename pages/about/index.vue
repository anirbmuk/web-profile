<template>
  <About />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
const {
  getCanonical,
  generateAlternateLinks,
} = useSeo();

useHead({
  title: $i18n.t('about.title'),
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
    ...generateAlternateLinks('about'),
  ],
});

definePageMeta({
  scrollToTop: true,
  pageMeta: 'about',
});

defineOptions({
  name: 'AboutIndexPage',
});
</script>
