<template>
  <Header />
  <div class="container mx-auto my-4">
    <slot />
  </div>
  <Footer v-if="footer?.[0]" :block="footer[0]" />
</template>

<script setup lang="ts">
import type { FooterBlock } from '~/types/features/footer';
import { FOOTER } from '~/constants/url';

const { $i18n } = useNuxtApp();
const { get } = useFirebase();

const footer = await get<FooterBlock>(FOOTER);

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
