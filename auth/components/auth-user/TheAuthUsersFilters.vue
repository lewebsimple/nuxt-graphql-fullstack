<script setup lang="ts">
const props = defineProps<{ modelValue: AuthUserFiltersMany }>();
const emit = defineEmits<{ (event: "update:modelValue", value: AuthUserFiltersMany): void }>();
const proxy = computed({ get: () => props.modelValue, set: (value: AuthUserFiltersMany) => emit("update:modelValue", value) });

const canReset = computed(() => !!props.modelValue.search || !!props.modelValue.role);
const onReset = () => emit("update:modelValue", { ...props.modelValue, search: null, role: null });

const roleOptions = authRoleOptions(true);
</script>

<template>
  <div class="flex items-center gap-2">
    <USearchInput v-model="proxy.search" />
    <USelectOptional v-model="proxy.role" :options="roleOptions" />
    <UButton v-if="canReset" color="gray" variant="link" icon="i-heroicons-x-mark" :padded="false" @click="onReset" />
  </div>
</template>
