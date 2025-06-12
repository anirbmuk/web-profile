<template>
  <Main />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
const {
  getCanonical,
  generateAlternateLinks,
} = useSeo();

useHead({
  title: $i18n.t('main.title'),
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
    ...generateAlternateLinks(),
  ],
});

definePageMeta({
  scrollToTop: true,
  pageMeta: 'main',
});

defineOptions({
  name: 'RootIndexPage',
});
</script>
