<script setup lang="ts">
import { type AuthRole } from "~/graphql/utils/graphql";

const props = defineProps<{ modelValue: AuthRole }>();
const emit = defineEmits<{ (event: "update:modelValue", value: AuthRole): void }>();
const proxy = computed({ get: () => props.modelValue, set: (value: AuthRole) => emit("update:modelValue", value) });
const roleOptions = authRoleOptions();
</script>

<template>
  <USelect v-model="proxy" :options="roleOptions" />
</template>
