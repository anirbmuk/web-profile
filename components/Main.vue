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
    <template v-if="career?.length">
      <LazyCareer :block="career" />
    </template>
    <template v-if="techstack">
      <LazyTechstack :block="techstack" />
    </template>
    <template v-if="github?.length">
      <LazyGithub :block="github" />
    </template>
    <template v-if="education?.length">
      <LazyEducation :block="education" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import type { CareerBlock } from '~/types/features/career';
import type { TechstackBlock } from '~/types/components/techstack';
import type { GithubBlock } from '~/types/features/github';
import type { EducationBlock } from '~/types/features/education';

import { CAREER, PROFILE, TECHSTACK, GITHUB, EDUCATION } from '~/constants/url';

const { fetch } = useFirebase();
const { loadingState } = useLoader();

const loadData = async () => {
  loadingState.value = true;
  return await Promise.all([
    fetch<ProfileBlock>(PROFILE),
    fetch<CareerBlock>(CAREER),
    fetch<TechstackBlock>(TECHSTACK),
    fetch<GithubBlock>(GITHUB),
    fetch<EducationBlock>(EDUCATION),
  ]).finally(() => (loadingState.value = false));
};

const [[profile], career, [techstack], github, education] = await loadData();

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
