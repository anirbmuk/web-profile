<template>
  <div>
    <div
      class="cursor-pointer pb-0.5 md:pb-1"
      @click="accordionState = !accordionState"
      role="button">
      <div class="flex items-center justify-between">
        <div class="py-2">
          <slot name="heading" />
        </div>
        <div :class="{ hidden: !accordionState }" title="Collapse" role="button">
          <span class="text-3xl font-normal" translate="no"> &#8613; </span>
        </div>
        <div :class="{ hidden: accordionState }" title="Expand" role="button">
          <span class="text-3xl" translate="no"> &#8615; </span>
        </div>
      </div>
    </div>
    <div :class="{ open: accordionState, close: !accordionState }">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
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
