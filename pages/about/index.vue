<template>
  <About />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
const { getCanonical } = useSeo();
useHead({
  title: $i18n.t('about.title'),
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
  ],
});
defineOptions({
  name: 'AboutIndexPage',
});
</script>
