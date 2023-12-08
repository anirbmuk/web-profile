<template>
  <Header />
  <main class="container mx-auto my-20">
    <slot />
  </main>
  <Footer v-if="footer?.[0]" :block="footer[0]" />
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';
import { FOOTER } from '~/constants/url';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();

const footer = await fetch<FooterBlock>(FOOTER);

useHead({
  htmlAttrs: {
    lang: $i18n.locale,
  },
  title: $i18n.t('global.title'),
});
useSeoMeta({
  robots: 'index,follow',
});
defineOptions({
  name: 'DefaultLayout',
});
</script>
