<template>
  <section class="mx-auto mt-16 md:mt-24 xl:max-w-3/4 2xl:max-w-4/5">
    <div
      role="img"
      class="profile-image"
      :aria-label="$i18n.t('global.accessibility.ariaLabel.profileImage')" />
  </section>
  <div class="mx-auto space-y-16 xl:max-w-3/4 2xl:max-w-4/5">
    <template v-if="profile">
      <Profile :profile="profile" />
    </template>
    <template v-if="data?.career?.length">
      <LazyCareer :block="data.career" />
    </template>
    <template v-if="data?.techstack">
      <LazyTechstack :block="data.techstack" />
    </template>
    <template v-if="data?.github?.length">
      <LazyGithub :block="data.github" />
    </template>
    <template v-if="data?.education?.length">
      <LazyEducation :block="data.education" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import type { CareerBlock } from '~/types/features/career';
import type { TechstackBlock } from '~/types/components/techstack';
import type { GithubBlock } from '~/types/features/github';
import type { EducationBlock } from '~/types/features/education';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();
const { loadingState } = useLoader();
const { trackPageViewEvent } = useTracking();

const loadData = async () => {
  loadingState.value = true;
  return await Promise.all([
    fetch<CareerBlock>('career'),
    fetch<TechstackBlock>('techstack', false, 1),
    fetch<GithubBlock>('github').then((github) =>
      github.sort((g1, g2) => g1.position - g2.position),
    ),
    fetch<EducationBlock>('education', true, 1).then((education) =>
      education.sort((e1, e2) => e1.position - e2.position),
    ),
  ]).finally(() => (loadingState.value = false));
};

const { data: profile } = useAsyncData('profile', async () => {
  const [profile] = await fetch<ProfileBlock>('profile', true, 1);
  return profile;
}, {
  getCachedData(key, nuxt) {
    return nuxt.payload.data[key];
  },
});

const { data } = useLazyAsyncData('others', async () => {
  const [career, [techstack], github, education] = await loadData();
  return {
    career,
    techstack,
    github,
    education,
  };
}, {
  getCachedData(key, nuxt) {
    return nuxt.payload.data[key];
  },
});

onMounted(() =>
  trackPageViewEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
  }),
);

defineOptions({
  name: 'MainComponent',
});
</script>

<style scoped>
.profile-image {
  background: url('/seo.webp') no-repeat center;
  @apply mb-2 h-[420px] rounded-sm bg-cover md:h-[600px] lg:h-[420px] mx-auto md:max-w-3/4 2xl:max-w-3/5;
}
</style>
