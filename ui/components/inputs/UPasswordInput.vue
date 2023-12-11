<script setup lang="ts">
const props = defineProps<{ modelValue: string | undefined }>();
const emit = defineEmits<{ (event: "update:modelValue", value: string | undefined): void }>();
const proxy = computed({ get: () => props.modelValue, set: (value) => emit("update:modelValue", value) });
const showPassword = ref(false);
</script>

<template>
  <UInput v-model="proxy" :type="showPassword ? 'text' : 'password'" :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton color="gray" variant="link" :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" :padded="false" @click="showPassword = !showPassword" />
    </template>
  </UInput>
</template>
