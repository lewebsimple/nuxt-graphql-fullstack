<script setup lang="ts" generic="T extends string">
const props = defineProps<{ modelValue: T | null | undefined; options: { label: string; value: T }[] }>();
const emit = defineEmits<{ (event: "update:modelValue", value: T | null | undefined): void }>();
const proxy = computed({ get: () => <string | null | undefined>props.modelValue || "", set: (value: string | null | undefined) => emit("update:modelValue", <T>value || null) });
</script>

<template>
  <USelect v-model="proxy" :options="options" />
</template>
