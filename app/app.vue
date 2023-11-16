<script setup lang="ts">
const { siteName } = useRuntimeConfig().public;
useHead({ titleTemplate: (title) => (title ? `${title} | ${siteName}` : siteName) });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
