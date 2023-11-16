<script setup lang="ts">
const { version } = await useVersion();
</script>

<template>
  <span v-if="version" class="text-muted">{{ version }}</span>
</template>
