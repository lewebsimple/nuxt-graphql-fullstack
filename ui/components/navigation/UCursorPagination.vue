<script setup lang="ts">
defineProps<{ pageInfo: PageInfoFragment | null | undefined }>();
defineEmits<{ (e: "firstPage"): void; (e: "nextPage"): void; (e: "previousPage"): void }>();
</script>

<template>
  <UButtonGroup v-if="pageInfo" size="sm">
    <UButton :disabled="!pageInfo.hasPreviousPage" color="gray" icon="i-heroicons-chevron-double-left" aria-label="Première page" @click="$emit('firstPage')" />
    <UButton :disabled="!pageInfo.hasPreviousPage" color="gray" icon="i-heroicons-chevron-left" aria-label="Précédent" @click="$emit('previousPage')" />
    <UButton :disabled="!pageInfo.hasNextPage" color="gray" icon="i-heroicons-chevron-right" aria-label="Suivant" trailing @click="$emit('nextPage')" />
  </UButtonGroup>
</template>
