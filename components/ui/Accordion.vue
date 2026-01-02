<template>
  <div>
    <div
      class="cursor-pointer pb-0.5 md:pb-1"
      role="button"
      @click="accordionState = !accordionState">
      <div class="flex items-center justify-between">
        <div class="py-2">
          <slot name="heading" />
        </div>
        <div class="py-2">
          <slot
            name="actions"
            :state="accordionState" />
        </div>
        <div
          :class="{ 'rotate-180': accordionState }"
          class="-mt-0.5 duration-300 ease-in-out"
          :title="accordionState ? $i18n.t('components.UiAccordion.collapse'): $i18n.t('components.UiAccordion.expand')"
          role="button">
          <UiIcon
            :icon="'collapse'"
            :size="6" />
        </div>
      </div>
    </div>
    <UtilFadeInTransition>
      <template v-if="accordionState">
        <slot name="content" />
      </template>
    </UtilFadeInTransition>
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

defineOptions({
  name: 'AccordionComponent',
});
</script>
