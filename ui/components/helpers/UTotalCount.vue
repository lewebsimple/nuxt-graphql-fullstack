<script setup lang="ts">
withDefaults(defineProps<{ totalCount?: number; singular?: string; plural?: string }>(), { totalCount: 0, singular: "item", plural: "items" });
</script>

<template>
  <div class="text-sm text-muted">{{ totalCount }} {{ totalCount > 1 ? plural : singular }}</div>
</template>
