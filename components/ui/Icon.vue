<template>
  <template v-if="componentType === 'link'">
    <div :class="displayClass">
      <a
        :target="target"
        :href="url"
        :aria-label="label || icon"
        :title="title"
        rel="nofollow"
        @click="$emit('iconClick', url)"
      ><component
        :is="iconComponent"
        :class="iconClass"
      /></a>
    </div>
    <slot :class="displayClass" />
  </template>
  <div v-else
       :title="title"
       :aria-label="label || icon"
  >
    <component
      :is="iconComponent"
      :class="iconClass"
      @click="$emit('iconClick', undefined)"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  IconLoadingType, IconPosition, 
} from '~/types/components/icon';

const sizeMappers: Record<number, string> = {
  2: 'h-1 md:h-2 w-1 md:w-2',
  3: 'h-2 md:h-3 w-2 md:w-3',
  4: 'h-3 md:h-4 w-3 md:w-4',
  5: 'h-4 md:h-5 w-4 md: w-5',
  6: 'h-5 md:h-6 w-5 md:w-6',
  7: 'h-6 md:h-7 w-6 md:w-7',
  8: 'h-7 md:h-8 w-7 md:w-8',
  9: 'h-8 md:h-9 w-8 md:w-9',
  10: 'h-9 md:h-10 w-9 md:w-10',
  12: 'h-11 md:h-12 w-11 md:w-12',
  14: 'h-13 md:h-14 w-13 md:w-14',
  16: 'h-15 md:h-16 w-15 md:w-16',
};

const displayClasses: Record<'start' | 'middle' | 'end', string> = {
  start: 'flex justify-start',
  middle: 'flex justify-center',
  end: 'flex justify-end',
};

const props = defineProps({
  url: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 4,
  },
  position: {
    type: String as PropType<IconPosition>,
    default: 'start',
    validator (value: IconPosition) {
      return ['start', 'middle', 'end'].includes(value);
    },
  },
  loading: {
    type: String as PropType<IconLoadingType>,
    default: 'eager',
    validator (value: IconLoadingType) {
      return ['eager', 'lazy'].includes(value);
    },
  },
  target: {
    type: String as PropType<'_blank' | '_self'>,
    default: '_blank',
    validator (value: '_blank' | '_self') {
      return ['_blank', '_self'].includes(value);
    },
  },
  title: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
});

defineEmits<{(e: 'iconClick', href: string | undefined): void;}>();

const iconName = computed(() => props.icon.charAt(0).toUpperCase() + props.icon.slice(1));

const componentType = computed(() => (props.url ? 'link' : 'text'));
const iconComponent = computed(() =>
  resolveComponent(
    props.loading === 'eager' ? `Icon${iconName.value}` : `LazyIcon${iconName.value}`,
  ),
);
const iconClass = computed(() => sizeMappers[props.size]);
const displayClass = computed(() =>
  props.position ? displayClasses[props.position] : '',
);

defineOptions({
  name: 'IconComponent',
});
</script>
