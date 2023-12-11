<template>
  <section>
    <UiAccordion :state-key="'education'">
      <template #heading>
        <h3 class="md:heading gradient-text">Education</h3>
      </template>
      <template #content>
        <ul class="md:grid md:grid-cols-2 md:gap-3 2xl:grid-cols-3">
          <li v-for="(education, index) in block" :key="index">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text md:text-xl">{{ education.school }}</div>
                  <div class="text-md text-gray-500">
                    {{ education.location }}
                  </div>
                </div>
                <div class="text-md text-gray-900">
                  {{ education.startyear }} - {{ education.endyear }}
                </div>
              </div>
              <div class="text-md">
                <div>{{ education.degree }} in {{ education.field }}</div>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </UiAccordion>
  </section>
</template>

<script setup lang="ts">
import type { EducationBlock } from '~/types/features/education';

defineProps({
  block: {
    type: Array as PropType<EducationBlock[]>,
    required: true,
  },
});
defineOptions({
  name: 'EducationComponent',
});
</script>

<style scoped>
li {
  @apply mb-2.5 cursor-pointer rounded border border-gray-300 p-4 duration-300 ease-out md:m-0.5;
}

@media screen and (min-width: 768px) and (hover: hover) {
  li:hover {
    @apply scale-105 bg-gray-50 ease-in;
  }
}

@media (prefers-color-scheme: dark) {
  li {
    @apply bg-transparent;
  }

  @media screen and (min-width: 768px) and (hover: hover) {
    li:hover {
      @apply scale-105 bg-transparent ease-in;
    }
  }
}
</style>
