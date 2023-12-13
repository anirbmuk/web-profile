<template>
  <header class="header-background fixed top-0 z-50 w-full">
    <div class="py-4">
      <h1
        class="text-shadow items-center text-center text-3xl font-bold uppercase tracking-wide md:text-4xl md:tracking-wider lg:text-6xl"
        translate="no">
        Anirban Mukherjee
      </h1>
    </div>
  </header>
  <main class="container mx-auto my-20">
    <section class="text-center">
      <h1 class="py-4 text-massive font-bold text-black-dark">
        !{{ error?.statusCode }}!
      </h1>
      <div v-if="error?.message" class="m-2 text-red">
        {{ error.message }}
      </div>
      <p class="text-center" v-if="error?.statusCode !== 404">
        {{ $i18n.t('error.message_others') }}
      </p>
      <p v-else>
        {{ $i18n.t('error.message_not_found') }}
      </p>
      <div class="mb-2 mt-4 flex items-center justify-center">
        <UiButton
          :button-type="{ type: 'button', buttonClass: 'download-button' }"
          @onclick="clearError({ redirect: localePath('/') })"
          >{{ $i18n.t('error.back_button') }}</UiButton
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object as PropType<{
      url: string;
      statusCode: number;
      statusMessage: string;
      message: string;
      description: string;
      data: any;
    }>,
  },
});

const localePath = useLocalePath();
const { $i18n } = useNuxtApp();

useHead({
  title:
    props.error?.statusCode === 404
      ? $i18n.t('error.title_not_found')
      : $i18n.t('error.title_others'),
});

defineOptions({
  name: 'GlobalErrorPage',
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 0 2px var(--black-light);
}

.header-background {
  @apply border-b border-gray-100 bg-gray-50;
}

@media (prefers-color-scheme: dark) {
  .header-background {
    @apply border-b border-transparent bg-transparent;
  }
}
</style>
