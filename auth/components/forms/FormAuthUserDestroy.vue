<script setup lang="ts">
const props = defineProps<{ authUsers: TheAuthUserFragment[] }>();
const emit = defineEmits<{ (event: "refetch"): void }>();

const { authUserDestroyMany } = useAuthUserMutations();

async function onAuthUserDestroySubmit() {
  try {
    const { error } = await authUserDestroyMany({ ids: props.authUsers.map(({ id }) => id) });
    if (error) throw new Error(error.message);
    return props.authUsers.length > 1 ? `${props.authUsers.length} utilisateurs supprimés` : `1 utilisateur supprimé`;
  } catch (error) {
    switch ((<Error>error).message) {
      default:
        throw new Error("La suppression a échoué.");
    }
  }
}
</script>

<template>
  <UFormWrapper :submit-handler="onAuthUserDestroySubmit" submit-color="red" submit-label="Supprimer" @success="$emit('refetch')">
    <p class="font-semibold text-lg">{{ authUsers.length > 1 ? `${authUsers.length} utilisateurs seront supprimés` : `1 utilisateur sera supprimé` }}</p>
    <ul class="list-disc list-inside">
      <li v-for="{ id, email } in authUsers" :key="id">
        <span>{{ email }}</span>
      </li>
    </ul>
  </UFormWrapper>
</template>
