<template>
  <template
    v-for="(timeline, idx) in mappedTimelines"
    :key="`${timeline.provider}_${timeline.start}`">
    <div class="grid grid-cols-5 gap-3 md:gap-0">
      <div
        class="col-span-2 flex items-start justify-end pt-2 text-right"
        :class="timeline.size ?? 'h-24'">
        <template v-if="timeline.alignment === 'left'">
          <div class="relative -right-1/6 block space-y-1 md:-right-1/5">
            <div class="text-sm font-semibold text-gray-700">
              {{ getQualifiedDate(timeline.start) }} -
              {{ getQualifiedDate(timeline.end) || $i18n.t('components.UiTimeline.present') }}
            </div>
            <div class="!-mt-0.5 text-sm text-gray-600">
              {{ getDurationText(timeline.start, timeline.end) }}
            </div>
            <div
              translate="no"
              class="grid gap-0.5 font-semibold text-black-dark">
              <div class="!leading-4 max-md:text-md">
                {{ timeline.designation }}
              </div>
              <div class="text-sm md:text-md">
                {{ timeline.provider }}
              </div>
            </div>
            <div class="text-sm text-gray-600">
              {{ timeline.location }}
            </div>
            <div
              v-if="timeline.description"
              class="hidden text-sm !leading-4 text-gray-900 md:mt-2 md:w-[32em] lg:block">
              {{ timeline.description }}
            </div>
          </div>
        </template>
      </div>
      <div
        class="mx-auto flex w-4 cursor-pointer items-center justify-center border-2 border-gray-400 bg-gray-400 duration-200 ease-in lg:hover:border-black-alt lg:hover:bg-black-alt"
        :class="[
          timeline.size ?? 'h-24',
          {
            'rounded-t-sm': idx === 0,
            'rounded-b-sm': idx === mappedTimelines.length - 1,
          },
        ]"
        :title="timeline.provider" />
      <div
        class="col-span-2 flex items-start justify-start pt-1"
        :class="timeline.size ?? 'h-24'">
        <template v-if="timeline.alignment === 'right'">
          <div class="relative -left-1/6 block space-y-1 md:-left-1/5">
            <div class="text-sm font-semibold text-gray-700">
              {{ getQualifiedDate(timeline.start) }} - {{ getQualifiedDate(timeline.end) }}
            </div>
            <div class="!-mt-0.5 text-sm text-gray-600">
              {{ getDurationText(timeline.start, timeline.end) }}
            </div>
            <div
              translate="no"
              class="grid gap-0.5 font-semibold text-black-dark">
              <div class="!leading-4 max-md:text-md">
                {{ timeline.designation }}
              </div>
              <div class="text-sm md:text-md">
                {{ timeline.provider }}
              </div>
            </div>
            <div class="text-sm text-gray-600">
              {{ timeline.location }}
            </div>
            <div
              v-if="timeline.description"
              class="hidden text-sm !leading-4 text-gray-900 md:mt-2 md:w-[32em] lg:block">
              {{ timeline.description }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts" generic="T extends Timeline">
import type { Timeline } from '~/types/components/timeline';

const heights: Record<number, string> = {
  1: 'h-24 md:h-32',
  2: 'h-32 md:h-40',
  3: 'h-40 md:h-48',
  4: 'h-48 md:h-56',
  5: 'h-56 md:h-64',
  6: 'h-64 md:h-72',
  7: 'h-72 md:h-80',
};

const props = defineProps({
  timelines: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
});

const { $i18n } = useNuxtApp();
const {
  getCurrentTimeline,
  sortFn,
  getQualifiedDate,
  getDurationText,
} = useDate();

const getHeight = (start: Timeline['start'], end = getCurrentTimeline()) => {
  const [, endYear] = end.split('/', 2);
  const [, startYear] = start.split('/', 2);
  return heights[+endYear - +startYear || 1] || heights[7];
};

const mappedTimelines = computed(() =>
  (props.timelines || [])
    .sort((t1, t2) => sortFn(t1.start, t2.start))
    .map((each, index) => {
      return {
        ...each,
        size: getHeight(each.start, each.end),
        alignment: index % 2 === 0 ? 'left' : 'right',
      };
    }),
);

defineOptions({
  name: 'TimelineComponent',
});
</script>
