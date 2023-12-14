<script setup lang="ts">
const props = defineProps<{ selected: TheAuthUserFragment[] }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const actions = [
  [
    {
      key: "destroy",
      label: "Supprimer",
      title: "Supprimer les utilisateurs",
      icon: "i-heroicons-trash",
    },
  ],
];
</script>

<template>
  <UActionsDropdown v-if="selected.length > 0" :actions="actions" @refetch="$emit('refetch')">
    <slot>
      <UButton color="white" variant="outline" trailing-icon="i-heroicons-chevron-down" label="Actions" />
    </slot>
    <template #destroy-action="{ onClose, onSuccess }">
      <FormAuthUserDestroy :auth-users="selected" @cancel="onClose" @success="onSuccess" />
    </template>
  </UActionsDropdown>
</template>
