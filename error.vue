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
        {{ error?.statusCode }}
      </h1>
      <div v-if="error?.message" class="m-2 text-red">
        {{ error.message }} at {{ error?.url }}
      </div>
      <p class="text-center">
        Whoa! You seem to have unearthed a nasty bug. I have made a note, but right now,
        the best way to fix this is to try once again. Thank you for being so patient!
      </p>
      <div class="mb-2 mt-4 flex items-center justify-center">
        <UiButton
          :button-type="{ type: 'button', buttonClass: 'download-button' }"
          @onclick="clearError({ redirect: localePath('/') })"
          >Back to Home</UiButton
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
defineProps({
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
