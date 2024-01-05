<template>
  <section class="mt-0">
    <div class="mx-auto !mt-7 drop-shadow-md md:max-w-3/4 2xl:max-w-3/5">
      <div class="flex flex-col text-center">
        <h2 class="mb-1.5 text-xl md:mb-2 md:text-3xl lg:text-4xl">
          {{ profile.designation }}
        </h2>
        <h3 class="mb-1.5 text md:mb-2 md:text-2xl lg:text-3xl" translate="no">
          {{ profile.currentjob }}
        </h3>
        <h4 class="mb-2 text-md md:mb-2.5 md:text lg:text-xl">
          {{ profile.location }}
        </h4>
        <div class="flex items-center justify-center space-x-4">
          <template v-for="social in profile.social" :key="social.icon">
            <UiIcon
              :icon="social.type"
              :url="social.url"
              :size="10"
              @icon-click="onLinkClick(social.url)"
            />
          </template>
        </div>
        <div class="mb-2 mt-4 flex items-center justify-center">
          <UiButton
            :button-type="{ type: 'button', buttonClass: 'download-button' }"
            @onclick="onDownloadResume(profile.artifact)"
          >
            {{ $i18n.t('main.profile.download_resume') }}
          </UiButton>
        </div>
      </div>
    </div>
    <article class="mx-auto !mt-8 drop-shadow-md md:max-w-3/4 2xl:max-w-3/5">
      <UiBlock block-style="inverted">
        <div class="space-y-4 text-md md:text">
          <template v-for="(bio, index) in profile.bio" :key="index">
            <div v-html="bio" />
          </template>
        </div>
        <div class="mx-auto mt-4 flex items-center justify-between">
          <div v-for="blog in profile.blog" :key="blog.url">
            <UiIcon
              v-if="blog.icon"
              :icon="blog.icon"
              :url="blog.url"
              :size="blog.iconSize ?? 10"
              :position="blog.position"
              loading="lazy"
              @icon-click="onLinkClick(blog.url)"
            >
              <span class="text-md md:text">{{ blog.description }}</span>
            </UiIcon>
          </div>
        </div>
      </UiBlock>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Artifact, ProfileBlock } from '~/types/features/profile';
import { downloadFile } from '~/helpers/file';

const { $i18n } = useNuxtApp();
const { trackExternalClickEvent } = useTracking();

defineProps({
  profile: {
    type: Object as PropType<ProfileBlock>,
    required: true,
  },
});

const onDownloadResume = (artifacts: Artifact[] | undefined) => {
  if (artifacts) {
    const [resume] = artifacts?.filter(artifact => artifact.category === 'resume');
    downloadFile(resume.url);
    onLinkClick(resume.url);
  }
};

const onLinkClick = (event_url: string | undefined) => {
  trackExternalClickEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'profile_section',
    event_url,
  });
};

defineOptions({
  name: 'ProfileComponent',
});
</script>

<style scoped>
.download-button {
  @apply min-w-xs cursor-pointer rounded border border-gray-200 bg-gray-100 px-2 py-2 text-center text-md tracking-tight text-black-dark shadow-lg duration-200 ease-in md:min-w-base md:text md:hover:border-gray-300 md:hover:bg-gray-200;
}

@media (prefers-color-scheme: dark) {
  .download-button {
    @apply border border-white bg-transparent text-white shadow-none md:hover:border-white md:hover:bg-transparent;
  }
}
</style>
