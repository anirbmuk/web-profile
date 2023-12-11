<template>
  <section class="mx-auto mt-16 md:mt-24 xl:max-w-3/4 2xl:max-w-4/5">
    <div
      role="img"
      class="profile-image mx-auto md:max-w-3/4 2xl:max-w-3/5"
      aria-label="profile image"></div>
  </section>
  <div class="mx-auto space-y-16 xl:max-w-3/4 2xl:max-w-4/5">
    <template v-if="profile">
      <Profile :profile="profile" />
    </template>
    <template v-if="career">
      <LazyCareer :block="career" />
    </template>
    <template v-if="techstack">
      <LazyTechstack :block="techstack" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import type { CareerBlock } from '~/types/features/career';
import type { TechstackBlock } from '~/types/components/techstack';

import { CAREER, PROFILE, TECHSTACK } from '~/constants/url';

const { fetch } = useFirebase();

const [[profile], career, [techstack]] = await Promise.all([
  fetch<ProfileBlock>(PROFILE),
  fetch<CareerBlock>(CAREER),
  fetch<TechstackBlock>(TECHSTACK),
]);

defineOptions({
  name: 'MainComponent',
});
</script>

<style scoped>
.profile-image {
  background: url('~/assets/images/seo.webp') no-repeat center;
  @apply mb-2 h-[420px] rounded-sm bg-cover md:h-[600px] lg:h-[420px];
}
</style>
