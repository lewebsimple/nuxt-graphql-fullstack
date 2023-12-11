<script setup lang="ts">
const emit = defineEmits<{ (event: "refetch"): void }>();
const showModal = ref(false);
function onSuccess() {
  showModal.value = false;
  emit("refetch");
}
</script>

<template>
  <UButton variant="soft" icon="i-heroicons-plus" label="Ajouter" @click="showModal = true" />
  <UActionModal v-model="showModal" title="Ajouter un utilisateur">
    <FormAuthUserCreate @cancel="showModal = false" @success="onSuccess" />
  </UActionModal>
</template>
