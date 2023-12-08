<script setup lang="ts">
const props = defineProps<{ authUsers: TheAuthUserFragment[] }>();
const columns = [
  { key: "email", label: "Courriel" },
  { key: "role", label: "Rôle" },
];
</script>

<template>
  <UTable :columns="columns" :rows="authUsers" />
</template>
