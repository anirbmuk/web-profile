<template>
  <section>
    <UiAccordion :state-key="'github'">
      <template #heading>
        <h3 class="md:heading gradient-text">
          {{ $i18n.t('main.github.title') }}
        </h3>
      </template>
      <template #content>
        <div class="github-container snaps-inline">
          <template v-for="(repo, index) in block"
                    :key="index"
          >
            <UtilIntersect @tracked="
              tracker('github_section', repo?.value ? `${repo.value.toString()}` : '')
            "
            >
              <UiLinkOrText :href="repo?.value?.toString()"
                            @link-click="onLinkClick(repo?.value?.toString())"
              >
                <div v-if="repo?.value"
                     class="preview-container"
                >
                  <div class="items-center space-y-2">
                    <div class="flex items-center space-x-2">
                      <LazyUiIcon :icon="'github'"
                                  :size="7"
                      />
                      <div class="-mt-1 text md:text-2xl"
                           translate="no"
                      >
                        {{ transformRepo(repo?.value?.toString()) }}
                      </div>
                    </div>
                    <div class="text-md text-gray-500 lg:hidden"
                         translate="no"
                    >
                      {{ transformTechstack(repo?.technologies) }}
                    </div>
                    <div class="hidden space-x-2 lg:flex">
                      <UiChip v-for="technology in repo?.technologies"
                              :key="technology"
                              :text="technology"
                      />
                    </div>
                    <div class="text-md leading-4">
                      {{ repo?.description }}
                    </div>
                  </div>
                </div>
              </UiLinkOrText>
            </UtilIntersect>
          </template>
        </div>
      </template>
    </UiAccordion>
  </section>
</template>

<script setup lang="ts">
import type { GithubBlock } from '~/types/features/github';
import type { ImpressionEventParams } from '~/types/tracking';

const { $i18n } = useNuxtApp();
const {
  trackExternalClickEvent, trackImpressionItemEvent, 
} = useTracking();

defineProps({
  block: {
    type: Array as PropType<GithubBlock[]>,
    required: true,
  },
});

const transformRepo = (value: string | undefined) => {
  if (!value) {
    return;
  }
  const urlParts = value.split('/');
  const repo = urlParts?.pop();
  // const author = urlParts?.pop();
  return `${repo}`;
};

const transformTechstack = (value: string[] | undefined) => {
  if (!value) {
    return '';
  }
  return value?.join(', ') ?? '';
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

const tracker = (event_section: ImpressionEventParams['event_section'], item: string) =>
  trackImpressionItemEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section,
    item,
  });

defineOptions({
  name: 'GithubComponent',
});
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .github-container {
    @apply grid gap-3 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4;
  }
}

@media screen and (max-width: 767px) {
  .github-container {
    @apply grid grid-flow-col gap-2 overflow-y-hidden overscroll-contain;
    grid-auto-columns: 87.5%;
  }
}

.preview-container {
  @apply mb-2.5 flex h-[8rem] items-center rounded border border-gray-300 p-4 duration-300 ease-out md:m-0.5 lg:h-[9rem];
}

@media screen and (min-width: 768px) and (hover: hover) {
  .preview-container:hover {
    @apply scale-105 bg-gray-50 ease-in;
  }
}

@media (prefers-color-scheme: dark) {
  .preview-container {
    @apply bg-transparent;
  }

  @media screen and (min-width: 768px) and (hover: hover) {
    .preview-container:hover {
      @apply scale-105 bg-transparent ease-in;
    }
  }
}

.snaps-inline {
  scroll-snap-type: inline mandatory;
}

.snaps-inline>* {
  scroll-snap-align: start;
}
</style>
