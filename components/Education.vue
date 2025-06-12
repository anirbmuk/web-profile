<template>
  <section>
    <UiAccordion :state-key="'education'">
      <template #heading>
        <h3 class="md:heading gradient-text">
          {{ $i18n.t('main.education.title') }}
        </h3>
      </template>
      <template #content>
        <ul class="md:grid md:grid-cols-2 md:gap-3 2xl:grid-cols-3">
          <li
            v-for="(education, index) in block"
            :key="`education_${index + 1}`"
            class="mb-2.5 rounded border border-gray-300 p-4 duration-300 ease-in-out hover:scale-105 hover:bg-gray-50 md:m-0.5 dark:bg-transparent dark:hover:bg-transparent">
            <UiLinkOrText>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text md:text-xl">
                      {{ education.school }}
                    </div>
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
            </UiLinkOrText>
          </li>
        </ul>
      </template>
    </UiAccordion>
  </section>
</template>

<script setup lang="ts">
import type { EducationBlock } from '~/types/features/education';

const { $i18n } = useNuxtApp();

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
