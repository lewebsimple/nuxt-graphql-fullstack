<script setup lang="ts">
const props = defineProps<{ selected: TheAuthUserFragment[] }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const { authUserDestroyMany } = useAuthUserMutations();

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
      <FormEntityDestroy :entities="selected" :destroy="authUserDestroyMany" @cancel="onClose" @success="onSuccess">
        <template #default="{ entities }: { entities: TheAuthUserFragment[] }">
          <ul class="list-disc list-inside">
            <li v-for="entity in entities" :key="entity.id">
              <span>{{ entity.email }}</span>
            </li>
          </ul>
        </template>
      </FormEntityDestroy>
    </template>
  </UActionsDropdown>
</template>
