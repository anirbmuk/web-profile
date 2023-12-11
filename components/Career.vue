<template>
  <section class="space-y-8">
    <h3
      class="flex justify-center opacity-80 duration-200 ease-in lg:hover:scale-x-105 lg:hover:ease-out"
      heading>
      {{ $i18n.t('main.career.title') }}
    </h3>
    <div v-if="block">
      <LazyUiTimeline :timelines="block" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CareerBlock } from '~/types/features/career';

defineProps({
  block: Array as PropType<CareerBlock[] | null>,
  default: null,
});

const { $i18n } = useNuxtApp();

defineOptions({
  name: 'CareerComponent',
});
</script>
