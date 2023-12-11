<script setup lang="ts">
const props = defineProps<{ modelValue: AuthUserFields }>();
const emit = defineEmits<{ (event: "update:modelValue", value: AuthUserFields): void }>();
const proxy = computed({ get: () => props.modelValue, set: (value: AuthUserFields) => emit("update:modelValue", value) });
</script>

<template>
  <UFormGroup name="email" label="Courriel">
    <UInput v-model="proxy.email" type="email" />
  </UFormGroup>
  <UFormGroup name="password" label="Mot de passe">
    <UPasswordInput v-model="proxy.password" />
  </UFormGroup>
  <UFormGroup name="role" label="Rôle">
    <AuthRoleInput v-model="proxy.role" />
  </UFormGroup>
</template>
