<script setup lang="ts">
defineProps<{ title: string | undefined }>();
const localePath = useLocalePath();
</script>

<template>
  <div class="w-96 space-y-8">
    <h1 v-if="title" class="h3">{{ title }}</h1>
    <slot />
    <UButton :to="localePath('/')" color="gray" variant="link" :padded="false" :label="$t('auth.go_back_home')" icon="i-heroicons-arrow-left" />
  </div>
</template>
