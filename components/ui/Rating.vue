<template>
  <div
    class="flex space-x-1 text-black-dark dark:text-white"
    :title="title"
    role="img"
    :aria-label="ariaLabel">
    <LazyUiIconStarFilled
      v-for="(_, index) in _fullRating"
      :key="`full-${index}`"
      :filled="true"
      :font-controlled="false"
      class="!size-5 md:!size-6"
      aria-hidden="true" />
    <LazyUiIconStarHalfFilled
      v-if="_hasHalf"
      :filled="true"
      :font-controlled="false"
      class="!size-5 md:!size-6"
      aria-hidden="true" />
    <template v-if="_remaining?.length">
      <LazyUiIconStarEmpty
        v-for="(_, index) in _remaining"
        :key="`empty-${index}`"
        :filled="true"
        :font-controlled="false"
        class="!size-5 md:!size-6"
        aria-hidden="true" />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rating: {
    type: [String, Number],
    required: true,
  },
});

const { $i18n } = useNuxtApp();

const _minRating = 0;
const _maxRating = 10;

const transform = (value: number | string = 1) => {
  return isNaN(+value) ? [] : (Array(+value) as number[]).fill(+value);
};

const rating = computed(() =>
  Math.max(Math.min(isNaN(+props.rating) ? 1 : +props.rating, _maxRating), _minRating),
);

const _fullRating = computed(() => transform(Math.floor(rating.value)));
const _hasHalf = computed(() => Math.ceil(rating.value) !== rating.value);
const _remaining = computed(() => transform(_maxRating - Math.ceil(rating.value)));

const title = computed(
  () => `${new Intl.NumberFormat($i18n.locale.value).format(rating.value)}/${_maxRating}`,
);

const ariaLabel = computed(
  () => $i18n.t('global.accessibility.ariaLabel.rating', {
    rating: new Intl.NumberFormat($i18n.locale.value).format(rating.value),
    maxRating: _maxRating,
  }),
);

defineOptions({
  name: 'RatingComponent',
});
</script>
