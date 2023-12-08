<script setup lang="ts">
// Form state
const refForm = ref();
const state = ref({});

// Form submission
const { logout } = useAuth();
const isSubmitting = ref(false);
const isDisabled = computed(() => isSubmitting.value);
async function onSubmit() {
  try {
    isSubmitting.value = true;
    await logout();
    await useRouter().replace("/");
  } catch (error) {
    useToaster().error("Veuillez réessayer plus tard");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm ref="refForm" :state="state" @submit="onSubmit">
    <UFormGroup name="submit">
      <UButton type="submit" block :disabled="isDisabled" :loading="isSubmitting" :label="isSubmitting ? 'Déconnexion en cours...' : 'Déconnexion'" />
    </UFormGroup>
  </UForm>
</template>
