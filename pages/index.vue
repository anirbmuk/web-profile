<template>
  <Main />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
const {
  public: { baseUrl },
} = useRuntimeConfig();
const { fullPath } = useRoute();
useHead({
  title: $i18n.t('main.title'),
  link: [
    {
      rel: 'canonical',
      href: `${baseUrl}${fullPath}`,
    },
  ],
});
defineOptions({
  name: 'RootIndexPage',
});
</script>
