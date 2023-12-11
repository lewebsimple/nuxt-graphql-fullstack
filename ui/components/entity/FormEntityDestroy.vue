<script setup lang="ts" generic="Entity extends { id: string }">
const props = defineProps<{ entities: Entity[]; destroy: (variables: { ids: string[] }, context?: any) => Promise<any> }>();
const emit = defineEmits<{ (event: "cancel"): void; (event: "success"): void }>();

// Form state
const state = ref({});

// Form submission
const isSubmitting = ref(false);
async function onSubmit() {
  try {
    isSubmitting.value = true;
    const ids = props.entities.map((entity) => entity.id);
    await props.destroy({ ids });
    useToaster().success(props.entities.length > 1 ? `${props.entities.length} éléments supprimés` : `1 élément supprimé`);
    emit("success");
  } catch (error) {
    useToaster().error(error instanceof Error ? error.message : "Une erreur est survenue");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm :state="state" @submit="onSubmit">
    <div class="form-wrapper">
      <p class="font-semibold text-lg">{{ entities.length > 1 ? `${entities.length} éléments seront supprimés` : `1 élément sera supprimé` }}</p>
      <slot :entities="entities" />
      <div class="flex justify-end items-center gap-4">
        <UButton color="white" variant="outline" label="Annuler" @click="$emit('cancel')" />
        <UButton color="red" type="submit" label="Supprimer" :loading="isSubmitting" :disabled="isSubmitting" />
      </div>
    </div>
  </UForm>
</template>
