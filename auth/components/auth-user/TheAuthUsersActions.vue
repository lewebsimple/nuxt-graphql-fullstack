<script setup lang="ts">
const props = defineProps<{ selected: TheAuthUserFragment[] }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const actions = {
  destroy: {
    label: "Supprimer",
    title: "Supprimer les utilisateurs",
    icon: "i-heroicons-trash",
  },
};
</script>

<template>
  <UActionsDropdown v-if="selected.length > 0" :actions="actions" @refetch="$emit('refetch')">
    <slot>
      <UButton variant="ghost" trailing-icon="i-heroicons-ellipsis-vertical" />
    </slot>
    <template #destroy-action="{ onClose, onSuccess }">
      <FormAuthUserDestroy :auth-users="selected" @cancel="onClose" @success="onSuccess" />
    </template>
  </UActionsDropdown>
</template>
