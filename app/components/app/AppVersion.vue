<script setup lang="ts">
const { version } = await useAppVersion();
</script>

<template>
  <span v-if="version" class="text-muted">{{ version }}</span>
</template>
