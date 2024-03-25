<template>
  <UiAccordion :state-key="'techstack'">
    <template #heading>
      <h3 class="md:heading gradient-text">
        {{ $i18n.t('main.techstack.title') }}
      </h3>
    </template>
    <template #content>
      <ul class="grid grid-cols-2 gap-0 md:grid-cols-3 md:gap-2 2xl:grid-cols-4 3xl:grid-cols-5">
        <li
          v-for="tech in technologies"
          :key="tech.icon"
          fehover
        >
          <UiLinkOrText :href="tech.url">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <LazyUiIcon
                  v-if="tech.icon"
                  :icon="tech.icon"
                  :size="8"
                />
                <div
                  class="text-md md:text"
                  translate="no"
                >
                  {{ tech.name }}
                </div>
              </div>
              <div>
                <LazyUiRating :rating="tech.rating" />
              </div>
            </div>
          </UiLinkOrText>
        </li>
        <li
          v-for="db in databases"
          :key="db.icon"
          fehover
        >
          <UiLinkOrText :href="db.url">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <LazyUiIcon
                  v-if="db.icon"
                  :icon="db.icon"
                  :size="8"
                />
                <div class="text-md md:text">
                  {{ db.name }}
                </div>
              </div>
              <div>
                <LazyUiRating :rating="db.rating" />
              </div>
            </div>
          </UiLinkOrText>
        </li>
      </ul>
    </template>
  </UiAccordion>
</template>

<script setup lang="ts">
import type { TechstackBlock } from '~/types/components/techstack';

const { $i18n } = useNuxtApp();

const props = defineProps({
  block: {
    type: Object as PropType<TechstackBlock>,
    required: true,
  },
});

const technologies = computed(
  () => props.block?.technology?.slice()?.sort((t1, t2) => t1.position - t2.position) || [],
);
const databases = computed(
  () => props.block?.database?.slice()?.sort((d1, d2) => d1.position - d2.position) || [],
);

defineOptions({
  name: 'TechstackComponent',
});
</script>
