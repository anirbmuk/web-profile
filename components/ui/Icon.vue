<template>
  <template v-if="componentType === 'link'">
    <div :class="displayClass">
      <a
        :target="target"
        :href="url"
        :aria-label="label || icon"
        :title="title"
        rel="nofollow"
        @click="$emit('iconClick', url)">
        <img
          :src="`/icons/${icon}.svg`"
          :class="iconClass"
          :aria-hidden="true"
          :alt="altText || icon"
          :height="heightAndWidth"
          :width="heightAndWidth"
          :loading="loading" >
      </a>
    </div>
    <slot :class="displayClass" />
  </template>
  <div
    v-else
    :title="title"
    @click="$emit('iconClick', undefined)">
    <img
      :src="`/icons/${icon}.svg`"
      :class="iconClass"
      :aria-hidden="true"
      :alt="altText || icon"
      :height="heightAndWidth"
      :width="heightAndWidth"
      :loading="loading" >
  </div>
</template>

<script setup lang="ts">
import type {
  IconLoadingType,
  IconPosition,
} from '~/types/components/icon';

const sizeMappers: Record<number, string> = {
  2: 'size-1 md:size-2',
  3: 'size-2 md:size-3',
  4: 'size-3 md:size-4',
  5: 'size-4 md:size-5',
  6: 'size-5 md:size-6',
  7: 'size-6 md:size-7',
  8: 'size-7 md:size-8',
  9: 'size-8 md:size-9',
  10: 'size-9 md:size-10',
  12: 'size-11 md:size-12',
  14: 'size-[52px] md:size-14',
  16: 'size-[60px] md:size-16',
};

const imageHeightAndWidthMappers: Record<number, string> = {
  2: '8',
  3: '12',
  4: '16',
  5: '20',
  6: '24',
  7: '28',
  8: '32',
  9: '36',
  10: '40',
  12: '48',
  14: '56',
  16: '64',
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
  altText: {
    type: String,
    default: undefined,
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

defineEmits<{
  iconClick: [href: string | undefined]
}>();

const componentType = computed(() => (props.url ? 'link' : 'text'));

const iconClass = computed(() => sizeMappers[props.size]);
const heightAndWidth = computed(() => imageHeightAndWidthMappers[props.size] || '64');
const displayClass = computed(() =>
  props.position ? displayClasses[props.position] : '',
);

defineOptions({
  name: 'IconComponent',
});
</script>
