<script setup lang="ts">
const props = defineProps<{ title: string }>();
const emit = defineEmits<{ (event: "close"): void }>();
const proxy = computed({ get: () => true, set: (value) => !value && emit("close") });
</script>

<template>
  <UModal v-model="proxy">
    <UCard>
      <template #header>
        <h2 class="h2">{{ title }}</h2>
      </template>
      <slot />
    </UCard>
  </UModal>
</template>
