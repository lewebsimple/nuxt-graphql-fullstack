<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md space-y-4">
    <NuxtLink to="/">
      <SvgIconWebsimple class="mx-auto h-12 w-auto" />
    </NuxtLink>
    <h2 v-if="title" class="text-center text-2xl font-bold leading-9 tracking-tight">{{ title }}</h2>
    <UCard class="w-full">
      <slot />
    </UCard>
    <slot name="below" />
  </div>
</template>
