<script setup lang="ts">
const { siteName } = useRuntimeConfig().public;
useHead({ titleTemplate: (title) => (title ? `${title} | ${siteName}` : siteName) });
</script>

<template>
  <Body class="antialiased font-sans text-gray-700 bg-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
