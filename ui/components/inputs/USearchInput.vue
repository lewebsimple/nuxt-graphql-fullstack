<script setup lang="ts">
const props = defineProps<{ modelValue: string | null | undefined }>();
const emit = defineEmits<{ (event: "update:modelValue", value: string | null | undefined): void }>();
const onSearchInput = (event: Event) => emit("update:modelValue", (<HTMLInputElement>event.target)?.value);
</script>

<template>
  <UInput type="search" icon="i-heroicons-magnifying-glass" placeholder="Rechercher..." :value="modelValue" @blur="onSearchInput" @keyup.enter="$event.target.blur()" />
</template>
