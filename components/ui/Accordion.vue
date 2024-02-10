<template>
  <div>
    <div
      class="cursor-pointer pb-0.5 md:pb-1"
      role="button"
      @click="accordionState = !accordionState"
    >
      <div class="flex items-center justify-between">
        <div class="py-2">
          <slot name="heading" />
        </div>
        <div
          :class="{ 'rotate-180': accordionState }"
          class="-mt-0.5 ease-in-out duration-300"
          :title="accordionState ? $i18n.t('components.UiAccordion.collapse'): $i18n.t('components.UiAccordion.expand')"
          role="button"
        >
          <UiIcon :icon="'collapse'" :size="6" />
        </div>
      </div>
    </div>
    <div :class="{ open: accordionState, close: !accordionState }">
      <slot name="content" />
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

defineOptions({
  name: 'AccordionComponent',
});
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}

.open {
  display: block;
  animation: fade-in 750ms forwards;
}

.close {
  display: none;
}
</style>
