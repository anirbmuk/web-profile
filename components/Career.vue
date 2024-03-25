<template>
  <section class="space-y-8">
    <h3
      class="flex justify-center opacity-80 duration-200 ease-in lg:hover:scale-x-105 lg:hover:ease-out"
      heading
    >
      {{ $i18n.t('main.career.title') }}
    </h3>
    <!-- This DIV is important. Do NOT remove. -->
    <div>
      <UiTimeline :timelines="block" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CareerBlock } from '~/types/features/career';

defineProps({
  block: {
    type: Array as PropType<CareerBlock[]>,
    default: null,
  },
});

const { $i18n } = useNuxtApp();

defineOptions({
  name: 'CareerComponent',
});
</script>
