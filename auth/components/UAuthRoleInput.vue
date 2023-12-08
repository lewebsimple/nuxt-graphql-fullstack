<script setup lang="ts">
import { AuthRole } from "@prisma/client";

const props = defineProps<{ modelValue: AuthRole }>();
const emit = defineEmits<{ (event: "update:modelValue", value: AuthRole): void }>();
const proxy = computed({
  get: () => props.modelValue,
  set: (value: AuthRole) => emit("update:modelValue", value),
});

const roleOptions = [
  { value: AuthRole.VERIFIED, label: "Utilisateur" },
  { value: AuthRole.ADMINISTRATOR, label: "Administrateur" },
];
</script>

<template>
  <USelect v-model="proxy" :options="roleOptions" />
</template>
