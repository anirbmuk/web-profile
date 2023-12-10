<template>
  <footer class="fixed bottom-0 w-full border-t border-gray-100 bg-gray-50">
    <nav class="p-4 text-md">
      <div class="flex justify-between">
        <div class="flex space-x-4 lg:space-x-8">
          <template v-for="link of block?.links" :key="link.text">
            <UiLink :link="link"></UiLink>
          </template>
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

defineProps({
  block: {
    type: Object as PropType<FooterBlock>,
    default: undefined,
  },
});

const year = new Date().getFullYear();

defineOptions({
  name: 'FooterComponent',
});
</script>
