<script setup lang="ts">
defineProps<{ title: string | undefined }>();
</script>

<template>
  <div class="w-full sm:w-96 space-y-8">
    <h1 v-if="title" class="h3">{{ title }}</h1>
    <slot />
    <UButton to="/" color="gray" variant="link" :padded="false" label="Retour à l'accueil" icon="i-heroicons-arrow-left" />
  </div>
</template>
