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
  <UBulkActions :selected="selected" :actions="actions" @refetch="$emit('refetch')">
    <template #destroy-action="{ onClose, onSuccess }">
      <div class="flex justify-end items-center gap-2">
        <UButton color="white" variant="outline" label="Annuler" @click="onClose" />
        <UButton label="OK" @click="onSuccess" />
      </div>
    </template>
  </UBulkActions>
</template>
