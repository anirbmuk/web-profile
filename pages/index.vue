<template>
  <Main />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
const { getCanonical } = useSeo();

useHead({
  title: $i18n.t('main.title'),
  link: [
    {
      rel: 'canonical',
      href: getCanonical(),
    },
  ],
});
defineOptions({
  name: 'RootIndexPage',
});
</script>
