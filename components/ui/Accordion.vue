<template>
  <div>
    <div class="pb-0.5 md:pb-1">
      <div class="flex items-center justify-between">
        <div class="py-2">
          <slot name="heading" />
        </div>
        <div class="py-2">
          <slot
            name="actions"
            :state="accordionState" />
        </div>
        <button
          type="button"
          :class="{ 'rotate-180': accordionState }"
          class="-mt-0.5 duration-300 ease-in-out"
          :title="accordionState ? $i18n.t('components.UiAccordion.collapse'): $i18n.t('components.UiAccordion.expand')"
          :aria-expanded="accordionState"
          :aria-controls="panelId"
          @click="accordionState = !accordionState">
          <LazyUiIconCollapse
            :class="{ 'rotate-180': accordionState }"
            class="!size-6 dark:text-white"
            :font-controlled="false"
            aria-hidden="true" />
        </button>
      </div>
    </div>
    <div
      :id="panelId"
      role="region"
      :hidden="!accordionState">
      <UtilFadeInTransition>
        <div
          v-if="accordionState"
          :key="stateKey">
          <slot name="content" />
        </div>
      </UtilFadeInTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();

const props = defineProps({
  stateKey: {
    type: String,
    required: true,
  },
});

const accordionState = useState(props.stateKey || 'accordion', () => true);

const panelId = computed(
  () => `accordion-panel-${props.stateKey.replaceAll(/[^\w-]/g, '-')}`,
);

defineOptions({
  name: 'AccordionComponent',
});
</script>
