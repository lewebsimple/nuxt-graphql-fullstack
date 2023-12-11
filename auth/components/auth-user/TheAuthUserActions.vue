<script setup lang="ts">
const props = defineProps<{ authUser: TheAuthUserFragment }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const actions = {
  destroy: {
    label: "Supprimer",
    title: "Supprimer l'utilisateur",
    icon: "i-heroicons-trash",
  },
};
</script>

<template>
  <UActionsDropdown :actions="actions" @refetch="$emit('refetch')">
    <UButton variant="ghost" icon="i-heroicons-ellipsis-vertical" />
    <template #destroy-action="{ onClose, onSuccess }">
      <FormAuthUserDestroy :auth-users="[authUser]" @cancel="onClose" @success="onSuccess" />
    </template>
  </UActionsDropdown>
</template>
