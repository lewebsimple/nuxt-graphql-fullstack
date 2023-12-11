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
    <template #destroy-action="{ onClose, onSuccess }">
      <div class="flex justify-end items-center gap-2">
        TODO: FormEntityDestroyMany
        <UButton color="white" variant="outline" label="Annuler" @click="onClose" />
        <UButton label="OK" @click="onSuccess" />
      </div>
    </template>
  </UActionsDropdown>
</template>
